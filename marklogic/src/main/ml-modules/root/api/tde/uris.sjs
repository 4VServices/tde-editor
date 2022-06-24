const tde = require('/MarkLogic/tde.xqy');
const template = xdmp.getRequestBody();

let page = xdmp.getRequestField('page');
let pageSize = xdmp.getRequestField('pageSize');
let finalCollectionsQuery;

page = page === null ? 1 : page;
pageSize = pageSize === null ? 20 : pageSize;

if (template !== undefined && template !== null && !fn.empty(template)) {
  let templateObj = xdmp.toJSON(template).toObject().template,
    collections = templateObj.collections,
    directories = templateObj.directories;
  if (collections !== undefined && collections !== null && !fn.empty(collections)) {
    let uniCollections = collections.filter((collection) => !collection.collectionsAnd),
      andCollections = collections.filter((collection) => collection.collectionsAnd),
      uniCollectionsQuery = cts.collectionQuery(uniCollections),
      andCollectionsArray = andCollections.map((andCollection) => {
        return andCollection.collectionsAnd.map((coll) => cts.collectionQuery(coll));
      }),
      andCollectionsQuery = andCollectionsArray.map((item) => cts.andQuery(item));
    finalCollectionsQuery = cts.orQuery([uniCollectionsQuery, andCollectionsQuery]);
  }
  let finalDirectoryQuery;
  if (directories !== undefined && directories !== null && !fn.empty(directories)) {
    finalDirectoryQuery = cts.directoryQuery(directories, 'infinity');
  }
  cts.uris(
    '',
    ['map', 'skip=' + (page - 1) * pageSize, 'truncate=' + pageSize],
    cts.andQuery([finalCollectionsQuery, finalDirectoryQuery])
  );
} else {
  fn.error(
    xs.QName('ERROR'),
    'API-SRVEXERR',
    Sequence.from([400, 'MISSING-BODY', 'Template is a required text in the body'])
  );
}
