var Vote = React.createClass({
    requiredModules: [
        "spa/voting"
    ],
    requiredScripts: [
        'spa/bigLoader.jsx',
        'spa/ghostLoader.jsx'
    ],
    getDefaultSubscriptions() {
        return {
            'ethereum/update': () => this.controller.loadItems(),
            'ethereum/ping': () => this.controller.calculatePosition()
        };
    },
    componentDidMount() {
        this.controller.loadItems();
    },
    renderItemsList() {
        var items = Object.values(this.state.items);
        var sum = 0;
        items.forEach(it => sum += parseInt(it.votes));
        var field = sum > 0 ? 'votes' : 'tokenId'
        var compare = function compare(a, b) {
            if (parseInt(a[field]) < parseInt(b[field])) {
                return 1;
            }
            if (parseInt(a[field]) > parseInt(b[field])) {
                return -1;
            }
            return 0;
        };
        return items.sort(compare);
    },
    perform(e) {
        e && e.preventDefault && e.preventDefault(true) && e.stopPropagation && e.stopPropagation(true);
        var target = e.currentTarget;
        if ((this.state && this.state.performing) || target.className.indexOf('Disabled') !== -1) {
            return;
        }
        var action = target.dataset.action;
        var args = [];
        for (var i = 1; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        var _this = this;
        var close = function close(e) {
            var message = e && (e.message || e);
            _this.setState({ performing: null }, function () {
                message && message.indexOf('denied') === -1 && setTimeout(function () {
                    alert(message);
                });
                !message && _this.controller.calculatePosition();
            });
        }
        _this.setState({ performing: (action + '_' + target.dataset.tokenid) }, function () {
            _this.controller['perform' + action.firstLetterToUpperCase()].apply(this, args).catch(close).finally(close);
        });
    },
    render() {
        var _this = this;
        var props = {};
        this.props && Object.entries(this.props).forEach(entry => props[entry[0]] = entry[1]);
        this.state && Object.entries(this.state).forEach(entry => props[entry[0]] = entry[1]);
        props.props && Object.entries(props.props).forEach(entry => props[entry[0]] = entry[1]);
        delete props.props;
        return (<section>
            <section className="LEADERSFINALAll">
                <ul start="1" className="LEADERSFINAL">
                    {this.state && this.state.items && this.renderItemsList().map(it => <li key={it.key}>
                        <section className="ObjectRender">
                            <a>{it.name}</a>
                            <iframe src={it.external_url} className="PDFVIEW">
                            </iframe>
                        </section>
                        <section className="BigPIPI">
                            <b>{it.votes}</b>
                            <p className="BigPIPIVote">Votes</p>
                            <h6>1 Vote = {window.formatMoney(window.fromDecimals(props.toTransfer, window.votingTokenDecimals))} {window.votingTokenSymbol}</h6>
                            <h6>Vote Tax = {window.formatMoney(window.fromDecimals(props.singleBurn, window.votingTokenDecimals))} {window.votingTokenSymbol}</h6>
                            {props.votable && props.voted && !props.voted[0] && props.performing !== ('approve_' + it.tokenId) && <a href="javascript:;" onClick={this.perform} data-action="approve" data-tokenId={it.tokenId} className={"ApproveBTN" + (props.performing || props.votingTokenApproved ? " Disabled" : "")}>Approve {window.votingTokenSymbol}</a>}
                            {props.performing === ('approve_' + it.tokenId) && <GhostLoader/>}
                            {props.votable && props.voted && !props.voted[0] && props.performing !== ('vote_' + it.tokenId) && <a href="javascript:;" onClick={e => this.perform(e, it.tokenId)} data-action="vote" data-tokenId={it.tokenId} className={"VoteBTN" + (props.performing || !props.votingTokenApproved || props.voted[0] ? " Disabled" : "")}>Vote</a>}
                            {props.performing === ('vote_' + it.tokenId) && <GhostLoader/>}
                            {props.voted && props.voted[0] && props.voted[1] === it.tokenId && !props.redeemed && props.performing !== ('redeem_' + it.tokenId) && <a href="javascript:;" onClick={this.perform} data-action="redeem" data-tokenId={it.tokenId} className={"VoteBTN" + (props.performing ? " Disabled" : "")}>Redeem</a>}
                            {props.performing === ('redeem_' + it.tokenId) && <GhostLoader/>}
                            {!_this.started && <h4>
                                Contest will start at block <a target="_blank" href={window.getNetworkElement("etherscanURL") + "block/countdown/" + this.startBlock}>#{this.startBlock}</a>
                            </h4>}
                            {_this.started && !window.walletAddress && <a href="javascript:;" onClick={() => window.ethereum.enable()}>Connect</a>}
                            <p>Voting in the brand contest is an irreversible action, do it at your own risk. Every time you vote you burn a tax of {window.formatMoney(window.fromDecimals(props.singleBurn, window.votingTokenDecimals))} {window.votingTokenSymbol}. Once you have voted you wouldn't be able to redeem your {window.votingTokenSymbol} until the block <a target="_blank" href={window.getNetworkElement("etherscanURL") + "block/countdown/" + this.endBlock}>#{this.endBlock}</a> <a href="https://github.com/b-u-i-d-l/brand-contest" target="_blank">More info</a></p>
                        </section>
                    </li>)}
                </ul>
                {!this.state || this.state.loading && <BigLoader message="" />}
            </section>
        </section>);
    }
});