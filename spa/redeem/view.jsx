var Redeem = React.createClass({
    requiredScripts: [
        'spa/bigLoader.jsx'
    ],
    requiredModules : [
        'spa/stakingElement'
    ],
    componentDidMount() {
        this.controller.loadData();
    },
    onClick(e) {
        e && e.preventDefault && e.preventDefault(true) && e.stopPropagation && e.stopPropagation(true);
        this.setState({key : e.currentTarget.dataset.key});
    },
    getDefaultSubscriptions() {
        return {
            "key/set" : key => this.setState({key})
        }
    },
    render() {
        var _this = this;
        return(<section className="walletlist">
            {this.state && this.state.uniqueAddresses && !this.state.key && <section>
                <h1>Total Liquidity Mining Stkers Unique Addresses to redeem: {Object.keys(this.state.uniqueAddresses).length}</h1>
                <ul>
                    {Object.keys(this.state.uniqueAddresses).map(uniqueAddress => <li key={uniqueAddress}>
                        <span><a href="javascript:;" onClick={this.onClick} data-key={uniqueAddress}>{uniqueAddress}</a>&#9989;</span>
                    </li>)}
                </ul>
                <br/>
                <br/>
            </section>}
            {this.state && this.state.key && <StakingElement tokens={this.state.tokens} element={this.state.uniqueAddresses[this.state.key]} onClose={() => _this.setState({key : null})}/>}
            {(!this.state || !this.state.uniqueAddresses) && <BigLoader/>}
        </section>);
    }
});