Feature: Get a particular folder

    Scenario Outline: Invalid or empty inputs then throw error for getting a folder.
    Given Enter folderid: '<folderid>' to get a folder
    When Try to get a folder
    Then Throw error: "<error>" with message: "<message>" while getting a folder
    

    Examples:
        |  folderid  | error       | message                    |
        # Invalid scenarios
        |            | Error       | \"folderid\" is required         |
        |  abc       | Error       |\"folderid\" must be a number      |
        |  50        | Error       | No such folder is there, you are trying to get...    |



    Scenario Outline: Valid inputs then getting the folder.
    Given Enter folderid: '<folderid>' to get a folder
    When Try to get a folder
    Then Got the folder: "<message>"
    

    Examples:
        | folderid     |  message           |
        # Valid scenarios
        | 35           |  succesfull        |
        