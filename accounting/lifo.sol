// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;


contract LIFO {
  // initialize inventory balance with an empty array
  int[] inventory;
  int[] profits;
  
    function getInventory() public view returns(int[] memory) {
        return inventory;
    }
    
    function getProfits() public view returns(int[] memory) {
        return profits;
    }
    
    function addInventory(int inventoryAdded) public {
        inventory.push(inventoryAdded);
    }

    function sellInventory(int salePrice) public {
        // calculate profit of this sale
        int profit = salePrice - inventory[inventory.length - 1];
        
        // remove the last element in the `inventory` array
        inventory.pop();
        
        // add an element into the `profits` array
        profits.push(profit);
    }
}
