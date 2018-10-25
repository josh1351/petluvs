import { createSwitchNavigator } from 'react-navigation';

import MainNavigation from './MainNavigation';
import AuthNavigator from './AuthNavigation';
import AuthLoadingScreen from '../../screens/AuthLoadingScreen';

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: MainNavigation,
    Auth: AuthNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);