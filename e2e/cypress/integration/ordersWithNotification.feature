Feature: Create an order and receive a notification with user offline
  Test that an order transaction result is received as a notification

Scenario: Order received as notification
  Given access to CADS page
  And externals configured to accept all
  When create an order
  When user closes before get a response
  Then after 5 seconds, should receive a 'finished' notification
  And mongo status should be restaurant: 0, rider: 0, payment: 0

Scenario Outline: <Name> service rejects as notification
  Given access to CADS page
  And externals configured to return <result_code> when 'post' to '<service>' service
  When create an order
  When user closes before get a response
  Then after 5 seconds, should receive a '<notification_result>' notification
  And mongo status should be restaurant: <status_restaurant>, rider: <status_rider>, payment: <status_payment>
  Examples:
    | Name       | service    | result_code | notification_result | status_restaurant | status_rider | status_payment |
    | Restaurant | restaurant | 503         | restaurant rejected | 4                 | -1           | -1             |
    | Rider      | rider      | 404         | rider rejected      | 5                 | 4            | -1             |
    | Payment    | payment    | 402         | payment rejected    | 5                 | 5            | 4              |
