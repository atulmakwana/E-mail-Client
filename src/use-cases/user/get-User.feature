Feature: Get a particular User

    Scenario Outline: Invalid or empty inputs then throw error for getting a user.
    Given First Enter userid: '<userid>' for getting a user
    When Try to get a user
    Then Throw error: "<error>" with message: "<message>" while getting a user
    

    Examples:
        |    userid  | error       | message                    |
        # Invalid scenarios
        |            | Error       | \"userid\" is required         |
        |    45      | Error       | No such user is there, you are trying to get...    |
        | abc        | Error           |\"userid\" must be a number      |



    Scenario Outline: Valid inputs then getting the user.
    Given Second Enter userid: '<userid>' to get a user
    When Try to get a user
    Then Got the user: "<message>"
    

    Examples:
        | userid     |  message           |
        # Valid scenarios
        | 35         |  succesfull        |
        