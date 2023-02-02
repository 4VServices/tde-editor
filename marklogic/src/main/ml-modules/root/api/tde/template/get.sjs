const runModule = require('/lib/helpers/runModule.sjs');

function getTemplate() {
  const contentDB = xdmp.getRequestField('contentDB');
  const templateURI = xdmp.getRequestField('templateURI');

  return xdmp.invokeFunction(() => cts.doc(templateURI), {
    database: xdmp.schemaDatabase(xdmp.database(contentDB))
  });
}

runModule(getTemplate, {
  protected: true
});
