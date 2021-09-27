import React from 'react';
import './style.scss';

interface AuxProps {
  comic: Comic
}

export interface Comic {
  id: number;
  title: string;
  date: string;
  pages: number;
  price: number;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  }
}

const HeroCardComic: React.FC<AuxProps> = ({ comic }) => {
  const imageAddress = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;

  return (
    <>
      <div className="cardComic">
        <div className="contentImg" style={{ backgroundImage: `url(${imageAddress})` }}>
        </div>
        <div className="cardComicContentText">
          <h1 className="cardComicTitle">
            {comic.title}
          </h1>
          <div className="cardComicContentInformation">
            <p className="dateInformation">{comic.date}</p>
            <p className="pagesInformation">{comic.pages} pages</p>
            <p className="priceInformation">U$ {comic.price}</p>
          </div>
          <div className="cardComicDescription">
            <p>{comic.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroCardComic;