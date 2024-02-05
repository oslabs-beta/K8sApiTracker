"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var fa_1 = require("react-icons/fa");
var io_1 = require("react-icons/io");
var si_1 = require("react-icons/si");
function Row(props) {
    // render the icon depending on the status of the api
    var icon;
    if (props.status === 'stable') {
        icon = react_1.default.createElement(fa_1.FaCheckCircle, { className: "icon-stable" });
    }
    else if (props.status === 'updateAvailable') {
        icon = react_1.default.createElement(io_1.IoIosWarning, { className: "icon-deprecated" });
    }
    else {
        icon = react_1.default.createElement(si_1.SiIfixit, { className: "icon-removed" });
    }
    //-------- Icons can be found here: https://react-icons.github.io/react-icons/search/#q=error --------//
    return (react_1.default.createElement("div", { className: 'row' },
        react_1.default.createElement("div", { className: "api-info-api" }, props.api),
        react_1.default.createElement("div", { className: "api-info-location" }, props.location),
        react_1.default.createElement("div", { className: "api-info-status-wrapper" },
            react_1.default.createElement("div", { className: "api-info-status-" + props.status },
                icon,
                props.status)),
        react_1.default.createElement("div", { className: "api-info-stable-version" }, props.stable),
        react_1.default.createElement("div", { className: "api-info-notes" + (props.notes === 'NA' ? '-has-notes' : '') }, props.notes)));
}
exports.default = Row;
