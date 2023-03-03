const tde = require('/MarkLogic/tde.xqy');

const runModule = require('/lib/helpers/runModule.sjs');

function getVerifiedParameters(paramSpec) {
  let response = {
    valid: true,
    params: paramSpec.params
  };
  let fields = xdmp.getRequestFieldNames().toArray();
  Object.keys(paramSpec.params).forEach((key) => {
    if (!fields.includes(key) && paramSpec.params[key].required) {
      xdmp.setResponseCode(400, 'Bad Request');
      response.valid = false;
      response.message = `Missing parameter: ${key}`;
    } else {
      paramSpec.params[key].value = xdmp.getRequestField(key);
    }
  });
  return response;
}

function insertTemplate() {
  const template = xdmp.getRequestBody();
  const validation = tde.validate([template]);
  let result = null;
  let verifiedParams = getVerifiedParameters({
    params: {
      contentDB: { required: true },
      uri: { required: true }
    }
  });

  if (!verifiedParams.valid) {
    // We're missing a parameter. Bail.
    return {
      valid: false,
      message: verifiedParams.message
    };
  } else if (validation.valid === true) {
    // Good template, good parameters. Do the insert in the correct database.
    xdmp.invokeFunction(
      () => {
        tde.templateInsert(verifiedParams.params.uri.value, xdmp.toJSON(template));
        result = {
          valid: true
        };
      },
      {
        database: xdmp.database(verifiedParams.params.contentDB.value)
      }
    );
  } else {
    // Return the error
    result = validation;
  }

  return result;
}

runModule(insertTemplate, {
  protected: true,
  allowedMethods: 'post'
});
