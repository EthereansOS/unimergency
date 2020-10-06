//SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import "./IStake.sol";

contract StakeRedeemer {

    address private constant UNISWAP_V2_ROUTER = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;

    address private WETH_ADDRESS = IUniswapV2Router(UNISWAP_V2_ROUTER).WETH();

    address private _owner;

    address private _doubleProxy;

    address[] private _tokens;

    mapping(address => bool) private _redeemed;

    mapping(address => mapping(address => uint256)) private _positions;

    event Redeemed(address indexed sender, address indexed positionOwner);

    constructor(address doubleProxy, address[] memory tokens) {
        _owner = msg.sender;
        _doubleProxy = doubleProxy;
        _tokens = tokens;
    }

    function owner() public view returns (address) {
        return _owner;
    }

    function renounceOwnership() public {
        require(msg.sender == _owner, "Unauthorized Action");
        _owner = address(0);
    }

    function fillData(address[] memory positionOwners, uint256[] memory token0Amounts, uint256[] memory token1Amounts, uint256[] memory token2Amounts, uint256[] memory token3Amounts, uint256[] memory token4Amounts, uint256[] memory token5Amounts) public {
        require(msg.sender == _owner, "Unauthorized Action");
        assert(positionOwners.length == token0Amounts.length && token0Amounts.length == token1Amounts.length && token1Amounts.length == token2Amounts.length && token2Amounts.length == token3Amounts.length && token3Amounts.length == token4Amounts.length && token4Amounts.length == token5Amounts.length);
        for(uint256 i = 0; i < positionOwners.length; i++) {
            _positions[positionOwners[i]][_tokens[0]] = token0Amounts[i];
            _positions[positionOwners[i]][_tokens[1]] = token1Amounts[i];
            _positions[positionOwners[i]][_tokens[2]] = token2Amounts[i];
            _positions[positionOwners[i]][_tokens[3]] = token3Amounts[i];
            _positions[positionOwners[i]][_tokens[4]] = token4Amounts[i];
            _positions[positionOwners[i]][_tokens[5]] = token5Amounts[i];
        }
    }

    function emergencyFlush() public {
        IMVDProxy proxy = IMVDProxy(IDoubleProxy(_doubleProxy).proxy());
        require(IMVDFunctionalitiesManager(proxy.getMVDFunctionalitiesManagerAddress()).isAuthorizedFunctionality(msg.sender), "Unauthorized Action!");
        address walletAddress = proxy.getMVDWalletAddress();
        address tokenAddress = proxy.getToken();
        IERC20 token = IERC20(tokenAddress);
        uint256 balanceOf = token.balanceOf(address(this));
        if(balanceOf > 0) {
            token.transfer(walletAddress, balanceOf);
        }
        balanceOf = 0;
        for(uint256 i = 0; i < _tokens.length; i++) {
            token = IERC20(_tokens[i]);
            balanceOf = token.balanceOf(address(this));
            if(balanceOf > 0) {
                token.transfer(walletAddress, balanceOf);
            }
            balanceOf = 0;
        }
        balanceOf = address(this).balance;
        if(balanceOf > 0) {
            payable(walletAddress).transfer(balanceOf);
        }
    }

    function doubleProxy() public view returns(address) {
        return _doubleProxy;
    }

    function tokens() public view returns(address[] memory) {
        return _tokens;
    }

    function setDoubleProxy(address newDoubleProxy) public {
        require(IMVDFunctionalitiesManager(IMVDProxy(IDoubleProxy(_doubleProxy).proxy()).getMVDFunctionalitiesManagerAddress()).isAuthorizedFunctionality(msg.sender), "Unauthorized Action!");
        _doubleProxy = newDoubleProxy;
    }

    function position(address positionOwner) public view returns (uint256[] memory amounts){
        amounts = new uint256[](_tokens.length);
        for(uint256 i = 0; i < _tokens.length; i++) {
            amounts[i] = _positions[positionOwner][_tokens[i]];
        }
    }

    function redeemed(address positionOwner) public view returns(bool) {
        return _redeemed[positionOwner];
    }

    receive() external payable {
    }

    function redeem() public {
        address positionOwner = msg.sender;
        require(!_redeemed[positionOwner], "This position owner already redeemed its position");
        _redeemed[positionOwner] = true;
        for(uint256 i = 0; i < _tokens.length; i++) {
            if(_tokens[i] == WETH_ADDRESS) {
                payable(positionOwner).transfer(_positions[positionOwner][_tokens[i]]);
                continue;
            }
            IERC20(_tokens[i]).transfer(positionOwner, _positions[positionOwner][_tokens[i]]);
        }
        emit Redeemed(msg.sender, positionOwner);
    }
}