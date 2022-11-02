import { ethers } from "hardhat";

async function main() {

    const storedAmount = ethers.utils.parseEther("10");

    const [vaultOwner, attackerAddr] = await ethers.getSigners();

    const Vault = await ethers.getContractFactory("Vault");
    const vault = await Vault.deploy();
    await vault.deployed();
    console.log(`Contract Vault deployed at address ${vault.address}`);

    await vault.store({ value: storedAmount });
    const value = await vault.balances(vaultOwner.address);
    console.log(`Stored: ${value} wei`);

    const Attack = await ethers.getContractFactory("Attack");
    const attack = await Attack.connect(attackerAddr).deploy(vault.address);
    await attack.deployed();
    console.log(`Contract Attacker deployed at address ${attack.address}`);

    const attackerBalance = await attack.getBalance()
    console.log(`Contract Attacker balance: ${attackerBalance}`)
    await attack.connect(attackerAddr).attack();
    console.log(`Attacker attacked`);

    console.log(`Contract Attacker balance: ${attackerBalance}`)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
