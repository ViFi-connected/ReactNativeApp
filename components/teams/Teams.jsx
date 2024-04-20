import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import TeamCard from './TeamCard';
import AddItem from '../modals/AddItem';

import { commonStyles } from '../../Styles';

export default function Teams({
  teams,
  setTeams,
  selectedTeam,
  setSelectedTeam,
  showTeam,
}) {
  const [refresh, setRefresh] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [inputError, setInputError] = useState(false);

  const deleteTeam = (index) => {
    const newTeams = [...teams];
    newTeams.splice(index, 1);
    setTeams(newTeams);
    setRefresh(!refresh);
  };

  const handleOnPress = (item) => {
    setSelectedTeam(item === selectedTeam ? undefined : item);
  };

  const addTeam = (teamName) => {
    if (!teamName) {
      setInputError(true);
      return;
    }
    setModalVisible(false);
    setInputError(false);
    setTeams([...teams, teamName]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Týmy</Text>
      <FlatList
        data={teams}
        extraData={refresh}
        style={{ marginBottom: 10 }}
        renderItem={({ item, index }) => (
          <Pressable onPress={() => handleOnPress(item)}>
            <TeamCard
              title={item}
              onPressDelete={() => deleteTeam(index)}
              onPressShow={() => showTeam(index)}
              selected={item === selectedTeam}
            />
          </Pressable>
        )}
      />
      <Pressable
        style={commonStyles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={commonStyles.textStyle}>Přidat tým</Text>
      </Pressable>
      <AddItem
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        addItem={addTeam}
        inputError={inputError}
        setInputError={setInputError}
        placeholder="Název týmu"
        errorMessage="Zadejte název týmu"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 5,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 30,
  },
});
