//Add a payment method to the customer
Iugu.API.prototype.create_payment_method = function(payment_method) {
  var ret = HTTP.post(this.base_url + 'customers/' + payment_method.customer_id + '/payment_methods', {
    auth: this.api_token + ':',
    data: payment_method
  });
  return this.check_for_errors(ret);
};

//List all payment methods for one customer
Iugu.API.prototype.payment_methods = function(customer_id) {
  var ret = HTTP.get(this.base_url + 'customers/' + customer_id + '/payment_methods', {
    auth: this.api_token + ':'
  });
  return this.check_for_errors(ret);
};


//List all payment methods for one customer
Iugu.API.prototype.get_payment_method = function(customer_id, payment_method_id) {
  var ret = HTTP.get(this.base_url + 'customers/' + customer_id + '/payment_methods/' + payment_method_id, {
    auth: this.api_token + ':'
  });
  return this.check_for_errors(ret);
};

//Update the card description
Iugu.API.prototype.update_payment_method = function(customer_id, payment_method_id, payment_object) {
  var ret = HTTP.put(this.base_url + 'customers/' + customer_id + '/payment_methods/' + payment_method_id, {
    auth: this.api_token + ':' ,
    data :  payment_object
  });

  return this.check_for_errors(ret);
};

//remove de payment method
Iugu.API.prototype.remove_payment_method = function(customer_id, payment_method_id, payment_object) {
  var ret = HTTP.del(this.base_url + 'customers/' + customer_id + '/payment_methods/' + payment_method_id, {
    auth: this.api_token + ':'
  });
  return this.check_for_errors(ret);
};
