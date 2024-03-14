import React, { useState } from 'react';
import './App.css'; // Import App.css
import { Form, Button, Table } from 'react-bootstrap';
import { ClipLoader } from 'react-spinners'; // Import ClipLoader from react-spinners

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }
    if (!password.trim()) {
      setError('Please enter a password');
      return;
    }
    if (username === 'Dinesh' && password === 'password') {
      setIsLoggedIn(true);
      fetchJokes();
    } else {
      setError('Invalid username or password');
    }
  };

  const fetchJokes = () => {
    setLoading(true); // Set loading to true before making the API call
    fetch('https://v2.jokeapi.dev/joke/any?format=json&blacklistFlags=nsfw,sexist&type=single&lang=EN&amount=10')
      .then((response) => response.json())
      .then((data) => {
        setJokes(data.jokes);
        setLoading(false); // Set loading to false after receiving the data
      })
      .catch((error) => {
        console.error('Error fetching jokes:', error);
        setLoading(false); // Set loading to false if there's an error
      });
  };

  return (
    <div className='container'>
      {!isLoggedIn ? (
        <div className='loginContainer'>
          <h2 className='header'>Login</h2>
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
          <div>
            <p>username:Dinesh</p>
            <p>password:password</p>
            </div>
          
        </div>
         
      ) : (
        <div className='homeContainer'>
          <h2 className='name'>Welcome, {username}!</h2>
          <h3 className='header'>Jokes</h3>
          {loading ? ( // Show ClipLoader while loading
            <div className='loader-container'>
              <ClipLoader color="blue" loading={true} size={50} />
            </div>
          ) : (
            <Table striped bordered hover className='table'>
              <thead>
                <tr>
                  <th className='yed'>#</th>
                  <th className='joke'>My Joke</th>
                </tr>
              </thead>
              <tbody>
                {jokes.map((joke, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{joke.joke}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
