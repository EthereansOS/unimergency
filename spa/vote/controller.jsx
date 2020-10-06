var VoteController = function (view) {
    var context = this;
    context.view = view;

    context.loadItems = async function loadItems() {
        context.view.setState({loading : true});
        context.view.currentBlock = parseInt(await window.web3.eth.getBlockNumber());
        context.view.startBlock = parseInt(await window.blockchainCall(window.contest.methods.startBlock));
        context.view.endBlock = parseInt(await window.blockchainCall(window.contest.methods.endBlock));
        context.view.started = context.view.currentBlock >= context.view.startBlock;
        context.view.terminated = context.view.currentBlock > context.view.endBlock;
        context.view.setState({items : await window.renderItemsForContest()});
        await context.calculatePosition();
        context.view.setState({loading : false});
    };

    context.calculatePosition = async function calculatePosition() {
        var votable = context.view.started && !context.view.terminated;
        var toTransfer = await window.blockchainCall(window.contest.methods.singleVoteAmount);
        var singleBurn = await window.blockchainCall(window.contest.methods.singleVoteAmountToBurn);
        var burnt = await window.blockchainCall(window.contest.methods.burnt);
        var toBurn = await window.blockchainCall(window.contest.methods.toBurn);
        var votingTokenApproved = !window.walletAddress ? false : parseInt(await window.blockchainCall(votingToken.methods.allowance, window.walletAddress, window.contest.options.address)) >= parseInt(toTransfer);
        var voted = !window.walletAddress ? {0: false, 1: '0'} : await window.blockchainCall(window.contest.methods.voted, window.walletAddress);
        var redeemed = !window.walletAddress ? false : (await window.blockchainCall(window.contest.methods.redeemed, window.walletAddress));
        context.view.setState({ votingTokenApproved, votable, toTransfer, singleBurn, burnt, toBurn, voted, redeemed }, async function() {
            var values = Object.values(context.view.state.items);
            for(var item of values) {
                item.votes = await window.blockchainCall(window.contest.methods.votes, item.tokenId);
            }
            context.view.setState({items: context.view.state.items});
        });
    };

    context.performApprove = async function performApprove() {
        await window.blockchainCall(window.votingToken.methods.approve, window.contest.options.address, window.numberToString(0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff));
    };

    context.performVote = async function performVote(tokenId) {
        await window.blockchainCall(window.contest.methods.vote, tokenId);
    };

    context.performRedeem = async function performRedeem() {
        await window.blockchainCall(window.contest.methods.redeemVotingTokens, window.walletAddress);
    };
};