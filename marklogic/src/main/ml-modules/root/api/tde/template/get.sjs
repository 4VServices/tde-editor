'use strict';

const contentDB = xdmp.getRequestField('contentDB');
const templateURI = xdmp.getRequestField('templateURI');

xdmp.invokeFunction(() => cts.doc(templateURI), {
  database: xdmp.schemaDatabase(xdmp.database(contentDB)),
});
