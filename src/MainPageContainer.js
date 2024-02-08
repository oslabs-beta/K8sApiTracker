"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Row_1 = __importDefault(require("./Row"));
const RowHeader_1 = __importDefault(require("./RowHeader"));
const react_1 = __importStar(require("react"));
const react_loading_icons_1 = require("react-loading-icons");
// use this website to change loading icon https://www.npmjs.com/package/react-loading-icons
function MainPageContainer() {
    //create an array of row components
    const rows = [];
    // initialize our state
    const [dependencies, setDependencies] = (0, react_1.useState)([]);
    const [isLoading, setLoading] = (0, react_1.useState)(true);
    // make a fetch request to our backend at the route /dependencies.
    // call a useEffect here to fetch our data when the page loads and update state.
    // Our dependency array is an empty array, so that this only happens once on page load
    (0, react_1.useEffect)(() => {
        function getDependencies() {
            return __awaiter(this, void 0, void 0, function* () {
                let response = yield fetch('/dependencies');
                const responseData = yield response.json();
                console.log(responseData);
                setDependencies(responseData);
                setLoading(false);
            });
        }
        getDependencies();
    }, []);
    //iterate through state to make all of our rows, and push them into the array
    for (const dependency of dependencies) {
        // for each subarray, create a new row, passing in the data from data, 
        // which we get from a fetch request to the back end
        rows.push(react_1.default.createElement(Row_1.default, { key: dependency.name, api: dependency.apiVersion, status: dependency.deprecationStatus, location: dependency.name, stable: dependency.newVersion ? dependency.newVersion : 'Up to date', notes: dependency.description ? dependency.description : 'NA' }));
    }
    // define a function to sort the dependencies by status, which will be passed into the header
    return (react_1.default.createElement("div", { className: 'mainPageContainer' },
        react_1.default.createElement(RowHeader_1.default, { key: 'row-header-key', api: 'API', status: 'STATUS', location: 'LOCATION', stable: 'STABLE VERSION', notes: 'NOTES' }),
        isLoading ? react_1.default.createElement(react_loading_icons_1.SpinningCircles, { className: "content-loading" }) : null,
        react_1.default.createElement("div", { className: 'row-content-container' }, rows)));
}
exports.default = MainPageContainer;
