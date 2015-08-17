/*Cria uma fatura*/
Iugu.API.prototype.create_invoice = function(invoice) {
  var ret = HTTP.post(this.base_url + 'invoices', {
    auth: this.api_token + ':',
    data: invoice
  });
  return this.check_for_errors(ret);
};
/*Busca uma fatura pelo ID*/
Iugu.API.prototype.get_invoice = function(invoice_id) {
  var ret = HTTP.get(this.base_url + 'invoices/' + invoice_id, {
    auth: this.api_token + ':'
  });
  return this.check_for_errors(ret);
};
/*cancela uma fatura pelo ID (somente faturas pendentes podem ser canceladas)*/
Iugu.API.prototype.cancel_invoice = function(invoice_id) {
  var ret = HTTP.put(this.base_url + 'invoices/' + invoice_id + "/cancel", {
    auth: this.api_token + ':'
  });
  return this.check_for_errors(ret);
};
/*Remove uma fatura pelo ID (somente canceladas podem ser removidas)*/
Iugu.API.prototype.remove_invoice = function(invoice_id) {
  var ret = HTTP.del(this.base_url + 'invoices/' + invoice_id, {
    auth: this.api_token + ':'
  });
  return this.check_for_errors(ret);
};


/*Lsita todas as faturas de acordo com a busca (use paginacao aqui)*/
Iugu.API.prototype.invoices = function(search) {
  var ret = HTTP.get(this.base_url + 'invoices', {
    auth: this.api_token + ':',
    data: search
  });
  return this.check_for_errors(ret);
};

/*Estorna a fatura (somente via cartao de credito)*/
Iugu.API.prototype.refund_invoice = function(invoice_id) {
  var ret = HTTP.post(this.base_url + 'invoices/' + invoice_id + "/refund", {
    auth: this.api_token + ':'
  });
  return this.check_for_errors(ret);
};
