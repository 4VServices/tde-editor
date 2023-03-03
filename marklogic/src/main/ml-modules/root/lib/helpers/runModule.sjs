const checkPrivileges = require('/lib/helpers/checkPrivileges.sjs');
const errorResponse = require('/lib/helpers/errorResponse.sjs');
const { AUTHENTICATED_PRIVILEGE } = require('/lib/helpers/constants.sjs');

/**
 * Runs a module or returns an error if the module can't be run
 * @param {function} fn - function (module) you want to run
 * @param {object} options={}
 * @param {string[]} options.allowedMethods={} - http methods allowed for this module
 * If undefined, all methods are allowed
 * @param {boolean} options.protected={} - whether or not user has to be authenticated to run this module
 * @param {string[]} options.requiredPrivileges={} - other required privileges the user needs to run this module
 * This is an array that can take strings or array of strings.
 * - each privilege in the array will be processed as an AND conjunction
 * - if the element is an array of strings, the privileges within this element will be processed as an OR conjunction
 * @returns {any}
 */
module.exports = function (fn, options = {}) {
  const { allowedMethods, protected = true, requiredPrivileges } = options;

  if (
    allowedMethods &&
    (Array.isArray(allowedMethods)
      ? !allowedMethods.some((method) => method.toUpperCase() === xdmp.getRequestMethod())
      : allowedMethods.toUpperCase() !== xdmp.getRequestMethod())
  ) {
    return errorResponse(404, 'Not Found');
  }

  if (protected) {
    if (!checkPrivileges(AUTHENTICATED_PRIVILEGE))
      return errorResponse(401, 'Unauthenticated', 'User needs to be authenticated to access this resource');
  }

  if (requiredPrivileges && Array.isArray(requiredPrivileges)) {
    for (const privilege of requiredPrivileges) {
      if (!checkPrivileges(privilege))
        return errorResponse(403, 'Forbidden', 'User does not have access to this resource');
    }
  }

  return fn();
};
