// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;

    event NewWave( address indexed from, uint256 timestamp, string message);

    struct Wave {
        address waver;
        string message;
        uint256 timestamp;
    }

    Wave[] waves;

    constructor() {
        console.log("This is a wave portal contract");
    }
    
    function wave(string memory _message) public {
        totalWaves += 1;
        console.log("%s has waved",  msg.sender);

        waves.push(Wave(msg.sender, _message, block.timestamp));

        emit NewWave(msg.sender, block.timestamp, _message);
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d waves!!!",  totalWaves);
        return totalWaves;
    }

}

// 0xc24cC5FD87f6f5Dd437678d401A3C6826A3759E1