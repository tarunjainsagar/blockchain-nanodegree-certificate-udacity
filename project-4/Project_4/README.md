Framework used: Express Node JS Framework

# GET Endpoint: http://localhost:8000/api/block/<block_height>

Success Response: 
{
   "hash":"0bd0bc4b7b53b7bba17fa0e6f07b0c472942b9cd63532d2327c4509926136d30",
   "height":4,
   "body":"Test Data #4",
   "time":"1559238759",
   "previousBlockHash":"65849d1261229ae3b4f78d3663733c75c8eabc9e80bdf02318c7cb0a375292cb"
}

Failure Response:
Invalid height index!!!


# POST Endpoint: http://localhost:8000/api/block
# POST Parameter: Key -> "data" (mandatory string parameter)
Success Response:
{
   "hash":"118479787758785f5015f7553944a895fc63409f04050e301696f88574d2fd82",
   "height":10,
   "body":"123",
   "time":"1559238874",
   "previousBlockHash":"45089e9faad988be803d5be8bfccd8d5fbbb97396afa829f9cee0682a30403ca"
}

Failure Response:
Invalid post request, Please provide data for block!!!

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
1: Open a command prompt or shell terminal after install node.js.
2: Enter a node session, also known as REPL (Read-Evaluate-Print-Loop).
```
3. To start the application, run the command:
node app.js
```
4. This will initialize the blockchain for the first time by adding 10 blocks to the blockchain. You will see a chaindata db in your working directory.
```
5. If you close the server and restart, the initialization will not happen. Chain saved in chaindata db will be picked up.
```
6. Try GET api using endpoint: http://localhost:8000/api/block/<block_height>, This will retrieve json data for the block at height, <block_height>, In case if the invalid height is provided, error message will be shown.
```
7. Try POST api using endpoint: http://localhost:8000/api/block, The post data should contain key "data" and value as "string", the api will add the block to chain and return the saved block's data.