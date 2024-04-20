import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';

import { useState, useEffect } from 'react';

import { commonStyles } from '../../Styles';

export default function CameraPreview({
  picture,
  imagePadding,
  retakePicture,
  savePicture,
}) {
  const [image, setImage] = useState(null);
  // Flip the image
  useEffect(() => {
    (async () => {
      const manipResult = await manipulateAsync(
        picture.localUri || picture.uri,
        [{ flip: FlipType.Horizontal }],
        { compress: 1, format: SaveFormat.PNG }
      );
      setImage(manipResult);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: image && image.uri }}
        style={[
          styles.image,
          { marginTop: imagePadding, marginBottom: imagePadding },
        ]}
      >
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={retakePicture} style={commonStyles.button}>
            <Text style={commonStyles.textStyle}>Znovu</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => savePicture(image)}
            style={commonStyles.button}
          >
            <Text style={commonStyles.textStyle}>Uložit</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  image: {
    flex: 1,
  },
  buttonsContainer: {
    flex: 1,
    gap: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: 30,
  },
});
