describe('httpbin tests', () => {
  
  it ("tc02_GET istegi", () => {
    const rq = {
      method: 'GET',
      url: "https://httpbin.org/get",
      qs: {
        id: "1"
      },
      failOnStatusCode: false
    };
    cy.request(rq).then((response) => {
      assert.equal(response.status, 200);
      expect(response.status).to.eq(200);
    });

  })

 
})

