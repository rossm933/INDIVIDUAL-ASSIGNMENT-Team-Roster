import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createTeam, updateTeam } from '../../api/teamData';

const initialState = {
  firebaseKey: '',
  logo: '',
  team_name: '',
  city: '',
  state: '',
};

export default function TeamForm({ teamObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (teamObj.firebaseKey) {
      setFormInput(teamObj);
    }
  }, [teamObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (teamObj.firebaseKey) {
      updateTeam(formInput).then(() => router.push('/teams'));
    } else {
      const payload = {
        ...formInput, uid: user.uid, creator: user.displayName, creatorEmail: user.email,
      };
      createTeam(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateTeam(patchPayload).then(() => {
          router.push('/teams');
        });
      });
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <>
          <FloatingLabel
            controlId="floatingInput1"
            label="Team Name"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Team Name"
              name="team_name"
              value={formInput.team_name}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput2"
            label="Image URL"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="image url"
              name="logo"
              value={formInput.logo}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput3"
            label="City"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="image url"
              name="city"
              value={formInput.city}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput4"
            label="State"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="State"
              name="state"
              value={formInput.state}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <Form.Check
            className="text-black mb-3"
            type="switch"
            id="public"
            name="public"
            label="Public?"
            checked={formInput.public}
            onChange={(e) => {
              setFormInput((prevState) => ({
                ...prevState,
                public: e.target.checked,
              }));
            }}
          />

        </>
        <Button variant="dark" type="submit">{teamObj.firebaseKey ? 'Update' : 'Create'} Team</Button>
      </Form>
    </div>
  );
}

TeamForm.propTypes = {
  teamObj: PropTypes.shape({
    team_name: PropTypes.string,
    logo: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

TeamForm.defaultProps = {
  teamObj: initialState,
};
