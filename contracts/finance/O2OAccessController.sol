pragma solidity ^0.4.0;

import "./O2OControlled.sol";
import "./O2ODatabase.sol";

contract O2OAccessController is O2OControlled {
    O2ODatabase O2O_DB;

    modifier onlyEmergency() {
        require(msg.sender == O2O_C.getContract('O2O.Emergency'));
        _;
    }

    function O2OAccessController(address _controller) public {
        setController(_controller);
    }

    function setContracts() onlyController public {
        O2O_DB = O2ODatabase(getContract("O2O.Database"));
    }

    function setPermissionById(uint8 _perm, bytes32 _id) public {
        O2O_DB.setAccessControl(msg.sender, O2O_C.getContract(_id), _perm);
    }

    function fixPermission(address _target, address _accessor, uint8 _perm, bool _access) onlyEmergency public {
        O2O_DB.setAccessControl(
            _target,
            _accessor,
            _perm,
            _access
        );

    }

    function setPermissionById(uint8 _perm, bytes32 _id, bool _access) public {
        O2O_DB.setAccessControl(
            msg.sender,
            O2O_C.getContract(_id),
            _perm,
            _access
        );
    }

    function setPermissionByAddress(uint8 _perm, address _addr) public {
        O2O_DB.setAccessControl(msg.sender, _addr, _perm);
    }

    function setPermissionByAddress(uint8 _perm, address _addr, bool _access) public {
        O2O_DB.setAccessControl(
            msg.sender,
            _addr,
            _perm,
            _access
        );
    }

    function checkPermission(uint8 _perm, address _addr) public returns (bool _success)  {
        _success = O2O_DB.getAccessControl(msg.sender, _addr, _perm);
    }
}