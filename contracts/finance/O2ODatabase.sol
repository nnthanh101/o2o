pragma solidity ^0.4.0;

/*
    Define Model
*/
contract O2ODataModel {
    enum ModelA {
        id,
        name
    }

}

contract O2ODatabase {
    /*
    Define set, get to store and read data
    */
    function setModelA(uint8 id, string name) returns (unint8 modelId);
    function getModelA(uint8 modelId) returns (ModelA _value);
}