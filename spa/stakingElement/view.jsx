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
                <a className="FFFFFFFFF" target="_blank" href={"https://etherscan.io/address/" + this.props.element.address}>{this.props.element.address}</a>
                {(!this.state || !this.state.data) && <BigLoader/>}
                {this.state && this.state.data && <section>
                    <ul className="DFOCONTRACT">
                        {Object.keys(this.state.data).filter(it => it.indexOf("0x") === 0).map(key => <li key={key}>
                            <h2>&#9935; By {_this.state.data[key].contractData.name} Liquidity Mining &#9935;</h2>
                            <ul className="YOURVOTE">
                                {Object.keys(_this.state.data[key]).filter(it => !isNaN(parseInt(it))).map(it => <li key={it}>
                                    <h1>Pair {_this.state.data[key][it].token0.symbol} - {_this.state.data[key][it].token1.symbol}</h1>
                                    <div><h4>Total <b>{_this.state.data[key][it].token0.symbol}</b> from all of the locked positions:</h4> <p>{window.fromDecimals(_this.state.data[key][it].totalToken0Amount, _this.state.data[key][it].token0.decimals)}</p></div>
                                    <div><h4>Total <b>{_this.state.data[key][it].token1.symbol}</b> from all of the locked positions:</h4> <p>{window.fromDecimals(_this.state.data[key][it].totalToken1Amount, _this.state.data[key][it].token1.decimals)}</p></div>
                                    <div><h3>Assets owned by this wallet: </h3></div>
                                    <div><h4 className="YYYYY">This wallet owns <b>{_this.state.data[key][it].elements.length}</b> Liquidity Mining Position{_this.state.data[key][it].elements.length > 1 ? "s" : ""}, which correspond to the <b>{_this.state.data[key][it].poolPercentageString} </b> of the entire Liquidity Mining Contract</h4></div>
                                    <div><h4 className="YYYYY"><p>{window.fromDecimals(_this.state.data[key][it].token0Amount, _this.state.data[key][it].token0.decimals)} {_this.state.data[key][it].token0.symbol}</p></h4></div>
                                    <div><h4 className="YYYYY"><p>{window.fromDecimals(_this.state.data[key][it].token1Amount, _this.state.data[key][it].token1.decimals)} {_this.state.data[key][it].token1.symbol}</p></h4></div>
                                    <div><h3>+ Accumuled Mining Reward:</h3></div>
                                    <div><h4 className="YYYYY"><p>{window.fromDecimals(_this.state.data[key][it].partialReward, _this.state.data[key].contractData.token.decimals)} {_this.state.data[key].contractData.token.symbol}</p></h4></div>
                                </li>)}
                            </ul>
                        </li>)}
                    </ul>
                    <section className="DFOCONTRACT">
                        <h2>&#10024; Bonus &#10024;</h2>
                        <ul className="YOURVOTE YOURVOTEX">
                            {window.getNetworkElement("gifts").map(it => <li key={it.address}>
                                <section>
                                    <div><h4><b>+</b> a fixed bonus of <p>{window.fromDecimals(it.amount, _this.props.tokens[it.address].decimals)} {_this.props.tokens[it.address].symbol}</p></h4></div>
                                </section>
                            </li>)}
                        </ul>
                    </section>
                    <br/>
                    <br/>
                    {this.state.data.tokens && <section className="DFOCONTRACT DFOCONTRACTRRRR">
                        <h2>&#127752; Total withdrawable by this wallet: &#127752;</h2>
                        <ul className="YOURVOTE">
                            {this.state.data.tokens.filter(it => it.amount !== '0').map(it => <li key={it.token.address}>
                                <section>
                                <h4 className="YYYYY"><p>{window.fromDecimals(it.amount, it.token.decimals)} {it.token.symbol}</p></h4>
                                </section>
                            </li>)}
                            {<section>
                                    {this.state.performing !== 'redeem' && <a className="GIVEMEMYMONEYBRO" href="javascript:;" data-action="redeem" onClick={this.perform}>Redeem</a>}
                                    {this.state.performing === 'redeem' && <GhostLoader />}
                            </section>}
                        </ul>
                    </section>}
                    
                </section>}
        </section>);
    }
});