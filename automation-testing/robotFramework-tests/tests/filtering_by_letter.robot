*** Settings ***
Library  SeleniumLibrary

*** Variables ***
${URL}             https://www.saucedemo.com/
${USERNAME}        standard_user
${PASSWORD}        secret_sauce

*** Test Cases ***
Successful Login
    Open Browser    ${URL}    chrome
    Input Text      id=user-name    ${USERNAME}
    Input Text      id=password   ${PASSWORD}
    Click Button    id=login-button
    Page Should Contain  Products
    Click Element    class=product_sort_container
    Select From List By Value   class=product_sort_container   lohi

  