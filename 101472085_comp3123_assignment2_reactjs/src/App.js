import React, { useContext } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import EmployeeList from "./components/employee/EmployeeList";
import AddEmployee from "./components/employee/AddEmployee";
import EmployeeDetails from "./components/employee/EmployeeDetails";
import UpdateEmployee from "./components/employee/UpdateEmployee";
import Navbar from './components/shared/Navbar';

const PrivateRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  return token ? (
    <>
      <Navbar />
      {children}
    </>
  ) : <Navigate to="/" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/employees" element={<EmployeeList />} /> */}
        <Route path="/employees" element={<PrivateRoute><EmployeeList /></PrivateRoute>} />
        {/* <Route path="/employees/add" element={<AddEmployee />} /> */}
        <Route path="/employees/add" element={<PrivateRoute><AddEmployee /></PrivateRoute>} />
        {/* <Route path="/employees/:id" element={<EmployeeDetails />} /> */}
        <Route path="/employees/:id" element={<PrivateRoute><EmployeeDetails /></PrivateRoute>} />
        {/* <Route path="/employees/edit/:id" element={<UpdateEmployee />} /> */}
        <Route path="/employees/edit/:id" element={<PrivateRoute><UpdateEmployee /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
