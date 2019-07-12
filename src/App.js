import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import EmitRecipe from './pages/medic/EmitRecipe';
import PrescriptionsPage from './pages/prescriptions/PrescriptionsPage';
import PrescriptionPage from './pages/prescriptionPage/PrescriptionPage';
import Norm from './pages/norms/norms';
import LoginPage from './pages/loginPage/LoginPage';
import HomePage from './pages/homePage/HomePage';
import ReceivePage from './pages/receivePage/ReceivePage';
import notFound from './404.png';
import SessionService from './services/SessionService';
import './index.css';

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

  useEffect(() => {
    const { id } = SessionService.getUserData();
    setUserIsLogged(!!id);
  }, []);

  return (
    <Router>
      <Navbar setUserIsLogged={setUserIsLogged} />
      <main>
        {!userIsLogged && (
        <>
          <Switch>
            <Route path="/" exact render={props => <HomePage {...props} setType={setType} />} />
            <Route path="/login" exact render={props => <LoginPage {...props} type={type} setUserIsLogged={setUserIsLogged} />} />
            <Route component={NoMatch} />
          </Switch>
        </>
        )
        }
        {userIsLogged && (
        <>
          <Switch>
            <Route path="/emitir" component={EmitRecipe} />
            <Route path="/recetas" component={PrescriptionsPage} />
            <Route path="/receta/:id" exact component={PrescriptionPage} />
            <Route path="/normas" exact component={Norm} />
            <Route path="/recepcionar" exact component={ReceivePage} />
            <Route component={NoMatch} />
          </Switch>
        </>
        )}
      </main>
    </Router>
  );
}

export default App;
