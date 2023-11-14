import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../Pages/Auth/login";
import CreateAccount from "../Pages/Auth/createAccount";
import Dashboard from "../Pages/Auth/dashboard";
import Ticket from "../Pages/Auth/createTicket"; 
import Reply from "../Pages/Auth/Projects/reply";

function App() {
return (
    <Fragment>
    <Router>
        <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/CreateAccount" element={<CreateAccount />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Ticket" element={<Ticket />} />
        <Route path="/Reply/:idTicket" element={<Reply />} />
        </Routes>
    </Router>
    </Fragment>
);
}

export default App;