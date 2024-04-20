import { useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
} from 'react-native';
import { Camera } from 'expo-camera';

import CameraPreview from './CameraPreview';

export default function App({ savePicture }) {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [picture, setPicture] = useState(null);
  const [imagePadding, setImagePadding] = useState(0);
  const [isRatioSet, setIsRatioSet] = useState(false);
  const [ratio, setRatio] = useState('4:3');
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const { height, width } = Dimensions.get('window');
  const screenRatio = height / width;
  let camera;

  const prepareRatio = async () => {
    let desiredRatio = '4:3';
    if (Platform.OS === 'android') {
      const ratios = await camera.getSupportedRatiosAsync();

      let distances = {};
      let realRatios = {};
      let minDistance = null;
      for (const ratio of ratios) {
        const parts = ratio.split(':');
        const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
        realRatios[ratio] = realRatio;
        const distance = screenRatio - realRatio;
        distances[ratio] = distance;
        if (minDistance == null) {
          minDistance = ratio;
        } else {
          if (distance >= 0 && distance < distances[minDistance]) {
            minDistance = ratio;
          }
        }
      }
      desiredRatio = minDistance;
      const remainder = Math.floor(
        (height - realRatios[desiredRatio] * width) / 2
      );
      setImagePadding(remainder);
      setRatio(desiredRatio);
      setIsRatioSet(true);
    }
  };

  const setCameraReady = async () => {
    if (!isRatioSet) {
      await prepareRatio();
    }
  };

  const takePicture = async () => {
    if (!camera) return;
    const picture = await camera.takePictureAsync();
    setPreviewVisible(true);
    setPicture(picture);
  };

  const retakePicture = () => {
    setPicture(null);
    setPreviewVisible(false);
  };

  if (!permission?.granted) {
    return (
      <View style={styles.information}>
        <Text style={styles.text}>
          Pro použití fotoaparátu je potřeba oprávnění
        </Text>
        <Button onPress={requestPermission} title="Povolit" />
      </View>
    );
  }

  if (previewVisible && picture) {
    return (
      <CameraPreview
        picture={picture}
        savePicture={savePicture}
        retakePicture={retakePicture}
        imagePadding={imagePadding}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        type="front"
        style={[
          styles.camera,
          { marginTop: imagePadding, marginBottom: imagePadding },
        ]}
        ratio={ratio}
        onCameraReady={setCameraReady}
        ref={(r) => {
          camera = r;
        }}
      >
        <TouchableOpacity onPress={takePicture} style={styles.captureButton} />
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
    justifyContent: 'center',
  },
  information: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: '#fff',
    marginBottom: 20,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20,
  },
});
