```Information:```
- StarNotary Contract Address on Rinkeby: 0x30131B3Daf8dA2543138569231150C78dc19EAC0
- Etherscan Link for Contract: https://rinkeby.etherscan.io/address/0x30131B3Daf8dA2543138569231150C78dc19EAC0
- ERC-721 Token Name: "TJ Udacity Token"
- ERC-721 Token Symbol: "TJUDC"
- Version of the Truffle and OpenZeppelin used :
-   Truffle v5.0.21 (core: 5.0.21)
-   Solidity v0.5.0 (solc-js)
-   Node v12.4.0
-   Web3.js v1.0.0-beta.37

```To deploy the project on rinkeby:```
1. Create a file in project's root directory with file name ".secret"
2. Paste the "seed word" for your rinkeby account in file ".secret"
3. Add your infura project id in truffle-config.js to the variable named "infuraKey"

```Output of deployment:```
command: truffle migrate --reset --network rinkeby

Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.


Starting migrations...
======================
> Network name:    'rinkeby'
> Network id:      4
> Block gas limit: 0x6ac28d


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0x181d322a2975dbd084cfb811fc2e3076999a034fc1ac6a6c6d02622f9bbeec9b
   > Blocks: 1            Seconds: 13
   > contract address:    0x8bD91b928faE92A71A69bf3331980649ed288358
   > block number:        4540672
   > block timestamp:     1560239812
   > account:             0x2166FAcf615a075Cdf8881d104b32B79a2492F50
   > balance:             2.4748607
   > gas used:            261393
   > gas price:           100 gwei
   > value sent:          0 ETH
   > total cost:          0.0261393 ETH

   Pausing for 2 confirmations...
   ------------------------------
   > confirmation number: 1 (block: 4540673)
   > confirmation number: 2 (block: 4540674)

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:           0.0261393 ETH


2_deploy_contracts.js
=====================

   Deploying 'StarNotary'
   ----------------------
   > transaction hash:    0x8d093e4d8d5e534cc933cdf1eab1f30e52349eb3025c2cd846d44702f191b821
   > Blocks: 1            Seconds: 9
   > contract address:    0x30131B3Daf8dA2543138569231150C78dc19EAC0
   > block number:        4540676
   > block timestamp:     1560239872
   > account:             0x2166FAcf615a075Cdf8881d104b32B79a2492F50
   > balance:             2.2487808
   > gas used:            2218776
   > gas price:           100 gwei
   > value sent:          0 ETH
   > total cost:          0.2218776 ETH

   Pausing for 2 confirmations...
   ------------------------------
   > confirmation number: 1 (block: 4540677)
   > confirmation number: 2 (block: 4540678)

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:           0.2218776 ETH


Summary
=======
> Total deployments:   2
> Final cost:          0.2480169 ETH
