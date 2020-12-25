import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routes from './routes';
import Home from './pages/Home';

const App: React.FC = () => (
  <Router>
    <div className="app">
      <Switch>
        <Route exact path={routes.Home}>
          <Home />
        </Route>
      </Switch>
    </div>
  </Router>
);

export default App;
