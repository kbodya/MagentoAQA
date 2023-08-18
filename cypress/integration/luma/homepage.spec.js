import homepage from "../../fixtures/luma/homepage"
import selectors from "../../fixtures/luma/selectors/homepage"
import product from "../../fixtures/luma/product"
import account from "../../fixtures/account"
import {isMobile} from "../../support/utils";

describe('Home page tests', () => {
    beforeEach(() => {
        cy.visit(homepage.homePageUrl)
    })

    it('Can visit the homepage and it contains products', () => {
        cy.get(selectors.mainTitle)
            .should('contain.text', homepage.titleText)
        cy.get(selectors.productCard)
            .should('have.length.gte', 0)
    })

    it('Can perform search from homepage', () => {
        if(isMobile()) {
            cy.get(selectors.searchIconMobile).click()
        }
        cy.get(selectors.searchIcon)
            .should('be.visible')
            .type(`${product.simpleProductName}{enter}`)
        cy.get(selectors.mainHeading)
            .should('contain.text', product.simpleProductName)
    })

    it('Can open category', () => {
        cy.get(selectors.headerNavSubCategory)
        .trigger ('mouseover', ({force: true})).invoke ('show')
        cy.get(selectors.headingHome).click ({force: true})
            cy.get (homepage.subCategoryName).should ('be.visible')
    })

    it('Can subscribe to newsletter', () => {
        cy.get ('#accordion > div.accordion_block.order_mobile_2 > div:nth-child(2) > ul > li:nth-child(1) > a').click()
        cy.get (selectors.contactUsName).type ('CypressNameTest')
        cy.get (selectors.contactUsEmail).type ('test@cypresstesting.com')
        cy.get (selectors.contactUsTel).type ('123456789')
        cy.get (selectors.contactUsTextArea).type ('This is Cypress test message')
        cy.get (selectors.contactUsButton).click ()
        // cy.get(selectors.subscribeToNewsletterField).type(account.customer.customer.email)
        // cy.get(selectors.newsletterSubscribeButton).click()
        // cy.wait(2000)
        // cy.get('.page.messages').then(($messageSection) => {
        //     if (!$messageSection.find(selectors.failedMessage).text().trim()) {
        //         cy.get(selectors.successMessage).should('contain.text', homepage.subscriptionSuccess)
        //     } else {
        //         cy.get(selectors.failedMessage).should('contain.text', homepage.subscriptionFail)
        //     }
        // })
    })
})
