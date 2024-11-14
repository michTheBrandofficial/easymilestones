// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import { Script, console } from "forge-std/Script.sol";
import { EasyMilestones } from "../src/EasyMilestones.sol";

contract EasyMilestonesScript is Script {
  EasyMilestones public easyMilestones;

  function setUp() public { }

  function run() public {
    vm.startBroadcast();
    easyMilestones = new EasyMilestones();
    vm.stopBroadcast();
  }
}
