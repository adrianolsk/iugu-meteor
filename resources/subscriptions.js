/*Cria uma assinatura para um cliente no plano informado*/
Iugu.API.prototype.create_subscription = function(subscription) {
  var ret = HTTP.post(this.base_url + 'subscriptions', {
    auth: this.api_token + ':',
    data: subscription
  });
  return this.check_for_errors(ret);
};

// Atualiza uma assinatura
Iugu.API.prototype.update_subscription = function(subscription_id, subscription) {
  var ret = HTTP.put(this.base_url + 'subscriptions/' + subscription_id, {
    auth: this.api_token + ':',
    data: subscription
  });
  return this.check_for_errors(ret);
};

// Atualiza uma assinatura
Iugu.API.prototype.remove_subscription = function(subscription_id) {
  var ret = HTTP.del(this.base_url + 'subscriptions/' + subscription_id, {
    auth: this.api_token + ':'
  });
  return this.check_for_errors(ret);
};

// Suspende uma assinatura
Iugu.API.prototype.suspend_subscription = function(subscription_id) {
  var ret = HTTP.post(this.base_url + 'subscriptions/' + subscription_id + "/suspend", {
    auth: this.api_token + ':'
  });
  return this.check_for_errors(ret);
};
//ativa uma assinatura
Iugu.API.prototype.activate_subscription = function(subscription_id) {
  var ret = HTTP.post(this.base_url + 'subscriptions/' + subscription_id + "/activate", {
    auth: this.api_token + ':'
  });
  return this.check_for_errors(ret);
};
//altera o plano da assinatura
Iugu.API.prototype.change_subscription_plan = function(subscription_id, new_plan_identifier) {
  var ret = HTTP.post(this.base_url + 'subscriptions/' + subscription_id + "/change_plan/" + new_plan_identifier, {
    auth: this.api_token + ':'
  });
  return this.check_for_errors(ret);
};
//adiciona creditos a uma assinatura
Iugu.API.prototype.subscription_add_credits = function(subscription_id, quantity) {
  var ret = HTTP.put(this.base_url + 'subscriptions/' + subscription_id + "/add_credits", {
    auth: this.api_token + ':',
    data: {
      quantity: quantity
    }
  });
  return this.check_for_errors(ret);
};

//remove creditos da assinatura
Iugu.API.prototype.subscription_remove_credits = function(subscription_id, quantity) {
  var ret = HTTP.put(this.base_url + 'subscriptions/' + subscription_id + "/remove_credits", {
    auth: this.api_token + ':',
    data: {
      quantity: quantity
    }
  });
  return this.check_for_errors(ret);
};

/*Lista todas as assinaturas realizadas*/
Iugu.API.prototype.subscriptions = function() {
  var ret = HTTP.get(this.base_url + 'subscriptions', {
    auth: this.api_token + ':'
  });
  return this.check_for_errors(ret);
};


// Atualiza uma assinatura
Iugu.API.prototype.get_subscription = function(subscription_id) {
  var ret = HTTP.get(this.base_url + 'subscriptions/' + subscription_id, {
    auth: this.api_token + ':'
  });
  return this.check_for_errors(ret);
};
