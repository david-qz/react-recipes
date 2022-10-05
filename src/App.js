import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Auth from './components/Auth/Auth';
import Header from './components/Header/Header';
import RecipeView from './components/RecipeView/RecipeView';

export default function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path='/auth/:method' component={Auth} />
        <Route path='/recipes' component={RecipeView} />
        <Route path="*">
          <Redirect to='/recipes' />
        </Route>
      </Switch>
    </>
  );
}
