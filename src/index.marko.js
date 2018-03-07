// Compiled using marko@4.7.4 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/dist/html").t(__filename),
    marko_componentType = "/maxmiltoncom$2.0.0-unreleased/src/index.marko",
    components_helpers = require("marko/dist/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/dist/runtime/html/helpers"),
    marko_escapeXml = marko_helpers.x;

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<h1>Hello " +
    marko_escapeXml(input.name) +
    "</h1>");
}

marko_template._ = marko_renderer(render, {
    ad_: true,
    _l_: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/maxmiltoncom$2.0.0-unreleased/src/index.marko"
  };
