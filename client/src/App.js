import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import Register from './pages/Register';
import Home from './pages/Home';
import DisplayProject from './pages/DisplayProject';
import NewProject from "./pages/NewProject";
import UpdateProject from './pages/UpdateProject';
import axios from 'axios';

axios.defaults.withCredentials=true;

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route element={<LoginPage/>} path="/" />
                    <Route element={<Register/>} path="/register"/>
                    <Route element={<Home/>} path="/user/:id" />
                    <Route element={<DisplayProject/>} path="/project/:id" />
                    <Route element={<NewProject/>} path="/project/new" />
                    <Route element={<UpdateProject/>} path="/project/:id/edit" />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
