import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from 'react-native';

import * as FileSystem from 'expo-file-system';
import { Picker } from '@react-native-picker/picker';
import * as MediaLibrary from 'expo-media-library';

const InputForm = ({
  video,
  setIsDownloading,
  setDownloadProgress,
  setHasVideoDownloaded,
  setLocation,
}) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleDownloads = async () => {
    try {
      const videoName = video.title.slice(0, 15);

      setIsDownloading(true);
      setDownloadProgress(0);

      const downloadProgress = (downloadProgress) => {
        let progress =
          downloadProgress.totalBytesWritten /
          downloadProgress.totalBytesExpectedToWrite;

        setDownloadProgress(progress);
      };

      const URL = 'http://your-device-ip4:3000';
      const remoteURL = `${URL}/download?videoURL=${video.video_url}&itag=${selectedValue}`;
      const localURI = `${FileSystem.documentDirectory}${videoName}.mp4`;

      const downloadResumable = FileSystem.createDownloadResumable(
        remoteURL,
        localURI,
        {},
        downloadProgress
      );

      const { uri } = await downloadResumable.downloadAsync();
      await MediaLibrary.saveToLibraryAsync(uri);

      console.log(uri);

      setLocation(uri);

      setHasVideoDownloaded(true);
    } catch (error) {
      console.log(error);
      Alert.alert('something went wrong', error.message);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <View>
      <View style={styles.obj}>
        <View style={styles.videoThumbnail}>
          <ImageBackground
            fadeDuration={5000}
            source={{ uri: video.videoThumbnail }}
            style={styles.styleThumbnail}
            imageStyle={{ borderRadius: 6 }}
          />
        </View>

        <View style={styles.metaData}>
          <Text style={styles.title}>{video.title.slice(0, 40)}....</Text>
          <Text style={styles.videoLengthView}>
            Video Length {video.videoDuration}
          </Text>
          <Text style={styles.description}>
            {video.description.slice(0, 100)}...
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        }}
      >
        <View
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 4,
            height: 50,
            width: 150,
            marginHorizontal: 2,
            paddingVertical: 10,
          }}
        >
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) => {
              console.log(itemValue);
              setSelectedValue(itemValue);
            }}
          >
            {video.videoFormats.map((format, index) => {
              return (
                <Picker.Item
                  key={format.container + index}
                  label={`${format.qualityLabel} - ${format.container}`}
                  value={`${format.itag}`}
                  onValueChange={(e) => {
                    setSelectedValue(e.value);
                  }}
                />
              );
            })}
          </Picker>
        </View>

        <TouchableOpacity style={{ flexGrow: 1 }} onPress={handleDownloads}>
          <Text
            style={{
              textAlign: 'center',
              padding: 10,
              backgroundColor: '#aec4e8',
              borderRadius: 5,
              paddingVertical: 13,
            }}
          >
            Downloads
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 12,
    paddingHorizontal: 5,
    fontWeight: 'bold',
  },

  metaData: {
    marginTop: 5,
  },

  obj: {
    elevation: 3,
    borderRadius: 6,
    borderWidth: 0,
    paddingBottom: 5,
    marginTop: 5,
    paddingTop: 0,
    paddingHorizontal: 4,
  },

  description: {
    fontSize: 8,
    paddingHorizontal: 5,
  },

  videoThumbnail: {
    elevation: 0,
    backgroundColor: '#f3f3f3',
    borderRadius: 50,
    marginTop: 4,
  },

  styleThumbnail: {
    width: '100%',
    height: 200,
  },

  videoLengthView: {
    fontSize: 10,
    textAlign: 'justify',
    paddingLeft: 5,
    textTransform: 'lowercase',
  },
});

export default InputForm;
