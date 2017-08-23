import App from './components/App';
import MainWrapper from './components/MainWrapper';
import AuthContainer from './components/Auth/AuthContainer';
import ProfileContainer from './components/Profile/ProfileContainer';

export function errorLoading(err) {
  console.error('Dynamic page loading failed', err);
}

export function loadRoute(cb) {
  return module => cb(null, module.default);
}

export function loadIndexComponent(cb) {
  return (module => cb(null, { component: module.default }));
}

export default ({
  childRoutes: [{
    path: '/',
    name: 'App',
    component: App,
    indexRoute: { component: MainWrapper },
    childRoutes: [
      {
        name: 'Login',
        path: 'login',
        component: AuthContainer
      },
      {
        name: 'Profile',
        path: 'profile',
        component: MainWrapper,
        indexRoute: { component: ProfileContainer }
      }
    ]
  }]
});
