pragma solidity ^0.7.0;


contract AVCO {
  // initialize inventory balance with an empty array
  struct Inventory{
      int value;
      int count;
  }
  
  Inventory inventory;
  int[] profits;
  
    function getInventory() public view returns(int, int) {
        return (inventory.value, inventory.count);
    }
    
    
    function getProfits() public view returns(int[] memory) {
        return profits;
    }
    
    function addInventory(int inventoryAdded) public {
        inventory.value += inventoryAdded;
        inventory.count += 1;
    }


    function sellInventory(int salePrice) public {
        // cost of goods sold
        int cogs = inventory.value/inventory.count;
        
        // calculate profit of this sale
        int profit = salePrice - cogs;
        
        inventory.count -= 1;
        
        inventory.value -= cogs;
        
        // add an element into the `profits` array
        profits.push(profit);
    }
}
