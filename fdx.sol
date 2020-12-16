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

