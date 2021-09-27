import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import marvel from '../../services/marvel';

import Header from '../../components/Header';
import { Hero } from '../../components/HeroCard';
import HeroCardHeader from '../../components/HeroCardHeader';
import HeroCardComic, { Comic } from '../../components/HeroCardComic';
import './style.scss';

interface ParamTypes {
  id: string;
}

interface ComicLocal {
  title: string;
  id: number;
  pageCount: number;
  dates: [{ date: string; }];
  prices: [{ price: string; }];
  description: string;
  thumbnail: {
  path: string;
  extension: string;
  };
}


function HeroProfile() {
  const { id } = useParams<ParamTypes>();
  const url: string = `characters/${id}`;
  const [hero, setHero] = useState([]);
  const [comics, setComics] = useState([]);
  const [results, setResults] = useState(0);

  async function searchHeroAndComics() {
    const response = await marvel.get(url, {
      params: {
        ts: 1,
        apikey: '4ff0d1803bb538daf09c601a847343df',
        hash: '3965dfc3ff036fdb06564a72d77bb134',
        limit: 8,
        offset: 1
      }
    });
    setHero(response.data.data.results);

    const responseComics = await marvel.get(url + '/comics', {
      params: {
        ts:1,
        apikey: '4ff0d1803bb538daf09c601a847343df',
        hash: '3965dfc3ff036fdb06564a72d77bb134',
        limit: 5,
        offset: 1
      }
    });

    setResults(responseComics.data.data.results.length);

    const comics = responseComics.data.data.results.map((comic: ComicLocal) => {
      return {
        id: comic.id,
        title: comic.title,
        pages: Number(comic.pageCount),
        description: comic.description,
        date: new Date(comic.dates[0].date).toLocaleDateString(),
        price: Number(comic.prices[0].price),
        thumbnail: {
          path: comic.thumbnail.path,
          extension: comic.thumbnail.extension
        }
      }
    });

    setComics(comics);
  }

  useEffect(() => {
    searchHeroAndComics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <>
      <Header team={true} hero="Discover all comics this character took part in" />
      <div id="hero-profile">

        <div className="container">
          {hero.map((el: Hero) => <HeroCardHeader key={el.id} hero={el} />)}
          <div id="title">
            <div className="">
              <section>
                <h1>Comics</h1>
                <p># {results}</p>
              </section>
            </div>
          </div>
          {comics.map((comic: Comic) => (
            <HeroCardComic key={comic.id} comic={comic}></HeroCardComic>
          ))}

        </div>
      </div>
    </>
  );
}

export default HeroProfile;