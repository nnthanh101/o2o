
pragma solidity ^0.4.0;

import "./O2ODatabase.sol";

/**
 * @description	Ledger contract interface
 */
contract O2OLedger is O2ODatabase {

    function receiveFunds(Acc _to) payable;
    function sendFunds(address _recipient, Acc _from, uint _amount) returns (bool _success);
    function bookkeeping(Acc _from, Acc _to, uint amount);
}
