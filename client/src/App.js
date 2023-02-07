import {Routes, Route, useNavigate, useLocation} from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import Register from './pages/Register';
import DisplayProject from './pages/DisplayProject';
import NewProject from "./pages/NewProject";
import UpdateProject from './pages/UpdateProject';
import HomePage from './pages/HomePage';
import AllMemberProjects from './pages/AllMemberProjects';
import axios from 'axios';
import { useEffect } from 'react';
import { userState } from './GlobalState';
import { useReactiveVar } from '@apollo/client';
import log from './helpers/logging';

axios.defaults.withCredentials=true;

function App() {
    const user = useReactiveVar(userState);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/crafttrckr/logginguser`)
            .then((res)=> {
                userState(res.data);
            })
            .catch((err)=>{
                log(err);
                navigate("/");
            });
    }, [navigate]);

    if(!user && location.pathname !== "/" && location.pathname !== "/register"){
        return null;
    }

    return (
        <div>
            <Routes>
                <Route element={<LoginPage/>} path="/" />
                <Route element={<Register/>} path="/register"/>
                <Route element={<HomePage/>} path="/home" />
                <Route element={<DisplayProject/>} path="/project/:id" />
                <Route element={<AllMemberProjects/>} path="/project/AllMemberProjects" />
                <Route element={<NewProject/>} path="/project/new" />
                <Route element={<UpdateProject/>} path="/project/:id/edit" />
            </Routes>
        </div>
    );
}

export default App;
