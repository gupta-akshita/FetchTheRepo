import React, { useState, useEffect } from 'react';
import '../styles/RepoDetail.css';

const RepoDetail = ({ repo, onClose }) => {
  const [languages, setLanguages] = useState({});
  const [loadingLanguages, setLoadingLanguages] = useState(true);
  const [languageError, setLanguageError] = useState(null);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        setLoadingLanguages(true);
        setLanguageError(null);
        const response = await fetch(repo.languages_url);
        if (!response.ok) {
          throw new Error('Failed to fetch languages');
        }
        const data = await response.json();
        setLanguages(data);
      } catch (err) {
        setLanguageError(err.message);
      } finally {
        setLoadingLanguages(false);
      }
    };

    if (repo.languages_url) {
      fetchLanguages();
    }
  }, [repo.languages_url]);

  const renderLanguageTags = () => {
    if (loadingLanguages) return <span>Loading...</span>;
    if (languageError) return <span>Error loading languages</span>;

    const languageNames = Object.keys(languages);
    if (languageNames.length === 0) return <span>No languages detected</span>;

    return (
      <div className="language-tags">
        {languageNames.map((lang) => (
          <span key={lang} className="language-tag">
            {lang}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="repo-detail">
      <div className="repo-detail-header">
        <h2 className="repo-detail-heading">Repository Details</h2>
        <button
          className="close-button"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
      </div>

      <div className="repo-detail-content">
        <h1 className="repo-title">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="repo-title-link"
          >
            {repo.name} ↗
          </a>
        </h1>

        <div className="repo-description">
          {repo.description || 'No description available'}
        </div>

        <div className="repo-stats">
          <div className="stat-item stat-languages">
            <span className="stat-label">Languages:</span>
            <div className="stat-value">{renderLanguageTags()}</div>
          </div>
          <div className="stat-item stat-forks">
            <span className="stat-label">Forks:</span>
            <div className="stat-value">{repo.forks_count}</div>
          </div>
          <div className="stat-item stat-issues">
            <span className="stat-label">Open Issues:</span>
            <div className="stat-value">{repo.open_issues_count}</div>
          </div>
          <div className="stat-item stat-watchers">
            <span className="stat-label">Watchers:</span>
            <div className="stat-value">{repo.watchers_count}</div>
          </div>
        </div>

        <div className="repo-additional-info">
          <div className="info-item">
            <span className="info-label">📅 Created:</span>
            <span className="info-value">
              {new Date(repo.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">🕒 Last Updated:</span>
            <span className="info-value">
              {new Date(repo.updated_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">🌿 Default Branch:</span>
            <span className="info-value">{repo.default_branch}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepoDetail;
