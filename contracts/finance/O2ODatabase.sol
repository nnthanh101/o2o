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
    function setModelA(uint8 id, string name) public returns (uint8 modelId);
    function getModelA(uint8 modelId) public returns (uint8 _value);
}