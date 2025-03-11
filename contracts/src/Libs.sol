// SPDX-License-Identifier: GPL 3.0
pragma solidity ^0.8.24;

import "forge-std/console.sol";

contract Set {
  mapping(address => bool) internal addedValuesMapping;
  address[] internal addedValuesList;

  /// @dev adds an address to a list if the list doesn't have it
  function add(address value) public {
    if (!addedValuesMapping[value]) {
      addedValuesMapping[value] = true;
      addedValuesList.push(value);
    }
  }

  function has(address value) public view returns (bool) {
    return bool(addedValuesMapping[value]);
  }

  function toArray() public view returns (address[] memory) {
    return addedValuesList;
  }
}
