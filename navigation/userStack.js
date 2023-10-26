
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';

import Home from '../screens/home';
import Questionary from '../screens/questionary';
import Result from '../screens/result';

const Stack = createNativeStackNavigator();

const UserStack = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}  />
        <Stack.Screen name="Questionary" component={Questionary} options={{ headerShown: false }}  />
        <Stack.Screen name="Result" component={Result} options={{ headerShown: false }}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default UserStack;
