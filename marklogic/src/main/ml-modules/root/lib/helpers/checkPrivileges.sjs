module.exports = function (privilegeActionUris) {
  try {
    xdmp.securityAssert(privilegeActionUris, 'execute');
    return true;
  } catch (err) {
    return false;
  }
};
