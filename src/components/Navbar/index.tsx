import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ironManIcon from '../../assets/img/iron-man-icon.svg';
import usersIcon from '../../assets/img/users.svg'
import returnIcon from '../../assets/img/go-back.svg';
import { useHistory } from 'react-router-dom';
import './style.scss';

export default function Navbar() {
  const history = useHistory();
  const location = useLocation();
  const locationIsNotHome = location.pathname.length > 1;

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div className="left">
            <Link to="/">
              <img src={ironManIcon} alt="Ícone com o capacete do homem de ferro" />
            </Link>
            <h1>Marvel Strike Team</h1>
          </div>
          <div className="right">
            <Link className="button" to="/team">
              <span>Your Team</span>
              <img src={usersIcon} alt="Ícone de usuários" />
            </Link>
          </div>
          {locationIsNotHome &&
            (
              <button
                onClick={() => history.goBack()}
                className="previousPageButton"
                type="button"
              >
                <span>Return to previous page</span>
                <img src={returnIcon} alt="Return to previous page" />
              </button>
            )
          }
        </div>
      </nav>
    </>
  )
}