function listTemplates(appServerName) {
  const admin = require('/MarkLogic/admin.xqy'),
    config = admin.getConfiguration(),
    groupid = admin.groupGetId(config, "Default");
  try {
    var appserverId = admin.appserverGetId(config, groupid, appServerName);
  }
  catch(error) {
    fn.error(xs.QName('ERROR'),'API-SRVEXERR',
      Sequence.from([400,xdmp.toJSON(error).toObject().message, '"' + appServerName + '" is not an existing app server']))
  }
  const schemasDatabase = admin.databaseGetSchemaDatabase(config, admin.appserverGetDatabase(config,appserverId)),
    results = xdmp.invokeFunction(function() {
      return fn.collection('http://marklogic.com/xdmp/tde')
      .toArray()
      .map(tdeDoc => {
        let enabled = xdmp.toJSON(tdeDoc).toObject().template.enabled;
        return {
          "uri": tdeDoc.baseURI,
          "enabled": enabled === undefined ? true : enabled
        }
      })
      },{ database: schemasDatabase, transactionMode: 'query' });
  return {"templates": results}
};
const appServer = xdmp.getRequestField("appServer");
if (appServer !== undefined && appServer !== null && !fn.empty(appServer)) {
  listTemplates(xdmp.getRequestField("appServer"))
}
else {
  fn.error(xs.QName('ERROR'),'API-SRVEXERR',
      Sequence.from([400,'MISSING-PARAMETER','"appServer" is a required parameter']))
}
