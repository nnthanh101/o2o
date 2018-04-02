
pragma solidity ^0.4.0;


/**
 * Ledger contract interface
 */
contract O2OLedger {
    function receiveFunds(address _to) public payable;
    function sendFunds(address _recipient, address _from, uint _amount) public returns (bool success);
    function bookkeeping(address _from, address _to, uint amount) public returns (bool success);
}