import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Home from './Home';
import Desativar from './Desativar';
import { AppRegistry } from 'react-native';


const Stack = createStackNavigator();

//Resgitro do app
AppRegistry.registerComponent('App', () => App);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}> 
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Desativar" component={Desativar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}