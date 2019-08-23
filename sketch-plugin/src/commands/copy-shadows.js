const PS = require('../scripts/output.js')["Main"];

exports["copyShadows"] = function() {
    PS.copyOrCutShadows("COPY")();
}

exports["cutShadows"] = function() {
    PS.copyOrCutShadows("CUT")();
}

exports["pasteShadows"] = function() {
    PS.pasteOrRemoveShadows("PASTE")();
}

exports["removeShadows"] = function() {
    PS.pasteOrRemoveShadows("REMOVE")();
}