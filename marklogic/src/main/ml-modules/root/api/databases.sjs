xdmp
  .databases()
  .toArray()
  .filter((id) => xdmp.schemaDatabase(id) !== 0)
  .map((id) => xdmp.databaseName(id));
