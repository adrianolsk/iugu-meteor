/*Cria uma plano*/
Iugu.API.prototype.create_plan = function(plan) {
  var ret = HTTP.post(this.base_url + 'plans', {
    auth: this.api_token + ':',
    data: plan
  });
  return this.check_for_errors(ret);
};
/*Cria uma plano*/
Iugu.API.prototype.update_plan = function(plan_id, plan) {
  var ret = HTTP.put(this.base_url + 'plans/' + plan_id, {
    auth: this.api_token + ':',
    data: plan
  });
  return this.check_for_errors(ret);
};
/*Busca uma fatura pelo ID*/
Iugu.API.prototype.get_plan = function(plan_id) {
  var ret = HTTP.get(this.base_url + 'plans/' + plan_id, {
    auth: this.api_token + ':'
  });
  return this.check_for_errors(ret);
};
/*Busca um plano pelo identificador*/
Iugu.API.prototype.get_plan_by_identifier = function(identifier) {
  var ret = HTTP.get(this.base_url + 'plans/identifier/' + identifier, {
    auth: this.api_token + ':'
  });
  return this.check_for_errors(ret);
};


/*Remove um plano pelo id*/
Iugu.API.prototype.remove_plan = function(plan_id) {
  var ret = HTTP.del(this.base_url + 'plans/' + plan_id, {
    auth: this.api_token + ':'
  });
  return this.check_for_errors(ret);
};


/*Lsita todas as faturas de acordo com a busca (use paginacao aqui)*/
Iugu.API.prototype.plans = function(search) {
  var ret = HTTP.get(this.base_url + 'plans', {
    auth: this.api_token + ':',
    data: search
  });
  return this.check_for_errors(ret);
};
