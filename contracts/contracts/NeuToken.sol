// SPDX-License-Identifier: ISC
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NeuToken is ERC20, Ownable {
    constructor() ERC20("NeuToken", "NEUT") Ownable(msg.sender) {}

    // Mint new tokens to a user (only owner can mint)
    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}
