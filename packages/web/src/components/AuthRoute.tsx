import { FC } from 'react';
import { RouteProps, Redirect, Route } from 'react-router-dom';
import useStore from '../lib/store';

const AuthRoute: FC<RouteProps> = (routeProps) => {
  const s = useStore();
  return s.user && s.token ? <Route {...routeProps} /> : <Redirect to="/" />;
};

export default AuthRoute;
