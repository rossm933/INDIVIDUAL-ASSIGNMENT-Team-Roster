import { clientCredentials } from '../utils/client';
// API CALLS FOR PLAYERS

const endpoint = clientCredentials.databaseURL;

const getPlayers = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/players.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// TODO: DELETE PLAYER
const deletePlayer = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/players/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

// TODO: GET SINGLE PLAYER
const getSinglePlayer = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/players/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// TODO: CREATE PLAYER
const createPlayer = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/players.json`, {
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

// TODO: UPDATE PLAYER
const updatePlayer = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/players/${payload.firebaseKey}.json`, {
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
  getPlayers,
  createPlayer,
  deletePlayer,
  getSinglePlayer,
  updatePlayer,
};
