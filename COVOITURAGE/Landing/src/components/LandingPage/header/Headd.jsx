import { Fragment } from "react/jsx-runtime";
import "./Head.css";
function Head() {
  const items = ["Acceuil", "Apropos", "FAQ"];  
  return (
    <Fragment>
      <header>
       
        <a href="/home"><h1 id="loG">LOGO</h1></a>
        <ul className="horizontal-list">
          {items.map((item) => (
            <li>
              <a href={item}>{item}</a>
            </li>
          ))}
         <a href="/Connecter"><button  id="connecter"> Se connecter</button></a>
         <a href="/Inscription"> <button id="inscrire">S'inscrire</button></a>
        </ul>
      </header>
    </Fragment>
  );
}
export default Head;

