describe("Caso de uso ver detalle del producto.", () => {
  it(`
      El usuario visualiza el listado de productos,
      El usuario selecciona un producto y hace click.
      El usuario es llevado hacia la pantalla donde puede visualizar el detalle del producto.
      `, () => {
    const search = "pelota grande roja";
    const type = search.replaceAll(" ", "%20");
    cy.intercept("GET", "/api/v1/items?*", (req) => {
      delete req.headers["if-none-match"];
    }).as("searchRequest");
    cy.visit(`http://localhost:5173/items?search=${type}`);
    cy.url().should("include", `/items?search=${type}`);
    cy.get(".product-list").should("be.visible");
    cy.get(".skeleton-item").should("have.length", 4);
    cy.wait("@searchRequest").then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
      const firstProduct = interception.response.body.items[0];
      cy.get(".product-list")
        .children(".product-item")
        .should("have.length", 4);
      cy.get(".product-item")
        .first()
        .then((firstProduct) => {
          cy.wrap(firstProduct).should("be.visible");
          cy.wrap(firstProduct).click();
        });
      cy.url().should("include", `/items/${firstProduct.id}`);
    });
  });
});
