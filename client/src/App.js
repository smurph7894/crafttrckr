import {BrowserRouter, Routes, Route, useNavigate, useLocation} from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import Register from './pages/Register';
import Home from './pages/Home';
import DisplayProject from './pages/DisplayProject';
import NewProject from "./pages/NewProject";
import UpdateProject from './pages/UpdateProject';
import axios from 'axios';
import { useEffect } from 'react';
import { userState } from './GlobalState';
import { useReactiveVar } from '@apollo/client';

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
                console.log(err);
                navigate("/");
            });
    }, []);

    if(!user && location.pathname !== "/" && location.pathname !== "/register"){
        return null;
    }

    return (
        <div>
                <Routes>
                    <Route element={<LoginPage/>} path="/" />
                    <Route element={<Register/>} path="/register"/>
                    <Route element={<Home/>} path="/user/:id" />
                    <Route element={<DisplayProject/>} path="/project/:id" />
                    <Route element={<NewProject/>} path="/project/new" />
                    <Route element={<UpdateProject/>} path="/project/:id/edit" />
                </Routes>
        </div>
    );
}

export default App;
