Package.describe({
  name: 'adrianolsk:iugu',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Provide integration with the Brazilian payment gateway Iugu api ',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/adrianolsk/iugu-meteor.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.use('http');

  api.addFiles('iugu.js', ['server']);
  api.addFiles('resources/customers.js', ['server']);
  api.addFiles('resources/payment_methods.js', ['server']);
  api.addFiles('resources/invoices.js', ['server']);
  api.addFiles('resources/plans.js', ['server']);
  api.addFiles('resources/subscriptions.js', ['server']);
  api.addFiles('resources/charge.js', ['server']);
  api.addFiles('resources/transfers.js', ['server']);
  api.addFiles('resources/marketplace.js', ['server']);
  api.export('Iugu');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('mongo');
  api.use('adrianolsk:iugu');

  //change the configuration in the file bellow
  api.addFiles('tests/0-config-api.js', ['server']);

  //You can comment any line a bellow ant test only those you want
//  api.addFiles('tests/1-customers-tests.js', ['server']);
  //api.addFiles('tests/2-payment-methods-tests.js', ['server']);
  //api.addFiles('tests/3-invoices-tests.js', ['server']);
  //api.addFiles('tests/4-plans-tests.js', ['server']);
  api.addFiles('tests/5-subscriptions-tests.js', ['server']);


});
