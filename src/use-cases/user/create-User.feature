Feature: Creating new User

    Scenario Outline: Invalid or empty inputs then throw error.
    Given User details uname: "<uname>", email: "<email>", password: "<password>" to create new user
    When Try to create new user
    Then Throw error: "<error>" with message: "<message>" while creating a user
    # And createUser function will call <createUserFunctionCallCount> time while creating new user

    Examples:
        | uname      | email             | password | error           | message                         |
        |            | atul@gmail.com    | atul123  | Error           | \"uname\" is required           |
        | Atulll     |                   | atul123  | Error           | \"email\" is required           |
        | Atulll     | atul@gmail.com    |          | Error           | \"password\" is required        |
        | Atulll     | atulgmail.com     | atul12   | Error           | \"email\" must be a valid email |
        | Atulll     | atul@gmail.com    | atu      | Error           | \"password\" length must be at least 6 characters long |



    
    Scenario Outline: Invalid uname input then throw error.
    Given User details uname: <uname>, email: "<email>", password: "<password>" to create new user
    When Try to create new user
    Then Throw error: "<error>" with message: "<message>" while creating a user

    Examples:
        | uname      | email                     | password | error           | message                         |
        | 12345      | atulmakwana@gmail.com     | atul12   | Error           | \"uname\" must be a string      |




    Scenario Outline: Duplicate email input then throw error.
    Given User details uname: "<uname>", email: "<email>", password: "<password>" to create new user
    When Try to create new user
    Then Throw error: "<error>" with message: "<message>" while creating a user

    Examples:
        | uname      | email                 | password     | error           | message                         |
        | atullll    | atullll@gmail.com     | atullll123   | Error           | User already exist with same Email...    |




    Scenario Outline: Valid inputs then create a user.
    Given User details uname: "<uname>", email: "<email>", password: "<password>" to create new user
    When Try to create new user
    Then It will create new user with details: "<newUserDetails>"
    # And createDefaultFolders function will call <createDefaultFoldersFunctionCallCount> time while creating new user

    Examples:
        | uname      | email             | password | newUserDetails  | createDefaultFoldersFunctionCallCount  |
        | Atulll     | atul@gmail.com    | atul123  | '{id:1}'        | 1                                       |
