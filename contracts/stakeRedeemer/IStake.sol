pragma solidity ^0.7.0;

interface IStake {

    address private constant UNISWAP_V2_FACTORY = 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;

    address private constant UNISWAP_V2_ROUTER = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;

    address private WETH_ADDRESS = IUniswapV2Router(UNISWAP_V2_ROUTER).WETH();

    function doubleProxy() external view returns(address);

    function tokens() external view returns(address[] memory);

    function tierData() external view returns(uint256[] memory, uint256[] memory, uint256[] memory, uint256[] memory);

    function startBlock() external view returns(uint256);

    function totalPoolAmount(uint256 poolPosition) external view returns(uint256);

    function setDoubleProxy(address newDoubleProxy) external;

    function emergencyFlush() external;

    function stake(uint256 tier, uint256 poolPosition, uint256 originalFirstAmount, uint256 firstAmountMin, uint256 value, uint256 secondAmountMin) external payable;

    function getStakingInfo(uint256 tier) external view returns(uint256 minCap, uint256 hardCap, uint256 remainingToStake);

    function getStakingCap(uint256 tier) external view returns(uint256, uint256);

    function length(uint256 tier) external view returns(uint256);

    function stakeInfo(uint256 tier, uint256 position) external view returns(
        address sender,
        uint256 poolPosition,
        uint256 firstAmount,
        uint256 secondAmount,
        uint256 poolAmount,
        uint256 reward,
        uint256 endBlock,
        uint256[] memory partialRewardBlockTimes,
        uint256 splittedReward
    );

    function partialReward(uint256 tier, uint256 position) external;

    function withdraw(uint256 tier, uint256 position) external;
}

interface IMVDProxy {
    function getToken() external view returns(address);
    function getStateHolderAddress() external view returns(address);
    function getMVDWalletAddress() external view returns(address);
    function getMVDFunctionalitiesManagerAddress() external view returns(address);
    function submit(string calldata codeName, bytes calldata data) external payable returns(bytes memory returnData);
}

interface IStateHolder {
    function setUint256(string calldata name, uint256 value) external returns(uint256);
    function getUint256(string calldata name) external view returns(uint256);
    function getBool(string calldata varName) external view returns (bool);
    function clear(string calldata varName) external returns(string memory oldDataType, bytes memory oldVal);
}

interface IMVDFunctionalitiesManager {
    function isAuthorizedFunctionality(address functionality) external view returns(bool);
}

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

interface IUniswapV2Router {

    function WETH() external pure returns (address);

    function addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) external returns (uint amountA, uint amountB, uint liquidity);

    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external payable returns (uint amountToken, uint amountETH, uint liquidity);
}

interface IUniswapV2Factory {
    function getPair(address tokenA, address tokenB) external view returns (address pair);
}

interface IDoubleProxy {
    function proxy() external view returns(address);
}