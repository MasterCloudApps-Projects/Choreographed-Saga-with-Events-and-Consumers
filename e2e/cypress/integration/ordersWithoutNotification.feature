Feature: Create an order with user online
  Test that an order transaction result is received online

Scenario: Order received online
  Given access to CADS page
  And externals configured to accept all
  When create an order
  Then all the steps are green
  Then no notification is sent
  And mongo status should be restaurant: 0, rider: 0, payment: 0

Scenario Outline: <Name> service rejects online
  Given access to CADS page
  And externals configured to return <result_code> when 'post' to '<service>' service
  When create an order
  Then '<service>' step is red
  And no notification is sent
  And mongo status should be restaurant: <status_restaurant>, rider: <status_rider>, payment: <status_payment>
  Examples:
    | Name       | service    | result_code | status_restaurant | status_rider | status_payment |
    | Restaurant | restaurant | 503         | 4                 | -1           | -1             |
    | Rider      | rider      | 404         | 5                 | 4            | -1             |
    | Payment    | payment    | 402         | 5                 | 5            | 4              |
