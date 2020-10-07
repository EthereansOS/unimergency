var StakingElement = React.createClass({
    requiredScripts: [
        'spa/bigLoader.jsx',
        'spa/ghostLoader.jsx'
    ],
    getDefaultSubscriptions() {
        return {
            "ethereum/ping": () => this.controller.loadData(this)
        }
    },
    componentDidMount() {
        this.controller.loadData(this);
    },
    perform(e) {
        e && e.preventDefault && e.preventDefault(true) && e.stopPropagation && e.stopPropagation(true);
        var target = e.currentTarget;
        if ((this.state && this.state.performing) || target.className.indexOf('Disabled') !== -1) {
            return;
        }
        var action = target.dataset.action;
        var args = [this];
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
                !message && _this.controller.loadData(_this);
            });
        }
        _this.setState({ performing: action }, function () {
            _this.controller['perform' + action.firstLetterToUpperCase()].apply(this, args).catch(close).finally(close);
        });
    },
    render() {
        var _this = this;
        return (<section>
                <a href="javascript:;" className="returnbackbrah" onClick={this.props.onClose}>⬅️ All</a>
                <h3></h3>
                <a target="_blank" href={"https://etherscan.io/address/" + this.props.element.address}>{this.props.element.address}</a>
                {(!this.state || !this.state.data) && <BigLoader/>}
                {this.state && this.state.data && <section>
                    <ul className="YOURVOTE">
                        {Object.keys(this.state.data).filter(it => it.indexOf("0x") === 0).map(key => <li key={key}>
                            <h2>{_this.state.data[key].contractData.name} Liquidity Mining Contract</h2>
                            <ul>
                                {Object.keys(_this.state.data[key]).filter(it => !isNaN(parseInt(it))).map(it => <li key={it}>
                                    <h3>Pool {_this.state.data[key][it].token0.symbol} - {_this.state.data[key][it].token1.symbol}</h3>
                                    <div>Total {_this.state.data[key][it].token0.symbol} extracted from the pool: {window.fromDecimals(_this.state.data[key][it].totalToken0Amount, _this.state.data[key][it].token0.decimals)}</div>
                                    <div>Total {_this.state.data[key][it].token1.symbol} extracted from the pool: {window.fromDecimals(_this.state.data[key][it].totalToken1Amount, _this.state.data[key][it].token1.decimals)}</div>
                                    <div>You have {_this.state.data[key][it].elements.length} staking position{_this.state.data[key][it].elements.length > 1 ? "s" : ""}, corresponding to {_this.state.data[key][it].poolPercentageString} of the total held by the Contract</div>
                                    <div>So you will receive: </div>
                                    <div>{window.fromDecimals(_this.state.data[key][it].token0Amount, _this.state.data[key][it].token0.decimals)} {_this.state.data[key][it].token0.symbol}</div>
                                    <div>{window.fromDecimals(_this.state.data[key][it].token1Amount, _this.state.data[key][it].token1.decimals)} {_this.state.data[key][it].token1.symbol}</div>
                                    <div>And a reward of:</div>
                                    <div>{window.fromDecimals(_this.state.data[key][it].partialReward, _this.state.data[key].contractData.token.decimals)} {_this.state.data[key].contractData.token.symbol}</div>
                                    <br/>
                                    <br/>
                                </li>)}
                            </ul>
                            <br/>
                            <br/>
                        </li>)}
                    </ul>
                    <section>
                        The DFOhub team will also give you:
                        <ul>
                            {window.getNetworkElement("gifts").map(it => <li key={it.address}>
                                <section>
                                    <div>A gift of {window.fromDecimals(it.amount, _this.props.tokens[it.address].decimals)} {_this.props.tokens[it.address].symbol}</div>
                                </section>
                            </li>)}
                        </ul>
                    </section>
                    <br/>
                    <br/>
                    {this.state.data.tokens && <section>
                        So, you will totally receive:
                        <ul>
                            {this.state.data.tokens.filter(it => it.amount !== '0').map(it => <li key={it.token.address}>
                                <section>
                                    {window.fromDecimals(it.amount, it.token.decimals)} {it.token.symbol}
                                </section>
                            </li>)}
                        </ul>
                    </section>}
                    {this.state.data.finalized && !this.state.data.redeemed && window.walletAddress === this.state.data.address && <section>
                        {this.state.performing !== 'redeem' && <a href="javascript:;" data-action="redeem" onClick={this.perform}>Redeem</a>}
                        {this.state.performing === 'redeem' && <GhostLoader />}
                    </section>}
                </section>}
        </section>);
    }
});