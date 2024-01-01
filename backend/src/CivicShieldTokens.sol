// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CivicShieldTokens is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    constructor(address initialOwner) ERC721("CivicShieldTokens", "CST") Ownable(initialOwner) {}

    event TokenMinted(address to, uint256 tokenId, string uri);

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        emit TokenMinted(to, tokenId, uri);
    }

    function transferFrom(address from, address to, uint256 tokenId) public virtual override(IERC721, ERC721) {
        revert("Soulbound tokens cannot be transferred");
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function getOwnedTokens(address user) public view returns (uint256[] memory) {
        uint256 tokenCount = balanceOf(user);
        if (tokenCount == 0) {
            return new uint256[](0);
        } else {
            uint256[] memory tokens = new uint256[](tokenCount);
            uint256 index;
            for (uint256 i = 0; i < _nextTokenId; i++) {
                if (ownerOf(i) == user) {
                    tokens[index] = i;
                    index++;
                }
            }
            return tokens;
        }
    }
}
