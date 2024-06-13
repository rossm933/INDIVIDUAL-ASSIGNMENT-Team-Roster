import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <Card.Img className="card-image" variant="top" src="https://upload.wikimedia.org/wikipedia/en/3/3a/05_NHL_Shield.svg" />
      <Button type="button" size="lg" variant="dark" className="copy-btn" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
