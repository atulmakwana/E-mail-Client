Feature: Update a folder

    Scenario Outline: Invalid or empty inputs then throw error.
    Given Enter folderid: '<folderid>' and updated foldername: '<foldername>' for updating a folder
    When Try to update a folder
    Then Throw an error: '<error>' with message: '<message>' while updating a folder

    Examples:
        |   folderid   |    foldername     | error       | message                       |
        # Invalid scenarios
        |              |  CollegeMails2    | Error       | \"folderid\" is required        |
        |   32       |              | Error       | \"foldername\" is required         |
        |   abc      |  newNameeee  | Error       | \"folderid\" must be a number   |
        |   50       |  newNameeee  | Error       | No such folder is exist,that you are trying to update...    |



    Scenario Outline: Invalid foldername input then throw error.
    Given Second Enter folderid: <folderid> and updated foldername: <foldername> for updating a folder
    When Try to update a folder
    Then Throw an error: '<error>' with message: '<message>' while updating a folder

    Examples:
        |   folderid   |    foldername     | error       | message                       |
        # Invalid scenarios
        |   32       |  12345       | Error       |\"foldername\" must be a string    |



    Scenario Outline: Valid inputs then getting the folder.
    Given Third Enter folderid: <folderid> and updated foldername: '<foldername>' for update a folder
    When Try to update a folder
    Then Updated the folder: "<message>"
    

    Examples:
        |  folderid    |   foldername     |  message           |
        # Valid scenarios
        |  32          |   newNamee       |  succesfull        |
    