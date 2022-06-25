const tde = require('/MarkLogic/tde.xqy');

tde.validate([xdmp.toJSON(xdmp.getRequestBody())]);
