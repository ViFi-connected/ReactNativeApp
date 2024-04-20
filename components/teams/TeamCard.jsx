import React from 'react';
import { Text, View, Pressable } from 'react-native';

import { commonStyles } from '../../Styles';

export default function TeamCard({
  title,
  selected,
  onPressShow,
  onPressDelete,
}) {
  return (
    <View style={[commonStyles.card, selected && commonStyles.selectedCard]}>
      <Text style={[commonStyles.cardTitle, selected && {color: 'white'}]}>{title}</Text>
      <View style={commonStyles.buttons}>
        <Pressable style={commonStyles.button} onPress={onPressShow}>
          <Text style={commonStyles.textStyle}>Zobrazit</Text>
        </Pressable>
        <Pressable style={commonStyles.button} onPress={onPressDelete}>
          <Text style={commonStyles.textStyle}>Smazat</Text>
        </Pressable>
      </View>
    </View>
  );
}
