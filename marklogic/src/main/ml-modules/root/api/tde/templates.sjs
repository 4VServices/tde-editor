const errorResponse = require('/lib/helpers/errorResponse.sjs');
const runModule = require('/lib/helpers/runModule.sjs');

function getTemplates() {
  const listTemplates = (contentDBId) => {
    return {
      templates: xdmp.invokeFunction(
        function () {
          return (
            fn
              .collection('http://marklogic.com/xdmp/tde')
              .toArray()
              // We're only supporting JSON templates for now
              .filter((tdeDoc) => tdeDoc.root.nodeType === Node.OBJECT_NODE)
              .map((tdeDoc) => {
                let enabled = xdmp.toJSON(tdeDoc).toObject().template.enabled;
                return {
                  uri: tdeDoc.baseURI,
                  enabled: enabled === undefined ? true : enabled
                };
              })
          );
        },
        { database: xdmp.schemaDatabase(contentDBId) }
      )
    };
  };

  const getDatabaseId = (dbName) => {
    try {
      return xdmp.database(dbName);
    } catch (e) {
      return errorResponse(
        400,
        'Invalid Database',
        `${dbName} is not the name of a database in this MarkLogic instance`
      );
    }
  };

  const contentDB = xdmp.getRequestField('contentDB');
  if (contentDB === undefined || contentDB === null || fn.empty(contentDB)) {
    return errorResponse(400, 'MISSING-PARAMETER', '"contentDB" is a required parameter');
  }
  return listTemplates(getDatabaseId(contentDB));
}

runModule(getTemplates, {
  allowedMethods: 'get',
  protected: true
});
