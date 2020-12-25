import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routes from './routes';
import StarSystem from './pages/StarSystem';

const App: React.FC = () => (
  <Router>
    <div className="app">
      <Switch>
        <Route exact path={routes.StarSystem}>
          <StarSystem />
        </Route>
      </Switch>
    </div>
  </Router>
);

export default App;
