import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Navbar from './components/navbar/Navbar';
import EmitRecipe from './pages/medic/EmitRecipe';
import PrescriptionsPage from './pages/prescriptions/PrescriptionsPage';
import PrescriptionPage from './pages/prescriptionPage/PrescriptionPage';
import LoginPage from './pages/loginPage/LoginPage';

import './index.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Route path="/" exact component={LoginPage} />
      <Container fixed>
        <main>
          <Route path="/emitir" component={EmitRecipe} />
          <Route path="/recetas" component={PrescriptionsPage} />
          <Route path="/receta/:id" exact component={PrescriptionPage} />
        </main>
      </Container>
    </Router>
  );
}

export default App;
