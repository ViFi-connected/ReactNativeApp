import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

import { commonStyles } from '../../Styles';

export default function PlayerCard({
  selectedPlayers,
  setSelectedPlayers,
  startCamera,
  onPress,
  team,
  name,
}) {
  const [selected, setSelected] = useState(false);

  const handleOnPress = () => {
    const nextSelectedState = !selected;
    setSelected(nextSelectedState);
    const newPlayers = nextSelectedState
      ? [...selectedPlayers, { team: team, name: name }]
      : selectedPlayers.filter((player) => player.name !== name);
    setSelectedPlayers(newPlayers);
  };

  return (
    <Pressable onPress={handleOnPress}>
      <View style={[commonStyles.card, selected && commonStyles.selectedCard]}>
        <Text style={[commonStyles.cardTitle, selected && { color: 'white' }]}>
          {team}/{name}
        </Text>
        <View style={commonStyles.buttons}>
          <Pressable
            style={commonStyles.button}
            onPress={() => startCamera(name)}
          >
            <Text style={commonStyles.textStyle}>Foto</Text>
          </Pressable>
          <Pressable style={commonStyles.button} onPress={onPress}>
            <Text style={commonStyles.textStyle}>Smazat</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}
