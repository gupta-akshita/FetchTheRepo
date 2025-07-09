import React from 'react';

const RepoItem = ({ repo, onSelect, isSelected }) => {
  const handleClick = () => {
    onSelect(repo);
  };

  return (
    <div 
      className={`repo-item ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
    >
      <div className="repo-name">{repo.name}</div>
      <div className="repo-description">
        {repo.description || 'No description available'}
      </div>
      <div className="repo-meta">
        <span className="repo-language">{repo.language || 'N/A'}</span>
        <span className="repo-stars">⭐ {repo.stargazers_count}</span>
      </div>
    </div>
  );
};

export default RepoItem;