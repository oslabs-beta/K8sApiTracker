"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var MainPageContainer_1 = require("./MainPageContainer");
// import SummaryContainer from './SummaryContainer';
function App() {
    return (react_1.default.createElement("div", { className: "app" },
        react_1.default.createElement("h1", { className: "kdt-header" }, "KUBERNETES DEPENDENCY TRACKER"),
        react_1.default.createElement(MainPageContainer_1.default, null)));
}
exports.default = App;
;
