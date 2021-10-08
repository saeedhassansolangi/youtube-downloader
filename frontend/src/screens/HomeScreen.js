import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Keyboard,
  StatusBar,
  Modal,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import InputForm from '../components/InputForm';
import Placeholders from '../components/Placeholder';
import Header from '../components/Header';
import Form from '../components/Form';

const HomeScreen = ({ socket }) => {
  const [value, setValue] = useState('');
  const [video, setVideo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [hasVideoDownloaded, setHasVideoDownloaded] = useState(false);
  const [location, setLocation] = useState('');

  const onPressHandle = (e) => {
    const input = value.trim();
    const isValidYoutubeUrl = isValidYoutubeURL(input);

    if (input.length < 0 || !isValidYoutubeUrl) {
      Alert.alert('Youtube Url', `${input} is not a Valid Youtube Url`);
      return;
    }

    Keyboard.dismiss();
    setIsLoading(true);
    setIsDownloading(false);
    setDownloadProgress(0);

    socket.emit('connection:ready', input);
    socket.once('videoMetaData', (data) => {
      setVideo(data);
      setIsLoading(false);
    });
  };

  return (
    <View style={styles.homeScreen}>
      <Header />
      <Form onPressHandle={onPressHandle} value={value} setValue={setValue} />

      {Object.keys(video).length > 0 && (
        <InputForm
          video={video}
          isDownloading={isDownloading}
          setIsDownloading={setIsDownloading}
          downloadProgress={downloadProgress}
          setDownloadProgress={setDownloadProgress}
          setHasVideoDownloaded={setHasVideoDownloaded}
          setLocation={setLocation}
        />
      )}

      <Modal
        animationType={'fade'}
        transparent={true}
        visible={isDownloading}
        onRequestClose={() => {}}
      >
        <View style={styles.modalContainer}>
          <View>
            {downloadProgress ? (
              <Text style={styles.text}> Downloading... </Text>
            ) : (
              <Text style={styles.text}>Please wait</Text>
            )}
          </View>
          <View style={styles.modalHeader}>
            <Text style={styles.text}>{downloadProgress / 1024} kbs</Text>
            {downloadProgress ? (
              <MaterialIcons name="file-download" color="#fff" size={30} />
            ) : null}
          </View>
        </View>
      </Modal>

      <Modal
        animationType={'fade'}
        transparent={true}
        visible={hasVideoDownloaded}
        onRequestClose={() => {}}
      >
        <View style={styles.modelDownloaded}>
          <View style={styles.modelCloseTitle}>
            <Text style={styles.modelTitle}>Download Complete</Text>
            <MaterialIcons
              name="file-download-done"
              color="#2C1F2D"
              size={40}
            />
          </View>

          <View style={styles.videoMetaDataContainer}>
            <View style={styles.metaInfo}>
              <Text style={{ color: 'rgba(250,250,250,0.8)' }}>File Name</Text>
              <Text style={styles.info}>
                {video.title && video.title.slice(0, 33)}...
              </Text>
            </View>
            <View style={styles.metaInfo}>
              <Text style={{ color: 'rgba(250,250,250,0.8)' }}>Location</Text>
              <Text style={styles.info}>
                {location && location.slice(0, 38)}...
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.modelClose}
            onPress={() => {
              setHasVideoDownloaded(!hasVideoDownloaded);
            }}
          >
            <Text style={[styles.text, styles.closeBtn]}>Close Modal</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {isLoading && <Placeholders />}
    </View>
  );
};

const styles = StyleSheet.create({
  homeScreen: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 5,
    borderWidth: 1,
  },

  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(30,144,225,0.97)',
    height: 200,
    width: Dimensions.get('window').width - 20,
    borderRadius: 10,
    marginTop: 200,
    marginHorizontal: 10,
  },

  modelDownloaded: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(137, 171, 227, 0.99)',
    height: 250,
    width: Dimensions.get('window').width - 20,
    borderRadius: 10,
    marginTop: 200,

    marginHorizontal: 10,
  },

  text: {
    color: 'rgba(250,250,250,0.8)',
    fontWeight: '900',
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modelClose: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  modelTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '900',
    paddingRight: 10,
  },

  modelCloseTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#1e1e1e',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  videoMetaDataContainer: {
    marginTop: 15,
    flex: 1,
  },

  closeBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    borderColor: 'rgba(0,0,0,0.3)',
    borderWidth: StyleSheet.hairlineWidth,
  },

  info: {
    fontSize: 12,
    borderColor: '#1e1e1e',
    borderWidth: StyleSheet.hairlineWidth,
    color: '#fff',
    borderRadius: 5,
    padding: 5,
    marginLeft: 10,
  },

  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default HomeScreen;

const isValidYoutubeURL = function (URL) {
  const regex =
    /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;

  return regex.test(URL);
};
