import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";

import DashBoard1 from './User/Login/DashBoard';
import VendorLogin from './Vendor/VendorLogin';
import VendorDashboard from './Vendor/VendorDashboard';
function App() {
  return (
    <div>
      <Router>
        <Routes>
        <Route path="/*" element={<DashBoard1 />} />
        <Route path="/vendorlogin" element={<VendorLogin />} />
        <Route path="/vendorDashboard" element={<VendorDashboard />} />
					
        </Routes>
      </Router>
    </div>
  );
}

export default App;
