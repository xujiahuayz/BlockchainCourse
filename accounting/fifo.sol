pragma solidity ^0.7.0;


contract FIFO {
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
        // cost of goods sold
        int cogs = inventory[0];
        
        // calculate profit of this sale
        int profit = salePrice - cogs;
        
        // remove the first element in the `inventory` array
        for(uint i = 0; i < inventory.length - 1; i++) {
            inventory[i] = inventory[i+1];
        }
        inventory.pop();
        
        // add an element into the `profits` array
        profits.push(profit);
    }
}
