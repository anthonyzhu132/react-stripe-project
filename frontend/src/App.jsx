import React from 'react';
import { Link, Router } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul className="navbar-nav">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/checkout">
                <span aria-label="emoji" role="img">
                  🛒
                </span>
                Checkout
              </Link>
            </li>
            <li>
              <Link to="/payments">
                <span aria-label="emoji" role="img">
                  💵
                </span>
                Payments
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </Router>
  );
}

export default App;
