// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;
    uint256 private seed;

    event NewWave(address indexed from, uint256 timestamp, string message);

    struct Wave {
        address waver;
        string message;
        uint256 timestamp;
    }

    Wave[] waves;

    mapping (address => uint256) public lastWavedAt;

    constructor() payable {
        console.log("This is a wave portal contract");

        seed = (block.timestamp + block.difficulty) % 100;
    }

    function wave(string memory _message) public {

        require (lastWavedAt[msg.sender] + 15 minutes < block.timestamp, "Wait 15mins");

        lastWavedAt[msg.sender] = block.timestamp;

        totalWaves += 1;
        console.log("%s has waved", msg.sender);

        waves.push(Wave(msg.sender, _message, block.timestamp));

        seed = (block.difficulty + block.timestamp + seed) % 100;
        console.log("Random # generated %d", seed);

        if (seed < 50) {
            console.log("%s won!", msg.sender);

            uint256 prizeAmount = 0.00001 ether;

            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than the contract has."
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
        }

        emit NewWave(msg.sender, block.timestamp, _message);
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d waves!!!", totalWaves);
        return totalWaves;
    }
}

// 0xc24cC5FD87f6f5Dd437678d401A3C6826A3759E1
