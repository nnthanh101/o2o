pragma solidity ^0.4.0;

/*
 * Define Model
 */
contract O2ODataModel {
    enum ModelA {
        id,
        name
    }

}

/*
 * Define set, get to store and read data
 */
contract O2ODatabase {
    function setAccessControl(address _contract, address _caller, uint8 _perm) public;
    function setAccessControl(address _contract, address _caller, uint8 _perm, bool _access) public;
    function getAccessControl(address _contract, address _caller, uint8 _perm) public returns (bool _allowed);
}