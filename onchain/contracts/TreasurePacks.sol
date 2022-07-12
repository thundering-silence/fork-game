// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract TreasurePacks is ERC1155, Ownable {
    struct PackConf {
        uint256 name;
        uint256 items;
    }
    mapping(uint256 => PackConf) internal _packs;

    event Mint(address indexed to, uint256 id, uint256 amt, bytes data);

    constructor(string memory uri_) ERC1155(uri_) {}

    /**
     * @notice Mint items to player
     */
    function mint(
        address to,
        uint256 id,
        uint256 amt,
        bytes calldata data
    ) public onlyOwner {
        _mint(to, id, amt, data);
        emit Mint(to, id, amt, data);
    }

    function burn(
        address from,
        uint256 id,
        uint256 amt
    ) public onlyOwner {
        _burn(from, id, amt);
    }

    function burnBatch(
        address from,
        uint256[] calldata ids,
        uint256[] calldata amts
    ) public onlyOwner {
        _burnBatch(from, ids, amts);
    }
}
