/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './navigation';
import { enableScreens } from 'react-native-screens';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
enableScreens();
LogBox.ignoreAllLogs(true)
// console.disableYellowBox = true;
AppRegistry.registerComponent(appName, () => App);
