Feature: Getting All users

    Scenario Outline: Getting null array as users array has empty
        Given Getting All the users
        When Try to get all the users
        Then The result is : '<result>' for getting all users

        Examples:
        |   result      |
        |   []          |

    # Scenario Outline: Getting null array as users array has empty
    #     Given Getting All th users
    #     When Try to get all the users
    #     Then The result is : '<result>' for getting all users

    #     Examples:
    #     |   result      |
    #     |  [ { userid: 1, name: 'Atul Makwana', email: 'atulmakwana4500@gmail.com', password: 'Atul1234' }  ]   |


    # Scenario Outline: Getting null array as users array has empty
    #     Given Getting All th users
    #     When Try to get all the users
    #     Then The result is : '<result>' for getting all users

    #     Examples:
    #     |   result      |
    #     |               |