import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getPlayers, createPlayer, updatePlayer } from '../../api/playerData';

const initialState = {
  name: '',
  image: '',
  role: '',
};

function PlayerForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [, setPlayers] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getPlayers(user.uid).then(setPlayers);

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updatePlayer(formInput).then(() => router.push('/'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createPlayer(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updatePlayer(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Player</h2>

      {/* TITLE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Player Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Player Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* AUTHOR SELECT  */}
      <FloatingLabel controlId="floatingSelect" label="Role">
        <Form.Select
          aria-label="Role"
          name="role"
          onChange={handleChange}
          className="mb-3"
          value={formInput.role}
          required
        >
          <option disabled selected value="">Select an Option</option>
          <option value="Center">Center</option>
          <option value="Forward">Forward</option>
          <option value="Defenseman">Defenseman</option>
          <option value="Goalie">Goalie</option>

        </Form.Select>
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Player</Button>
    </Form>
  );
}

PlayerForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    role: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

PlayerForm.defaultProps = {
  obj: initialState,
};

export default PlayerForm;
