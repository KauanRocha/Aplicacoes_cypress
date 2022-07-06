
describe('Teste no DevFinance', () => {

  it('Entrar no site DevFinace', () => {

  cy.visit('https://devfinance-agilizei.netlify.app/#')

  });

  it('Adicionar entradas e saídas', () => {

  cy.log('Entrada: Mesada')

  cy.get('a.new').click()
  cy.get('input#description').type('Mesada')
  cy.get('[name="amount"]').type('500')
  cy.get('[name="date"]').click().click().type('2021-04-01')
  cy.get('.input-group button').click()

  cy.log('Saída: KinderOvo')

  cy.get('a.new').click()
  cy.get('input#description').type('KinderOvo')
  cy.get('[name="amount"]').type('-150')
  cy.get('[name="date"]').click().click().type('2021-04-04')
  cy.get('.input-group button').click()

  })

  it('Remove entradas e saídas', () => {

  cy.log('estratégia 1: voltar para o elemento pai, e avançar para um td img attr')

  cy.get('td.description')
      .contains('Mesada')
      .parent() 
      .find('img[onclick*=remove]')
      //.click()
  cy.log('estratégia 2: buscar todos os irmãos, e buscar op que tem img + attr')

  cy.get('td.description')
      .contains('Mesada')
      .siblings()
      .children('img[onclick*=remove]')
      //.click()

  cy.log('estrategoa 3: buscar todos os irmãos, e filtar pelo que tem img + attr')

  cy.get('td.description')
      .contains('Mesada')
      .siblings()
      .children()
      .filter('img[onclick*=remove]')
      //.click()


  cy.log('estratégia 4: buscar todos os irmãos mais novos, seleciona o caçula e buscar pelo seu filho img')

  cy.get('td.description')
      .contains('Mesada')
      .nextAll()
      .eq(2) // tambem poderia ser usadoa o ".last()"
      .find('img')
      //.click()

  });


});
