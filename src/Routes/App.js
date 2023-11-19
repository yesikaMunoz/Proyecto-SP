import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../Pages/Auth/login";
import CreateAccount from "../Pages/Auth/createAccount";
import Home from "../Pages/Home";
import Projects from "../Pages/Projects/projectsAdmin";
import ProjectsTickets from "../Pages/Projects/Tickets";
import ProjectsCreate from "../Pages/Projects/createTicket";
import Chat from "../Pages/Projects/chat";
import ChatTickets from "../Pages/Projects/chatTicket";

function App() {
return (
    <Fragment>
    <Router>
        <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/CreateAccount" element={<CreateAccount />} />
          <Route path='/Home' exact element = {<Home/>}/>
          <Route path='/Projects' exact element = {<Projects/>}/>
          <Route path='/Tickets' exact element = {<ProjectsTickets/>}/>
          <Route path='/TicketsC' exact element = {<ProjectsCreate/>}/>
          <Route path='/Chats' exact element = {<ChatTickets/>}/>
          <Route path='/ChatsR/:idTickets' exact element = {<Chat/>}/>
        </Routes>
    </Router>
    </Fragment>
);
}

export default App;