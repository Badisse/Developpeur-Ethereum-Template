import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Spa", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    const CHIEN = {
      race: "chien",
      taille: 100,
      age: 5
    }

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Spa = await ethers.getContractFactory("Spa");
    const spa = await Spa.deploy();

    return { spa, CHIEN, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right animal", async function () {
      const { spa, CHIEN } = await loadFixture(deployFixture);

      await spa.Add(CHIEN.race, CHIEN.taille, CHIEN.age);

    });
  });
});
