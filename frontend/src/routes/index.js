import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Route, createBrowserRouter, createRoutesFromElements, } from "react-router-dom";
import FindProvider from "../screens/FindProvider/FindProvider";
import CreateProvider from "../screens/CreateProvider/CreateProvider";
const router = createBrowserRouter(createRoutesFromElements(_jsxs(_Fragment, { children: [_jsx(Route, { path: "/", element: _jsx(FindProvider, {}) }), _jsx(Route, { path: "/create-provider", element: _jsx(CreateProvider, {}) })] })));
export default router;
