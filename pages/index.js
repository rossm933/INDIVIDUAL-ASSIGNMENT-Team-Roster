import React, { useEffect, useState } from 'react';
// import { Button } from 'react-bootstrap';
import PlayerCard from '../components/PlayerCard';
import { useAuth } from '../utils/context/authContext';
import { getPlayers } from '../api/playerData';

function Home() {
  const [players, setPlayers] = useState([]);
  const { user } = useAuth();
  const getAllThePlayers = () => {
    getPlayers(user.uid).then(setPlayers);
  };
  useEffect(() => {
    getAllThePlayers();
  }, []);

  return (
    <div>
      <h1>Team</h1>
      <div className="d-flex flex-wrap">
        {/* map over players here using PlayerCard component */}
        {players.map((player) => (
          <PlayerCard key={player.firebaseKey} playerObj={player} onUpdate={getAllThePlayers} />
        ))}
      </div>
    </div>
  );
}

export default Home;
