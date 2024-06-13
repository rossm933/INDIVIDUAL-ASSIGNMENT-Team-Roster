import { deletePlayer } from './playerData';
import { deleteSingleTeam, getSingleTeam, getTeamsPlayers } from './teamData';

const deleteTeamsAndPlayers = (teamId) => new Promise((resolve, reject) => {
  getTeamsPlayers(teamId).then((playersArray) => {
    const deletePlayersPromises = playersArray.map((player) => deletePlayer(player.firebaseKey));

    Promise.all(deletePlayersPromises).then(() => {
      deleteSingleTeam(teamId).then(resolve);
    });
  }).catch((error) => reject(error));
});

const viewTeamDetails = (teamFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleTeam(teamFirebaseKey), getTeamsPlayers(teamFirebaseKey)]).then(([teamObject, teamPlayersArray]) => {
    resolve({ ...teamObject, players: teamPlayersArray });
  }).catch((error) => reject(error));
});

export { deleteTeamsAndPlayers, viewTeamDetails };
