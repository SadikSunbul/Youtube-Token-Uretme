require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

const PRIVATE_KEY = process.env.AvaxTestPK;

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      outputSelection: {
        "*": {
          "*": [
            "abi",
            "evm.bytecode",
            "evm.deployedBytecode",
            "evm.methodIdentifiers",
            "metadata",
          ],
          "": ["ast"],
        },
      },
    },
  },
  defaultNetwork: "fuji",
  networks: {
    snowtrace: {
      url: "https://api.avax.network/ext/bc/C/rpc",
      accounts: [`${PRIVATE_KEY}`],
    },
    fuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      accounts: [`${PRIVATE_KEY}`],
    },
  },
  // etherscan: {
  //   apiKey: {
  //     snowtrace: "snowtrace", // apiKey is not required, just set a placeholder
  //   },
  //   customChains: [
  //     {
  //       network: "snowtrace",
  //       chainId: 43114,
  //       urls: {
  //         apiURL: "https://api.routescan.io/v2/network/mainnet/evm/43114/etherscan",
  //         browserURL: "https://snowtrace.io"
  //       }
  //     }
  //   ]
  // },

  etherscan: {
    apiKey: {
      fuji: "avascan", // apiKey is not required, just set a placeholder
    },
    customChains: [
      {
        network: "fuji",
        chainId: 43113,
        urls: {
          apiURL:
            "https://api.avascan.info/v2/network/testnet/evm/43113/etherscan",
          browserURL: "https://testnet.avascan.info/blockchain/c",
        },
      },
    ],
  },
};