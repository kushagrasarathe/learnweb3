// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;
    constructor() {
        console.log("This is a wave portal contract");
    }
    
    function wave() public {
        totalWaves += 1;
        console.log("%s has waved",  msg.sender);
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d waves!!!",  totalWaves);
        return totalWaves;
    }

}

// 0xc24cC5FD87f6f5Dd437678d401A3C6826A3759E1