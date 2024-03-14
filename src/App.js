import React, { useState } from 'react';
import './App.css'; 
import { Table } from 'react-bootstrap';
import { ClipLoader } from 'react-spinners';
import LoginForm from './LoginForm'; 

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(false); 

  const handleLogin = (event) => {
    event.preventDefault();
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
    setLoading(true); 
    fetch('https://v2.jokeapi.dev/joke/any?format=json&blacklistFlags=nsfw,sexist&type=single&lang=EN&amount=10')
      .then((response) => response.json())
      .then((data) => {
        setJokes(data.jokes);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching jokes:', error);
        setLoading(false); 
      });
  };

  return (
    <div className='container'>
      {!isLoggedIn ? (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          error={error}
        />
      ) : (
        <div className='homeContainer'>
          <h2 className='name'>Welcome, {username}!</h2>
          
          {loading ? ( 
            <div className='loader-container'>
              <ClipLoader color="blue" loading={true} size={50} />
            </div>
          ) : (
            <Table striped bordered hover className='table'>
              <thead>
                <tr>
                  
                  <th className='yed'>Jokes</th>
                </tr>
              </thead>
              <tbody className='ted'>
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
