*** Settings ***
Library  SeleniumLibrary

*** Variables ***
${URL}             https://www.saucedemo.com/
${USERNAME}        standard_user
${PASSWORD}        secret_sauce

*** Test Cases ***
Add Product And Verify In Cart
    Open Browser    ${URL}    chrome
    Input Text      id=user-name    ${USERNAME}
    Input Text      id=password   ${PASSWORD}
    Click Button    id=login-button
    Click Button    id=add-to-cart-sauce-labs-backpack
    Click Element  id=shopping_cart_container 
    Page Should Contain      Sauce Labs Backpack


   