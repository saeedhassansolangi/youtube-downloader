import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';

import { io } from 'socket.io-client';
const socket = io('http://10.11.0.211:3000/');

export default function App() {
  return (
    <View style={styles.container}>
      <HomeScreen socket={socket} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
