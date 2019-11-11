# Project6B
Architect a Blockchain Supply Chain Solution - Part B

## Getting Started
These instructions will install requirements and allow you to execute the code.

### Prerequisites
Node
NPM
Yarn

### Configuring your project

- Install requirements (within Project_6B folder)
>> yarn

You also need ganache-cli and truffle
>> yarn add ganache-cli
>> yarn add truffle@4

- To test the contract start 
>> yarn ganache-cli
>> yarn truffle test test/TestSupplychain.js

All tests should pass.

Output For Test:

Using network 'development'.

ganache-cli accounts used here...
Contract Owner: accounts[0]  0x27d8d15cbc94527cadf5ec14b69519ae23288b95
Farmer: accounts[1]  0x018c2dabef4904ecbd7118350a0c54dbeae3549a
Distributor: accounts[2]  0xce5144391b4ab80668965f2cc4f2cc102380ef0a
Retailer: accounts[3]  0x460c31107dd048e34971e57da2f99f659add4f02
Consumer: accounts[4]  0xd37b7b8c62be2fdde8daa9816483aebdbd356088


  Contract: SupplyChain
    ✓ Testing smart contract function harvestItem() that allows a farmer to harvest coffee (176ms)
    ✓ Testing smart contract function processItem() that allows a farmer to process coffee (92ms)
    ✓ Testing smart contract function packItem() that allows a farmer to pack coffee (85ms)
    ✓ Testing smart contract function sellItem() that allows a farmer to sell coffee (80ms)
    ✓ Testing smart contract function buyItem() that allows a distributor to buy coffee (88ms)
    ✓ Testing smart contract function shipItem() that allows a distributor to ship coffee (78ms)
    ✓ Testing smart contract function receiveItem() that allows a retailer to mark coffee received (84ms)
    ✓ Testing smart contract function purchaseItem() that allows a consumer to purchase coffee (86ms)
    ✓ Testing smart contract function fetchItemBufferOne() that allows anyone to fetch item details from blockchain
    ✓ Testing smart contract function fetchItemBufferTwo() that allows anyone to fetch item details from blockchain


  10 passing (870ms)


- Install Metamask plugin for brave / chrome /firefox
- Metascan must be connected to your wallet. Your need to add ether to your wallet from a faucet https://faucet.rinkeby.io/.
- When your web app interacts with your wallet, Metascan will ask for confirmation.
- To start the application issue the command  ```yarn dev```. The UI will look like below:

## Contract deployment
```
>> yarn truffle migrate --network rinkeby --reset --compile-all
yarn run v1.19.1
$ /home/tarun/courses/blockchainudacity/project-6/node_modules/.bin/truffle migrate --network rinkeby --reset --compile-all
You can improve web3's peformance when running Node.js versions older than 10.5.0 by installing the (deprecated) scrypt package in your project
Compiling ./contracts/Migrations.sol...
Compiling ./contracts/coffeeaccesscontrol/ConsumerRole.sol...
Compiling ./contracts/coffeeaccesscontrol/DistributorRole.sol...
Compiling ./contracts/coffeeaccesscontrol/FarmerRole.sol...
Compiling ./contracts/coffeeaccesscontrol/RetailerRole.sol...
Compiling ./contracts/coffeeaccesscontrol/Roles.sol...
Compiling ./contracts/coffeebase/SupplyChain.sol...
Compiling ./contracts/coffeecore/Ownable.sol...

Compilation warnings encountered:

Writing artifacts to ./build/contracts

Using network 'rinkeby'.

Running migration: 1_initial_migration.js
  Deploying Migrations...
  ... 0xadeb2efa23104962a3e1a8c3099487a9a3c62b4587b59913b5a363f113a1a57a
  Migrations: 0x101d027c18f341faadc2d9dac6942ffc803b5a0f
Saving successful migration to network...
  ... 0x470d338510bd93314de0ddba51916c0c4071c1d555dc82223f98d38bad1f9e6d
Saving artifacts...
Running migration: 2_deploy_contracts.js
  Deploying FarmerRole...
  ... 0x8b86df691262224e722711dc1af213c27c34bb4f059b25166147b01487dc97b8
  FarmerRole: 0x9fadba3586825115fa0578daf279e4ab2918ad2b
  Deploying DistributorRole...
  ... 0xd332abc127ab97fa18a667f7866ac57cb64d15a8e5423314108fe148282e24a7
  DistributorRole: 0x2d3b343ee7998eb3371ccd800202123fd6a6207e
  Deploying RetailerRole...
  ... 0xa348c9cda8ecf65a8be3f5404102147c1064b264d7939c32b28dc9763c7ab5bd
  RetailerRole: 0x75618b46f77748a32cf9be7f4fc5e16ed81a3257
  Deploying ConsumerRole...
  ... 0x2803ff798e6773f43d8068f57ba490fe3d2af968dc8c32693b485bee7dd04081
  ConsumerRole: 0x15397d01f45dd56fa32d96fe46e4eccacc823727
  Deploying SupplyChain...
  ... 0xef2b3e8d912b775459fe6b16a2509836cf506142fe1aff71293217e8f9cf08e2
  SupplyChain: 0x3da00411ca281083e74b6400008bc102155c8f4e
Saving successful migration to network...
  ... 0xab7c9e3632ac591efa8843b6d7d90b5d7d9ff074efa1c1f6b48808202f6da228
Saving artifacts...
Done in 301.30s.
```

## View details on Etherscan
### Contract address 
https://rinkeby.etherscan.io/address/0x101d027c18f341faadc2d9dac6942ffc803b5a0f

### Transaction History
Harvested - 0x2f9b70d305bcf6928a71017e2e6272c76016c211946d1116b823b0b683d9dd81
Processed - 0x4800e576311c2acb31a9843b0b47269b1583f90abaac73d2afa41195e2ea5d22
Packed - 0xebd6ad0af96a265cae5f33174df1b813990666c1f98cf2c916004d6c53f9c7bc
ForSale - 0xcf144b00f266d02fe2b52cc6167a0243636242279e2ef7ad64f4ef877c03862c
Sold - 0xa9861d04f7778eabdf6df18af44f3d275413563bb77e62d39027099b70de9243
Shipped - 0x6a30a1582678a57ca7dffa041590802b454b97fffe9196dc46bbb98e53510a78
Received - 0x823d1e6c3214d3365b7bc144b566fd78bb68dd759e6472619e27dc3908cf8a8f
Purchased - 0xb2b74dceb4bad8d3afd40c1eb6d3e679f056229561cc067f86bd2162a5dfdc49


## UML Diagrams

### Activity Diagram
![image1](./images/UMLDiagrams/activity_diagram_udacity_p6a.png)

### Sequence Diagram
![image1](./images/UMLDiagrams/sequence_diagram_udacity_p6a.png)

### State Diagram
![image1](./images/UMLDiagrams/state_diagram_udacity_p6a.png)

### Class Diagram (Data model)
![image1](./images/UMLDiagrams/class(data_model)_diagram_udacity_p6a.png)


### Screenshots
![image1](./images/project-6B-01.png)
![image1](./images/project-6B-02.png)
![image1](./images/project-6B-03.png)
![image1](./images/project-6B-04.png)