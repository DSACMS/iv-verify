describe('Flow Tests', () => {
  it('Shows the landing page', () => {
    cy.visit('/')
    cy.get('[data-testid=get_started_button]').click()
  })

  it('Navigates through the Medicaid only flow', () => {
    const incomeName = "Suzy"
    const incomeDescription = "Yardwork"
    const incomeAmount = '55'
    const expenseName = 'Gas'
    const expenseDate = '09/04/2024'
    const expenseAmount = '33'
    const username = 'Jane Doe'
    cy.visit('/')

    // Landing Page
    cy.get('button').contains('Get Started').should('exist')
    cy.get('[data-testid=get_started_button]').should('exist')
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

    // Ledger landing
    cy.url().should('include', '/ledger/income')
    cy.get('[data-testid=accordionItem_income_landing_what_counts]').not('be.visible')
    cy.get('[data-testid=accordionButton_income_landing_what_counts').trigger("click")
    cy.get('[data-testid=accordionItem_income_landing_what_counts]').should('be.visible')
    cy.get('[data-testid=add_income_button').trigger("click")

    // Ledger add page
    cy.url().should('include', '/ledger/income/add')
    cy.get('[data-testid=name]').type(incomeName)
    cy.get('[data-testid=description]').type(incomeDescription)
    cy.get('[data-testid=amount]').type(incomeAmount)
    cy.get('[data-testid=continue_button]').click()

    // Lender Income list page
    cy.url().should('include', '/ledger/income/list')
    cy.contains(incomeName)
    cy.contains(incomeDescription)
    cy.contains(incomeAmount)
    cy.get('[data-testid=done_button]').click()

    // Expense Landing page
    cy.url().should('include', '/ledger/expense')
    cy.get('[data-testid=accordionItem_expenses_landing_what_counts]').not('be.visible')
    cy.get('[data-testid=accordionButton_expenses_landing_what_counts]').click()
    cy.get('[data-testid=accordionItem_expenses_landing_what_counts]').should('be.visible')
    cy.get('[data-testid=add_expenses_button').click()

    // Expense add page
    cy.url().should('include', '/ledger/expense/add')
    cy.get('[data-testid=name]').type(expenseName)
    cy.get('#date').type(expenseDate)
    cy.get('[data-testid=amount]').type(expenseAmount)
    cy.get('[data-testid=continue_button]').click()

    // Ledger Expense list page
    cy.url().should('include', '/ledger/expense/list')
    cy.contains(expenseName)
    cy.contains(expenseDate)
    cy.contains(expenseAmount)
    cy.get('[data-testid=continue_button]').click()

    // Review page
    cy.url().should('include', '/ledger/review')
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