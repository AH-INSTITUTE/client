import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from 'react-router-dom';
import { ExtraDataProvider } from './Component/ExtraData/ExtraData';
import { UserAuthProvider } from './Component/AuthData/Auth';
import Home from './Component/Pages/Home/Home';
import Login from './Component/AuthData/Login';
import Dashboard from './Component/Dashboard/Dashboard';
import NotFoundPages from './Component/Pages/ShearCompo/NotFoundPages';
import PrivateRoute from './Component/AuthData/PrivateRoute';

function App() {
  return (
    <ExtraDataProvider>
      <UserAuthProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />;
            <Route exact path="/home" component={Home} />;

            <PrivateRoute exact path="/dashboard">
              <Dashboard />
            </PrivateRoute>


            <Route path="/login" component={Login} />;
            <Route path="*" component={NotFoundPages} />
          </Switch>
        </Router>
      </UserAuthProvider>
    </ExtraDataProvider>
  );
}

export default App;
