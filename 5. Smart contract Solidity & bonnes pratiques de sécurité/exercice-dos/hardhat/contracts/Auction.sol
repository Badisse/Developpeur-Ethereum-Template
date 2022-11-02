pragma solidity 0.8.17;

contract Auction {
    address public highestBidder;
    uint public highestBid;
    mapping(address => uint) public bidders;

    function bid() payable public {
        require(msg.value >= highestBid);

        highestBidder = msg.sender;
        highestBid = msg.value;
        bidders[msg.sender] = msg.value;
    }

    function pullPayment() external {
        require(bidders[msg.sender] != 0, "You have nothing to withdraw");
        require(msg.sender != highestBidder, "You cannot withdraw");
        uint refund = bidders[msg.sender];
        bidders[msg.sender] = 0;
        (bool success, ) = msg.sender.call{value:refund}("");
        require(success);
        
    }
}
