// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract MoodDairy {
    string mood;

    // function to write mood to contract
    function setMood(string memory _mood) public {
        mood = _mood;
    }

    // function to get mood from contract
    function getMood() public view returns(string memory) {
        return mood;
    }

}

// contract address
// 0xBEc66a04bF5c35F0086b6F8f793A3bcaD0EC2656

// abi

// [
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "string",
// 				"name": "_mood",
// 				"type": "string"
// 			}
// 		],
// 		"name": "setMood",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "getMood",
// 		"outputs": [
// 			{
// 				"internalType": "string",
// 				"name": "",
// 				"type": "string"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	}
// ]