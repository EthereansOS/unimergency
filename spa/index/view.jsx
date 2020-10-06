var Index = React.createClass({
    requiredModules: [
        "spa/proposal"
    ],
    requiredScripts: [
        'spa/bigLoader.jsx'
    ],
    getInitialState() {
        return {
            element: "Proposal"
        };
    },
    onClick(e) {
        e && e.preventDefault && e.preventDefault(true) && e.stopPropagation && e.stopPropagation(true);
        this.changeView(e.currentTarget.innerHTML);
    },
    changeView(element) {
        var _this = this;
        this.domRoot.children().find('a').removeClass("selected").each((i, it) => {
            if(it.innerHTML.toLowerCase() === element.toLowerCase()) {
                return $(it).addClass('selected');
            }
        });
        ReactModuleLoader.load({
            modules : [
                'spa/' + element.toLowerCase()
            ],
            callback: function() {
                _this.setState({element});
            }
        });
    },
    componentDidMount() {
        window.addressBarParams.addr && window.addressBarParams.id && this.changeView('Vote');
    },
    render() {
        return (
            <section className="OnePage">
                <header className="Head">
                    <section className="HBrand">
                        <h6><img src="assets/img/vampire1.gif"></img></h6>
                    </section>
                    <section className="HActions">
                        <a href="https://discord.gg/FPcZpxB" target="_Blank">#AMA</a>
                        <a href="https://github.com/b-u-i-d-l/unimergency" target="_Blank">#github</a>
                        <a href={window.getNetworkElement("etherscanURL") + "address/" + window.getNetworkElement("contestV2Address")} target="_Blank">#etherscan</a>
                    </section>
                </header>
                <section className="PagerMenu">
                    <ul className="Menu">
                        <a href="javascript:;" className="MInfoSelector selected" onClick={this.onClick}>Proposal</a>
                        <a href="javascript:;" className="MInfoSelector" onClick={this.onClick}>Vote</a>
                        
                    </ul>
                </section>
                <section className="ActionSection">
                    {React.createElement(window[this.state.element])}
                </section>
            </section>
        );
    }
});