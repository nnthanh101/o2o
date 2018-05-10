# What O2OProtocol Service do? (DRAFT)
After writing out "smart contracts" about e-cormerce (ex: listings) and deploy them on different blockchain network

O2OProtocol Services is the easiest way to interact with "smart contract", they wrap smart contract's ABI to support

call into smart contract function

O2OProtocol Service also wrap store data into IPFS which reduce cost to heavily depend on Blockchain

O2OProtocol Service super easy to run

```js
import O2OProtocol from "@o2o/o2oprotocol"
const service = new O2OProtocol(ipfsconfig)
```

Service API workflow
Interact with Blockchain effortless

Listing > create
User > claim

Test case on Service

Test build to test 

+ Contract
+ IPFS
+ Purchase
+ Holder


# Explain running step
Setup local env

We need private chain to test
We need ipfs to test
We need contracts deployed to test

Run 

+ npm run start

  - Start private chain (using ganache)
  - Start IPFS by ipfs > http
  - Compile & deploy to current network

+ Run through test case with mocha webpack

+ Build dist file

# Detail Design

## What exactly run behind the screen

Purchase [?]

Claim [?]

# Scenario of Idenity Proplem

[] ERC725
a smart contract can protect function calls from being executed unless the sender has a verified claim from a trusted issuer.
Good practice nowaday to protect call to smart contract

Imagine we want to deploy a Listing contract to sell a concert ticket, but only allow interactions from users with a verified email address. How can we accomplish this with ERC 725?

First, lets define the entities that will be interacting:

    The Consumer is an identity who wants to buy the ticket.
    The Issuer is an identity which issues claims of type 'EMAIL_VERIFIED'.
    The Listing will only allow Consumers with an EMAIL_VERIFIED claim from an Issuer they trust.
This leaves us with a few questions...

    How does the trusted Issuer verify an email address?
    How does the Consumer get an EMAIL_VERIFIED claim onto their Identity?
    How can the Listing verify that the Consumer has an EMAIL_VERIFIED claim from a trusted Issuer?


# Listing
We can call everything on the world is "listing"

We clean the interface as "thing can sell & buy"

Thing has price (FIXED price)

All metadata considered stored in IPFS

>>> Run subsystem to support searching

Note that O2Oprotocol does not support browsing and searching the listing registry directly.
It is recommended that developers use our open-source bridge server to efficiently query the blockchain.


FIXED price, we solve this problem by add another abstract

>>>Booking Contracts

These individual smart contract instances are generated and deployed with rules around price, reservation time, and payment rules.

By add rule around price > apply real price (up&down) into FIXED price

>>>Core logic on booking

To that end, we will provide default contracts for _escrow, arbitration, and insurance_ that will be inherited by our booking smart contracts.
However, developers will be able to specify alternative contracts of their choosing (either their own or approved third-party contracts) in O2OProtocol function
-calls to generate custom booking contracts.

# Handle exchange rate

We anticipate most sellers will prefer to list their prices in fiat currencies which often have less volatility than digital currencies.
To solve this challenge, both the booking smart contract and the bridge servers will use a common set of oracles and a shared algorithm to determine the exchange rate to be used.
This allows prices to be shown to end users in their preferred fiat currencies while the correct amount of digital tokens are sent during the booking.
-A diverse set of oracles will be chosen to avoid introducing single points of failure into the system.