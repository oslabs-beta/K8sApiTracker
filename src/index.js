"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var App_1 = require("./App");
var client_1 = require("react-dom/client");
require("./static/styles.css");
var root = (0, client_1.createRoot)(document.getElementById('root'));
root.render(react_1.default.createElement(App_1.default, null));
