const runModule = require('/lib/helpers/runModule.sjs');
const { AUTHENTICATED_PRIVILEGE } = require('/lib/helpers/constants.sjs');

function getStatus() {
  const isAuthenticated = xdmp.hasPrivilege(AUTHENTICATED_PRIVILEGE, 'execute');
  return { isAuthenticated };
}

runModule(getStatus, {
  methodsAllowed: 'get',
  protected: false
});
