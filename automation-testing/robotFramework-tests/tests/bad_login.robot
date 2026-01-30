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
    
Empty Username
    Open Browser    ${URL}    chrome
    Input Text      id=password     ${PASSWORD}
    Click Button    id=login-button
    Page Should Contain    Epic sadface: Username is required
    Close Browser

Empty Password
    Open Browser    ${URL}    chrome
    Input Text      id=user-name    ${USERNAME}
    Click Button    id=login-button
    Page Should Contain    Epic sadface: Password is required
    Close Browser

Empty Username And Password
    Open Browser    ${URL}    chrome
    Click Button    id=login-button
    Page Should Contain    Epic sadface: Username is required
    Close Browser

Correct Login
    Open Browser    ${URL}    chrome
    Input Text      id=user-name    ${USERNAME}
    Input Text      id=password     ${PASSWORD}
    Click Button    id=login-button
    Page Should Contain    Products
    Close Browser

Logout After Login
    Open Browser    ${URL}    chrome
    Input Text      id=user-name    ${USERNAME}
    Input Text      id=password     ${PASSWORD}
    Click Button    id=login-button
    Click Button    id=react-burger-menu-btn
    Click Link      id=logout_sidebar_link
    Page Should Contain    Login
    Close Browser