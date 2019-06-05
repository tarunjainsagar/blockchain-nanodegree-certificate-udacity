const hex2ascii = require("hex2ascii");
const BodyObjectClass = require("./BodyObject.js");
const BlockClass = require("./Block.js");
const MemPoolClass = require("./MemPool.js");
const BlockModelClass = require("./BlockChainModel.js");

/**
 * Controller Definition to encapsulate routes to work with blocks
 */
class BlockController {
  /**
   * Constructor to create a new BlockController, you need to initialize here all your endpoints
   * @param {*} app
   */
  constructor(app) {
    this.app = app;
    this.memPool = new MemPoolClass.MemPool();
    this.chain = new BlockModelClass.BlockChain();
    this.getStarByHash();
    this.getStarByAddress();
    this.getBlockByIndex();
    this.postNewBlock();
    this.requestValidation();
    this.validateRequestByWallet();
  }

  getDecodedBlock(block) {
    console.log(block);
    block = JSON.parse(block);
    block.body.star.storyDecoded = hex2ascii(block.body.star.story);
    return block;
  }

  /**
   * Implement a GET Endpoint to retrieve a block by index, url: "/block/:index"
   */
  getBlockByIndex() {
    this.app.get("/block/:index", (req, res) => {
      this.chain.getBlockHeight().then(height => {
        // check if height parameter is out of bound
        if (height >= req.params.index) {
          this.chain.getBlock(req.params.index).then(block => {
            res.send(this.getDecodedBlock(block));
          });
        } else {
          res.send("Invalid height index!!!");
        }
      });
    });
  }

  /**
   * Implement a GET Endpoint to retrieve a block by index, url: "/stars/hash:index"
   */
  getStarByHash() {
    this.app.get("/stars/hash::index", (req, res) => {
      this.chain.getBlockByHash(req.params.index).then(block => {
        if (block == null) {
          res.send("No block found for hash: " + req.params.index);
        } else {
          res.send(this.getDecodedBlock(block));
        }
      });
    });
  }

  /**
   * Implement a GET Endpoint to retrieve a block by index, url: "/stars/address:index"
   */
  getStarByAddress() {
    this.app.get("/stars/address::index", (req, res) => {
      this.chain.getBlocksByAddress(req.params.index).then(blocks => {
        if (typeof blocks !== "undefined" && blocks.length > 0) {
          let decodedBlocks = [];
          for (var i = 0; i < blocks.length; i++) {
            console.log(i);
            decodedBlocks.push(this.getDecodedBlock(blocks[i]));
          }
          res.send(decodedBlocks);
        } else {
          res.send("No blocks found for address: " + req.params.index);
        }
      });
    });
  }

  /**
   * Implement a POST Endpoint to add a new Block, url: "/api/block"
   */
  postNewBlock() {
    this.app.post("/block", (req, res) => {
      // Check if content has data and it is string only
      let walletAddress = req.body.address;
      let starInput = JSON.parse(req.body.star);
      try {
        if (
          walletAddress &&
          starInput &&
          starInput.story != undefined &&
          (typeof walletAddress === "string" || walletAddress instanceof String)
        ) {
          let body = new BodyObjectClass.BodyObject(walletAddress, starInput);
          let valid = this.memPool.isValidRequest(walletAddress);
          if (valid) {
            let blockAux = new BlockClass.Block(body);
            this.chain.addNewBlock(blockAux).then(block => {
              this.memPool.cleanUpValidationRequest(walletAddress);
              res.send(this.getDecodedBlock(block));
            });
          } else {
            res.send("Request not found in Valid Pool!!!");
          }
        } else {
          res.send(
            "Invalid post request, Please provide wallet address and valid star details!!!"
          );
        }
      } catch (e) {
        res.send(
          "Invalid post request, Please provide wallet address and star details for block!!! \nException: " +
            e
        );
      }
    });
  }

  /**
   * Implement add validation api
   */
  requestValidation() {
    this.app.post("/requestValidation", (req, res) => {
      let walletAddress = req.body.address;
      if (
        walletAddress &&
        (typeof walletAddress === "string" || walletAddress instanceof String)
      ) {
        res.send(this.memPool.addRequestValidation(walletAddress));
      } else {
        res.send(
          "Invalid add validation request, Please provide wallet address!!!"
        );
      }
    });
  }

  /**
   * Implement request validation api
   */
  validateRequestByWallet() {
    this.app.post("/message-signature/validate", (req, res) => {
      let walletAddress = req.body.address;
      let signature = req.body.signature;
      if (
        walletAddress &&
        signature &&
        (typeof walletAddress === "string" ||
          walletAddress instanceof String) &&
        (typeof signature === "string" || signature instanceof String)
      ) {
        res.send(
          this.memPool.validateRequestByWallet(walletAddress, signature)
        );
      } else {
        res.send(
          "Invalid validate request, Please provide address and signature!!!"
        );
      }
    });
  }

}

/**
 * Exporting the BlockController class
 * @param {*} app
 */
module.exports = app => {
  return new BlockController(app);
};
