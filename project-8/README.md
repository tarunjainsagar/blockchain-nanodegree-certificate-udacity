# Nanodegree Project 8

Project screenshots can be found in "images/" directory

### Configuring your project

- Install requirements
```
npm install 
```
- start ganache-cli with the following command:
```
ganache-cli
```
### Test Output
```
$ truffle test
```
```
Compiling your contracts...
===========================
> Compiling ./contracts/ERC721Mintable.sol
> Compiling ./contracts/Migrations.sol
> Compiling ./contracts/Oraclize.sol
> Compiling ./contracts/SolnSquareVerifier.sol
> Compiling ./contracts/Verifier.sol
> Compiling openzeppelin-solidity/contracts/drafts/Counters.sol
> Compiling openzeppelin-solidity/contracts/math/SafeMath.sol
> Compiling openzeppelin-solidity/contracts/token/ERC721/IERC721Receiver.sol
> Compiling openzeppelin-solidity/contracts/utils/Address.sol

0xf0255AAeFBe18aAE0Ab1A65b7270F857063108e5

  Contract: TestERC721Mintable
    have ownership properties
      ✓ should fail when minting when address is not contract owner (49ms)
      ✓ should return contract owner
      ✓ Verify correct handling of ownership transfer (152ms)
    check correct approval handling
      ✓ verify approval for 1 token (75ms)
      ✓ verify approval for all tokens (160ms)
    match erc721 spec
      ✓ should return total supply
      ✓ should get token balance
      ✓ should return token uri
      ✓ should transfer token from one owner to another (151ms)

  Contract: SolnSquareVerifier
    check approvals
      ✓ ERC721 token can be minted for contract (2648ms)
      ✓ new solution can be added for contract - disallow duplicates  (5190ms)

  Contract: SquareVerifier
    verification with correct and incorrect proof
      ✓ test verify correct proof (1613ms)
      ✓ test verify wrong proof (294ms)


  13 passing (14s)
```
### Deploying to Rinkeby network output:
```
$ truffle migrate --network rinkeby --reset --compile-all
```
```
Compiling your contracts...
===========================
> Compiling ./contracts/ERC721Mintable.sol
> Compiling ./contracts/Migrations.sol
> Compiling ./contracts/Oraclize.sol
> Compiling ./contracts/SolnSquareVerifier.sol
> Compiling ./contracts/Verifier.sol
> Compiling openzeppelin-solidity/contracts/drafts/Counters.sol
> Compiling openzeppelin-solidity/contracts/math/SafeMath.sol
> Compiling openzeppelin-solidity/contracts/token/ERC721/IERC721Receiver.sol
> Compiling openzeppelin-solidity/contracts/utils/Address.sol

> Artifacts written to /home/tarun/courses/blockchainudacity/project-8/eth-contracts/build/contracts
> Compiled successfully using:
   - solc: 0.5.0+commit.1d4f565a.Emscripten.clang


Migrations dry-run (simulation)
===============================
> Network name:    'rinkeby-fork'
> Network id:      4
> Block gas limit: 0x7691e7


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > block number:        5453037
   > block timestamp:     1573934687
   > account:             0x4E0bdaA9341F7619ba27775D465E3046b4562bdf
   > balance:             68.831928227000000002
   > gas used:            269908
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.00269908 ETH

   -------------------------------------
   > Total cost:          0.00269908 ETH


2_deploy_contracts.js
=====================

   Deploying 'SquareVerifier'
   --------------------------
   > block number:        5453039
   > block timestamp:     1573934694
   > account:             0x4E0bdaA9341F7619ba27775D465E3046b4562bdf
   > balance:             68.813831717000000002
   > gas used:            1782617
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.01782617 ETH


   Deploying 'SolnSquareVerifier'
   ------------------------------
   > block number:        5453040
   > block timestamp:     1573934712
   > account:             0x4E0bdaA9341F7619ba27775D465E3046b4562bdf
   > balance:             68.770190177000000002
   > gas used:            4364154
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.04364154 ETH

   -------------------------------------
   > Total cost:          0.06146771 ETH


Summary
=======
> Total deployments:   3
> Final cost:          0.06416679 ETH





Starting migrations...
======================
> Network name:    'rinkeby'
> Network id:      4
> Block gas limit: 0x76b4f7


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0x31906ddcb355ec0b6c66782de71b9cc5556bca94f30c75a2c3ee40161e03e379
   > Blocks: 0            Seconds: 9
   > contract address:    0x1d01fb90798BF3c54f6Aa0072634807e09f8b22c
   > block number:        5453040
   > block timestamp:     1573934748
   > account:             0x4E0bdaA9341F7619ba27775D465E3046b4562bdf
   > balance:             68.832180947000000002
   > gas used:            244636
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.00244636 ETH



   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00244636 ETH


2_deploy_contracts.js
=====================

   Deploying 'SquareVerifier'
   --------------------------
   > transaction hash:    0x0aeb7031e3b4138b20db98d299fbd979970128859ad17182e9b08d5c71fb2ff6
   > Blocks: 0            Seconds: 9
   > contract address:    0x9A06238274c7CD3AF3C3bE5097DA4360B08E1111
   > block number:        5453042
   > block timestamp:     1573934778
   > account:             0x4E0bdaA9341F7619ba27775D465E3046b4562bdf
   > balance:             68.817229917000000002
   > gas used:            1452729
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.01452729 ETH


   Deploying 'SolnSquareVerifier'
   ------------------------------
   > transaction hash:    0xa64c06ab024a03e93fb34611bfe5d64de76465b4a87b4f4696847253ae3f4064
   > Blocks: 2            Seconds: 21
   > contract address:    0xC67cE45484982698baAEf2fbA864038D12455a6a
   > block number:        5453044
   > block timestamp:     1573934808
   > account:             0x4E0bdaA9341F7619ba27775D465E3046b4562bdf
   > balance:             68.779729497000000002
   > gas used:            3750042
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.03750042 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.05202771 ETH


Summary
=======
> Total deployments:   3
> Final cost:          0.05447407 ETH
```
### Etherscan Contract Link:
```
https://rinkeby.etherscan.io/address/0xC67cE45484982698baAEf2fbA864038D12455a6a
```
### Mint Tokens
```
$ node mint/mint.js 
mnemonic:<MNENOMIC>
infura key:<INFURA_KEY>
owner address:0x4E0bdaA9341F7619ba27775D465E3046b4562bdf
contract address:0xC67cE45484982698baAEf2fbA864038D12455a6a
0
1
2
3
4
5
6
7
8
9
Mint Transaction: 0xfae54c4af3fc054f54a762967eb0e2df984e3fc966fbdd8803818e5e6b1685fd
Mint Transaction: 0xeebc07ac02f8d6f6d743c0e427caaa5f7994649683bf0c220f99d0861650cbe9
Mint Transaction: 0xc4b018f1fb535dc2c13eeef18e1f6fa2feed5f57d0023cdb0248c2a593cb46b9
Mint Transaction: 0xcb0f98e61293a25a7925678ff153b4d3037381259248d466766f867d94b405cf
Mint Transaction: 0x95c7a95993504878b4f6c3e9d4a0faa25044f9ee4a174e71ad8e2908f8da3c77
Mint Transaction: 0x92affe7c1893fd46b2ced5b4c08f502c6c1f629e816a6866aa82d7684f60b33f
Mint Transaction: 0x049fec438a0bf536a0230c2aaaf6360d584294bf13a84bf41b9d1e7bf04e7fd0
Mint Transaction: 0x194479a50217a9cdaea9e542a1cba0e188768c7edabfc5015aace408e86c7baa
Mint Transaction: 0x59c79a354cbc60a712ac2a6ae1ae4cc4381da54f0530bb9e1bd17ceb6669a924
Mint Transaction: 0x6facef63aa71ae2bc620a4831084215efe74f959624fbc2e94a4076729c5f681
```

### OpenSea MarketPlace
```
https://rinkeby.opensea.io/assets/0xc67ce45484982698baaef2fba864038d12455a6a/2
```