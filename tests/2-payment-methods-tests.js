/*
 * Customers payment methods
 */


Tinytest.add('Iugu - create customer to to add payment methods', function(test) {
  var customer = {
    email: TEST_DATA.email, //E-Mail do Cliente
    name: "Customer One", // (opcional)	Nome do Cliente
  };

  var create_result = IugiApi.create_customer(customer);

  //save customer to use vellow
  TEST_DATA.customer = create_result;
  test.equal(TEST_DATA.customer.name, customer.name, "Falha ao criar cliente");
});



Tinytest.add('Iugu - add payment method', function(test) {

  var paymentMethod = {
    customer_id: TEST_DATA.customer.id,
    description: "My credit card",
    data: {
      number: "4111111111111111",
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
  //save id to use bellow
  payment_method_id = result.id;
  test.equal(result.data.brand.toLowerCase(), "visa", "Falha ao adicionar cartão");

});

Tinytest.add('Iugu - list payment methods', function(test) {
  var result = IugiApi.payment_methods(TEST_DATA.customer.id);
  test.equal(result.length, 1, "Falha ao listar metodos de pagamentos");
});


Tinytest.add('Iugu - get payment method by id', function(test) {
  console.log("customer:"+ TEST_DATA.customer.id + "/" + payment_method_id);
  var result = IugiApi.get_payment_method(TEST_DATA.customer.id, payment_method_id);  
  test.equal(result.description, "My credit card", "Falha ao buscar o  metodo de pagamento pelo id");
});


Tinytest.add('Iugu - update credit card description', function(test) {
  var payment_object = {
    description: "My Main Visa card"
  };
  var result = IugiApi.update_payment_method(TEST_DATA.customer.id, payment_method_id, payment_object);
  test.equal(result.description, payment_object.description, "Falha ao atualizar a descrição do cartão");
});

Tinytest.add('Iugu - remove payment method by id', function(test) {
  var result = IugiApi.remove_payment_method(TEST_DATA.customer.id, payment_method_id);
  var result_after = IugiApi.payment_methods(TEST_DATA.customer.id);
  test.equal(result_after.length, 0, "Falha ao remover o  metodo de pagamento pelo id");

  var result = IugiApi.remove_customer(TEST_DATA.customer.id);
  test.equal(result.id, TEST_DATA.customer.id, "Falha ao remover cliente");
});
