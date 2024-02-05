"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function RowHeader(props) {
    return (react_1.default.createElement("div", { className: 'rowHeader' },
        react_1.default.createElement("div", { className: 'headerName-api' }, props.api),
        react_1.default.createElement("div", { className: 'headerName' }, props.location),
        react_1.default.createElement("div", { className: 'headerName-status' }, props.status),
        react_1.default.createElement("div", { className: 'headerName-api' }, props.stable),
        react_1.default.createElement("div", { className: 'headerName-notes' }, props.notes)));
}
exports.default = RowHeader;
