Feature: Product search and purchase

  Scenario Outline: User successfully purchases a product
    Given user is on the "<search page>" page
    When user searches for the "<product to be searched>" product
    Then the "<product to be searched>" should be displayed in the search results
    When user adds the product to the cart
    And user completes the purchase
    Then the "<purchase success>" message should be displayed

    Examples:
      | search page | product to be searched | purchase success                |
      | search      | laptop                 | Purchase completed successfully |