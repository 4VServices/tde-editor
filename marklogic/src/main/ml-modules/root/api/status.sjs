const runModule = require('/lib/helpers/runModule.sjs');
const { AUTHENTICATED_PRIVILEGE } = require('/lib/helpers/constants.sjs');

function getStatus() {
  return {
    isAuthenticated: xdmp.hasPrivilege(AUTHENTICATED_PRIVILEGE, 'execute'),
    username: xdmp.getCurrentUser()
  };
}

runModule(getStatus, {
  methodsAllowed: 'get',
  protected: false
});
