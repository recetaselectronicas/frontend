import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Navbar from './components/navbar/Navbar';
import EmitRecipe from './pages/medic/EmitRecipe';
import PrescriptionsPage from './pages/prescriptions/PrescriptionsPage';

import './index.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Container fixed>
        <main>
          <Route path="/emitir" component={EmitRecipe} />
          <Route path="/recetas" component={PrescriptionsPage} />
        </main>
      </Container>
    </Router>
  );
}

export default App;
