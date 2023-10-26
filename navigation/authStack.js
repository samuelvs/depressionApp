import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from '../screens/signin';
import Register from '../screens/register';
import Welcome from '../screens/welcome';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome ">
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }}  />
        <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }}  />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}  />
      </Stack.Navigator>
    </NavigationContainer> 
  );
};

export default AuthStack;
