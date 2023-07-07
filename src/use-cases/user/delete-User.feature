Feature: Delete a User

    Scenario Outline: Invalid or empty inputs then throw error for deleting user.
    Given Enter user id: '<userid>' to delete a user
    When Try to delete a user
    Then Throw error: "<error>" with message: "<message>" while deleting a user
    

    Examples:
        | userid     | error       | message                    |
        # Invalid scenarios
        |            | Error       | \"userid\" is required         |
        | 45         | Error       | No such user is there, you are trying to delete...    |
        | abc        | Error       | \"userid\" must be a number      |




    Scenario Outline: Valid inputs then delete the user.
    Given Enter user id: '<userid>' to delete a user
    When Try to delete a user
    Then Show message: "<message>"
    

    Examples:
        | userid     | message                     |
        # Invalid scenarios
        | 35         | Deleted the user succesfully          |

