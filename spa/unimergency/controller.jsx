var UnimergencyController = function (view) {
    var context = this;
    context.view = view;

    context.stakedEvent = window.web3.utils.sha3('Staked(address,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256[],uint256)');

    context.loadData = async function loadData() {
        window.stakeInfos = {};
        var tokens = {};
        window.involvedTokens = tokens;
        var uniqueAddresses = {};
        var contractDataPromises = [];
        var originalStakingContractData = window.getNetworkElement("stakingContractData");
        for(var contractData of originalStakingContractData) {
            contractDataPromises.push(context.loadStakingContractData(contractData, tokens).then(it => {
                context.view.setState({tokens});
                return it;
            }));
            var logs = await window.web3.eth.getPastLogs({
                address : contractData.address,
                topics : [
                    context.stakedEvent
                ],
                fromBlock : '0',
                toBlock: 'latest'
            });
            for(var log of logs) {
                var data = window.web3.eth.abi.decodeParameters(["uint256","uint256","uint256","uint256","uint256","uint256[]","uint256"], log.data);
                data = data[2];
                var address = window.web3.utils.toChecksumAddress(window.web3.eth.abi.decodeParameter('address', log.topics[1]));
                var tier = window.web3.eth.abi.decodeParameter('uint256', log.topics[2]);
                address = window.web3.utils.toChecksumAddress(address);
                uniqueAddresses[address] = uniqueAddresses[address] || {
                    address, 
                    contractDataPromises 
                };
                uniqueAddresses[address][contractData.address] = uniqueAddresses[address][contractData.address] || {
                    contractDataPromise : contractDataPromises[contractDataPromises.length - 1],
                    positions : {}
                };
                uniqueAddresses[address][contractData.address].positions[tier] = uniqueAddresses[address][contractData.address].positions[tier] || context.elaboratePositions(address, contractDataPromises[contractDataPromises.length - 1], tier);
            }
        }
        window.uniqueAddresses = uniqueAddresses;
        var key = uniqueAddresses[window.walletAddress] ? window.walletAddress : null;
        context.view.setState({uniqueAddresses, key});
        var values = Object.keys(uniqueAddresses);
        for(var value of values) {
            try {
                uniqueAddresses[value].redeemed = await window.blockchainCall(window.liquidityMiningRedeemContract.methods.redeemed, value)
            } catch(e) {
            }
        }
        context.view.setState({uniqueAddresses});
    };

    context.loadStakingContractData = async function loadStakingContractData(contractData, tokens) {
        var loadedContractData = JSON.parse(JSON.stringify(contractData));
        loadedContractData.contract = window.newContract(window.context.StakeABI, loadedContractData.address);
        var doubleProxy = window.newContract(window.context.DoubleProxyABI, await window.blockchainCall(loadedContractData.contract.methods.doubleProxy));
        var proxy = window.newContract(window.context.ProxyABI, await window.blockchainCall(doubleProxy.methods.proxy));
        var tokenAddress = await window.blockchainCall(proxy.methods.getToken);
        tokenAddress = window.web3.utils.toChecksumAddress(tokenAddress);
        loadedContractData.token = tokens[tokenAddress] = tokens[tokenAddress] || await window.loadTokenInfos(tokenAddress);
        var pools = await window.blockchainCall(loadedContractData.contract.methods.tokens);
        for(var i = 0; i < pools.length; i++) {
            var pool = pools[i];
            pool = window.web3.utils.toChecksumAddress(pool);
            loadedContractData.pools[i].token = tokens[pool] = tokens[pool] || await window.loadTokenInfos(pool);
            var uniswapV2Pair = window.newContract(window.context.UniswapV2PairABI, await window.blockchainCall(window.uniswapV2Factory.methods.getPair, loadedContractData.token.address, loadedContractData.pools[i].token.address));
            var token0 = window.web3.utils.toChecksumAddress(await window.blockchainCall(uniswapV2Pair.methods.token0));
            loadedContractData.pools[i].token0 = token0 === loadedContractData.token.address ? loadedContractData.token : loadedContractData.pools[i].token;
            loadedContractData.pools[i].token1 = token0 === loadedContractData.token.address ? loadedContractData.pools[i].token : loadedContractData.token;
        }
        return loadedContractData;
    };

    context.elaboratePositions = async function elaboratePositions(address, contractDataPromise, tier) {
        var positions = [];
        var contractData = await contractDataPromise;
        var tierLength = parseInt(await window.blockchainCall(contractData.contract.methods.length, tier));
        for(var i = 0; i < tierLength; i++) {
            var stakeInfo = window.stakeInfos[contractData.address + "_" + tier + "_" + i] = window.stakeInfos[contractData.address + "_" + tier + "_" + i] || await window.blockchainCall(contractData.contract.methods.stakeInfo, tier, i);
            if(window.web3.utils.toChecksumAddress(stakeInfo[0]) === address) {
                stakeInfo.i = i;
                stakeInfo.tier = tier;
                stakeInfo.poolPosition = stakeInfo[1];
                stakeInfo.poolAmount = stakeInfo[4];
                stakeInfo.contractData = contractData;
                var partialRewardBlockTimes = stakeInfo[7];
                stakeInfo.partialReward = "0";
                for(var blockTime of partialRewardBlockTimes) {
                    blockTime = parseInt(blockTime);
                    if(blockTime === 0 || blockTime > window.context.snapshotBlock) {
                        continue;
                    }
                    stakeInfo.partialReward = window.web3.utils.toBN(stakeInfo.partialReward).add(window.web3.utils.toBN(stakeInfo[8])).toString();
                }
                positions.push(stakeInfo);
            }
        }
        return positions;
    };
};