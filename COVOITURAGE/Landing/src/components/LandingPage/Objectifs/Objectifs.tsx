import "./Objectifs.css";
import Leaf from "../../../assets/leafh.svg";
import Bank from "../../../assets/bank.svg";
import Car from "../../../assets/car.svg";
import RX from "../../../assets/rx.svg";
function Objectifs() {
  return (
    <section>
      <h3>Nos Objectifs</h3>
      <div id="Objectif">
        <div className="Obj">
          <img src={Leaf} alt="" />
          <h4>Sauvez l'nvironnement</h4>
          <p>Réduisez votre empreinte carbone en partageant vos trajets</p>
        </div>

        <div className="Obj">
          <img src={Bank} alt="" />
          <h4>Trajet à petit budget</h4>
          <p>Faites des économies sans sacrifier la qualité du transport</p>
        </div>

        <div className="Obj">
          <img src={Car} alt="" />
          <h4>Voyage sans traces</h4>
          <p>Profitez d'une expérience de voyage sans soucis</p>
        </div>

        <div className="Obj">
          <img src={RX} alt="" />
          <h4>développer un réseau</h4>
          <p>transformez vos trajet en une opportunité de rencontre</p>
        </div>
      </div>
    </section>
  );
}
export default Objectifs;
