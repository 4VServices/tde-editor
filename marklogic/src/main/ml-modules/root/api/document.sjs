const uri = xdmp.getRequestField("uri");
if (uri !== undefined && uri !== null && !fn.empty(uri)) {
  if (fn.docAvailable(uri)) {
    cts.doc(uri) 
  }
  else {
    fn.error(xs.QName('ERROR'),'API-SRVEXERR',
      Sequence.from([400,'MISSING-DOCUMENT','Document not found with the uri: '+ uri]))
  }
}
else {
  fn.error(xs.QName('ERROR'),'API-SRVEXERR',
      Sequence.from([400,'MISSING-PARAMETER','"uri" is a required parameter']))
}
