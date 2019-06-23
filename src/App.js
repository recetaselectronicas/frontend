import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import EmitRecipe from './pages/medic/EmitRecipe';
import PrescriptionsPage from './pages/prescriptions/PrescriptionsPage';
import PrescriptionPage from './pages/prescriptionPage/PrescriptionPage';
import Norm from './pages/norms/norms';
import LoginPage from './pages/loginPage/LoginPage';

import './index.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Route path="/" exact component={LoginPage} />
      <main>
        <Route path="/emitir" component={EmitRecipe} />
        <Route path="/recetas" component={PrescriptionsPage} />
        <Route path="/receta/:id" exact component={PrescriptionPage} />
        <Route path="/norms" exact component={Norm} />
      </main>
    </Router>
  );
}

export default App;
