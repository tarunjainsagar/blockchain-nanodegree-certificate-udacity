const SHA256 = require("crypto-js/sha256");
const BlockClass = require("./Block.js");
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
    this.chain = new BlockModelClass.BlockChain();
    this.initializeMockData();
    this.getBlockByIndex();
    this.postNewBlock();
  }

  /**
   * Implement a GET Endpoint to retrieve a block by index, url: "/api/block/:index"
   */
  getBlockByIndex() {
    this.app.get("/api/block/:index", (req, res) => {

      // check if height parameter is out of bound

      this.chain.getBlock(req.params.index).then(block => {
        res.send(JSON.parse(block));
      });
    });
  }

  /**
   * Implement a POST Endpoint to add a new Block, url: "/api/block"
   */
  postNewBlock() {
    this.app.post("/api/block", (req, res) => {
      // Check if content has data and it is string only

      let blockAux = new BlockClass.Block(req.body.data);
      blockAux.height = this.blocks.length;
      blockAux.hash = SHA256(JSON.stringify(blockAux)).toString();
      this.chain.addNewBlockWithValue(JSON.stringify(blockAux)).then(block => {
        res.send(JSON.parse(block));
      });
    });
  }

  /**
   * Help method to inizialized Mock dataset, adds 10 test blocks to the blocks array
   */
  initializeMockData() {
    // if (this.chain.getBlockHeight() === 0) {
    //   for (let index = 0; index < 10; index++) {
    //     let blockAux = new BlockClass.Block(`Test Data #${index}`);
    //     blockAux.height = index;
    //     blockAux.hash = SHA256(JSON.stringify(blockAux)).toString();
    //     this.chain.addNewBlockWithValue(blockAux);
    //   }
    // }
    this.chain.getBlockHeight().then(async height => {
      if (height == 0) {
        for (var index = 0; index < 10; index++) {
          try {
            let blockAux = new BlockClass.Block(`Test Data #${index}`);
            blockAux.height = index;
            blockAux.hash = SHA256(JSON.stringify(blockAux)).toString();
            await this.chain.addNewBlockWithValue(JSON.stringify(blockAux));
          } catch (e) {
            console.log("Found error :", e);
          }
        }
        console.log("Added all blocks !!!");
      } else {
        console.log("Chain is already initialized !!!");
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
