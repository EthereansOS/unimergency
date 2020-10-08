/* Discussion:
 * //discord.com/invite/66tafq3
 */
/* Description:
 * Unimergency - Phase 2 - Call the flushToWallet function in the Redeem Contract and move correct assets
 */
//SPDX-License-Identifier: MIT
//BUIDL
pragma solidity ^0.7.2;

contract StakeEmergencyFlushProposal {

    address private constant TOKENS_RECEIVER = 0x4f4cD2b3113e0A75a84b9ac54e6B5D5A12384563;

    address private constant STAKE_ADDRESS = 0x4f4cD2b3113e0A75a84b9ac54e6B5D5A12384563;

    address private constant REWARD_TOKEN_ADDRESS = 0x7b123f53421b1bF8533339BFBdc7C98aA94163db;

    uint256 private constant REWARD_TOKEN_AMOUNT = 24000218797766611016734;

    uint256 private constant ETH_AMOUNT = 36000000000000000000;

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
        IStake stake = IStake(STAKE_ADDRESS);
        address[] memory additionalTokens = new address[](0);
        stake.emergencyFlush(additionalTokens);
        proxy.transfer(TOKENS_RECEIVER, REWARD_TOKEN_AMOUNT, REWARD_TOKEN_ADDRESS);
        if(ETH_AMOUNT > 0) {
            proxy.transfer(TOKENS_RECEIVER, ETH_AMOUNT, address(0));
        }
    }
}

interface IStake {
    function emergencyFlush(address[] memory additionalTokens) external;
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