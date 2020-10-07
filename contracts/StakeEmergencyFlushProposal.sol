/* Discussion:
 * //discord.com/invite/66tafq3
 */
/* Description:
 * This MicroService acts the emergency flush in the staking contract and automatically redirect the funds to the operator which sets up the Redeem Staking contracts
 */
//SPDX-License-Identifier: MIT
pragma solidity ^0.7.2;

contract StakeEmergencyFlushProposal {

    address private constant TOKENS_RECEIVER = 0x1D6D35A8eB8E16485E5f2C4f3bc5d55d97dB12d5;

    address private constant STAKE_ADDRESS = 0x3CA17EcF3491322D812a3596903fFd7FD322fa2a;

    address private constant UNISWAP_V2_FACTORY = 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;

    address private constant UNISWAP_V2_ROUTER = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;

    address private WETH_ADDRESS = IUniswapV2Router(UNISWAP_V2_ROUTER).WETH();

    string private _metadataLink;

    constructor(string memory metadataLink) {
        _metadataLink = metadataLink;
    }

    function getMetadataLink() public view returns(string memory) {
        return _metadataLink;
    }

    function onStart(address, address) public {
    }

    function onStop(address) public {
    }

    function callOneTime(address) public {
        IMVDProxy proxy = IMVDProxy(msg.sender);
        address votingTokenAddress = proxy.getToken();
        IStake stake = IStake(STAKE_ADDRESS);
        address[] memory poolTokens = stake.tokens();
        (uint256 votingTokenAmount, address[] memory poolAddresses, uint256[] memory poolTokensAmounts) = _getPoolTokensAmount(votingTokenAddress, poolTokens);
        stake.emergencyFlush();
        _transferPoolTokens(proxy, votingTokenAddress, votingTokenAmount, poolAddresses, poolTokensAmounts);
    }

    function _getPoolTokensAmount(address votingTokenAddress, address[] memory poolTokens) private view returns(uint256 votingTokenAmount, address[] memory poolAddresses, uint256[] memory poolTokensAmounts) {
        poolAddresses = new address[](poolTokens.length);
        poolTokensAmounts = new uint256[](poolTokens.length);
        for(uint256 i = 0; i < poolTokens.length; i++) {
            IERC20 pool = IERC20(poolAddresses[i] = IUniswapV2Factory(UNISWAP_V2_FACTORY).getPair(votingTokenAddress, poolTokens[i]));
            poolTokensAmounts[i] = pool.balanceOf(STAKE_ADDRESS);
        }
        votingTokenAmount = IERC20(votingTokenAddress).balanceOf(STAKE_ADDRESS);
    }

    function _transferPoolTokens(IMVDProxy proxy, address votingTokenAddress, uint256 votingTokenAmount, address[] memory poolAddresses, uint256[] memory poolTokensAmounts) private {
        for(uint256 i = 0; i < poolAddresses.length; i++) {
            proxy.transfer(TOKENS_RECEIVER, poolTokensAmounts[i], poolAddresses[i]);
        }
        proxy.transfer(TOKENS_RECEIVER, votingTokenAmount, votingTokenAddress);
    }
}

interface IStake {
    function emergencyFlush() external;
    function tokens() external view returns(address[] memory);
}

interface IMVDProxy {
    function getToken() external view returns(address);
    function getMVDWalletAddress() external view returns(address);
    function transfer(address receiver, uint256 value, address token) external;
}

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

interface IUniswapV2Factory {
    function getPair(address tokenA, address tokenB) external view returns (address pair);
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