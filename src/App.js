// src/App.js
import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import AppNavbar from './layout/Navbar';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Health from './pages/Health';
import SignIn from './pages/signin/Signin';
import SignUp from './pages/SignUp'; 
import { useAuth } from './context/AuthContext'; // Use useAuth

const AppRoutes = () => {
  const { isAuthenticated } = useAuth(); // Get authentication state from context

  return (
    <Container>
      <Row>
        <Col md={12}>
          <Routes>
            <Route path="/" element={isAuthenticated ? <Home /> : <SignIn />} />
            <Route path="/settings" element={isAuthenticated ? <Settings /> : <SignIn />} />
            <Route path="/profile" element={isAuthenticated ? <Profile /> : <SignIn />} />
            <Route path="/health" element={isAuthenticated ? <Health /> : <SignIn />} />
            <Route path="/signin" element={<SignIn />} /> 
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppNavbar />
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
