const runModule = require('/lib/helpers/runModule.sjs');

runModule(xdmp.logout, {
  methodsAllowed: 'post',
  protected: false
});
