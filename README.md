# iugu-meteor
This package provide (server side) integration with the Iugu payment API (brazilian payment gateway)
No client side support added.

The oficial iugu documentation can be found here https://iugu.com/referencias/api

Please read everything bellow before you start to using it

## Resources in this package
The package supports the methods bellow:
#### Customers
* create_customer
* update_customer
* customers (list)
* get_customer (1 Issue here, iugu return undefined)
* remove_customer

#### Payment methods
* create_payment_method
* payment_methods (list)
* get_payment_method
* update_payment_method
* remove_payment_method

#### Invoices
* create_invoice
* get_invoice
* cancel_invoice
* remove_invoice
* invoices (list)
* refund_invoice

#### Plans
* create_plan
* update_plan
* get_plan
* get_plan_by_identifier
* remove_plan
* plans (list)

#### Subscriptions
* create_subscription
* update_subscription
* remove_subscription
* suspend_subscription
* activate_subscription
* change_subscription_plan
* subscription_add_credits
* subscription_remove_credits
* subscriptions
* get_subscription

#### Charge and Bank Slip
* charge
* charge_bank_slip

## Testing installing the package with meteor add

Setup the startup configuration with your api key
* Use the test key first
````js
Meteor.startup(function(){
  //Put your IUGU token bellow - Use the test KEY for tests
  IugiApi = new Iugu.API("YOUR API KEY HERE");
});
````
To use it just create Meteor methods and call the api
````js
Meteor.methods({
  'iugu.listCustomers': function() {
    var customers = IugiApi.customers()
    return clientes;
});
  ````


## Testing cloning the package

If you are cloning this repository you can run the tests directly on this package using meteor
change the configuration on
* iugu\tests\0-config-api.js
````js
TEST_DATA = {
  email: "youremail",
  test_token: "YOUR TEST TOKEN",
  due_date: "18/08/2015",
  /* timeout to procede so you can see the feature on iugu's website,
   look the console to know when you need to look the site, set 0 if you don't want to check.
  */
  wait_me_time: 0 //put something between 40000 (40seg) and 60000 (1 minute)
};
````
The test directory contains examples of how to call each method on the api
You can comment any test files from 1 to 5 in the package.js file
To test the package run the command bellow and go to localhost:3000
````sh
cd iugu
meteor test-packages ./
````


### Not suported (yet)

A few resources are not supported yet

- Transfers
- Marketplace


## Webhooks (Gatilhos)

After a invoice is marked as paid or any other action, iugu can call a url from your website,
you can configure this url on https://iugu.com/a/webhooks you need to put a published url
localhost will not work.

I suggest you create a collection to insert the returned data to check it later

````js
//lib directory (client and server)
Iugu = new Mongo.Collection("iugu");
````

To create a URL you can either use Ironrouter if your are used to it
````js
//server
Router.onBeforeAction(Iron.Router.bodyParser.urlencoded({
  extended: false
}));

Router.route('/api/retorno', function() {
  body = this.request.body;
  Iugu.insert(body);
  this.response.end("OK");
}, {
  where: 'server'
})
````
or you can use the JsonRoutes packages (meteor add simple:json-routes)
I am using it since I am using angular and Ironrouter conflicted with ui-router.

````js
//server
JsonRoutes.add("post", "/api/retorno", function(req, res, next) {
  Iugu.insert(req.body);
  JsonRoutes.sendResult(res, 200, req.body);
});
````

Save your URl on iugu webhooks  ex: http://yoursite.com/api/retorno
and check the collections after your tests
