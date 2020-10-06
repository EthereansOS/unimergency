var StakingElementController = function (view) {
    var context = this;
    context.view = view;

    context.loadData = async function loadData(view) {
        var stakingContracts = await Promise.all(Object.values(view.props.element.contractDataPromises));
        if(!view.mounted) {
            return;
        }
        var promises = [];
        Object.keys(view.props.element).forEach(it => it.indexOf('0x') === 0 && promises.push(...Object.values(view.props.element[it].positions)))
        var logsArrays = await Promise.all(promises);
        if(!view.mounted) {
            return;
        }
        var data = {
            address: view.props.element.address
        };
        for(var logs of logsArrays) {
            for(var log of logs) {
                data[log.contractData.address] = data[log.contractData.address] || {
                    contractData : log.contractData
                };
                data[log.contractData.address][log.poolPosition] = data[log.contractData.address][log.poolPosition] || {
                    i : log.poolPosition,
                    token0 : log.contractData.pools[log.poolPosition].token0,
                    token1 : log.contractData.pools[log.poolPosition].token1,
                    contractData : log.contractData,
                    poolAmount : "0",
                    token0Amount : "0",
                    token1Amount : "0",
                    elements : [],
                    totalPoolAmount : log.contractData.pools[log.poolPosition].poolAmount,
                    totalToken0Amount : log.contractData.pools[log.poolPosition].token0Amount,
                    totalToken1Amount : log.contractData.pools[log.poolPosition].token1Amount,
                    partialReward: '0'
                };
                var element = {
                    contractData : log.contractData,
                    token0 : log.contractData.pools[log.poolPosition].token0,
                    token1 : log.contractData.pools[log.poolPosition].token1,
                    poolAmount : log.poolAmount,
                    totalPoolAmount : log.contractData.pools[log.poolPosition].poolAmount,
                    totalToken0Amount : log.contractData.pools[log.poolPosition].token0Amount,
                    totalToken1Amount : log.contractData.pools[log.poolPosition].token1Amount,
                    partialReward : log.partialReward
                };
                data[log.contractData.address][log.poolPosition].partialReward = window.web3.utils.toBN(data[log.contractData.address][log.poolPosition].partialReward).add(window.web3.utils.toBN(log.partialReward)).toString();
                element.poolPercentage = parseInt(element.poolAmount) / parseInt(element.totalPoolAmount);
                element.poolPercentageString = window.formatMoney(element.poolPercentage * 100) + " %";
                element.token0Amount = window.numberToString(parseInt(element.totalToken0Amount) * element.poolPercentage).split('.')[0];
                element.token1Amount = window.numberToString(parseInt(element.totalToken1Amount) * element.poolPercentage).split('.')[0];
                data[log.contractData.address][log.poolPosition].poolAmount = window.web3.utils.toBN(data[log.contractData.address][log.poolPosition].poolAmount).add(window.web3.utils.toBN(element.poolAmount)).toString();
                data[log.contractData.address][log.poolPosition].token0Amount = window.web3.utils.toBN(data[log.contractData.address][log.poolPosition].token0Amount).add(window.web3.utils.toBN(element.token0Amount)).toString();
                data[log.contractData.address][log.poolPosition].token1Amount = window.web3.utils.toBN(data[log.contractData.address][log.poolPosition].token1Amount).add(window.web3.utils.toBN(element.token1Amount)).toString();
                data[log.contractData.address][log.poolPosition].partialReward = window.sumBigNumbers(data[log.contractData.address][log.poolPosition].partialReward, element.partialReward);
                data[log.contractData.address][log.poolPosition].elements.push(element);
            }
        }
        data.tokens = {};
        var tokens = Object.values(view.props.tokens);
        for(var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            data.tokens[token.address] = {
                i,
                amount : '0',
                token
            }
        }
        for(var contractData of stakingContracts) {
            if(!data[contractData.address]) {
                continue;
            }
            var poolPositions = Object.keys(data[contractData.address]).filter(it => !isNaN(it));
            for(var poolPosition of poolPositions) {
                data.tokens[data[contractData.address][poolPosition].token0.address].amount = window.sumBigNumbers(data.tokens[data[contractData.address][poolPosition].token0.address].amount, data[contractData.address][poolPosition].token0Amount);
                data.tokens[data[contractData.address][poolPosition].token1.address].amount = window.sumBigNumbers(data.tokens[data[contractData.address][poolPosition].token1.address].amount, data[contractData.address][poolPosition].token1Amount);
                data.tokens[data[contractData.address].contractData.token.address].amount = window.sumBigNumbers(data.tokens[data[contractData.address].contractData.token.address].amount, data[contractData.address][poolPosition].partialReward);
                data[contractData.address][poolPosition].poolPercentage = parseInt(data[contractData.address][poolPosition].poolAmount) / parseInt(data[contractData.address][poolPosition].totalPoolAmount);
                data[contractData.address][poolPosition].poolPercentageString = window.formatMoney(data[contractData.address][poolPosition].poolPercentage * 100) + " %";
            }
        }
        for(var gift of window.context.gifts) {
            data.tokens[gift.address].amount = window.sumBigNumbers(data.tokens[gift.address].amount, gift.amount);
        }
        data.tokens = Object.values(data.tokens);
        view.setState({data});
        view.emit('stakingElement/done', data);
    };
};