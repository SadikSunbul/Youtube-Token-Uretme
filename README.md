# YouTube Token Üretme

Bu repo, en basit şekilde nasıl token üretebileceğinizi gösterir.

## Adım 1: Node.js ve npm Kurulumu

Öncelikle bilgisayarınızda Node.js ve npm'in yüklü olması gerekmektedir. [Node.js İndirme Sayfası](https://nodejs.org/)

## Adım 2: Solidity SDK Kurulumu

Bilgisayarınızda Solidity SDK'sının yüklü olması gerekmektedir. Yükleme için [Solidity Dokümantasyonu](https://docs.soliditylang.org/en/latest/installing-solidity.html) adresini ziyaret edebilirsiniz.

## Adım 3: Proje Dizini ve Başlatma

Proje dizinine gidin ve yeni bir npm projesi başlatın:
```bash
npm init --yes 
```

## Adım 4: Hardhat Kurulumu

Projede işleri kolaylaştıracak Hardhat kütüphanesini kurun:
```bash
npm install --save-dev hardhat
```

## Adım 5: Hardhat Projesi Oluşturma
Hardhat projesini başlatmak için aşağıdaki komutu çalıştırın:
```bash
npx hardhat
```
Bu komutun çalışmaması durumunda şu komutu deneyin:

```bash
npx hardhat init
```
Sonrasında "Create a JavaScript project" seçeneğini seçin ve gelen bilgilere "yes" diyerek ilerleyin.

## Adım 6: Diğer Kütüphaneler
Gerekli diğer kütüphaneleri kurun:
```bash
npm install @openzeppelin/contracts
npm install @nomiclabs/hardhat-etherscan
npm install dotenv
```
 
 ## Adım 7: Proje Yapılandırması

Dosyayı VsCode ile açın ve hardhat.config.js dosyasını açın ve şunu yapiştırın 
```js
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
```

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    constructor() ERC20("Test", "T") {
        _mint(msg.sender, 100 * 1e18);
    }
}
```

## Adım 8: .env yapılandırın

.env adında bir dosya oluşturun ve içerisine şunu yapıştırın

```js
AvaxTestRPC="https://api.avax-test.network/ext/bc/C/rpc"

AvaxTestPK="senin private keyin"
```

## Adım 9: Deploy Script
tokeni blockchaine dağıtmak için scripts adında bir kalsor olusturun ierisinede token.s.js adında bir dosya olusurun ve şunu yapıştırın 

```js
const { ethers } = require("hardhat");

async function main() {
    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy();

    console.log("Contract address:", token.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
```

## Adım 10: Derle ve Dağıt

```bash
 npx hardhat compile
 npx hardhat run scripts/token.s.js

```

## Avax fuji testnet rpc
https://chainlist.org/chain/43113

## Avax snowtrac contract onaylama
https://docs.avascan.info/tutorial/deploy-and-verify-an-erc-20-token