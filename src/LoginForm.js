import { Form, Button } from 'react-bootstrap';

const LoginForm = ({ handleLogin, username, setUsername, password, setPassword, error }) => {
  return (
    <div className='loginContainer'>
      <h1 className='header'>Login</h1>
      {error && <p className='error'>{error}</p>}
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='input'
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password: </Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='input'
          />
        </Form.Group>

        <Button variant="primary" type="submit" className='button'>
          Submit
        </Button>
      </Form>
      <div className='dummy'>
        <p>Username:Dinesh</p>
        <p>Password:password</p>
      </div>
    </div>
  );
};

export default LoginForm;
