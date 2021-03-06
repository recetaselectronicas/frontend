import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import EmitRecipe from './pages/medic/EmitRecipe';
import PrescriptionsPage from './pages/prescriptions/PrescriptionsPage';
import PrescriptionPage from './pages/prescriptionPage/PrescriptionPage';
import LinkUpsPage from './pages/linkUps/LinkUpsPage';
import Norm from './pages/norms/norms';
import LoginPage from './pages/loginPage/LoginPage';
import HomePage from './pages/homePage/HomePage';
import ReceivePage from './pages/receivePage/ReceivePage';
import notFound from './404.png';
import SessionService from './services/SessionService';
import './index.css';
import ConfigurationPage from './pages/configurationPage/configurationPage';
import CreateAccount from './pages/createAccount/CreateAccount';
import VerifyAccount from './pages/veifyAccount/verifyAccount';
import MedicalInsurancesPage from './pages/medicalInsurances/MedicalInsurancesPage';
import ProfilePage from './pages/profile/ProfilePage';
import DoctorsPage from './pages/doctors/DoctorsPage';
import AffiliatesPage from './pages/affiliates/AffiliatesPage';
import PharmacistsPage from './pages/pharmacists/PharmacistsPage';
import StatisticsPage from './pages/statistics/StatisticsPage';

const NoMatch = ({ location }) => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <div style={{ textAlign: 'center' }}>
      <img src={notFound} alt="" />
      <h3>
        La url
        {` ${location.pathname}`}
        {' '}
        no existe
      </h3>
    </div>
  </div>
);
function App() {
  const [type, setType] = useState('');
  const [userIsLogged, setUserIsLogged] = useState(false);
  const [title, setTitle] = useState(null);

  useEffect(() => {
    const { token } = SessionService.getUserData();
    setUserIsLogged(!!token);
  }, []);

  return (
    <Router>
      <Navbar setUserIsLogged={setUserIsLogged} title={title} />
      <main>
        {!userIsLogged && (
          <>
            <Switch>
              <Route path="/" exact render={props => <HomePage {...props} setType={setType} />} />
              <Route path="/login" exact render={props => <LoginPage {...props} type={type} setUserIsLogged={setUserIsLogged} setTitle={setTitle} />} />
              <Route path="/create-account" exact render={props => <CreateAccount {...props} type={type} setTitle={setTitle} />} />
              <Route path="/verify-account" exact render={props => <VerifyAccount {...props} setTitle={setTitle} />} />
              <Route component={NoMatch} />
            </Switch>
          </>
        )}
        {userIsLogged && (
          // estaria bueno scopear las urls
          <>
            <Switch>
              <Route path="/emitir" component={EmitRecipe} />
              <Route path="/recetas" component={PrescriptionsPage} />
              <Route path="/receta/:id" exact render={props => <PrescriptionPage {...props} setTitle={setTitle} />} />
              <Route path="/normas" exact component={Norm} />
              <Route path="/recepcionar" exact component={ReceivePage} />
              <Route path="/configuracion" exact component={ConfigurationPage} />
              <Route path="/obras-sociales" exact component={MedicalInsurancesPage} />
              <Route path="/solicitudes" exact component={LinkUpsPage} />
              <Route path="/perfil" exact component={ProfilePage} />
              <Route path="/afiliados" exact component={AffiliatesPage} />
              <Route path="/doctores" exact component={DoctorsPage} />
              <Route path="/farmaceuticos" exact component={PharmacistsPage} />
              <Route path="/statistics" exact component={StatisticsPage} />
              <Route path="/verify-account" exact component={VerifyAccount} />
              <Route component={NoMatch} />
            </Switch>
          </>
        )}
      </main>
    </Router>
  );
}

export default App;
