var StakingElementController = function (view) {
    var context = this;
    context.view = view;

    context.loadData = function loadData(view) {
        window.loadStakingElement(view);
    };

    context.performRedeem = async function performRedeem(view) {
        if(await window.blockchainCall(window.liquidityMiningRedeemContract.methods.redeemed, view.props.element.address)) {
            throw "This position has been already redeemed";
        }
        if(await window.blockchainCall(window.liquidityMiningRedeemContract.methods.initializer) !== window.voidEthereumAddress) {
            throw "Redeem has not been initialized yet"
        }
        await window.blockchainCall(window.liquidityMiningRedeemContract.methods.redeem);
    }
};