import {
  StyleSheet,
  StatusBar,
  View,
  SafeAreaView,
  Pressable,
  Text,
} from 'react-native';
import { useState } from 'react';

import Players from './components/players/Players';
import Teams from './components/teams/Teams';
import TeamDetail from './components/modals/TeamDetail';
import Info from './components/modals/Info';
import CameraComponent from './components/camera/Camera';
import { commonStyles } from './Styles';

export default function App() {
  const [selectedTeam, setSelectedTeam] = useState();
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [teamModalVisible, setTeamModalVisible] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [openCamera, setOpenCamera] = useState(false);
  const [teamToShow, setTeamToShow] = useState();
  const [playerFoto, setPlayerFoto] = useState();
  const [teams, setTeams] = useState(['Slavia', 'Votroci', 'Sparta']);
  const [players, setPlayers] = useState([
    {
      team: 'Votroci',
      name: 'Hráč 1',
    },
    {
      team: 'Votroci',
      name: 'Hráč 2',
    },
    {
      team: 'Slavia',
      name: 'Hráč 3',
    },
    {
      team: 'unasigned',
      name: 'Hráč 4',
    },
    {
      team: 'unasigned',
      name: 'Hráč 5',
    },
  ]);

  function showTeam(index) {
    setTeamToShow(teams[index]);
    setTeamModalVisible(!teamModalVisible);
  }

  function showInfo() {
    generateInfo();
    setInfoModalVisible(!infoModalVisible);
  }

  function generateInfo() {
    const info = teams.map((team) => ({
      team: team,
      players: generatePlayersData(team),
    }));

    function generatePlayersData(team) {
      return players
        .filter((player) => player.team === team)
        .map((player) => ({
          name: player.name,
          picture: player.picture
            ? { width: player.picture.width, height: player.picture.height }
            : undefined,
        }));
    }
    return info;
  }

  function assignPlayers() {
    if (selectedTeam && selectedPlayers.length !== 0) {
      const selectedPlayerNames = new Set(
        selectedPlayers.map((player) => player.name)
      );
      const newPlayers = players.map((player) => ({
        ...player,
        team: selectedPlayerNames.has(player.name) ? selectedTeam : player.team,
      }));
      setPlayers(newPlayers);
    }
  }

  function startCamera(playerName) {
    setOpenCamera(!openCamera);
    setPlayerFoto(playerName);
  }

  function savePicture(picture) {
    const updatedPlayers = [...players];
    const playerIndex = updatedPlayers.findIndex(
      (player) => player.name === playerFoto
    );
    if (playerIndex !== -1) {
      updatedPlayers[playerIndex].picture = picture;
      setPlayers(updatedPlayers);
    }
    setOpenCamera(!openCamera);
  }

  if (openCamera) {
    return <CameraComponent savePicture={savePicture} />;
  }

  return (
    <SafeAreaView style={commonStyles.container}>
      {teamModalVisible && (
        <TeamDetail
          modalVisible={teamModalVisible}
          setModalVisible={setTeamModalVisible}
          team={teamToShow}
          players={players.filter((player) => player.team === teamToShow)}
        />
      )}
      {infoModalVisible && (
        <Info
          modalVisible={infoModalVisible}
          setModalVisible={setInfoModalVisible}
          info={generateInfo()}
        />
      )}
      <View style={commonStyles.view}>
        <StatusBar />
        <View style={[commonStyles.buttons, {marginBottom: 10}]}>
          <Pressable style={commonStyles.button} onPress={assignPlayers}>
            <Text style={commonStyles.textStyle}>
              Přiřadit označeného hráče označenému týmu
            </Text>
          </Pressable>
          <Pressable style={commonStyles.button} onPress={showInfo}>
            <Text style={commonStyles.textStyle}>Uložit</Text>
          </Pressable>
        </View>
        <View style={commonStyles.container}>
          <Teams
            teams={teams}
            setTeams={setTeams}
            selectedTeam={selectedTeam}
            setSelectedTeam={setSelectedTeam}
            showTeam={showTeam}
          />
          <Players
            players={players}
            setPlayers={setPlayers}
            selectedPlayers={selectedPlayers}
            setSelectedPlayers={setSelectedPlayers}
            startCamera={startCamera}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
