// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    constructor() ERC20("Token Name", "SYMBOL") {
        _mint(msg.sender, 100 * 1e18);
    }
}
