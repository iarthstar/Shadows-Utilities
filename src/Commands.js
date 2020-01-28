const PS = require('../output/bundle.js')["Main"];

exports.copyShadows     = PS.performAction('COPY');
exports.pasteShadows    = PS.performAction('PASTE');
exports.cutShadows      = PS.performAction('CUT');
exports.deleteShadows   = PS.performAction('DELETE');