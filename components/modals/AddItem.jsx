import React, { useState } from 'react';
import { Modal, Text, Pressable, View, TextInput } from 'react-native';

import { commonStyles } from '../../Styles';

export default function AddItem({
  modalVisible,
  setModalVisible,
  addItem,
  inputError,
  setInputError,
  placeholder,
  errorMessage,
}) {
  const [name, setName] = useState('');

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
        setName('');
        setInputError(false);
      }}
    >
      <View style={commonStyles.centeredView}>
        <View style={commonStyles.modalView}>
          <TextInput
            style={commonStyles.input}
            onChangeText={setName}
            placeholder={placeholder}
            value={name}
          />
          {inputError && (
            <Text style={commonStyles.errorText}>{errorMessage}</Text>
          )}
          <Pressable
            style={commonStyles.button}
            onPress={() => {
              addItem(name);
              setName('');
            }}
          >
            <Text style={commonStyles.textStyle}>Přidat</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
