# Create an `assignmentToken`

In this individual coursework, you are expected to create and deploy an [ERC-20](https://eips.ethereum.org/EIPS/eip-20) token. You can achieve a maximum of **20 points** in this coursework.

## Instructions

### Coding smart contract

Create a token with the following features:

1. Mintability
   - The token can be minted (increasing supply)
   - Only a `minter` can mint the token
   - The original `minter` is the contract creator
   - A `minter` can transfer "mintership" to another address
1. Burnability
   - The token can be burned (reducing supply)
1. Capped supply
   - The initial supply of the token at contract creation is 50,000, which is credited to the contract creator's balance
   - The total supply of the token is capped at 1,000,000
1. Token transfer fee
   - A flat fee of 1 unit of the token is levied and rewarded to the `minter` with every transfer transaction (`mint` or `burn` not included)
   - A transfer transaction must be able to cover the transaction fee in order to succeed

You can find the skeleton code [here](assignmentTokenSkel.sol). You are recommended to use [Remix](https://remix.ethereum.org/) for composing the smart contract.

### Deploying smart contract

Deploy the completed smart contract on Kovan or Ropsten testnet and verify the contract code on Etherscan.

### Interacting with smart contract

Interact with the deployed smart contract by performing the following 5 transactions:

1. mint 60 new tokens to an address (say, address `XYZ`) other than the minter (say, address `ABC`)
1. burn 70 tokens from address `ABC`
1. approve address `XYZ` to spend up to 110 tokens from address `ABC`
1. transfer mintership to address `XYZ`
1. transfer 40 tokens with address `XYZ` from address `ABC` to a third address

## Deliverable

One PDF file that includes the following information:

1. Complete smart contract code: **12 points**

   - e.g.

   ```js
   contract MyToken {
   // total supply of token
   uint256 constant supply = 1000000;

   function allowance(address _owner, address _spender) public view returns (uint256 remaining) {
    remaining = allowances[_owner][_spender];
    return remaining;
   }
   }
   ```

1. Deployed smart contract url: **3 points**
   - e.g. https://kovan.etherscan.io/address/0x714adeedb372ce1307d69cca1dfc694a4ec587ed#code
1. Transaction urls (one url per transaction): **5 points**
   - e.g. transfer tokens: https://kovan.etherscan.io/tx/0x8e70f74b846f200b43ad27e10bd3bea9ef741be90f73b300fc24abaed22fc25e

## Deadline

You must upload your PDF onto [Moodle](https://moodle.ucl.ac.uk/mod/assign/view.php?id=2708943) by **16:00 (UK time) on Monday 22 February 2021**.
