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
import GetCard from './src/components/GetCard';
import Shape from './src/components/Shape';
import FacebookReaction from './src/components/FacebookReaction';
import ButtonLoading from './src/components/ButtonLoading';

const AnimationCard2 = () => <Card2 />;
const AnimationTab1 = () => <Tabbar1 />;
const AnimationTab2 = () => <Tabbar2 />;
const AnimationGetCard = () => <GetCard />;

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
      <Button
        title="GetCard"
        onPress={() => navigation.navigate('AnimationGetCard')}
      />
      <Button title="Shape" onPress={() => navigation.navigate('Shape')} />
      <Button
        title="FacebookReaction"
        onPress={() => navigation.navigate('FacebookReaction')}
      />
      <Button
        title="ButtonLoading"
        onPress={() => navigation.navigate('ButtonLoading')}
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
        <Stack.Screen name="Shape" component={Shape} />
        <Stack.Screen name="FacebookReaction" component={FacebookReaction} />
        <Stack.Screen name="ButtonLoading" component={ButtonLoading} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return <RootNav />;
};

export default App;
