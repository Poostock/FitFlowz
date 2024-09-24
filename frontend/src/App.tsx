import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClassComponent from './pages/Class/index'; // Ensure the correct path to ClassComponent
import './muiLicenseConfig';

import { LicenseInfo } from '@mui/x-license-pro';
// import About from './About';
LicenseInfo.setLicenseKey('e0d9bb8070ce0054c9d9ecb6e82cb58fTz0wLEU9MzI0NzIxNDQwMDAwMDAsUz1wcmVtaXVtLExNPXBlcnBldHVhbCxLVj0y');

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ClassComponent />} /> {/* Using ClassComponent instead of Home */}
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
