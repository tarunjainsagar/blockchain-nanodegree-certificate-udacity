# Project7
FlightSurety, a sample application project for Udacity's Blockchain course.

## Getting Started

These instructions will install requirements and allow you to execute the code.

### Prerequisites
Node 
NPM 
Yarn

### Configuring your project


- Install requirements (within Project_7 folder)
```
yarn
yarn add ganache-cli 
yarn add truffle
```
- start ganache-cli with the following command (this will create 50 accounts):
```
yarn ganache-cli -m "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat" -l 99999999 -a 50
```

- Test the contracts by issuing the command:
```
Test Oracles:
yarn truffle test test/oracles.js 

```
```
Test Flight Surety:
yarn truffle test test/flightSurety.js 
```

- Compile your project and migrate it
```
yarn truffle migrate --reset --compile-all
```

- Start dapp:

`yarn dapp`

- To view dapp:

`http://localhost:8000`

- To start server:

`yarn server`


## Test flight surety output
```
 Contract: Flight Surety Tests
    ✓ (authorization   ) Caller is (correctly) not authorized
    ✓ (authorization   ) Caller can be authorized (59ms)
    ✓ (Initial creation) Airline registered on contract deployment
    ✓ (multiparty      ) has correct initial isOperational() value
    ✓ (multiparty      ) can block access to setOperatingStatus() for non-Contract Owner account (38ms)
    ✓ (multiparty      ) can allow access to setOperatingStatus() for Contract Owner account
    ✓ (multiparty      ) can block access to functions using requireIsOperational when operating status is false (70ms)
    ✓ (airline         ) cannot register an Airline using registerAirline() if it is not funded
    ✓ (airline         ) Airline cannot be funded (insufficient funds - less than 10 ether)
    ✓ (airline         ) Airline is funded with 10 Ether (46ms)
    ✓ (airline         ) A funded Airline can register another airline using registerAirline() (38ms)
    ✓ (airline         ) A registered airline cannot be registered twice (50ms)
    ✓ (airline         ) New airlines are registered until multi-party consensus threshold is reached (128ms)
    ✓ (airline         ) Starting from first funded airline, fund the first 4 airlines (103ms)
    ✓ (airline         ) Register a fifth Airline using multi-party consensus (140ms)
    ✓ (insurance       ) Stop passenger from paying more than 1 Ether for insurance
    ✓ (insurance       ) Passenger can buy insurance for a maximum of 1 Ether (47ms)
    ✓ (insurance       ) Passenger cannot buy multiple insurance for same flight (49ms)
    ✓ (insurance       ) Passenger balance (before insurance claim) is 0
    ✓ (oracles         ) Call submitOracleResponse() in a loop to emit processFlightStatus() - inspired by oracle.js (2768ms)
    ✓ (passenger       ) check passenger was credited 1.5x but do not withdraw amount
    ✓ (passenger       ) Initiate withdrawal to account (49ms)
    ✓ (passenger       ) prevent multiple withdrawal to account
```

## Start dapp output
yarn dapp
yarn run v1.19.1
$ webpack-dev-server --mode development --config webpack.config.dapp.js
ℹ ｢wds｣: Project is running at http://localhost:8000/
ℹ ｢wds｣: webpack output is served from /
ℹ ｢wds｣: Content not from webpack is served from /home/tarun/courses/evelthon-blockchain/Blockchain-Developer-Nanodegree-Program-master/P7_FlightSurety/dapp
ℹ ｢wdm｣:    704 modules
ℹ ｢wdm｣: Compiled successfully.

## Deploy Server Output
yarn server
yarn run v1.19.1
$ rm -rf ./build/server && webpack --config webpack.config.server.js

webpack is watching the files…

Hash: 98ee71f76d44ecd69176
Version: webpack 4.41.2
Time: 1547ms
Built at: 15/11/2019 11:42:44 AM
    Asset     Size  Chunks             Chunk Names
server.js  818 KiB       0  [emitted]  main
Entrypoint main = server.js
[0] multi webpack/hot/poll?1000 ./src/server/index 40 bytes {0} [built]
[./build/contracts/FlightSuretyApp.json] 980 KiB {0} [built]
[./build/contracts/FlightSuretyData.json] 734 KiB {0} [built]
[./node_modules/webpack/hot/log-apply-result.js] (webpack)/hot/log-apply-result.js 1.27 KiB {0} [built]
[./node_modules/webpack/hot/log.js] (webpack)/hot/log.js 1.34 KiB {0} [built]
[./node_modules/webpack/hot/poll.js?1000] (webpack)/hot/poll.js?1000 1.12 KiB {0} [built]
[./src/server/config.json] 180 bytes {0} [built]
[./src/server/index.js] 308 bytes {0} [built]
[./src/server/server.js] 4.37 KiB {0} [built]
[express] external "express" 42 bytes {0} [built]
[http] external "http" 42 bytes {0} [built]
[web3] external "web3" 42 bytes {0} [built]

WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/
Registered App as authorized caller.
Oracle registered: {"address":"0xE44c4cf797505AF1527B11e4F4c6f95531b4Be24","indexes":["2","8","7"]}
Oracle registered: {"address":"0x69e1CB5cFcA8A311586e3406ed0301C06fb839a2","indexes":["6","4","8"]}
Oracle registered: {"address":"0xF014343BDFFbED8660A9d8721deC985126f189F3","indexes":["1","8","5"]}
Oracle registered: {"address":"0x0E79EDbD6A727CfeE09A2b1d0A59F7752d5bf7C9","indexes":["3","6","5"]}
Oracle registered: {"address":"0x9bC1169Ca09555bf2721A5C9eC6D69c8073bfeB4","indexes":["2","4","5"]}
Oracle registered: {"address":"0xa23eAEf02F9E0338EEcDa8Fdd0A73aDD781b2A86","indexes":["8","0","3"]}
Oracle registered: {"address":"0xc449a27B106BE1120Bd1Fd62F8166A2F61588eb9","indexes":["5","4","9"]}
Oracle registered: {"address":"0xF24AE9CE9B62d83059BD849b9F36d3f4792F5081","indexes":["3","8","1"]}
Oracle registered: {"address":"0xc44B027a94913FB515B19F04CAf515e74AE24FD6","indexes":["0","7","9"]}
Oracle registered: {"address":"0xcb0236B37Ff19001633E38808bd124b60B1fE1ba","indexes":["2","7","0"]}
Oracle registered: {"address":"0x715e632C0FE0d07D02fC3d2Cf630d11e1A45C522","indexes":["9","6","7"]}
Oracle registered: {"address":"0x90FFD070a8333ACB4Ac1b8EBa59a77f9f1001819","indexes":["0","2","5"]}
Oracle registered: {"address":"0x036945CD50df76077cb2D6CF5293B32252BCe247","indexes":["7","4","5"]}
Oracle registered: {"address":"0x23f0227FB09D50477331D2BB8519A38a52B9dFAF","indexes":["5","8","0"]}
Oracle registered: {"address":"0x799759c45265B96cac16b88A7084C068d38aFce9","indexes":["6","9","4"]}
Oracle registered: {"address":"0xA6BFE07B18Df9E42F0086D2FCe9334B701868314","indexes":["4","6","0"]}
Oracle registered: {"address":"0x39Ae04B556bbdD73123Bab2d091DCD068144361F","indexes":["7","4","6"]}
Oracle registered: {"address":"0x068729ec4f46330d9Af83f2f5AF1B155d957BD42","indexes":["1","4","9"]}
Oracle registered: {"address":"0x9EE19563Df46208d4C1a11c9171216012E9ba2D0","indexes":["6","7","8"]}
Oracle registered: {"address":"0x04ab41d3d5147c5d2BdC3BcFC5e62539fd7e428B","indexes":["1","8","6"]}
Oracle registered: {"address":"0xeF264a86495fF640481D7AC16200A623c92D1E37","indexes":["6","4","2"]}
Oracle registered: {"address":"0x645FdC97c87c437da6b11b72471a703dF3702813","indexes":["7","2","9"]}
Oracle registered: {"address":"0xbE6f5bF50087332024634d028eCF896C7b482Ab1","indexes":["6","9","3"]}
Oracle registered: {"address":"0xcE527c7372B73C77F3A349bfBce74a6F5D800d8E","indexes":["9","1","2"]}
Oracle registered: {"address":"0x21ec0514bfFefF9E0EE317b8c87657E4a30F4Fb2","indexes":["0","9","8"]}
Oracle registered: {"address":"0xEAA2fc390D0eC1d047dCC1210a9Bf643d12de330","indexes":["4","1","0"]}
Oracle registered: {"address":"0xC5fa34ECBaF44181f1d144C13FBaEd69e76b80f1","indexes":["3","4","0"]}
Oracle registered: {"address":"0x4F388EE383f1634d952a5Ed8e032Dc27094f44FD","indexes":["5","4","2"]}
Oracle registered: {"address":"0xeEf5E3535aA39e0C2266BbA234E187adA9ed50A1","indexes":["7","6","4"]}
Oracle registered: {"address":"0x6008E128477ceEE5561fE2dEAdD82564d29fD249","indexes":["4","3","5"]}
