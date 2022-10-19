// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract ValueTypes {
    bool public value = true;

    // unit is a unsigned integer, which means it cannot store values less than zero
    // unit = unit 256, unit 256 stores values from 0 to 2**256 - 1
    // unit8 stores from 0 to 2**8 - 1
    // unit16 stores from 0 to 2**16 - 1
    uint256 public num = 123;

    // to assign negative values to a variable we can use int
    // int = int256  -2**255 to 2**255 - 1
    // int128  -2**127 to 2**127 - 1
    int256 public num2 = -20;

    // to find min and max value of int we can use
    int256 public minInt = type(int256).min;
    int256 public maxInt = type(int256).max;

    // address value-type is used to store address
    address public addr = 0xA25c5bE1324764573dE0a14ABFe0279B4291adfA;

    // bytes32
    bytes32 public b32 =
        0x626c756500000000000000000000000000000000000000000000000000000000;
}
