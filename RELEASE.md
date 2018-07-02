# Release Notes V0.6.0

- [x] 1. [O2O Services](https://github.com/o2oprotocol/o2oprotocol)

- [ ] 2. [BnB Services](https://bitbucket.org/bot-blockchain/bnbservice)

- [ ] 3. [O2O Bridge](): RedHat/Ubuntu16.04 & OpenShift/Docker

  

## Confirm Release

- [x] _o2oprotocol_: Confirm js tests passing

-  `git checkout release-0.6.0 && git pull`

-  `npm run install:dev`

-  `npm test` (This will also test smart contracts)

-  `npm start`

- [x] _bnbservice_: Confirm all tests passing

- [x] _bnbservice_: Confirm it runs against remote (unlinked) o2oprotocol

-  `git checkout release-0.10.1 && git pull`

-  `npm install`

-  `npm start`

- [ ] _bnbservice_: Confirm it runs against local (linked) o2oprotocol

-  `git checkout release-0.10.1 && git pull`

-  `npm run install:dev`

-  `npm start`

- Probably need to **Reset Account** on MetaMask.

- [ ] Confirm deployment accounts have eth for gas.

- Both accounts need gas, as test listings are created from second.

-  `npm run deploy_checklist`

- [ ] Rinkeby ([Faucet](https://faucet.rinkeby.io/))

- [ ] account[0] [`0x`](https://rinkeby.etherscan.io/address/0x)

- [ ] account[1] [`0x`](https://rinkeby.etherscan.io/address/0x)

- [ ] Ropsten ([Faucet](https://faucet.metamask.io/))

- [ ] account[0] [`0x`](https://ropsten.etherscan.io/address/0x)

- [ ] account[1] [`0x`](https://ropsten.etherscan.io/address/0x)

- [x] BnBService:  [dapp-boilerplate] > O2O-Service.js + [DApp] NewUI   

## Publish

### o2oprotocol

- [ ] _o2oprotocol_ : In `package.json`, confirm version is `0.6.0`

- [ ] If contracts have changed:

- Show diff with: `git diff master..develop contracts/contracts/`

-  `cd contracts`

- [ ] Deploy new smart contracts to Ropsten. Be sure addresses are listed in ABI files.

-  `export ROPSTEN_MNEMONIC="<mnemonic>"`

-  `npx truffle migrate --reset --network ropsten | tee releases/0.6.0_ropsten.log`

- [ ] Deploy new smart contracts to Rinkeby. Be sure addresses are listed in ABI files.

-  `export RINKEBY_MNEMONIC=$ROPSTEN_MNEMONIC`

-  `npx truffle migrate --reset --network rinkeby | tee releases/0.6.0_rinkeby.log`

- [ ] Migrate data from old contracts to new. (Once we get around to writing migrations!)

- [ ] _o2oprotocol_: Build o2oprotocol.js (in `dist/o2oprotocol.js`) -- **Not redundant:** This will bake in the new contract addresses into the contract's `.json` files.

-  `npm run install:dev`

- [ ] _o2oprotocol_: Merge and push branches

-  `git checkout develop`

-  `git merge --no-ff rerelease-0.6.0`

-  `git push`

-  `git checkout master`

-  `git merge --no-ff rerelease-0.6.0`

-  `git push`

-  `git branch -D release-0.6.0`

- [ ] Version in form `v0.6.0` (This will add git tag on `master`)

- [ ] Include addresses of smart contracts in description

- [ ] _o2oprotocol_: [Publish to npm](https://docs.npmjs.com/cli/publish).

-  `npm publish`


### BnBService

- [ ] _bnbservice_: Build against npm version. This will update `package-lock.json`

-  `npm unlink --no-save o2oprotocol && npm install && npm run build`

- [ ] `git add package.json && git commit -m "0.10.1 release"`

- [ ] _bnbservice_: Merge and push branches

-  `git checkout develop`

-  `git merge --no-ff release-0.10.1`

-  `git push`

-  `git checkout master`

-  `git merge --no-ff release-0.10.1`

-  `git push`

- [ ] _o2oprotocol_: Delete release branch

-  `git branch -D release-0.10.1`

- [ ] _bnbservice_: Confirm that bnbservice works when run alone again NPM.

- [ ] _bnbservice_: Test deploy dapp to AWS/heroku

-  `git clone https://https://github.com/o2oprotocol/bnbservice && cd bnbservice`

-  `heroku create && git push heroku master`

- [ ] _bnbservice_: Add git tag to `master` to match o2oprotocol.

-  `git tag -a v0.10.1 -m "New release"`

  
### bridge-server

- [ ] _bnbservice_: Merge and push branches

-  `git checkout develop`

-  `git merge --no-ff release-0.2.0`

-  `git push`

-  `git checkout master`

-  `git merge --no-ff release-0.2.0`

-  `git push`

- [ ] _bridge-server_: Add git tag to `master` to match o2oprotocol.

-  `git tag -a v0.2.0 -m "New release"`

  
## Follow-up

- [ ] Confirm published `o2oprotocol.js` file is accessible via `nmpjs.com` redirect

- [ ] _bnbservice_  `npm unlink --no-save o2oprotocol`

- [ ] _bnbservice_: Confirm that "one-line setup & run" command works on `master` branch shown by default

- [ ] _o2oprotocol_: Increment version number to on `develop` to for next release

-  `git checkout develop`

-  `subl package.json`

- [ ] `git push`

- [ ] _docs_: Review docs for needed updates. Confirm example code on playground site (jsfiddle?) still work.

- [ ] Copy this to-do list into new issue for next sprint.

- [ ] Post notice of new release on Discord

  

## Troubleshooting

  

-  `Error: insufficient funds for gas * price + value`

- Not enough funds in primary or secondary account. Usually hits when I forget to put funds in second account and it trys to deploy sample listings.