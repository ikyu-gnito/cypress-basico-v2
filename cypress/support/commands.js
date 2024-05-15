//Como adicionar um novo comando
//Criando: 
//Adiciona um nome do comando aqui dentro
/* Adcionar comandos mas para isso sempre tem que lembrar de importar na parte de index assim que criar a pasta nova*/ 
cypress.Commands.add('fillMandatoryFieldsAndSubmit', function()
{
    cy.get('#firstName').type('Yuki')
    cy.get('#lastName').type('Shimada')
    cy.get('#email').type('exemplo@exemplo.com')
    cy.get('#open-text-area').type('Teste') 
    
    cy.contains('button', 'Enviar').click()
})