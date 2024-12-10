import React, { useContext } from 'react';
import { CssBaseline, Button, Grid } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { ThemeContext } from './theme/ThemeContext.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from "./components/Footer.jsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import CataloguePage from './pages/CataloguePage.jsx';
import OpinionPage from './pages/OpinionPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import GameDetailsPage from "./pages/GamesDetailsPage.jsx";
import Team from './pages/pied-de-page/TeamPage.jsx';
import Establishment from './pages/pied-de-page/InstitutionPage.jsx';
import Project from './pages/pied-de-page/ProjectPage.jsx';
import Mentorship from './pages/pied-de-page/MentorshipPage.jsx';
import Terms from './pages/pied-de-page/TermsPage.jsx';
import PrivacyPolicy from './pages/pied-de-page/PrivacyPolicyPage.jsx';
import Contacts from './pages/pied-de-page/ContactsPage.jsx';


function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        {/* Définition des routes pour les pages */}
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Route pour la page d'accueil */}
          <Route path="/catalogue" element={<CataloguePage />} /> {/* Route pour la page "Catalogue" */}
          <Route path="/avis" element={<OpinionPage />} />  {/* Route pour la page "Avis" */}
          <Route path="/login" element={<LoginPage />} />  {/* Route pour la page "Se connecter" */}
          <Route path="/details/:id" element={<GameDetailsPage />} /> {/* Route dynamique */}


          {/*-- Pages du pied de page --*/}
          <Route path="/team" element={<Team />} />
          <Route path="/institution" element={<Establishment />} />
          <Route path="/project" element={<Project />} />
          <Route path="/mentorship" element={<Mentorship />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<Contacts />} />
        </Routes>
      </Router>
      <Footer/>
    </ThemeProvider>
  );
}

export default App;
