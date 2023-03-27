// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LPT is Ownable, ERC20("LPT", "LPT") {
    constructor(uint256 _value) {
        _mint(msg.sender, _value);
    }

    function mint(address _account, uint256 _amount) external onlyOwner {
        _mint(_account, _amount);
    }
}
