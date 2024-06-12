import { clientCredentials } from '../utils/client';
// API CALLS FOR PLAYERS

const endpoint = clientCredentials.databaseURL;

const getTeams = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/teams.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// TODO: DELETE TEAM
const deleteTeam = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/teams/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

// TODO: GET SINGLE TEAM
const getSingleTeam = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/teams/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// TODO: CREATE TEAM
const createTeam = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/teams.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// TODO: UPDATE TEAM
const updateTeam = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/teams/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getTeams,
  createTeam,
  deleteTeam,
  getSingleTeam,
  updateTeam,
};
