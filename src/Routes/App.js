import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../Pages/Auth/login";
import CreateAccount from "../Pages/Auth/createAccount";


function App() {
return (
    <Fragment>
    <Router>
        <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/CreateAccount" element={<CreateAccount />} />
        </Routes>
    </Router>
    </Fragment>
);
}

export default App;