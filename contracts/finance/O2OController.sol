pragma solidity ^0.4.0;

import "./Owned.sol";
import "./O2OControlled.sol";

contract O2OController is Owned {
    struct Controller {
        address addr;
        bool isControlled;
        bool isInitialized;
    }

    mapping (bytes32 => Controller) public contracts;
    bytes32[] public contractIds;

    /**
    * Constructor.
    */
    function O2OController() public {
        registerContract(owner, "O2O.Owner", false);
        registerContract(address(this), "O2O.Controller", false);
    }

    /**
     * @dev Allows the current owner to transfer control of the contract to a newOwner.
     * @param _newOwner The address to transfer ownership to.
     */
    function transferOwnership(address _newOwner) onlyOwner public {
        require(_newOwner != address(0));
        owner = _newOwner;
        setContract(_newOwner, "O2O.Owner", false);
    }

    /**
    * Store address of one contract in mapping.
    * @param _addr       Address of contract
    * @param _id         ID of contract
    */
    function setContract(address _addr, bytes32 _id, bool _isControlled) internal {
        contracts[_id].addr = _addr;
        contracts[_id].isControlled = _isControlled;
    }

    /**
    * Get contract address from ID. This function is called by the
    * contract's setContracts function.
    * @param _id         ID of contract
    * @return The address of the contract.
    */
    function getContract(bytes32 _id) view public returns (address _addr) {
        _addr = contracts[_id].addr;
    }

    /**
    * Registration of contracts.
    * It will only accept calls of deployments initiated by the owner.
    * @param _id         ID of contract
    * @return  bool        success
    */
    function registerContract(address _addr, bytes32 _id, bool _isControlled) onlyOwner public returns (bool _result) {
        setContract(_addr, _id, _isControlled);
        contractIds.push(_id);
        _result = true;
    }

    /**
    * Deregister a contract.
    * In future, contracts should be exchangeable.
    * @param _id         ID of contract
    * @return  bool        success
    */
    function deregister(bytes32 _id) onlyOwner public returns (bool _result) {
        if (getContract(_id) == 0x0) {
            return false;
        }
        setContract(0x0, _id, false);
        _result = true;
    }

    /**
    * After deploying all contracts, this function is called and calls
    * setContracts() for every registered contract.
    * This call pulls the addresses of the needed contracts in the respective contract.
    * We assume that contractIds.length is small, so this won't run out of gas.
    */
    function setAllContracts() onlyOwner view public {
        O2OControlled controlledContract;
        // TODO: Check for upper bound for i
        // i = 0 is O2O.Owner, we skip this. // check!
        for (uint i = 0; i < contractIds.length; i++) {
            if (contracts[contractIds[i]].isControlled == true) {
                controlledContract = O2OControlled(contracts[contractIds[i]].addr);
                controlledContract.setContracts();
            }
        }
    }

    function setOneContract(uint i) onlyOwner view public {
        O2OControlled controlledContract;
        // TODO: Check for upper bound for i
        controlledContract = O2OControlled(contracts[contractIds[i]].addr);
        controlledContract.setContracts();
    }

    /**
    * Destruct one contract.
    * @param _id         ID of contract to destroy.
    */
    function destructOne(bytes32 _id) onlyOwner public {
        address addr = getContract(_id);
        if (addr != 0x0) {
            O2OControlled(addr).destruct();
        }
    }

    /**
    * Destruct all contracts.
    * We assume that contractIds.length is small, so this won't run out of gas.
    * Otherwise, you can still destroy one contract after the other with destructOne.
    */
    function destructAll() onlyOwner public {
        // TODO: Check for upper bound for i
        for (uint i = 0; i < contractIds.length; i++) {
            if (contracts[contractIds[i]].isControlled == true) {
                destructOne(contractIds[i]);
            }
        }

        selfdestruct(owner);
    }
}