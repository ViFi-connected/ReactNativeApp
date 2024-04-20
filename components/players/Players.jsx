import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import PlayerCard from './PlayerCard';
import AddItem from '../modals/AddItem';

import { commonStyles } from '../../Styles';

export default function Players(props) {
  const { players, setPlayers } = props;
  const [refresh, setRefresh] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputError, setInputError] = useState(false);

  const deletePlayer = (index) => {
    const newPlayers = [...players];
    newPlayers.splice(index, 1);
    setPlayers(newPlayers);
    setRefresh(!refresh);
  };

  const addPlayer = (playerName) => {
    if (!playerName) {
      setInputError(true);
      return;
    }
    setModalVisible(false);
    setInputError(false);
    setPlayers([...players, { name: playerName, team: 'unasigned' }]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Hráči</Text>
      <FlatList
        data={players}
        extraData={refresh}
        style={{ marginBottom: 10 }}
        renderItem={({ item, index }) => (
          <PlayerCard
            team={item.team}
            name={item.name}
            onPress={() => deletePlayer(index)}
            {...props}
          />
        )}
      />
      <Pressable
        style={commonStyles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={commonStyles.textStyle}>Přidat hráče</Text>
      </Pressable>
      <AddItem
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        addItem={addPlayer}
        inputError={inputError}
        setInputError={setInputError}
        placeholder="Jméno hráče"
        errorMessage="Zadejte jméno hráče"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 5,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 30,
  },
});
