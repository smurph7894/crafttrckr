import {Routes, Route, useNavigate, useLocation, Navigate} from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import Register from './pages/Register';
import DisplayProject from './pages/DisplayProject';
import NewProject from "./pages/NewProject";
import UpdateProject from './pages/UpdateProject';
import HomePage from './pages/HomePage';
import AllMemberProjects from './pages/AllMemberProjects';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { userState } from './GlobalState';
import { useReactiveVar } from '@apollo/client';
import log from './helpers/logging';

axios.defaults.withCredentials=true;

const ProtectedRoute = ({children}) => {
    const user = useReactiveVar(userState);
    const [apiComplete, setApiComplete] = useState(user?true:false);

    console.log(user);

    useEffect(()=>{
        if(!user){
            axios.get(`http://localhost:8080/api/crafttrckr/logginguser`)
                .then((res)=> {
                    userState(res.data);
                    setApiComplete(true);
                })
                .catch((err)=>{
                    log(err);
                    //below set api is neccessary so you can get to the navigate to login if the api call fails
                    setApiComplete(true);
                });
        };
    }, [user]);

    //stops rendering protected pages or navigating to login until useEffect has run. 
    if(!apiComplete){
        return null;
    };

    if(!user) {
        return <Navigate to="/"/>;
    }

    return children;
};

function App() {
    const user = useReactiveVar(userState);
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div>
            <Routes>
                <Route element={<LoginPage/>} path="/" />
                <Route element={<Register/>} path="/register"/>
                <Route element={<ProtectedRoute> <HomePage/> </ProtectedRoute>} path="/home" />
                <Route element={<ProtectedRoute> <DisplayProject/> </ProtectedRoute>} path="/project/:id" />
                <Route element={<ProtectedRoute> <AllMemberProjects/> </ProtectedRoute>} path="/project/AllMemberProjects" />
                <Route element={<ProtectedRoute> <NewProject/> </ProtectedRoute>} path="/project/new" />
                <Route element={<ProtectedRoute> <UpdateProject/> </ProtectedRoute>} path="/project/:id/edit" />
            </Routes>
        </div>
    );
}

export default App;
