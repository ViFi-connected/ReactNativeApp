import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  FlatList,
  Image,
} from 'react-native';

import { commonStyles } from '../../Styles';

export default function TeamDetail({
  modalVisible,
  setModalVisible,
  team,
  players,
}) {
  const renderItem = ({ item }) => {
    const imageSrc = item.picture
      ? { uri: item.picture.uri }
      : require('../../assets/avatar.png');

    return (
      <View style={styles.item}>
        <Image source={imageSrc} style={styles.image} />
        <Text style={styles.title}>{item.name}</Text>
      </View>
    );
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}
    >
      <View style={commonStyles.centeredView}>
        <View style={commonStyles.modalView}>
          <Text style={styles.heading}>{team}</Text>
          <FlatList
            style={{ flexGrow: 0, marginBottom: 10 }}
            columnWrapperStyle={{ alignItems: 'flex-start' }}
            horizontal={false}
            numColumns={2}
            data={players}
            renderItem={renderItem}
            keyExtractor={(_item, index) => index.toString()}
          />
          <Pressable
            style={commonStyles.button}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={commonStyles.textStyle}>Zavřít</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
  },
  item: {
    width: 140,
    margin: 10,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 10,
  },
});
