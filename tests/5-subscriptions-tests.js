/*Nos testes a API do IUGU não estava retornando o cliente nessa busca*/
Tinytest.add('Iugu - create a plan to use on subscriptions', function(test) {

  var customer = {
    email: TEST_DATA.email, //E-Mail do Cliente
    name: "Customer for subscriptions", // (opcional)	Nome do Cliente
  };

  TEST_DATA.customer = IugiApi.create_customer(customer);
  test.equal(TEST_DATA.customer.name, customer.name, "Falha ao adicionar cliente");

  var paymentMethod = {
    customer_id: TEST_DATA.customer.id,
    description: "My Mastercard",
    data: {
      number: "5555555555554444",
      verification_value: "111",
      first_name: "Customer",
      last_name: "One",
      month: "12",
      year: "2015"
    },
    item_type: 'credit_card',
    set_as_default: true
  };

  var result = IugiApi.create_payment_method(paymentMethod);
  test.equal(result.data.brand.toLowerCase(), "mastercard", "Falha ao adicionar cartão");

  var plan = {
    name: "My Plan for subscriptions",
    identifier: "MY_PLAN_SUB",
    interval: 1,
    interval_type: "months",
    currency: "BRL",
    value_cents: 990
  };
  var result;
  try {
       result = IugiApi.get_plan_by_identifier("MY_PLAN_SUB")
  } catch (e) {
    result = IugiApi.create_plan(plan);
  }



  //save data to use bellow

  TEST_DATA.plan_id = result.id;

  test.equal(result.identifier, plan.identifier, "Falha ao adicionar plano");
  Meteor._sleepForMs(2000);
  var subscription = {
    plan_identifier: plan.identifier,
    customer_id: TEST_DATA.customer.id,
    payable_with: "bank_slip",
    subitems: [{
      description: "Desconto Black friday",
      price_cents: -200,
      quantity: 1,
      recurrent: true
    }]
  };

  var result = IugiApi.create_subscription(subscription);
  TEST_DATA.subscription_id = result.id;

  test.equal(result.customer_name, TEST_DATA.customer.name, "Falha ao adicionar a assinatura");

  if (TEST_DATA.wait_me_time) {
    console.log("Verifique no site se o cliente/plano e assinatura foram criados - " + TEST_DATA.wait_me_time + "ms");
    Meteor._sleepForMs(TEST_DATA.wait_me_time);
    console.log("Continuando...");
  }
});




Tinytest.add('Iugu - get a subscription by id', function(test) {
  var result = IugiApi.get_subscription(TEST_DATA.subscription_id);
  test.equal(result.customer_name, TEST_DATA.customer.name, "Falha ao buscar assinatura pelo ID");
});


Tinytest.add('Iugu - update a subscription', function(test) {
  var subscription = {
    payable_with: "credit_card"
  };
  var result = IugiApi.update_subscription(TEST_DATA.subscription_id, subscription);
  test.equal(result.payable_with, subscription.payable_with, "Falha ao alterar assinatura ");
});



Tinytest.add('Iugu - suspend a subscription', function(test) {
  var result = IugiApi.suspend_subscription(TEST_DATA.subscription_id);
  test.isTrue(result.suspended, "Falha ao suspender a  assinatura ");
});

Tinytest.add('Iugu - activate a subscription', function(test) {

    Meteor._sleepForMs(2000);
  var result = IugiApi.activate_subscription(TEST_DATA.subscription_id);

  test.equal(result.logs[0].description,"Assinatura Ativada", "Falha ao ativar a  assinatura ");

    if (TEST_DATA.wait_me_time) {
      console.log("Verifique no site a assinatura foi suspensa e reativada - " + TEST_DATA.wait_me_time + "ms");
      Meteor._sleepForMs(TEST_DATA.wait_me_time);
      console.log("Continuando...");
    }
});

Tinytest.add('Iugu - List subscriptions', function(test) {
  var search = {
    limit: 2
  };
  var result = IugiApi.subscriptions(search);
  var hasSubscriptions = result.totalItems > 0;
  test.isTrue(hasSubscriptions, "Falha ao listar as  assinaturas ");
});


Tinytest.add('Iugu - remove a subscription', function(test) {
  Meteor._sleepForMs(2000);
  console.log("Removendo assinatura");
  var result = IugiApi.remove_subscription(TEST_DATA.subscription_id);
  test.equal(result.id, TEST_DATA.subscription_id, "Falha ao remover a  assinatura ");
  Meteor._sleepForMs(2000);
  console.log("Removendo plano");
  IugiApi.remove_plan(TEST_DATA.plan_id);
  Meteor._sleepForMs(2000);
  console.log("Removendo cliente");
  IugiApi.remove_customer(TEST_DATA.customer.id);
});









//
