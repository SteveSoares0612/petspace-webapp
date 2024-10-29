// src/App.js
import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import AppNavbar from './layout/Navbar';
import Footer from './layout/Footer'
import Home from './pages/Home';
import Profile from './pages/profile/Profile';
import Health from './pages/Health';
import Events from './pages/Events/Events';
import ManagePets from './pages/managePets/ManagePets';
import SignIn from './pages/signin/Signin';
import SignUp from './pages/SignUp'; 
import { useAuth } from './context/AuthContext'; // Use useAuth
import LandingPage from './pages/landingPage/LandingPage';
import Family from './pages/familyPage/Family'

const AppRoutes = () => {
  const { isAuthenticated } = useAuth(); // Get authentication state from context

  return (
    <Container>
      <Row>
        <Col md={12}>
          <Routes>
            <Route path="/" element={<LandingPage /> } />
            <Route path="/home" element={isAuthenticated ? <Home /> : <SignIn />} />
            <Route path="/events" element={isAuthenticated ? <Events /> : <SignIn />} />
            <Route path="/profile" element={isAuthenticated ? <Profile /> : <SignIn />} />
            <Route path="/family" element={isAuthenticated ? <Family /> : <SignIn />} />
            <Route path="/health" element={isAuthenticated ? <Health /> : <SignIn />} />
            <Route path="/signin" element={<SignIn />} /> 
            <Route path="/signup" element={<SignUp />} />
            <Route path="/managepets" element={<ManagePets />} />
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
        <div className="app-container">
          <AppNavbar />
          <main className="flex-grow-1">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}


export default App;
