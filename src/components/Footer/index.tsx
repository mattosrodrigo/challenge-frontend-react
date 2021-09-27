import './style.scss';
export default function Footer() {
  return (
    <footer>
      <div className="container">
        <p>Data provided by Marvel. © 2020 MARVEL</p>
        <p>Developed by
          <a
            href="https://github.com/LiveOnSolutions/"
            rel="noreferrer"
            target="_blank"
          > Giovani </a>
          and
          <a
            href="https://github.com/luis-grizzo"
            target="_blank"
            rel="noreferrer"
          > Luís </a>
        </p>
      </div>
    </footer>
  );
}