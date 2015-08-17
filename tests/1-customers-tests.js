/*
* Customers tests
*/



Tinytest.add('Iugu - create and list customer', function(test) {
  var customer = {
    email: TEST_DATA.email, //E-Mail do Cliente
    name: "Customer Test 1", // (opcional)	Nome do Cliente
    cpf_cnpj: "", // (opcional)	CPF ou CNPJ do Cliente
    cc_emails: "", // (opcional)	Endereços de E-mail para cópia separados por vírgula.
    notes: "Cliente de testes", // (opcional)	Anotações Gerais do Cliente
    custom_variables: [{
        name: "Variavel de teste 1",
        value: "var1"
      }, {
        name: "Variavel de teste 22",
        value: "var2"
      }] //(opcional)	Variáveis Personalizadas
  }

  var customers_before = IugiApi.customers();
  var create_result = IugiApi.create_customer(customer);
  //wait 2 sec to avoid old data from iugu
  Meteor._sleepForMs(2000);
  var customers_after = IugiApi.customers();

  //save our customer to use on tests bellow
  TEST_DATA.customer = create_result;
  test.equal(customers_after.length, (customers_before.length + 1), "Falha ao criar cliente");

});


/*Nos testes a API do IUGU não estava retornando o cliente nessa busca*/
Tinytest.add('Iugu - get customer', function(test) {
  var result = IugiApi.get_customer(TEST_DATA.customer.id);
  console.log(result);
  test.isNotUndefined(result, "Cliente nao retornou da API do Iugu")
  if(result)
     test.equal(result.name, TEST_DATA.customer.name, "Falha ao buscar cliente");
});

/*Nos testes a API do IUGU não estava retornando o cliente nessa busca*/
Tinytest.add('Iugu - update customer', function(test) {

  var updatedCustumer = {
    id: TEST_DATA.customer.id,
    name : "Customer 1 Updated"
  };
  var result = IugiApi.update_customer(updatedCustumer);
  console.log(result);
  test.equal(result.name, updatedCustumer.name, "Falha ao atualizar cliente")

});


Tinytest.add('Iugu - remove customer', function(test) {
  var customers_before = IugiApi.customers();
  var result = IugiApi.remove_customer(TEST_DATA.customer.id);

  //wait 2 sec to avoid old data from iugu
  Meteor._sleepForMs(2000);
  var customers_after = IugiApi.customers();

  test.equal(customers_after.length, customers_before.length - 1, "Falha ao remover cliente");

});
