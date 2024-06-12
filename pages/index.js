import React, { useEffect, useState } from 'react';
// import { Button } from 'react-bootstrap';
import PlayerCard from '../components/PlayerCard';
import { getPlayers } from '../api/playerData';
import SearchBar from '../components/Search';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const { user } = useAuth();

  const getAllThePlayers = () => {
    // get all memb based on uid then call our setMembers to pass results
    getPlayers(user.uid).then((fetchedMembers) => {
      setPlayers(fetchedMembers);
      // also need to set  filteredMembers to the fetched member in order to keep our data updated
      setFilteredPlayers(fetchedMembers);
    });
  };

  useEffect(() => {
    getAllThePlayers();
  }, []);

  const filterItems = (query) => {
    if (!query) {
      // If query is empty, show all members
      getAllThePlayers();
    } else {
      // we grab members because it has the full list of players we then filter based on name and position
      const filtered = players.filter((player) => player.name.toLowerCase().includes(query)
      || player.role.toLowerCase().includes(query));
      /* we then call setFilterdMembers and pass it the resilt of the filter */
      setFilteredPlayers(filtered);
    }
  };

  return (
    <div>
      <SearchBar onKeyUp={filterItems} />
      <h1>Players</h1>
      <div className="d-flex flex-wrap">
        {/* map over players here using PlayerCard component */}
        {filteredPlayers.map((player) => (
          <PlayerCard key={player.firebaseKey} playerObj={player} onUpdate={getAllThePlayers} />
        ))}
      </div>
    </div>
  );
}

export default Home;
