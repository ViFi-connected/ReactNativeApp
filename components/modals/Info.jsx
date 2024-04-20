import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  ScrollView,
} from 'react-native';

import { commonStyles } from '../../Styles';

export default function Info({ modalVisible, setModalVisible, info }) {
  const closeModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <View style={commonStyles.centeredView}>
        <View style={[commonStyles.modalView, { height: '80%' }]}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.modalText}>
              {JSON.stringify(info, null, 5)}
            </Text>
          </ScrollView>
          <Pressable style={commonStyles.button} onPress={closeModal}>
            <Text style={commonStyles.textStyle}>Zavřít</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalText: {
    marginBottom: 15,
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
    padding: 10,
  },
});
