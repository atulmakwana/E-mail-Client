Feature: Creating new Folder

    Scenario Outline: Invalid or empty inputs then throw error.
    Given Folder details foldername: "<foldername>", folderuserid: "<folderuserid>", folderproviderid: "<folderproviderid>" to create new folder
    When Try to create new folder
    Then Throw error: "<error>" with message: "<message>" while creating a new folder

    Examples:
        | foldername   | folderuserid      | folderproviderid | error           | message                         |
        |              | 1                 |                  | Error           | \"foldername\" is required      |
        | CollegeMails |                   |                  | Error           | \"folderuserid\" is required    |
        |              |                   |                  | Error           | \"folderuserid\" is required      |
        | CollegeMails | abcd              |                  | Error           | \"folderuserid\" must be a number    |
        |  Inbox       | 1                 |                  | Error           | Folder is already exist for the given user...    |




    Scenario Outline: Foldername is number then throw error.
    Given Second Folder details foldername: <foldername>, folderuserid: <folderuserid>, folderproviderid: "<folderproviderid>" to create new folder
    When Try to create new folder
    Then Throw error: "<error>" with message: "<message>" while creating a new folder

    Examples:
        |  foldername   | folderuserid     | folderproviderid | error           | message                              |
        |  123456       | 15               |                  | Error           | \"foldername\" must be a string      |




    Scenario Outline: Valid inputs then create folder for the user.
    Given Folder details foldername: '<foldername>', folderuserid: '<folderuserid>', folderproviderid: "<folderproviderid>" to create new folder
    When Try to create new folder
    Then Created the folder: "<message>"

    Examples:
        |  foldername   | folderuserid     | folderproviderid | message       |
        | CollegeMails  | 1                |                  | succesfull    |
