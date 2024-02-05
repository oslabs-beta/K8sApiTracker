"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const MainPageContainer_1 = __importDefault(require("./MainPageContainer"));
// import SummaryContainer from './SummaryContainer';
function App() {
    return (react_1.default.createElement("div", { className: "app" },
        react_1.default.createElement("h1", { className: "kdt-header" }, "KUBERNETES API TRACKER"),
        react_1.default.createElement(MainPageContainer_1.default, null)));
}
exports.default = App;
;
