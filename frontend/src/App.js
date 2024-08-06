import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import './App.css';
import { RouterProvider } from "react-router-dom";
import router from './routes';
function App() {
    return (_jsx(React.StrictMode, { children: _jsx(RouterProvider, { router: router }) }));
}
export default App;
