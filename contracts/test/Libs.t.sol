// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import { Test, console } from "forge-std/Test.sol";
import { Set } from "../src/Libs.sol";

contract SetTest is Test {
  Set owner_set;
  address address_1 = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;
  address address_2 = 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC;

  function setUp() public {
    owner_set = new Set();
  }

  function test_Set_Has_Address() public {
    owner_set.add(address_1);
    assertEq(owner_set.has(address_1), true);
  }

  function test_Set_Can_Turn_To_Array() public {
    owner_set.add(address_1);
    console.log(owner_set.toArray()[0]);
    assertEq(owner_set.toArray().length, 1);
  }
}
