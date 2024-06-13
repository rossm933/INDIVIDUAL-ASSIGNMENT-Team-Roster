import Link from 'next/link';
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { deleteTeamsAndPlayers } from '../api/mergedData';
import { updateTeam } from '../api/teamData';

export default function TeamCard({ teamObj, onUpdate }) {
  const { user } = useAuth();

  const togglePublic = () => {
    if (teamObj.public) {
      updateTeam({ ...teamObj, public: false }).then(() => onUpdate());
    } else {
      updateTeam({ ...teamObj, public: true }).then(() => onUpdate());
    }
  };

  const deleteThisTeam = () => {
    if (window.confirm(`Are you sure you want to delete Team ${teamObj.team_name} and all of it's players?`)) {
      deleteTeamsAndPlayers(teamObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card
      className="d-flex flex-wrap justify-content-center align-items-center"
      style={{
        color: 'black', backgroundColor: 'gray', width: '18rem', margin: '10px',
      }}
    >
      <Card.Img className="card-image" variant="top" src={teamObj.logo} style={{ height: '250px' }} />
      <Card.Body>
        <Card.Title>{teamObj.team_name}</Card.Title>
        <Card.Text>{teamObj.city}, {teamObj.state}</Card.Text>
        <Button style={{ background: 'white', border: 'solid 1px black' }} onClick={togglePublic}><span>{teamObj.public ? '🌎' : '🔒'}</span></Button>
        <Link href={`/team/${teamObj.firebaseKey}`} passHref>
          <Button variant="dark">View</Button>
        </Link>
        {teamObj.uid === user.uid
          ? (
            <>
              <Link href={`/team/edit/${teamObj.firebaseKey}`} passHref>
                <Button className="button" variant="secondary">Edit</Button>
              </Link>
              <Button className="button" variant="danger" onClick={deleteThisTeam}>Delete</Button>
            </>
          )
          : '' }
      </Card.Body>
    </Card>
  );
}

TeamCard.propTypes = {
  teamObj: PropTypes.shape({
    team_name: PropTypes.string,
    logo: PropTypes.string,
    firebaseKey: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    public: PropTypes.bool,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
