pragma solidity ^0.4.23;

import './ClaimHolder.sol';

// This will be deployed exactly once and represents O2OProtocol's
// own identity for use in signing attestations.

contract O2OIdentity is ClaimHolder {}
