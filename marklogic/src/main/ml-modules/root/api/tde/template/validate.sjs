const tde = require('/MarkLogic/tde.xqy');

const runModule = require('/lib/helpers/runModule.sjs');

function validateTemplate() {
  return tde.validate([xdmp.toJSON(xdmp.getRequestBody())]);
}

runModule(validateTemplate, {
  protected: true
});
