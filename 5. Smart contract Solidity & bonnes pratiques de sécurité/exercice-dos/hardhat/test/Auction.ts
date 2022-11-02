import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";
import { Auction } from "../typechain-types/Auction";
import { Auction__factory } from "../typechain-types/factories/Auction__factory";


describe("Auction", () => {

    let auction: Auction;
    let owner: SignerWithAddress;
    let bidder1: SignerWithAddress;
    let bidder2: SignerWithAddress;
    let bidder3: SignerWithAddress;

    before(async () => {
        const Auction = await ethers.getContractFactory("Auction") as Auction__factory;
        [owner,
            bidder1,
            bidder2,
            bidder3] = await ethers.getSigners();
        auction = await Auction.deploy();
        await auction.deployed();
    })

    describe("Make some bid", () => {

        it("Should make 3 bid", async () => {
            await auction.connect(bidder1).bid({ value: 10 });
            let highestBidder = await auction.highestBidder();
            expect(highestBidder).to.equal(bidder1.address);
            await expect(auction.connect(bidder1).pullPayment()).to.be.revertedWith("You cannot withdraw");
            await expect(auction.connect(bidder2).pullPayment()).to.be.revertedWith("You have nothing to withdraw");
            await auction.connect(bidder2).bid({ value: 20 });
            highestBidder = await auction.highestBidder();
            expect(highestBidder).to.equal(bidder2.address);
            expect(highestBidder).to.equal(bidder2.address);
            await auction.connect(bidder1).pullPayment();
            await auction.connect(bidder3).bid({ value: 30 });
        })

    });

});
