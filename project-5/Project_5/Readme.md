```Information:```
===========================

- Token Address on Rinkeby Test Network Link: https://rinkeby.etherscan.io/token/0x30131b3daf8da2543138569231150c78dc19eac0
- Create Star Tx Link: https://rinkeby.etherscan.io/tx/0x492f41df0575de1277495eb5163311310697140c3c16407fb8443587dd96db8d 
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
===========================

1. Create a file in project's root directory with file name ".secret"
2. Paste the "seed word" for your rinkeby account in file ".secret"
3. Add your infura project id in truffle-config.js to the variable named "infuraKey"

```To run the front end:```
===========================
1. cd <project_root>/app
2. npm run dev
3. frontend is hosted at http://localhost:8080/

```Look Up Response Format:```
===========================
- Success Response:
Star ID: 1002, Star Name: TestSecondStarOnRinkeby, Token Name: TJ Udacity Token 

- Failure Response:
Invalid star id, No star found for id: 1003