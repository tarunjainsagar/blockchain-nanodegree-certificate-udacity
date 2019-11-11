var HDWalletProvider = require('truffle-hdwallet-provider');

var mnemonic = 'comfort harbor okay stool erode mercy general outer bonus sibling grain install';

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: "*",
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/v3/e7468c92185745ababdaf263faea2dd0')
      },
      network_id: 4,
      gas: 6700000,
      gasPrice: 10000000000,
    }
  }
};

