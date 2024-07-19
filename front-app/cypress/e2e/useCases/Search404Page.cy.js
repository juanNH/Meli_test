describe('Caso de uso buscar productos.', () => {
    it(`
      El usuario entra directamente a una pagina no existente.
      El usuario visualiza una web 404.
      El usuario toca el boton para volver a la pantalla principal.
      `, () => {
      cy.visit('http://localhost:5173/paginaInexistente');
      const link = cy.contains('a', 'Ir a la página principal');
      link.should('be.visible');
      link.click();
      cy.url().should('include', `/`);
    });
    it(`
      El usuario busca en la url un producto no existente.
      El usuario visualiza el mensaje que no se puede encontrar el producto.
      `, () => {
      cy.visit('http://localhost:5173/items/IdNoExistente');
      const link = cy.contains('h2', 'Parece que no se puede encontrar el producto!').should('be.visible');
    }); 
  });
  