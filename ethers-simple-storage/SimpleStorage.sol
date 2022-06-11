// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.14;

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

    // This should be possible in theory but for some reason cannot make it work out. Some research is due
    // function addPerson(Person memory _newPerson) public {
    //     people.push(_newPerson);
    // }

    function addPerson(string memory _name, uint256 _favoriteNumber) public {
        people.push(Person(_name, _favoriteNumber));
        nameToFavoriteNumber[_name] = _favoriteNumber;
        favoriteNumberToName[_favoriteNumber] = _name;
    }
}
