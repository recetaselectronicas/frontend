import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Navbar from './components/navbar/Navbar';
import EmitRecipe from './pages/medic/EmitRecipe';
import PrescriptionsPage from './pages/prescriptions/PrescriptionsPage';
import PrescriptionPage from './pages/prescriptionPage/PrescriptionPage';
import Norm from './pages/norms/norms';

import './index.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Container fixed>
        <main>
          <Route path="/emitir" component={EmitRecipe} />
          <Route path="/recetas" component={PrescriptionsPage} />
          <Route path="/receta/:id" exact component={PrescriptionPage} />
          <Route path="/norms" exact component={Norm} />
        </main>
      </Container>
    </Router>
  );
}

export default App;
