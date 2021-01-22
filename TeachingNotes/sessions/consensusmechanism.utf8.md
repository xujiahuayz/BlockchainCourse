---
output:
  pdf_document: default
  html_document: default
---
## Recap

1. Why do we need blockchain?
try
```sh
echo '04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73' | xxd -ps -r
```
1. Double spending
1. Digital signature
1. Cryptographically secure hash function
1. Proof of work


# Bitcoin consensus algorithm (simplified)

## Proof-of-Work

1. New transactions are broadcast to all nodes. 
2. Each node collects new transactions into a block. 
3. In each round, a random node gets to broadcast its block. 
    - random: not selected, but through competition (**work**)
4. Other nodes accept the block only if all transactions in it are valid (unspent, valid signatures).
5. Nodes express their acceptance of the block by including its hash in the next block they create.

---

### What do miners compete to solve?

---


***Hash puzzle***

$$H(nonce \| PrevHash \| tx1 \| tx2 \|) < target$$



![A block on the Bitcoin blockchain hased in a merkle tree](figure/block.jpg){width=50%}

---

### Benefit of using Merkle tree

Efficiency in data validation and storage: checking and downloading in branches

---


Solving hash puzzles is probabilistic, because nobody can predict which nonce is going to solve the hash puzzle.

*recall*: Sybil attack

---

51% Attack?

---

Attacker  has to subvert not only **the consensus process** (by having 51% computing power) but also the cryptography!

---

### Adjustable difficulty level

- Average block time: 10 min
- Target recalculated every 2,016 blocks -- every two weeks.

---


## Fork

![A blockchain fork](figure/fork.png){width=50%}

Miners diverge and start adding blocks to two chain branches


***Heuristic***

Follow the longest chain

---


## Incentives

### Block reward

![Total supply of bitcoins with time. The block reward is cut in half every 4 years, limiting the total supply of bitcoins to 21 million. This is a simplified model and the actual curve looks slightly different, but it has the same 21 million limit.](figure/bitcoinsupply.jpg){width=60%}


---

### Transaction fee

- The initiator of any transaction can choose to make the transaction output(s) $<$ input(s). 
- Whoever creates the block that first puts that transaction into the block chain gets to collect the difference, which acts a transaction fee.

---

## One stone two birds:

1. Encourage block building
2. Encourage honest behavior

---

## The economics of mining


$$MiningReward = \underbrace{BlockReward + TransactionFee}_{\text{Probablistic}}$$
$$MiningCost = \underbrace{HardwareCost}_{\text{FixedCost}} + \underbrace{OperatingCosts}_{\text{Variable Cost}}$$


If $MiningReward > MiningCost$, then the miner makes a profit.


### Complications

- Other miners' hash rate?
- Denominations: USD/Bitcoin?
- Honest/dishonest?


---

***Research question***

Is the default miner behavior a *Nash equilibrium*? That is, does it represent a stable situation in which no miner can realize a higher payoff by deviating from honest behavior? [@Narayanan2016a]



# Other consensus mechanisms

## Proof of stake (PoS)

- Randomized block selection based on size of stake
    - Nxt
- Delegated proof of stake
    - EOSIO: Users stake `EOS` tokens to their favored block producers (BPs, 21 in total) and can choose to remove their stake at any time.
    - Tezos (Liquid Proof of Stake): number of consensus participants---or ``delegates''---changes.


## XRP Ledger Consensus Protocol (XRP LCP)

- Each user sets up its own unique node list of validators (UNL) that it will listen to during the consensus process. The validators determine which transactions are to
be added to the ledger.


# Bitcoin vs. Ethereum

## Record-keeping model

### BTC

![[UTXO (Unspent Transaction Output)](https://www.blockchain.com/btc/block/549244)](figure/BTCblock){width=85%}

Privacy through change addresses

---

### ETH

![[Account/Balance Model](https://etherscan.io/txs?block=4000000)](figure/ETHblock){width=85%}

Simple, intuitive.


## Language

### BTC

Bitcoin scripting

- Simple, not Turing complete

&nbsp;
<!-- force linebreak -->

**2 + 3 == 6?**

```
2 3 OP_ADD 6 OP_EQUAL
```

&nbsp;
<!-- force linebreak -->


**Transaction to Bitcoin address (pay-to-pubkey-hash, P2PKH)**

```
OP_DUP OP_HASH160 <371c...313> OP_EQUALVERIFY OP_CHECKSIG
```

where

`<371c...313>`: pubKeyHash.

`OP_DUP`: Duplicates the top stack item.

`OP_HASH160`: The input is hashed twice.

`OP_EQUALVERIFY`: `OP_EQUAL` + `OP_VERIFY`


---

### ETH

Solidity

- Sophisticated, Turing complete

&nbsp;
<!-- force linebreak -->


**Deposit to own account**

```
function deposit() payable {
  deposits[msg.sender] += msg.value;
};
```

# Decentralized autonomous organization (DAO)

## Company vs. DAO

**Company**

- Rules enforced top-down
- Difficulty to change the rules depends on the management team

**DAO**

- Rules hard coded, enforced digitally
- Technically difficult to change the rules once they are *deployed*

## The DAO

- Purpose: Crowd-funding
- Process
    - Investors pay ETH in exchange for DAO (representing voting rights)
    - Investors vote for projects and winning projects receive ETH from the DAO
- Vulnerability
    - Loophole: a smart contract retrieves ETH first and then update the balance
- Attack
    - retrieve ETH recursively before updating the balance
- Consequence
    - Hard fork: Ethereum vs Ethereum Classic


## Decentralized finance

### Decentralized exchange (DEX)

- DEXs on Ethereum
    - Automated market makers (AMM): Uniswap, Bancor ...
- DEXs on XRPL
    - Ledger gateway
    
### Trading platform

- fidentiaX: secondary life insurance trading on blockchain

### Lending platform

- Compound
- Aave

# Cross-platform communication

## Oracle

Data feed services that provide smart contracts with external information / off-chain information.


## Further reading


[Bitcoin Rap Battle Debate: Hamilton vs. Satoshi](https://www.youtube.com/watch?v=JaMJi1_1tkA){width="90%"}

<iframe width="640" height="360" src="https://www.youtube.com/embed/JaMJi1_1tkA" frameborder="0" allowfullscreen></iframe>
