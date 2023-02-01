const requestMethod = xdmp.getRequestMethod();
const body = JSON.parse(xdmp.getRequestBody('json'));

function post() {
  if (!body || !body.username || !body.password) {
    fn.error(
      xs.QName('ERROR'),
      'RESTAPI-SRVEXERR',
      Sequence.from([400, 'Bad Request', 'Username and Password are required parameters'])
    );
  }

  const { username, password } = body;

  const login = xdmp.login(username, password, true);

  console.log('login', login);

  if (!login) {
    fn.error(null, 'RESTAPI-SRVEXERR', Sequence.from([403, 'Forbidden', 'Login attempt unsuccessful']));
    // xdmp.setResponseCode(403, 'Forbidden ass');
  }
}

function methodNotImplemented() {
  xdmp.setResponseCode(405, 'Blobs Method Not Allowed Bb');
}

exports.POST = post;
exports.GET = methodNotImplemented;
exports.PUT = methodNotImplemented;
exports.DELETE = methodNotImplemented;
