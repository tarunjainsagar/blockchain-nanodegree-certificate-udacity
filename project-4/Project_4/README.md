Framework used: Express Node JS Framework

```
Dependencies:
```

"base-58": "0.0.1",
```
"bitcoinjs-lib": "^5.0.5",
```
"bitcoinjs-message": "^2.0.0",
```
"body-parser": "^1.19.0",
```
"buffer-from": "^1.1.1",
```
"crypto-js": "^3.1.9-1",
```
"express": "^4.17.1",
```
"hex2ascii": "0.0.3",
```
"level": "^5.0.1"

# GET Endpoint: http://localhost:8000/block/<block_height>
```
Success Response:
```
{"hash":"ab6f0b481f8f679a9826c02ee7d0aa4f492192f7ef0e78167d09ad4ef9061a9f","height":10,"body":{"star":{"ra":"16h 29m 1.0s","dec":"68° 52' 56.9","story":"466f756e642073746172207573696e672068747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f","storyDecoded":"Found star using https://www.google.com/sky/"},"address":"1PwHMTZiHxWTaactUAwSXQxJYjf6nAtTGQ"},"time":"1559753852","previousBlockHash":"c60e927a9fa13ba600f44232d4b7c1fc6c94732158be9734d90071aec83ba3d7"}

```
Failure Response:
```
Invalid height index!!!

# GET Endpoint: http://localhost:8000/stars/hash:<block_hash>

```
Success Response:
```
{"hash":"1cacedb958a438ecef3badccd91a99a8d14df8d2823c79a7f75c154d71286a42","height":11,"body":{"star":{"ra":"16h 29m 1.0s","dec":"68° 52' 56.9","story":"5365636f6e64207374617220466f756e642073746172207573696e672068747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f","storyDecoded":"Second star Found star using https://www.google.com/sky/"},"address":"1PwHMTZiHxWTaactUAwSXQxJYjf6nAtTGQ"},"time":"1559759329","previousBlockHash":"ab6f0b481f8f679a9826c02ee7d0aa4f492192f7ef0e78167d09ad4ef9061a9f"}

```
Failure Response:
```
No block found for hash: 1cacedb958a438ecef3badccd91a99a8d14df8d2823c79a7f75c154d71286a421

# GET Endpoint: http://localhost:8000/stars/address:<walletAddress>

```
Success Response:
```
[{"hash":"ab6f0b481f8f679a9826c02ee7d0aa4f492192f7ef0e78167d09ad4ef9061a9f","height":10,"body":{"star":{"ra":"16h 29m 1.0s","dec":"68° 52' 56.9","story":"466f756e642073746172207573696e672068747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f","storyDecoded":"Found star using https://www.google.com/sky/"},"address":"1PwHMTZiHxWTaactUAwSXQxJYjf6nAtTGQ"},"time":"1559753852","previousBlockHash":"c60e927a9fa13ba600f44232d4b7c1fc6c94732158be9734d90071aec83ba3d7"},{"hash":"1cacedb958a438ecef3badccd91a99a8d14df8d2823c79a7f75c154d71286a42","height":11,"body":{"star":{"ra":"16h 29m 1.0s","dec":"68° 52' 56.9","story":"5365636f6e64207374617220466f756e642073746172207573696e672068747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f","storyDecoded":"Second star Found star using https://www.google.com/sky/"},"address":"1PwHMTZiHxWTaactUAwSXQxJYjf6nAtTGQ"},"time":"1559759329","previousBlockHash":"ab6f0b481f8f679a9826c02ee7d0aa4f492192f7ef0e78167d09ad4ef9061a9f"}]

```
Failure Response:
```
No blocks found for address: 1PwHMTZiHxWTaactUAwSXQxJYjf6nAtTGQ1

# POST Endpoint: http://localhost:8000/requestValidation
```

POST Parameter: Key -> "address" (mandatory string parameter)

```
Sample Input:
```
"address": "19xaiMqayaNrn3x7AjV5cU4Mk5f5prRVpL"

```
Success Response:
```
{
    "walletAddress": "1PwHMTZiHxWTaactUAwSXQxJYjf6nAtTGQ",
    "requestTimeStamp": "1559759344",
    "message": "1PwHMTZiHxWTaactUAwSXQxJYjf6nAtTGQ:1559759344:starRegistry",
    "validationWindow": 300
}
```

Failure Response:
```
"Invalid add validation request, Please provide wallet address!!!"


# POST Endpoint: http://localhost:8000/message-signature/validate

```
POST Parameter: Key -> "address" (mandatory string parameter)
```
POST Parameter: Key -> "signature" (mandatory string parameter)

```
Success Response:
```
{
    "registerStar": true,
    "status": {
        "walletAddress": "1PwHMTZiHxWTaactUAwSXQxJYjf6nAtTGQ",
        "requestTimeStamp": "1559759285",
        "message": "1PwHMTZiHxWTaactUAwSXQxJYjf6nAtTGQ:1559759285:starRegistry",
        "validationWindow": 274,
        "messageSignature": true
    }
}

```
Failure Response:
```
Invalid validate request, No such wallet address found !!!

# POST Endpoint: http://localhost:8000/block

```
POST Parameter: Key -> "address" (mandatory string parameter)
```
POST Parameter: Key -> "star" (mandatory json parameter, with "story" as must have key in star json)

```
Sample Input:
```
{
"address": "19xaiMqayaNrn3x7AjV5cU4Mk5f5prRVpL",
    "star": {
            "dec": "68° 52' 56.9",
            "ra": "16h 29m 1.0s",
            "story": "Found star using https://www.google.com/sky/"
        }
}

```
Success Response:
```
{
    "hash": "1cacedb958a438ecef3badccd91a99a8d14df8d2823c79a7f75c154d71286a42",
    "height": 11,
    "body": {
        "star": {
            "ra": "16h 29m 1.0s",
            "dec": "68° 52' 56.9",
            "story": "5365636f6e64207374617220466f756e642073746172207573696e672068747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f",
            "storyDecoded": "Second star Found star using https://www.google.com/sky/"
        },
        "address": "1PwHMTZiHxWTaactUAwSXQxJYjf6nAtTGQ"
    },
    "time": "1559759329",
    "previousBlockHash": "ab6f0b481f8f679a9826c02ee7d0aa4f492192f7ef0e78167d09ad4ef9061a9f"
}

```
Failure Response:
```
Request not found in Valid Pool!!!

### Configuring your project

- Use NPM to initialize your project and create package.json to store project dependencies.

```
npm init
```

- Install crypto-js with --save flag to save dependency to our package.json file

```
npm install crypto-js --save
```

- Install level with --save flag

```
npm install level --save
```

- Install express framework with --save flag

```
npm install express --save
```

## Testing

To test code:

```
1: Open a command prompt or shell terminal after install node.js.

```
2: Enter a node session, also known as REPL (Read-Evaluate-Print-Loop).

```
3. To start the application, run the command:
node app.js
```