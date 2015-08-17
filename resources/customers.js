//create a customer
Iugu.API.prototype.create_customer = function(customer) {
  var ret = HTTP.post(this.base_url + 'customers', {
    auth: this.api_token + ':',
    data: customer
  });
  return this.check_for_errors(ret);
};

//update a customer
Iugu.API.prototype.update_customer = function(customer) {
  var ret = HTTP.put(this.base_url + 'customers/' + customer.id, {
    auth: this.api_token + ':',
    data: customer
  });
  return this.check_for_errors(ret);
};

//List all customers
Iugu.API.prototype.customers = function() {
  var ret = HTTP.get(this.base_url + 'customers', {
    auth: this.api_token + ':'
  });
  return this.check_for_errors(ret).items;
};

//Get a customer by id
Iugu.API.prototype.get_customer = function(id) {
  check(id, String);
  var ret = HTTP.get(this.base_url + 'customers/' + id, {
    auth: this.api_token + ':'
  });
  return this.check_for_errors(ret).items;
};

/*remove customer (if not in use)*/
Iugu.API.prototype.remove_customer = function(id) {
  var ret;
  check(id, String);
  ret = HTTP.del(this.base_url + 'customers/' + id, {
    auth: this.api_token + ':'
  });
  return this.check_for_errors(ret);
};
