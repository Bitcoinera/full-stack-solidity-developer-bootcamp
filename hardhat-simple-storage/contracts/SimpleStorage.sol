// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.8;

contract SimpleStorage {
    struct Person {
        string name;
        uint256 favoriteNumber;
    }

    uint256 favoriteNumber;
    Person[] public people;

    mapping(string => uint256) public nameToFavoriteNumber;
    mapping(uint256 => string) public favoriteNumberToName;

    function store(uint256 _favoriteNumber) public {
        favoriteNumber = _favoriteNumber;
    }

    function retrieve() public view returns (uint256) {
        return favoriteNumber;
    }

    function addPerson(string memory _name, uint256 _favoriteNumber) public {
        people.push(Person(_name, _favoriteNumber));
        nameToFavoriteNumber[_name] = _favoriteNumber;
        favoriteNumberToName[_favoriteNumber] = _name;
    }

    function getFavoriteNumber() public view returns (uint256) {
        return favoriteNumber;
    }
}
