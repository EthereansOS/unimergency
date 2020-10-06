var VoteController = function (view) {
    var context = this;
    context.view = view;

    context.loadData = async function loadData() {
        var voteContract = window.newContract(window.context.QuickscopeVoteABI, window.getNetworkElement("quickscopeVoteAddress"));
        var votes = await window.blockchainCall(voteContract.methods.votes);
        var myVotes = {
            accepts : [],
            refuses : []
        };
        var redeemed = false;
        if(window.walletAddress) {
            myVotes = await window.blockchainCall(voteContract.methods.votes, window.walletAddress);
            myVotes.accepts = myVotes[0];
            myVotes.refuses = myVotes[1];
            redeemed = await window.blockchainCall(voteContract.methods.redeemed, window.walletAddress);
        }
        var currentBlock = await window.web3.eth.getBlockNumber();
        var startBlock = await window.blockchainCall(voteContract.methods.startBlock);
        var endBlock = await window.blockchainCall(voteContract.methods.endBlock);
        var started = currentBlock >= parseInt(startBlock);
        var terminated = currentBlock >= parseInt(endBlock);
        var running = started && !terminated;
        var tokens = await window.blockchainCall(voteContract.methods.votingTokens);
        var votingTokens = [];
        for(var votingToken of tokens) {
            votingTokens.push(await window.loadTokenInfos(votingToken));
        }
        var selectedToken = votingTokens[0];
        context.view.setState({
            voteContract,
            votes,
            myVotes,
            redeemed,
            currentBlock,
            startBlock,
            endBlock,
            started,
            terminated,
            running,
            votingTokens,
            selectedToken
        }, () => context.loadTokenData());
    };

    context.loadTokenData = async function loadTokenData() {
        var votes = await window.blockchainCall(context.view.state.voteContract.methods.votes);
        var myVotes = {
            accepts : [],
            refuses : []
        };
        var redeemed = false;
        if(window.walletAddress) {
            myVotes = await window.blockchainCall(context.view.state.voteContract.methods.votes, window.walletAddress);
            myVotes.accepts = myVotes[0];
            myVotes.refuses = myVotes[1];
            redeemed = await window.blockchainCall(context.view.state.voteContract.methods.redeemed, window.walletAddress);
        }
        var balanceOf = await window.blockchainCall(context.view.state.selectedToken.token.methods.balanceOf, window.walletAddress);
        var allowance = await window.blockchainCall(context.view.state.selectedToken.token.methods.allowance, window.walletAddress, context.view.state.voteContract.options.address);
        var approved = parseInt(allowance) >= parseInt(balanceOf);
        context.view.setState({votes, myVotes, balanceOf, redeemed, approved});
    }

    context.performApprove = async function performApprove() {
        await window.blockchainCall(context.view.state.selectedToken.token.methods.approve, context.view.state.voteContract.options.address, window.numberToString(0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff));
    };

    context.performAccept = async function performAccept() {
        return context.vote(true);
    };

    context.performRefuse = async function performRefuse() {
        return context.vote(false);
    };

    context.vote = async function vote(accept) {
        var amount = window.toDecimals(context.view.input.value.split(',').join(''), context.view.state.selectedToken.decimals);
        if(parseInt(amount) <= 0) {
            throw "Insert a positive amount";
        }
        if(parseInt(amount) > parseInt(context.view.state.balanceOf)) {
            throw "You have insufficient amount";
        }
        var index = context.view.state.votingTokens.indexOf(context.view.state.selectedToken);
        await window.blockchainCall(context.view.state.voteContract.methods.vote, accept, index, amount);
    };

    context.performRedeem = async function performRedeem() {
        await window.blockchainCall(context.view.state.voteContract.methods.redeemVotingTokens, window.walletAddress);
    };
};