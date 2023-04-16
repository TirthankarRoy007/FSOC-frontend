import React from 'react';
import { Link } from 'react-router-dom';
import "./Home.css"

function HomePage() {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <div>
        <Link to='/createProject'>
          <button>Create Project</button>
        </Link>
        <Link to='/getProject'>
          <button>Get Project</button>
        </Link>
        <Link to='/logout'>
          <button>Logout</button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
