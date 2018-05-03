# Blockchain Tool
Watch blocks created in testrpc net with `ganache` electron app

https://github.com/trufflesuite/ganache

Example

![watch-block-with-ganache](images/watch-block-with-ganache-2018-04-04_093354.png)


## Run ganache
Install dependencies

	npm install

Run with electron

	npm start

### Config
By default ganache listen to local blockchain on port `7545`

Update this port in setting to match with our testrpc port

	> Settings
	> Update Port & Network Id
	> Save & Restart server

Example

![ganache-settings](images/ganache-settings-2018-04-04_094016.png)


Note: We can leave networkId as 1, testrpc run usually get current timestamp as networkId
