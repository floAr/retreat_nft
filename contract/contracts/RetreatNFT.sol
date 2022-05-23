//SPDX-License-Identifier: MIT

// @title: Nifty Island Retreat NFT
// @authors: @spencerobsitnik, Fl0ar, TheWisestOne

//  _ __                  ___     _               
// ( /  )o  /)_/_        ( /     //              /
//  /  /,  // /  __  ,    / (   // __,  _ _   __/ 
// /  (_(_//_(__/ (_/_  _/_/_)_(/_(_/(_/ / /_(_/_ 
//       /)        /                              
//      (/        '                               

pragma solidity ^0.8.4;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NiftyRetreatNFT is ERC721A, Ownable, ReentrancyGuard {

    string public _tokenUriBase;
    uint256 public _maxTokens;


    constructor() ERC721A("Nifty Retreat NFT", "NIFTY") {        
        // set ipfs base url
        _tokenUriBase = "ipfs://IPFS_BASE_URL";
    }

    // ------- Public read-only function --------
    function getBaseURI() external view returns (string memory) {
        return _tokenUriBase;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(_exists(tokenId), "Nonexistent token");

        return string(abi.encodePacked(_tokenUriBase, "/", tokenId, ".json"));
    }
    // ------------------------------------------

    function mint() external payable nonReentrant onlyOwner {
        _safeMint(_msgSender(), 1);
    }

    function mintTo(address to) external payable nonReentrant onlyOwner {
        _safeMint(to, 1);
    }

    // ------- Owner functions --------
    function setBaseURI(string memory baseURI) external onlyOwner {
        _tokenUriBase = baseURI;
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        payable(_msgSender()).transfer(balance);
    }

    function setTotalTokens(uint256 newTotalTokens) external onlyOwner {
        require (
            newTotalTokens >= _maxTokens,
            "Burning is the only way to destroy NFTs"
        );
        _maxTokens = newTotalTokens;
    }
    // ------------------------------------------
}