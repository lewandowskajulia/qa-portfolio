*** Settings ***
Library  SeleniumLibrary

*** Variables ***
${URL}             https://www.saucedemo.com/
${USERNAME}        standard_user
${PASSWORD}        secret_sauce

*** Test Cases ***
Bad Login
    Open Browser    ${URL}    chrome
    Input Text      id=user-name    ${USERNAME}
    Input Text      id=password   bad_password
    Click Button    id=login-button
    Page Should Contain  Epic sadface: Username and password do not match any user in this service
    
