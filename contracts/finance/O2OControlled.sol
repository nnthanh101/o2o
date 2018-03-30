/**
 * Controlled contract Interface
 */
pragma solidity ^0.4.0;

import "./O2OController.sol";

contract O2OControlled {

    address public controller;
    O2OController O2O_C;

    modifier onlyController() {
        require(msg.sender == controller);
        _;
    }

    function setController(address _controller) internal returns (bool _result){
        controller = _controller;
        O2O_C = O2OController(_controller);
        _result = true;
    }

    function destruct() onlyController public {
        selfdestruct(controller);
    }

    function setContracts() onlyController view public {}
    function getContract(bytes32 _id) internal returns (address _addr);
}
