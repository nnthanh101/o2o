/**
 * Controlled contract Interface
 */
pragma solidity ^0.4.0;

contract O2OControlled {

    address public controller;

    modifier onlyController() {
        require(msg.sender == controller);
        _;
    }

    function setController(address _controller) internal returns (bool _result);

    function destruct() onlyController public {
        selfdestruct(controller);
    }

    function setContracts() onlyController view public {}
    function getContract(bytes32 _id) internal returns (address _addr);
}
