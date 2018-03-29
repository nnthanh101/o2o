# Smart Contract

## Architecture

### O2ODatabase
All data is kept in a central contract. In case we need to update a contract, the data can be used by updated contracts as well.

### O2OLedger
All funds are kept in this contract. This minimizes the attack surface. The Ledger performs the actual payout if the payout contracts decides so.

### O2OAccessController
Contracts are interacting - this calls for some mechanism that only authorized calls can be made.
We have implemented an Access Control List (ACL) which keeps track which contract may call which function in other contracts.
The ACL itself is kept in the central database.

### O2OController
All contracts have to know to whom they shall talk.
The Controller keeps track on contract addresses, so we can easily update parts of the contract if necessary.

### Security
Many safeguards have been taken to prevent known attacs. Additional, an internal ledger keeps track of all value transfers.
Its very easy to check if the contract has been manipulated.


## Test Expect
- [ ] Database

+ Database Model define used `models` 
+ Database Interface define `set/get` on `any model` we want to store in smart contract
+ @TODO: Store BOTH in smart contract's state & sub system database

- [ ] Ledger

+ Ledger receive money
+ Ledger do payment

- [ ] Logic

+ ...
+ @TODO: Gas profiling on how much does it cost on ("run function" + "store data")

- [ ] Access Controller

+ Any function call in contracts should explicitly tell who can execute it

- [ ] Controller

+ Check state
+ Test deploy & destroy



