import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import favoriteIcon from '../../assets/img/favorite.svg';
import './style.scss';
export interface Hero {
  id?: number;
  description?: string;
  modified?: Date;
  resourceURI?: string;
  urls?: object[];
  name?: string;
  thumbnail: {
    path: string;
    extension: string;
  }
}

class Props {
  update?= function () { };
}
interface HeroItemProps extends Props {
  hero: Hero;
}


const HeroCard: React.FC<HeroItemProps> = ({ hero, update }) => {

  const imgPath = `${hero.thumbnail.path || ''}.${hero.thumbnail.extension || ''}`;

  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(isFavorite(hero));
    if (update) update();
  }, [favorite, hero, update]);

  /**
   * 
   * @param hero 
   * Remove o herói do time do usuário
   */
  const removeFromTeam = (hero: Hero) => {
    const heroes = JSON.parse(localStorage.getItem('MarvelStrikeTeam')!);
    const heroReturn = heroes.filter((el: Hero) => el.id !== hero.id);
    localStorage.setItem('MarvelStrikeTeam', JSON.stringify(heroReturn));
    setFavorite(false);
  }

  /**
   * 
   * @param hero 
   * Verifica se o Herói está no time do usuário
   */
  const isFavorite = (hero: Hero) => {
    if (!localStorage.getItem('MarvelStrikeTeam')) return false; // Pode Adicionar aos Favoritos
    const heroes = JSON.parse(localStorage.getItem('MarvelStrikeTeam')!);
    const heroReturn = heroes.filter((el: Hero) => el.id === hero.id);
    console.log(heroReturn.length);
    if (heroReturn.length >= 1) {
      return true;
    }; //Já está nos favoritos, não pode adicionar

    return false; //Os favoritos existem, mas esse herói não está, pode adicionar
  }

  /**
   * 
   * @param hero 
   * @param remove
   * Verifica se o herói faz parte do time e se é para o remover ou não 
   */
  const addOrRemoveThisHeroTeam = (hero: Hero, remove: boolean = false) => {
    if (remove) {
      removeFromTeam(hero);
      return;
    };

    if (isFavorite(hero)) return;

    if (!localStorage.getItem('MarvelStrikeTeam')) {
      const heroes = [hero];
      localStorage.setItem('MarvelStrikeTeam', JSON.stringify(heroes));
      setFavorite(true);
    } else {
      const currentHeroes = JSON.parse(localStorage.getItem('MarvelStrikeTeam')!);
      const heroes = [...currentHeroes, hero];
      localStorage.setItem('MarvelStrikeTeam', JSON.stringify(heroes));
      setFavorite(true);
    }
  }

  return (
    <div className="card">
      <Link className="heroCardLink" to={`/hero/${hero.id}`}>
        <div className="imgContainer">
          <img src={imgPath} alt="" />
        </div>
        <div className="textContainer">
          <h1 className="name-hero">{hero.name}</h1>
          <p className="description-hero">{hero.description}</p>
        </div>
      </Link>

      <button
        type="button"
        onClick={() => { addOrRemoveThisHeroTeam(hero, favorite) }}
        className={!favorite ? "heroCardFavoriteButton" : "heroCardRemoveFavoriteButton"}
      >
        <img src={favoriteIcon} alt="Icone de Favorito" />
        <span className="tooltip">{!favorite ? "Add to Team" : "Remove from Team"}</span>
      </button>
    </div>
  );
}

export default HeroCard;