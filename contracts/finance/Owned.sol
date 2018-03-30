/**
 * @description	Owned pattern
 */

pragma solidity ^0.4.0;

/**
 * @title Ownable
 * @dev The Ownable contract has an owner address, and provides basic authorization control
 * functions, this simplifies the implementation of "user permissions".
 */
contract Owned {

    address public owner;

    /**
     * @dev The Owned constructor sets the original `owner` of the contract to the sender
     * account.
     */
    function Owned() public {
        owner = msg.sender;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(owner == msg.sender);
        _;
    }
}
