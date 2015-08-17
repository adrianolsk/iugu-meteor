/*Nos testes a API do IUGU não estava retornando o cliente nessa busca*/
Tinytest.add('Iugu - create a plan and list', function(test) {
  var plan = {
    name: "My Plan",
    identifier: "MY_PLAN",
    interval: 1,
    interval_type: "months",
    currency: "BRL",
    value_cents: 990,
    payable_with: "all",
    prices: [],
    features: [{
      name: "2 usuarios",
      identifier: "users",
      value: "2"
    }, {
      name: "100 produtos",
      identifier: "produtos",
      value: "100"
    }]
  };
  var plans_before = IugiApi.plans();
  var result = IugiApi.create_plan(plan);
  Meteor._sleepForMs(2000);
  var plans_after = IugiApi.plans();

  var maior = plans_before.totalItems < plans_after.totalItems;
  console.log(result);

  //save data to use bellow
  TEST_DATA.plan_id = result.id;

  test.isTrue(maior, "Falha ao adicionar cliente");

  if (TEST_DATA.wait_me_time) {
    console.log("Verifique no site se o plano foi criado" + TEST_DATA.wait_me_time + "ms");
    Meteor._sleepForMs(TEST_DATA.wait_me_time);
    console.log("Continuando...");
  }
});



Tinytest.add('Iugu - get a plan by id', function(test) {
  var result = IugiApi.get_plan(TEST_DATA.plan_id);
  test.equal(result.identifier, "MY_PLAN", "Falha ao buscar a fatura pelo id");
});


Tinytest.add('Iugu - get a plan by identifier', function(test) {
  var result = IugiApi.get_plan_by_identifier("MY_PLAN");
  test.equal(result.identifier, "MY_PLAN", "Falha ao buscar a fatura pelo identifier");
});


Tinytest.add('Iugu - update a plan', function(test) {
  var plan = {
    name : "Plano Básico"
  };
  var result = IugiApi.update_plan(TEST_DATA.plan_id, plan);
  test.equal(result.name, plan.name, "Falha ao alterar o plano");

  if (TEST_DATA.wait_me_time) {
    console.log("Verifique no site se o plano foi alterado" + TEST_DATA.wait_me_time + "ms");
    Meteor._sleepForMs(TEST_DATA.wait_me_time);
    console.log("Continuando...");
  }
});


Tinytest.add('Iugu - Remove  a plan', function(test) {

  var result = IugiApi.remove_plan(TEST_DATA.plan_id);
  test.equal(result.identifier, "MY_PLAN", "Falha ao remover o plano");

  if (TEST_DATA.wait_me_time) {
    console.log("Verifique no site se o plano foi removido" + TEST_DATA.wait_me_time + "ms");
    Meteor._sleepForMs(TEST_DATA.wait_me_time);
    console.log("Continuando...");
  }
});
