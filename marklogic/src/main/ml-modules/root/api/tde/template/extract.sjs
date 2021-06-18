const tde = require("/MarkLogic/tde.xqy"),
      template = xdmp.getRequestBody(),
      uri = xdmp.getRequestField("uri");
if (uri !== undefined && uri !== null && !fn.empty(uri)) {
  if (fn.docAvailable(uri)) {
    if (template !== undefined && template !== null && !fn.empty(template)) {
      let validTemplate = xdmp.toJSON(tde.validate([template])).toObject()
      if (validTemplate.valid === true) {
        tde.nodeDataExtract([cts.doc( uri )],[template]) 
      }
      else {
        fn.error(xs.QName('ERROR'),'API-SRVEXERR',
          Sequence.from([400,'TEMPLATE-ERROR','Template provided is invalid ' + validTemplate.message]))
      }
    }
    else {
      fn.error(xs.QName('ERROR'),'API-SRVEXERR',
          Sequence.from([400,'MISSING-BODY','Template is a required text in the body']))
    }
  }
  else {
    fn.error(xs.QName('ERROR'),'API-SRVEXERR',
      Sequence.from([400,'MISSING-DOCUMENT','Document not found with the uri: '+ uri]))
  }
}
else {
  fn.error(xs.QName('ERROR'),'API-SRVEXERR',
      Sequence.from([400,'MISSING-PARAMETER','uri is a required parameter']))
}
