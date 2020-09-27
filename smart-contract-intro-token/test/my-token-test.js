const MyToken = artifacts.require("MyToken");

const totalSupply = 1000000;
const amount = 10;

async function assertRevert(f) {
  let shouldFail = false;
  try {
    await f();
    shouldFail = true;
  } catch (err) {
    shouldFail = err.message.indexOf("VM Exception") === -1;
  }
  if (shouldFail) {
    throw new Error("should have reverted but did not");
  }
}

contract("MyToken", function (accounts) {
  beforeEach(async function () {
    this.token = await MyToken.deployed({ from: accounts[0] });
  });

  describe("totalSupply", function () {
    it("should return 1 million", async function () {
      const supply = await this.token.totalSupply.call();
      assert.equal(supply, totalSupply);
    });
  });

  describe("balanceOf", function () {
    it("should return balance of the given account", async function () {
      const ownerBalance = await this.token.balanceOf.call(accounts[0]);
      assert.equal(ownerBalance, totalSupply);

      const otherBalance = await this.token.balanceOf.call(accounts[1]);
      assert.equal(otherBalance, 0);
    });
  });

  describe("transfer", function () {
    it("shoud revert if the balance is too low", async function () {
      await assertRevert(async () => {
        await this.token.transfer.call(accounts[1], totalSupply + 1);
      });
    });

    describe("on success", function () {
      before(async function () {
        this.sender = accounts[0];
        this.receiver = accounts[1];
        this.senderInitialBalance = (await this.token.balanceOf.call(this.sender)).toNumber();
        this.receiverInitialBalance = (await this.token.balanceOf.call(this.receiver)).toNumber();
        this.result = await this.token.transfer(this.receiver, amount, { from: this.sender });
      });

      it("should return true", async function () {
        const res = await this.token.transfer.call(this.receiver, amount);
        assert.equal(res, true);
      })

      it("should subtract tokens from sender balance", async function () {
        const senderBalance = await this.token.balanceOf.call(this.sender);
        assert.equal(senderBalance, this.senderInitialBalance - amount);
      });

      it("should add tokens to receiver balance", async function () {
        const receiverBalance = await this.token.balanceOf.call(this.receiver);
        assert.equal(receiverBalance, this.receiverInitialBalance + amount);
      });

      it("should emit correct event", function () {
        for (const log of this.result.logs) {
          if (log.event === "Transfer") {
            assert.equal(log.args._from, accounts[0]);
            assert.equal(log.args._to, accounts[1]);
            assert.equal(log.args._value, amount);
            return;
          }
        }
        assert.fail("Transfer event has not been emitted");
      });
    });
  });

  describe("allowance", function () {
    it("should return allowance", async function () {
      const allowance = await this.token.allowance.call(accounts[0], accounts[1]);
      assert.equal(allowance, 0);
    });
  });

  describe("approve", function () {
    before(async function () {
      this.result = await this.token.approve(accounts[1], amount);
    });

    it("should return true", async function () {
      const res = await this.token.approve.call(accounts[1], amount);
      assert.equal(res, true);
    });

    it("should set allowance", async function () {
      const allowance = await this.token.allowance.call(accounts[0], accounts[1]);
      assert.equal(allowance, amount);
    });

    it("should override allowance", async function () {
      await this.token.approve(accounts[1], 123);
      const allowance = await this.token.allowance.call(accounts[0], accounts[1]);
      assert.equal(allowance, 123);
    });

    it("should not modify other allowances", async function () {
      let allowance = await this.token.allowance.call(accounts[0], accounts[2]);
      assert.equal(allowance, 0);
      allowance = await this.token.allowance.call(accounts[1], accounts[0]);
      assert.equal(allowance, 0);
    });

    it("should emit an Approval event", function () {
        for (const log of this.result.logs) {
          if (log.event === "Approval") {
            assert.equal(log.args._owner, accounts[0]);
            assert.equal(log.args._spender, accounts[1]);
            assert.equal(log.args._value, amount);
            return;
          }
        }
        assert.fail("Approval event has not been emitted");
    });
  });

  describe("transferFrom", function () {
    before(async function () {
      this.token.transfer(accounts[1], 1000);
    });

    it("shoud revert if the balance is too low", async function () {
      await assertRevert(async () => {
        await this.token.transferFrom.call(accounts[0], accounts[1], totalSupply + 1);
      });
    });

    it("shoud revert if the allowance is too low", async function () {
      await assertRevert(async () => {
        await this.token.transferFrom.call(accounts[1], accounts[0], amount);
      });
    });

    describe("on success", function () {
      before(async function () {
        this.sender = accounts[1];
        this.receiver = accounts[0];
        this.allowance = 100;
        this.senderInitialBalance = (await this.token.balanceOf.call(this.sender)).toNumber();
        this.receiverInitialBalance = (await this.token.balanceOf.call(this.receiver)).toNumber();
        this.token.approve(accounts[0], this.allowance, { from: this.sender });
        this.result = await this.token.transferFrom(this.sender, this.receiver, amount);
      });

      it("should return true", async function () {
        const res = await this.token.transferFrom.call(this.sender, this.receiver, amount);
        assert.equal(res, true);
      })

      it("should subtract tokens from sender balance", async function () {
        const senderBalance = await this.token.balanceOf.call(this.sender);
        assert.equal(senderBalance, this.senderInitialBalance - amount);
      });

      it("should add tokens to receiver balance", async function () {
        const receiverBalance = await this.token.balanceOf.call(this.receiver);
        assert.equal(receiverBalance, this.receiverInitialBalance + amount);
      });

      it("should update allowance", async function () {
        const newAllowance = await this.token.allowance.call(this.sender, this.receiver);
        assert.equal(newAllowance, this.allowance - amount);
      });

      it("should emit a Transfer event", function () {
        for (const log of this.result.logs) {
          if (log.event === "Transfer") {
            assert.equal(log.args._from, this.sender);
            assert.equal(log.args._to, this.receiver);
            assert.equal(log.args._value, amount);
            return;
          }
        }
        assert.fail("Transfer event has not been emitted");
      });
    });
 });
});
