import { Switch, Redirect, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Switch>
        <Route exact path="/" render={() => <h1>Welcome to Keepnotes!</h1>} />

        <Redirect to="/" />
      </Switch>
    </ApolloProvider>
  );
}

export default App;
