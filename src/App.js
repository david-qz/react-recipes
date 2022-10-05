import { Route, Switch } from 'react-router-dom';
import './App.css';
import Auth from './components/Auth/Auth';

export default function App() {
  return (
    <Switch>
      <Route path='/auth/:method' component={Auth} />
    </Switch>
  );
}
