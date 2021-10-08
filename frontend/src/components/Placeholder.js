import React from 'react';

import { StyleSheet } from 'react-native';

import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  ShineOverlay,
} from 'rn-placeholder';

export default function Placeholders() {
  return (
    <Placeholder Animation={ShineOverlay} style={styles.placeHolders}>
      <Placeholder
        style={{ marginTop: 10 }}
        Left={() => (
          <PlaceholderMedia
            style={{ width: '100%', height: 200, borderRadius: 8 }}
          />
        )}
      ></Placeholder>

      <Placeholder style={{ marginTop: 1 }}>
        <PlaceholderLine
          style={{
            height: 43,
            marginTop: 1,
            marginBottom: 2,
            borderRadius: 8,
          }}
        />
        <PlaceholderLine
          style={{ margin: 0, height: 43, borderRadius: 8, marginBottom: 7 }}
        />
      </Placeholder>

      <Placeholder
        style={{ marginTop: 0 }}
        Left={() => {
          return (
            <PlaceholderMedia
              style={{ width: '39%', height: 50, borderRadius: 5 }}
            />
          );
        }}
        Right={(_) => {
          return (
            <PlaceholderMedia
              style={{ width: '60%', borderRadius: 5, height: 50 }}
            />
          );
        }}
      />
    </Placeholder>
  );
}

const styles = StyleSheet.create({
  placeHolders: {},
});
