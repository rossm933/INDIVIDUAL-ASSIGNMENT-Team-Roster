import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PlayerCard from '../../components/PlayerCard';
import { viewTeamDetails } from '../../api/mergedData';

export default function ViewTeam() {
  const [teamDetails, setTeamDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewTeamDetails(firebaseKey).then(setTeamDetails);
  }, [firebaseKey]);

  return (
    <>
      <div className="mt-5 d-flex flex-wrap">
        <img src={teamDetails.logo} alt={teamDetails.team_name} style={{ width: '200px' }} />
        <div className="ms-5 details">
          <h1 className="details-name">{teamDetails.team_name}</h1>
          <p>{teamDetails.city}, {teamDetails.state}</p>
          {teamDetails.public
            ? <><p>Created By: {teamDetails.owner}</p><p>Creator Email: {teamDetails.owner_email}</p></>
            : ''}
        </div>
      </div>
      <div className="ms-5 details">
        <h3>Team Players</h3>
        <div className="d-flex flex-wrap">
          {teamDetails.players?.map((player) => (
            <PlayerCard playerObj={player} key={player.firebaseKey} />
          ))}
        </div>
      </div>
    </>
  );
}
