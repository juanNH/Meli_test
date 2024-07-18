describe('Caso de uso buscar productos.', () => {
    it(`
      El usuario entra en la aplicacion,
      El usuario selecciona el buscador, escribe lo que quiere buscar.
      El usuario hace click en el boton.
      El usuario llevado hacia la pantalla que le muestra 4 resultados de lo que esta buscando.
      `, () => {
      cy.visit('http://localhost:5173');
      cy.get('.search-input').should('be.visible');
      const search = 'pelota grande roja';
      const type = search.replaceAll(" ","%20");
      cy.get('.search-input').type(search);
      cy.get('.search-button').click();
      cy.url().should('include', `/items?search=${type}`);
      cy.get('.product-list').should('be.visible');
      cy.get('.skeleton-item').should('have.length',4);
      cy.get('.product-list').children('.product-item').should('have.length', 4);
    });
    it(`
      El usuario entra en la aplicacion,
      El usuario selecciona el buscador, escribe lo que quiere buscar.
      El usuario hace click en el boton.
      El usuario llevado hacia la pantalla que no le muestra resultados, porque no existen.
      `, () => {
      cy.visit('http://localhost:5173');
      cy.get('.search-input').should('be.visible');
      const search = 'qwdqwddjqwhqwdkqwdjkqwhjkd';
      const type = search.replaceAll(" ","%20");
      cy.get('.search-input').type(search);
      cy.get('.search-button').click();
      cy.url().should('include', `/items?search=${type}`);
      cy.get('.product-list').should('be.visible');
      cy.get('.skeleton-item').should('have.length',4);
      cy.get('.skeleton-item').should('not.exist');
      cy.get('.product-item').should('have.length', 0);
    });
  });
  