import React, { useState, useEffect } from 'react';
import './styles/App.css';
import RepoList from './components/RepoList';
import RepoDetail from './components/RepoDetail';

function App() {
  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.github.com/orgs/godaddy/repos');
        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }
        const data = await response.json();
        setRepos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const handleRepoSelect = (repo) => {
    setSelectedRepo(repo);
  };

  const handleCloseDetail = () => {
    setSelectedRepo(null);
  };

  return (
    <div className="app">
      <div className="app-container">
        <div className="left-panel">
          <RepoList 
            repos={repos} 
            loading={loading} 
            error={error} 
            onRepoSelect={handleRepoSelect}
            selectedRepo={selectedRepo}
          />
        </div>
        <div className={`right-panel ${selectedRepo ? 'visible' : ''}`}>
          {selectedRepo && (
            <div className="right-panel-overlay">
              <RepoDetail 
                repo={selectedRepo} 
                onClose={handleCloseDetail}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
