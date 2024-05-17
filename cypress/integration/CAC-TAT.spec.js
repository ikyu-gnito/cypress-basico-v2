/// <reference types="Cypress" /> 
//Buscar a situação, mais fácil para achar 

describe('Central de Atendimento ao Cliente TAT', function() 
//Describe para poder mostrar qual vai ser o teste recebendo um argumento de descrição do teste e dps o call back 
{
    this.beforeEach(function()
    {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() 
    //it é o caso do teste cada it seria um caso de caso, it se recebe o mesma descrição
    {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function()
    {
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste' //Variável nova

        cy.get('#firstName').type('Yuki')
        cy.get('#lastName').type('Shimada')
        cy.get('#email').type('exemplo@exemplo.com')
        cy.get('#open-text-area').type(longText, { delay: 0 }) //colocando uma segundo argumento para o delay ser 0 rodando assim mais rápido
        cy.contains('button', 'Enviar').click() //lembrar que se está em aspas simples fora, o elemento dentro vai ser aspas dupla

        cy.get('.success').should('be.visible') //.algo para mostrar que é uma classe 
    })

    //cenário com email inválido!!
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação invalida', function()
    {
        cy.get('#firstName').type('Yuki')
        cy.get('#lastName').type('Shimada')
        cy.get('#email').type('exemplo@exemplo,com')
        cy.get('#open-text-area').type('Teste') //colocando uma segundo argumento para o delay ser 0 rodando assim mais rápido
        cy.contains('button', 'Enviar').click()//lembrar que se está em aspas simples fora, o elemento dentro vai ser aspas dupla

        cy.get('.error').should('be.visible') //Teste para error para ver se ta com uma classe error para ver o erro
    })

    //Colcoar uma informação com input valor não numerico
    it('campo telefone contnua vazio quando preenchido com valor não-numerico', function()
    {
        cy.get('#phone')
        .type('abcdefghij')
        .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatorio mas não é preenchido', function()
    {
        cy.get('#firstName').type('Yuki')
        cy.get('#lastName').type('Shimada')
        cy.get('#email').type('exemplo@exemplo.com')
        cy.get('#phone-checkbox').check() //marcou o campo do telefone tornando o telefone obrigatório
        cy.get('#open-text-area').type('Teste') 
        cy.contains('button', 'Enviar').click() //usar Contens primeiro arumento o local e o segundo o texto que vai estar escrito dentro do bottom

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function()
    {
        cy.get('#firstName')
            .type('Yuki')
            .should('have.value', 'Yuki')
            .clear() //Limpoar o campo escrito
            .should('have.value', '')

        cy.get('#lastName')
            .type('Shimada')
            .should('have.value', 'Shimada')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .type('exemplo@exemplo.com')
            .should('have.value', 'exemplo@exemplo.com')
            .clear()
            .should('have.value', '')

        cy.get('#phone')
            .type('999999999')
            .should('have.value', '999999999')
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function()
    {
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function() //criação de comandos costumizados
    {
        cy.fillMandatoryFieldsAndSubmit() //como é uma função sempre coloca ()
        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function()
    {
        cy.get('#product')
         .select('YouTube')
         .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function()
    {
        cy.get('#product')
         .select('mentoria')
         .should('have.value', 'mentoria')//armazenar em uma variavel para poder reutilizar o código
    })

    it('seleciona um produto (Blog) por seu índice', function()
    {
        cy.get('#product')
         .select(1)
         .should('have.value', 'blog')
    })

    //Por questão de semantica se coloca .check() por causa do .click()
    it('marca o tipo de atendimento "Feedback"', function()
    {
        cy.get('input[type="radio"][value="feedback"]')
         .check()
         .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function()
    {
        cy.get('input[type="radio"]')
         .should('have.length', 3)
         .each(function($radio)
        {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
        
    })

    it('marca ambos checkboxes, depois desmarca o último', function()
    {
        cy.get('input[type="checkbox"]')
         .check()
         .should('be.checked')
         .last() //ultimo elemento
         .uncheck() //tira o check é bom para não selecionar algo sem querer
         .should('not.be.checked')
    })
})
  