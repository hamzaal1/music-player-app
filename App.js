import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MusicDetail from './App/MusicDetail';
import MusicList from './App/MusicList';


const Stack = createNativeStackNavigator();
const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }} name="MusicList" component={MusicList} />
        <Stack.Screen
          options={{ headerShown: false }} name="MusicDetail" component={MusicDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4"
  },
  text: {
    fontWeight: "bold",
    fontSize: 24,
    fontStyle: "italic",
    color: "green"
  },
  img: {
    width: 100,
    height: 100
  }
})
