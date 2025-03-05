const errorResponse = require('/lib/helpers/errorResponse.sjs');
const runModule = require('/lib/helpers/runModule.sjs');

function getUris() {
  const template = xdmp.getRequestBody();

  if (template === undefined || template === null || fn.empty(template)) {
    return errorResponse(400, 'MISSING-BODY', 'Template is a required text in the body');
  }

  let page = xdmp.getRequestField('page');
  let pageSize = xdmp.getRequestField('pageSize');
  let totalCount = xdmp.getRequestField('totalCount');
  let contentDB = xdmp.getRequestField('contentDB');

  page = page === null ? 1 : page;
  pageSize = pageSize === null ? 10 : pageSize;

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

  if (contentDB === undefined || contentDB === null || fn.empty(contentDB)) {
    return errorResponse(400, 'MISSING-PARAMETER', '"contentDB" is a required parameter');
  }

  let contentDBId = getDatabaseId(contentDB);

  let templateObj = xdmp.toJSON(template).toObject().template,
    collections = templateObj.collections,
    directories = templateObj.directories,
    context = templateObj.context;

  let finalCollectionsQuery;
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
  let finalContextQuery;
  if (context !== undefined && context !== null && !fn.empty(context)) {
    let elements = context.split('/').filter(e => e);
    finalContextQuery = cts.trueQuery();
    for (let i = elements.length - 1; i >= 0; i--) {
      finalContextQuery = cts.jsonPropertyScopeQuery(`${elements[i]}`, finalContextQuery);
    }
  }

  const getTotalCount = () => {
    return xdmp.invokeFunction(
      function () {
        return fn.count(cts.uris(
          '',
          ['ascending'],
          cts.andQuery([finalCollectionsQuery, finalDirectoryQuery, finalContextQuery])
        ));
      },
      { database: contentDBId }
    );
  };

  totalCount = Number(totalCount) === 0 ? getTotalCount() : totalCount;

  let uris = xdmp.invokeFunction(
    function () {
      return fn.subsequence(cts.uris(
        '',
        ['ascending'],
        cts.andQuery([finalCollectionsQuery, finalDirectoryQuery, finalContextQuery])
      ), (1 + ((page - 1) * pageSize)), pageSize);
    },
    { database: contentDBId }
  );

  return { totalCount: totalCount, uris: Array.from(uris) };

}

runModule(getUris, {
  allowedMethods: 'post',
  protected: true
});
