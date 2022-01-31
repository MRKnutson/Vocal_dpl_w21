import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import Timeline from './pages/Timeline';
import Mood from './pages/Mood';
import Activities from './pages/Activities';
import AboutUs from './pages/AboutUs';
import BackEndTestPage from './pages/BackEndTestPage';
import Profile from './pages/Profile';
import Landing from './pages/Landing'
import HowTo from './pages/HowTo';

function App() {
  return (
    <Routes>
      <Route element = {<Layout />}>
        <Route path = "/register" element = {<Register />} />
        <Route path = "/landing" element = {<Landing />} />
        <Route path = "/login" element = {<Login />} />
        <Route element = {<RequireAuth />}>
        <Route path = "/howto" element={<HowTo/>} />
        <Route path = "/" element = {<Home />} />
        <Route path = "/aboutus" element = {<AboutUs/>} />
        <Route path = "/profile" element = {<Profile />} />
        <Route path = "/backend" element = {<BackEndTestPage />} />
        <Route path = "/recordings" element = {<Timeline/>} />
        <Route path = "/activities" element = {<Activities/>} />
        <Route path = "/mood" element = {<Mood/>} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
