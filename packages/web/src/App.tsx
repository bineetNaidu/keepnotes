import { Switch, Redirect, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';

import Login from './pages/Login';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Switch>
        <Route exact path="/" component={Login} />

        <Redirect to="/" />
      </Switch>
    </ApolloProvider>
  );
}

export default App;
