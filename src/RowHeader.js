"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function RowHeader(props) {
    return (react_1.default.createElement("div", { className: 'rowHeader' },
        react_1.default.createElement("div", { className: 'headerName-api' }, props.api),
        react_1.default.createElement("div", { className: 'headerName' }, props.location),
        react_1.default.createElement("div", { className: 'headerName-status' }, props.status),
        react_1.default.createElement("div", { className: 'headerName-api' }, props.stable),
        react_1.default.createElement("div", { className: 'headerName-notes' }, props.notes)));
}
exports.default = RowHeader;
