pragma solidity ^0.4.0;

contract O2OAccessController {
    function setPermission() public returns (bool success);
    function checkPermission() public returns (bool success);
}