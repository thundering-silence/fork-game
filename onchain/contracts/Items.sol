// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract Items is ERC1155, VRFConsumerBaseV2, Ownable {
    struct ItemData {
        uint256 maxSupply;
        uint256 supply;
    }
    mapping(uint256 => ItemData) internal _items;

    event Mint(address indexed to, uint256 id, uint256 amt, bytes data);

    constructor(string memory uri_) ERC1155(uri_) {}

    /**
     */
    function claim(uint[] calldata ids, uint[] calldata amts) public {

    }

    /**
     * @notice Mint items to player
     */
    function mint(
        address to,
        uint256 id,
        uint256 amt,
        bytes calldata data
    ) public onlyOwner {
        ItemData memory item = _items[id];
        item.supply += amt;
        require(item.maxSupply >= item.supply, "Items: Max Supply reached");
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
}
