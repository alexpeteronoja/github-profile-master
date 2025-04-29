import './App.css';
import ProfileDetails from './ProfileDetails';
import Repository from './Repository';
import Search from './Search';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [username, setUsername] = useState('Github');
  const [data, setData] = useState([]);
  const [repos, setRepos] = useState([]);
  const [visible, setVisible] = useState(4);
  const [submit, setSubmit] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setVisible(4);
    setSubmit(true);
  }

  function handleChange(event) {
    event.preventDefault();
    const { value } = event.target;
    setUsername(value);

    if (value.length > 0) {
      fetchSuggestion(value);
      setShowSuggestions(true);
    }
  }

  function handleClick() {
    const reposLength = repos.length;
    setVisible(prev => prev + reposLength);
  }

  function handleSuggest() {
    setSubmit(true);
    setShowSuggestions(false);
  }

  async function fetchSuggestion(query) {
    try {
      const suggest = await axios.get(`https://api.github.com/users/${query}`);
      setSuggestions(suggest.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    // Fetch initial data
    const fetchInitialData = async () => {
      try {
        const [userProfile, repository] = await Promise.all([
          axios.get(`https://api.github.com/users/${username}`),
          axios.get(`https://api.github.com/users/${username}/repos`),
        ]);
        setData(userProfile.data);
        setRepos(repository.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    if (submit) {
      const fetchData = async () => {
        try {
          const [userProfile, repository] = await Promise.all([
            axios.get(`https://api.github.com/users/${username}`),
            axios.get(`https://api.github.com/users/${username}/repos`),
          ]);
          setData(userProfile.data);
          setRepos(repository.data);
          setSubmit(false);
        } catch (err) {
          console.error(err);
        }
      };

      fetchData();
    }
  }, [submit, username]);

  return (
    <>
      <div className="container">
        <Search
          value={username}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          showSuggestions={showSuggestions}
          handleSuggest={handleSuggest}
          dropImg={suggestions.avatar_url}
          dropName={suggestions.name}
          dropBio={suggestions.bio}
        />

        <ProfileDetails
          profileImg={data.avatar_url}
          location={data.location || 'None'}
          followers={data.followers}
          following={data.following}
        />

        <div className="my-3">
          <h1>{data.name}</h1>
          <p>{data.bio}</p>
        </div>

        <div className="row">
          {repos.slice(0, visible).map(item => (
            <div key={item.id} className="col-12 col-lg-6 g-4 ">
              <Repository
                name={item.name}
                description={item.description}
                forks={item.forks}
                watchers={item.watchers}
                licence={
                  item.license?.spdx_id !== '' ? item.license?.spdx_id : null
                }
                updatedDate={item.updated_at}
              />
            </div>
          ))}
        </div>

        {visible < repos.length && (
          <p onClick={handleClick} className="text-center my-5 load-more ">
            View all repositories
          </p>
        )}
      </div>
    </>
  );
}

export default App;
