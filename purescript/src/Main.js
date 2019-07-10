"use strict";

var dom = require('sketch/dom');

exports["setShadowsForLayerID"] = function (id) {
    return function (data) {
        return function () {
            var layer = dom.getSelectedDocument().getLayerWithID(id);
            layer.style.shadows = data;
            return {};
        }
    }
}

exports["removeShadowsForLayerID"] = function (id) {
    return function () {
        var layer = dom.getSelectedDocument().getLayerWithID(id);
        layer.style.shadows = [];
        return {};
    }
}