import { Switch, Redirect, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" render={() => <h1>Welcome to Keepnotes!</h1>} />

        <Redirect to="/" />
      </Switch>
    </>
  );
}

export default App;
