import React from 'react';
import '../styles/RepoList.css';
import RepoItem from './RepoItem';

const RepoList = ({ repos, loading, error, onRepoSelect, selectedRepo }) => {
  if (loading) {
    return (
      <div className="repo-list">
        <h2>GoDaddy Repositories</h2>
        <div className="loading">Loading repositories...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="repo-list">
        <h2>GoDaddy Repositories</h2>
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="repo-list">
      <h2>GoDaddy Repositories</h2>
      <div className="repo-list-container">
        {repos.map(repo => (
          <RepoItem 
            key={repo.id} 
            repo={repo} 
            onSelect={onRepoSelect}
            isSelected={selectedRepo && selectedRepo.id === repo.id}
          />
        ))}
      </div>
    </div>
  );
};

export default RepoList;