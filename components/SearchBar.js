import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function SearchBar({ onKeyUp }) {
  const handleChange = (e) => {
    onKeyUp(e.target.value.toLowerCase());
  };

  return (
    <div>
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search"
          name="search"
          onChange={handleChange}
          className="me-2"
          aria-label="Search"
        />
      </Form>
    </div>
  );
}

SearchBar.propTypes = {
  onKeyUp: PropTypes.func.isRequired,
};
