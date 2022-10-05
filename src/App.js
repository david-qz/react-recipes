import { Route, Switch } from 'react-router-dom';
import './App.css';
import Auth from './components/Auth/Auth';
import RecipeList from './components/RecipeList/RecipeList';

export default function App() {
  return (
    <Switch>
      <Route path='/auth/:method' component={Auth} />
      <Route path='/recipes' component={RecipeList} />
    </Switch>
  );
}
