import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import TeamCard from '../components/TeamCard';
import { getPublicTeams, getTeams } from '../api/teamData';

export default function Teams() {
  const [publicTeams, setPublicTeams] = useState([]);
  const [privateTeams, setPrivateTeams] = useState([]);

  const { user } = useAuth();

  const getAllPublicTeams = () => {
    getPublicTeams().then(setPublicTeams);
  };

  const getAllPrivateTeams = () => {
    getTeams(user.uid).then(setPrivateTeams);
  };

  useEffect(() => {
    getAllPrivateTeams();
    getAllPublicTeams();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1>All Teams</h1>
      <h3>Public Teams</h3>
      <div className="d-flex flex-wrap">
        {publicTeams.map((team) => (
          <TeamCard teamObj={team} key={team.firebaseKey} onUpdate={getAllPublicTeams} />
        ))}
      </div>
      <h3>My Teams</h3>
      <div className="d-flex flex-wrap justify-content-center align-items-center">
        {privateTeams.map((team) => (
          <TeamCard teamObj={team} key={team.firebaseKey} onUpdate={getAllPrivateTeams} />
        ))}
      </div>
    </>
  );
}
