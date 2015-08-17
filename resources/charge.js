Iugu.API.prototype.charge = function(charge) {
  var ret;
  ret = HTTP.post(this.base_url + 'charge', {
    auth: this.api_token + ':',
    data: options
  });
  return this.check_for_errors(ret);
};

Iugu.API.prototype.charge_bank_slip = function(bank_slip) {
  var ret;
  ret = HTTP.post(this.base_url + 'charge', {
    auth: this.api_token + ':',
    data: bank_slip
  });
  return this.check_for_errors(ret);
};
