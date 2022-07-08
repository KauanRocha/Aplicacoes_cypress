/// <reference types="cypress"/>

import { format, prepareLocalStorage } from '../support/utils'

context('Executando novos teste no DevFinance', () => {
    const saida = 'KinderOvo';
    const entrada = 'Salário';

    it('Acessar o site DevFinance e inserir informações pelo local storage do navegador', () => {
     cy.visit('https://devfinance-agilizei.netlify.app/', {
        onBeforeLoad: (win) => {
            prepareLocalStorage(win)
    }
})    

});

    /* Os codigos comentados abaixo não são necessários,
    pois apenas realizam comandos nos quais o local storage do navegador 
    nos entregarão com um menor numero de  linhas, 
    logo resultando numa execução mais rápida e eficiente.

     it('Adicionadno entradas', () => {

    cy.get('#transaction [onclick*="Modal"]').click()
    cy.get('#description').type(entrada)
    cy.get('[name="amount"]').type(1100)
    cy.get('#date').type('2022-06-12')
    cy.get('.input-group button').contains('Salvar').click()
        
    });

    it('Adicionando saídas', () => {

        cy.get('#transaction [onclick*="Modal"]').click()
        cy.get('#description').type(saida)
        cy.get('[name="amount"]').type(-100)
        cy.get('#date').type('2022-06-18')
        cy.get('.input-group button').contains('Salvar').click()
    });

    */

    it('Validar saldo com diversas transações', () => {

        let incomes = 0
        let expenses = 0

        cy.get('table#data-table tbody tr')
        .each(($el, index, $list) => {

            cy.get($el).find('.income, .expense').invoke('text').then(text => {
                if (text.includes('-')){
                    expenses += format(text)
                } else {
                    incomes += format(text)
                }

                cy.log('entradas', incomes)
                cy.log('saídas', expenses)
            })
        })

        cy.get('.card p#totalDisplay').invoke('text').then(text => {

            let total = format(text)
            let expectedTotal = expenses+incomes

            expect(total).to.eq(expectedTotal)
        })
    });

    it('Remover entradas e saídas', () => {

        cy.get('table#data-table tbody tr')
        .each(($el, index, $list) => {

            cy.get('td.description')
            .nextAll()
            .last()
            .find('img')
            .click()
        })
    });
});