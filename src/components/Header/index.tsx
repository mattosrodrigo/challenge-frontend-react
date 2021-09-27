import React, { useState, useEffect } from 'react';
import searchIcon from '../../assets/img/search.svg';
import backgroundImage from '../../assets/img/background-header.png';
import './style.scss';
import { useHistory } from 'react-router';
import { Parallax } from 'react-parallax';
import { useLocation } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';

interface AuxProps {
  hero?: string;
  team?: boolean;
}

const Header: React.FC<AuxProps> = (props) => {

  const [searchTerm, setSearchTerm] = useState('');
  const history = useHistory();

  function handleKeyPress(e: { key: string }) {
    if (e.key === 'Enter') handleSearch();
  }

  function handleSearch() {
    if (searchTerm.length > 0) history.push(`/search/${searchTerm}`);
    else history.push(`/`);
  }

  const location = useLocation();
  const name = location.pathname;

  useEffect(() => {
    if (name.split('/search').length > 1 || name === '/') handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  return (
    <>
      <Parallax style={{ zIndex: props.hero ? '-1' : '' }} bgImage={backgroundImage} strength={250} >
        <header >
          {
            !props.team ? (
              <div className="headerHome">
                <h1 className="headerTitle">Explore the most powerful characters in Marvel</h1>
                <fieldset>
                  <DebounceInput
                    minLength={2}
                    debounceTimeout={500}
                    type="text"
                    onKeyPress={(e: { key: string; }) => handleKeyPress(e)}
                    placeholder="Type in a character name"
                    onChange={event => setSearchTerm(event.target.value)}
                  />
                  <button
                    onClick={() => handleSearch()}
                    type="button"
                  >
                    <img src={searchIcon} alt="ícone de lupa para pesquisa" />
                  </button>
                </fieldset>
              </div>
            ) : (
              <div className="headerHero">
                <div className="container">
                  <h1 className="headerTitle">{props.hero !== '' ? props.hero : ''}</h1>
                </div>
              </div>
            )

          }
        </header>
      </Parallax>

    </>
  );
}
export default Header;