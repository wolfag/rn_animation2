/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Card2 from './src/components/Card2';
import {Button, ScrollView} from 'react-native';

const AnimationCard2 = () => <Card2 />;

const Home = ({navigation}) => {
  return (
    <ScrollView>
      <Button
        title="Card2"
        onPress={() => navigation.navigate('AnimationCard2')}
      />
    </ScrollView>
  );
};

const Stack = createStackNavigator();

const RootNav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AnimationCard2" component={AnimationCard2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return <RootNav />;
};

export default App;
