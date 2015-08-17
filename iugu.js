Iugu = {};
Iugu.API = (function() {
  function API(api_token) {
    this.api_token = api_token;
    check(this.api_token, String);
    this.base_url = 'https://api.iugu.com/v1/';
  }
  API.prototype.check_for_errors = function(ret) {
    if (ret.data.errors && !ret.data.sucess === 'true') {
      throw new Meteor.Error(ret.statusCode, EJSON.stringify(ret.data.errors));
    }
    return ret.data;
  };

  return API;
})();
