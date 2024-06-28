import './App.css';
import React from 'react';
import Home from './pages/homePage';
import NewFarm from './pages/newFarm';
import AgriNews from './pages/agriNews';
import IoT from './pages/internetOfThings';
import DronePage from './pages/droneMainPage';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import FarmHomePage from './pages/farmHomePage';
import { IoTProvider } from './context/iotContext';
import { FarmProvider } from './context/farmContext';
import { AuthContextProvider } from './context/authContext';
import { SidebarProvider } from './context/sidebarDataContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FarmDataForm from './components/newFarm';


function App() {
  return (
    <AuthContextProvider>
      <FarmProvider>
        <IoTProvider>
          <SidebarProvider>
              <Router>
                <div className="App">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path='/agrinews'element={<AgriNews />}/>
                    <Route path='/farmhome'element={<FarmHomePage />}/>
                    <Route path='/myfarm'element={<NewFarm />}/>
                    <Route path='farmhome/drone' element={<DronePage />}/>
                    <Route path='/farmhome/iot' element={<IoT />}/>
                    <Route path='/farmhome/addfarm' element={<FarmDataForm />}/>  
                  </Routes>
                </div>
              </Router>
          </ SidebarProvider>
        </ IoTProvider>
      </FarmProvider>
    </AuthContextProvider>
  );
}

export default App;