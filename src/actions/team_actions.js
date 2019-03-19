import firebase from '../firebase';
import { startFetchingTeams } from './ui_actions';

export const RECEIVE_TEAMS = 'RECEIVE_TEAMS';
export const RECEIVE_TEAM = 'RECEIVE_TEAM';

export const receiveTeams = (teams) => {
  return {
    type: RECEIVE_TEAMS,
    teams
  }
};

export const fetchTeams = () => (dispatch, getState) => {
  dispatch(startFetchingTeams());
  const state = getState();
  const teams = state.teams;
  const tournamentId = state.matches.tournamentId;
  const teamsArr = Object.values(teams);
  const teamData = {};
  let numReqs = 0;

  function receiveTeamData(teamId) {
    return function() {
      const data = JSON.parse(this.responseText);
      teamData[teamId] = data;
      numReqs += 1;
      if (teamsArr.length == numReqs) {
        dispatch(receiveTeams(teamData));
      }
    }
  }

  teamsArr.forEach((team) => {
    const slug = team.slug;

    const oReq = new XMLHttpRequest();
    oReq.onload = receiveTeamData(team.team);
    oReq.open("GET", `https://api.lolesports.com/api/v1/teams?slug=${slug}&tournament=${tournamentId}`);
    oReq.send();
  });
};

export const fetchPlayers = () => (dispatch, getState) => {
  const state = getState();
  const players = state.players;
  const tournamentId = state.matches.tournamentId;
  const playersArr = Object.values(players);
  const playerData = {};
  let numReqs = 0;

  function receivePlayerData(playerId) {
    return function () {
      const data = JSON.parse(this.responseText);
      playerData[playerId] = data;
      numReqs += 1;
      if (playersArr.length == numReqs) {
        dispatch(receivePlayers(playerData));
      }
    }
  }

  playersArr.forEach((player) => {
    const slug = player.slug;

    const oReq = new XMLHttpRequest();
    oReq.onload = receivePlayerData(player.player);

  })
}