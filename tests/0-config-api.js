TEST_DATA = {
  email: "email",
  test_token: "token for tests",
  due_date: "18/08/2015",
  // timeout to procede so you can see the feature on iugu's website, look the console to know when you need to look the site
  wait_me_time: 0 //40seg is a good time
};

Tinytest.add('Iugu - config token', function(test) {

  IugiApi = new Iugu.API(TEST_DATA.test_token);

  test.instanceOf(IugiApi, Iugu.API);
  test.equal(IugiApi.api_token, TEST_DATA.test_token, "Falha ao instanciar a API");
});
