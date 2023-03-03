const runModule = require('/lib/helpers/runModule.sjs');

function getDatabases() {
  return xdmp
    .databases()
    .toArray()
    .filter((id) => xdmp.schemaDatabase(id) !== 0)
    .map((id) => xdmp.databaseName(id));
}

runModule(getDatabases, {
  allowedMethods: 'get',
  protected: true
});
