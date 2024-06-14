import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';

import { getPlayers } from '../api/playerData';
import PlayerCard from '../components/PlayerCard';
import SearchBar from '../components/SearchBar';

function ViewAllPlayers() {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const { user } = useAuth();

  const getAllThePlayers = () => {
    getPlayers(user.uid).then((fetchedMembers) => {
      setPlayers(fetchedMembers);
      setFilteredPlayers(fetchedMembers);
    });
  };

  useEffect(() => {
    getAllThePlayers();
  }, []);

  const filterItems = (query) => {
    if (!query) {
      getAllThePlayers();
    } else {
      const filtered = players.filter((player) => player.name.toLowerCase().includes(query)
      || player.role.toLowerCase().includes(query));
      setFilteredPlayers(filtered);
    }
  };

  return (
    <div>
      <SearchBar onKeyUp={filterItems} />
      <h1>Players</h1>
      <div className="d-flex flex-wrap">
        {filteredPlayers.map((player) => (
          <PlayerCard key={player.firebaseKey} playerObj={player} onUpdate={getAllThePlayers} />
        ))}
      </div>
    </div>
  );
}
export default ViewAllPlayers;
