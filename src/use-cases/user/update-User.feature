Feature: Update a user

    Scenario Outline: Invalid or empty inputs then throw error.
    Given Enter userid: '<userid>' and updated username: '<uname>' for updating a user
    When Try to update a user
    Then Throw an error: '<error>' with message: '<message>' while updating a user

    Examples:
        |   userid   |    uname     | error       | message                       |
        # Invalid scenarios
        |            |  newNameeee  | Error       | \"userid\" is required        |
        |   32       |              | Error       | \"uname\" is required         |
        |   abc      |  newNameeee  | Error       | \"userid\" must be a number   |
        |   50       |  newNameeee  | Error       | No such user is there, you are trying to update...    |



    Scenario Outline: Invalid uname input then throw error.
    Given Second Enter userid: <userid> and updated username: <uname> for updating a user
    When Try to update a user
    Then Throw an error: '<error>' with message: '<message>' while updating a user

    Examples:
        |   userid   |    uname     | error       | message                       |
        # Invalid scenarios
        |   32       |  12345       | Error       |\"uname\" must be a string    |



    Scenario Outline: Valid inputs then getting the user.
    Given Third Enter userid: <userid> and updated username: '<uname>' for update a user
    When Try to update a user
    Then Updated the user: "<message>"
    

    Examples:
        | userid     |    uname     |  message           |
        # Valid scenarios
        | 32         |   newNamee   |  succesfull        |
    