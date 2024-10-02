describe('Flow Tests', () => {
  it('Shows the landing page', () => {
    cy.visit('/')
    cy.get('[data-testid=get_started_button]').click()
  })

  it.skip('Navigates through the Medicaid only flow', () => {
    const incomeName = "Suzy"
    const incomeDescription = "Yardwork"
    const incomeAmount = '55'
    const businessName = "Does things"
    const expenseName = 'Gas'
    const expenseDate = '09/04/2024'
    const expenseAmount = '33'
    const username = 'Jane Doe'
    cy.visit('/')

    // Landing Page
    cy.get('button').contains('Get Started').should('exist')
    cy.get('[data-testid=get_started_button]').should('exist')
    cy.get('[data-testid=get_started_button]').click()
    cy.get('[data-testid=get_started_button]').click()


    // How This Works
    cy.url().should('include', '/introduction/how-this-works')
    cy.contains("Lorem ipsum").not('be.visible')
    cy.get('[data-testid=accordionButton_what_is_self_employment]').trigger("click")
    cy.contains("Lorem ipsum").should('be.visible')
    cy.get('[data-testid=get_started_button]').trigger("click")

    // Benefits page
    cy.url().should('include', '/introduction/benefits')
    cy.get('label[for=medicaid]').click()
    cy.get('[data-testid=continue_button]').click()

    // Job landing
    cy.url().should('include', '/job')
    cy.get('[data-testid=accordionItem_income_landing_what_counts]').not('be.visible')
    cy.get('[data-testid=accordionButton_income_landing_what_counts').trigger("click")
    cy.get('[data-testid=accordionItem_income_landing_what_counts]').should('be.visible')
    cy.get('[data-testid=add_income_button').trigger("click")

    // Job add page
    cy.url().should('include', '/job/add')
    cy.get('[data-testid=description]').type(incomeDescription)
    cy.get('[data-testid=business]').type(businessName)
    cy.get('[data-testid=continue_button]').click()

    // Add a payment page
    cy.url().should('include', '/job/0/payment/add')
    cy.get('[data-testid=amount]').type(incomeAmount)
    cy.get('[data-testid=date-picker-button]').click()
    cy.get('.usa-date-picker__calendar__date').contains('15').click()
    cy.get('[data-testid=payer]').type(incomeName)
    cy.get('[data-testid=continue_button]').click()

    // Lender Income list page
    cy.url().should('include', '/job/list')
    cy.contains(incomeName)
    cy.contains(incomeDescription)
    cy.contains(incomeAmount)
    cy.get('[data-testid=done_button]').click()

    // Expense Landing page
    cy.url().should('include', '/job/expense')
    cy.get('[data-testid=accordionItem_expenses_landing_what_counts]').not('be.visible')
    cy.get('[data-testid=accordionButton_expenses_landing_what_counts]').click()
    cy.get('[data-testid=accordionItem_expenses_landing_what_counts]').should('be.visible')
    cy.get('[data-testid=add_expenses_button').click()

    // Expense add page
    cy.url().should('include', '/job/expense/add')
    cy.get('[data-testid=name]').type(expenseName)
    cy.get('#date').type(expenseDate)
    cy.get('[data-testid=amount]').type(expenseAmount)
    cy.get('[data-testid=continue_button]').click()

    // Job Expense list page
    cy.url().should('include', '/job/expense/list')
    cy.contains(expenseName)
    cy.contains(expenseDate)
    cy.contains(expenseAmount)
    cy.get('[data-testid=continue_button]').click()

    // Review page
    cy.url().should('include', '/job/review')
    cy.contains(incomeName)
    cy.contains(incomeDescription)
    cy.contains(incomeAmount)
    cy.contains(incomeName)
    cy.contains(incomeDescription)
    cy.contains(incomeAmount)
    cy.get('[data-testid=continue-button]').click()

    // Sign page
    cy.url().should('include', '/statement/sign')
    cy.get('label[for=understood]').click()
    cy.get('[data-testid=signedName]').type(username)
    cy.get('[data-testid=continue_button]').click()

    // Confirmation Page
    cy.url().should('include', '/statement/confirmation')
    cy.contains("Your confirmation number is:")
    cy.contains('Download proof')
  })
})