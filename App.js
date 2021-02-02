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
import {Button, ScrollView} from 'react-native';

import Card2 from './src/components/Card2';
import Tabbar1 from './src/components/tabbar1';
import Tabbar2 from './src/components/tabbar2';

const AnimationCard2 = () => <Card2 />;
const AnimationTab1 = () => <Tabbar1 />;
const AnimationTab2 = () => <Tabbar2 />;

const Home = ({navigation}) => {
  return (
    <ScrollView>
      <Button
        title="Card2"
        onPress={() => navigation.navigate('AnimationCard2')}
      />
      <Button
        title="Tab1"
        onPress={() => navigation.navigate('AnimationTab1')}
      />
      <Button
        title="Tab2"
        onPress={() => navigation.navigate('AnimationTab2')}
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
        <Stack.Screen name="AnimationTab1" component={AnimationTab1} />
        <Stack.Screen name="AnimationTab2" component={AnimationTab2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return <RootNav />;
};

export default App;
