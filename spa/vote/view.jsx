var Vote = React.createClass({
    requiredScripts: [
        'spa/bigLoader.jsx',
        'spa/ghostLoader.jsx'
    ],
    getDefaultSubscriptions() {
        return {
            'ethereum/update': () => this.controller.loadData()
        };
    },
    componentDidMount() {
        this.controller.loadData();
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
                !message && _this.controller.loadTokenData();
            });
        }
        _this.setState({ performing: action }, function () {
            _this.controller['perform' + action.firstLetterToUpperCase()].apply(this, args).catch(close).finally(close);
        });
    },
    max(e) {
        e && e.preventDefault && e.preventDefault(true) && e.stopPropagation && e.stopPropagation(true);
        this.input.value = window.fromDecimals(this.state.balanceOf, this.state.selectedToken.decimals, true);
    },
    onVotingToken(e) {
        this.setState({selectedToken : this.state.votingTokens[e.currentTarget.value]}, this.controller.loadTokenData);
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
                {this.state && <section>
                    <section className="Status">
                        <h5>Before to vote be sure to have read carefully the Proposal section</h5>
                        {!this.state.started && <h2>
                            The survey will start at block <a target="_blank" href={window.getNetworkElement("etherscanURL") + "block/" + this.state.startBlock}>#{this.state.startBlock}</a>
                        </h2>}
                        {this.state.terminated && <h2>
                            The survey has been terminated at block <a target="_blank" href={window.getNetworkElement("etherscanURL") + "block/" + this.state.endBlock}>#{this.state.endBlock}</a>
                        </h2>}
                        {this.state.running && <h2>
                            End Block: <a target="_blank" href={window.getNetworkElement("etherscanURL") + "block/" + this.state.endBlock}>#{this.state.endBlock}</a>
                        </h2>}
                        {this.state.started && <section className="YOURVOTE">
                            <h3>Status:</h3>
                            <h4>{window.fromDecimals(this.state.votes[0], 18)} Accept</h4>
                            <h4>{window.fromDecimals(this.state.votes[1], 18)} Refuse</h4>
                        </section>}
                    </section>
                    {this.state.started && <section className="Actions YOURVOTE">
                        {this.state.running && <section className="Input">
                            <a href="javascript:;" onClick={this.max}>Max</a>
                            <input type="text" ref={ref => this.input = ref} />
                            <select onChange={this.onVotingToken}>
                                {this.state.votingTokens.map((it, i) => <option key={it.address} value={i} selected={_this.state.selectedToken.address === it.address}>
                                    {it.name} ({it.symbol})
                                </option>)}
                            </select>
                            <span>Balance: {window.fromDecimals(this.state.balanceOf, this.state.selectedToken.decimals)} {this.state.selectedToken.symbol}</span>
                        </section>}
                        {this.state.running && window.walletAddress && <section className="Buttons">
                            {this.state.performing !== 'approve' && <a className={"APPROVEBTN" + (this.state.approved ? " Disabled" : "")} href="javascript:;" data-action="approve" onClick={this.perform}>Approve {this.state.selectedToken.symbol}</a>}
                            {this.state.performing === 'approve' && <GhostLoader />}
                            {this.state.performing !== 'accept' && <a className={"VTNBTN" + (!this.state.approved || this.state.performing ? " Disabled" : "")} href="javascript:;" data-action="accept" onClick={this.perform}>Accept</a>}
                            {this.state.performing === 'accept' && <GhostLoader />}
                            {this.state.performing !== 'refuse' && <a className={"VTNBTN" + (!this.state.approved || this.state.performing ? " Disabled" : "")} href="javascript:;" data-action="refuse" onClick={this.perform}>Refuse</a>}
                            {this.state.performing === 'refuse' && <GhostLoader />}
                        </section>}
                        {!window.walletAddress && <section className="Buttons">
                            <a className="" href="javascript:;" onClick={() => window.ethereum.enable().then(this.controller.loadData)}>Connect</a>
                        </section>}
                    </section>}
                    {window.walletAddress && <section className="YOURVOTE">
                        <h5>Your Votes:</h5>
                        <h6>{window.fromDecimals(this.state.myVotes.accepts.reduce((a, b) => parseInt(a) + parseInt(b)), 18)} Accept</h6>
                        <h6>{window.fromDecimals(this.state.myVotes.refuses.reduce((a, b) => parseInt(a) + parseInt(b)), 18)} Refuse</h6>
                        <p>10 BUIDL</p>
                        <p>100 UniFi</p>
                        <p>10000 ARTE</p>
                        <p>You'll be able to redeem your tokens here at <a target="_blank" href={window.getNetworkElement("etherscanURL") + "block/" + this.state.endBlock}>the end of the Proposal</a></p>
                        {this.state.terminated && !this.state.redeemed && <section className="Buttons">
                            {this.state.performing !== 'redeem' && <a className={"" + (this.state.performing ? " Disabled" : "")} href="javascript:;" data-action="redeem" onClick={this.perform}>Redeem</a>}
                            {this.state.performing === 'redeem' && <GhostLoader />}
                        </section>}
                    </section>}
                </section>}
                {!this.state && <BigLoader message=""/>}
            </section>
        </section>);
    }
});