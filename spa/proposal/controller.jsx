var ProposalController = function (view) {
    var context = this;
    context.view = view;

    context.loadData = async function loadData() {
        if(!window.ethereum) {
            return;
        }
        var voteContract = window.newContract(window.context.QuickscopeVoteABI, window.getNetworkElement("quickscopeVoteAddress"));
        var votes = await window.blockchainCall(voteContract.methods.votes);
        var myVotes = {
            accepts : [],
            refuses : []
        };
        var redeemed = false;
        var voted = false;
        if(window.walletAddress) {
            myVotes = await window.blockchainCall(voteContract.methods.votes, window.walletAddress);
            myVotes.accepts = myVotes[0];
            myVotes.refuses = myVotes[1];
            redeemed = await window.blockchainCall(voteContract.methods.redeemed, window.walletAddress);
            voted = myVotes.accepts.reduce((a,b) => parseInt(a) + parseInt(b)) + myVotes.refuses.reduce((a,b) => parseInt(a) + parseInt(b)) > 0;
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
            voted,
            selectedToken
        });
    };

    context.performRedeem = async function performRedeem() {
        await window.blockchainCall(context.view.state.voteContract.methods.redeemVotingTokens, window.walletAddress);
    };
};