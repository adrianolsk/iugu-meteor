Tinytest.add('Iugu - create invoice by email', function(test) {
  var invoice = {
    email: TEST_DATA.email,
    due_date: TEST_DATA.due_date,
    items: [{
      description: "Pão de queijo",
      quantity: "2",
      price_cents: "200"
    }, {
      description: "Coca Cola lata (300ml)",
      quantity: "2",
      price_cents: "300"
    }, {
      description: "Pastel de Carne",
      quantity: "2",
      price_cents: "500"
    }]
  };

  var result = IugiApi.create_invoice(invoice);
  TEST_DATA.invoice_id = result.id;
  test.equal(result.total_cents, 2000, "Falha ao criar a fatura");

  if (TEST_DATA.wait_me_time) {
    console.log("Veja se a fatura foi criada em pendentes no site - pausa de " + TEST_DATA.wait_me_time + "ms");
    Meteor._sleepForMs(TEST_DATA.wait_me_time);
    console.log("Continuando...");
  }
});


Tinytest.add('Iugu - cancel invoice by id', function(test) {
  var result = IugiApi.cancel_invoice(TEST_DATA.invoice_id);
  test.equal(result.status, "canceled", "Falha cancelar a fatura pelo id");

  if (TEST_DATA.wait_me_time) {
    console.log("Veja se a fatura foi cancelada no site - pausa de " + TEST_DATA.wait_me_time + "ms");
    Meteor._sleepForMs(TEST_DATA.wait_me_time);
    console.log("Continuando...");
  }

});

Tinytest.add('Iugu - remove a canceled invoice by id', function(test) {
  var result = IugiApi.remove_invoice(TEST_DATA.invoice_id);

  test.equal(result.status, "canceled", "Falha ao remover a fatura pelo id");
  if (TEST_DATA.wait_me_time) {
    console.log("Veja se a fatura foi apagada (obs: iugu as vezes mantem ela na lista, mas ao clicar nao abre (excluida)) - pausa de " + TEST_DATA.wait_me_time + "ms");
    Meteor._sleepForMs(TEST_DATA.wait_me_time);
    console.log("Continuando...");
  }
});


Tinytest.add('Iugu - create invoice to test refund', function(test) {
  var invoice = {
    email: TEST_DATA.email,
    due_date: TEST_DATA.due_date,
    items: [{
      description: "Pão de queijo",
      quantity: "2",
      price_cents: "200"
    }]
  };

  var result = IugiApi.create_invoice(invoice);
  TEST_DATA.invoice_id = result.id;
  test.equal(result.total_cents, 400, "Falha ao criar fatura");

  if (TEST_DATA.wait_me_time) {
    console.log("Acesse seu email e pagar a fatura com cartao de crédito teste - pausa de " + TEST_DATA.wait_me_time + "ms");
    Meteor._sleepForMs(TEST_DATA.wait_me_time);
    console.log("Continuando...");
  }
});


Tinytest.add('Iugu - refund a paid invoice by id', function(test) {
  var result = IugiApi.refund_invoice(TEST_DATA.invoice_id);
  test.equal(result.status, "refunded", "Falha ao estornar a fatura pelo id");
  if (result.status == "refunded")
    console.log("Atualize a pagina da fatura para ver o reembolso");

});

Tinytest.add('Iugu - get a invoice by id', function(test) {
  var result = IugiApi.get_invoice(TEST_DATA.invoice_id);
  test.equal(result.total_cents, 400, "Falha ao buscar a fatura pelo id");
});


Tinytest.add('Iugu - list all invoices', function(test) {
  var serch = {
    limit: 5
  };
  var result = IugiApi.invoices(serch);
  var total = result.facets.status.total > 0;
  console.log(result.facets.status.total + "Faturas encontradas")
  test.isTrue(total, "Falha ao listar as faturas");
});
