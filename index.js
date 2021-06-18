/**
 * @format
 */

import {AppRegistry} from 'react-native';
import ReduxProvider from './ReduxProvider';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => ReduxProvider);
