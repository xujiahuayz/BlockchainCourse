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
    function Ownable() public {
    owner = msg.sender;
  }

modifier onlyOwner(){
    require(msg.sender == owner);
    _;
  }


 function mint(address _to, uint256 _amount) onlyOwner canMint public returns (bool) {
    totalSupply = totalSupply.add(_amount);
    balances[_to] = balances[_to].add(_amount);
    Transfer(0X0, _to, _amount);
    return true;
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
