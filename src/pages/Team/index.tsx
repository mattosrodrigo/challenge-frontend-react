import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Header from '../../components/Header';
import HeroCard, { Hero } from '../../components/HeroCard';
import './style.scss';

const Team = function () {
  const [teamHeroes, setTeamHeroes] = useState([]);
  const [limitPagination, setLimitPagination] = useState(0);


  const teamIsEmpty = () => {
    return teamHeroes.length <= 0;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function updateTeamHeroes() {
    if (!localStorage.getItem('MarvelStrikeTeam')) return;
    if (JSON.stringify(teamHeroes) === localStorage.getItem('MarvelStrikeTeam')) {
      return;
    };

    setTeamHeroes(JSON.parse(localStorage.getItem('MarvelStrikeTeam')!));
  }

  function handlePagination(amount: number) {
    setLimitPagination((amount) * 8);
  }

  useEffect(() => {
    updateTeamHeroes();
  }, [updateTeamHeroes]);


  return (
    <>
      <Header
        team={true}
        hero={
          !teamIsEmpty()
            ? 'Here is your own strike team choice'
            : 'Your strike team is empty, choose your heroes at the Home'
        }
      />
      <div id="team">
        <div className="container" style={{ marginTop: teamIsEmpty() ? '0' : '-270px' }}>
          {teamHeroes.length > 0 &&
            teamHeroes.slice(limitPagination, limitPagination + 8).map((el: Hero) => (
              <HeroCard key={el.id} hero={el} update={updateTeamHeroes} />
            ))
          }
        </div>
      </div>
      {!teamIsEmpty() && (
        <div className="container">
          <div className="pagination">
            <ReactPaginate
              previousClassName="prevButton"
              nextLinkClassName="nextButton"
              previousLabel="Prev"
              onPageChange={(sel) => handlePagination(sel.selected)}
              pageCount={Math.ceil(teamHeroes.length / 8)}
              pageRangeDisplayed={4}
              marginPagesDisplayed={1}
            />
          </div>
        </div>

      )}
    </>
  )
}

export default Team;