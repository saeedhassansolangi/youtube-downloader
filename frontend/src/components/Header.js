import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Header() {
  return (
    <View style={styles.headers}>
      <View style={styles.navbar}>
        <Text style={styles.headerText}>youtube downloader</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headers: {
    backgroundColor: '#fff',
    marginBottom: 5,
  },

  headerText: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    paddingLeft: 10,
  },

  navbar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 15,
  },
});

export default Header;
