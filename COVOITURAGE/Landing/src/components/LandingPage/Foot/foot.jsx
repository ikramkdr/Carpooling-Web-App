import "./foot.css";
import { BsInstagram } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
function Foot(){

    return(
       
        <section className="footer">
            <div className="bar">
                <h1 className="log">logo</h1>
                <p id="dedicace">Comes with a very great service, friendly and of course comfortable at a very affordable price by all groups, both bottom and top</p>
      
            <div className="sec">
             <h5>Office</h5>
            
             <h6> Abderrahmane mira University -Algeria ,Bejaia <br /> Targa Campus</h6>
             <br />
             <h5>Follow us</h5>
             
             <div className="Medias"> 
              <div className="Media"><BsInstagram /></div>
              <div className="Media"><a href="https://web.facebook.com/profile.php?id=61559974005643&_rdc=1&_rdr"><FaFacebook /></a></div>
              <div className="Media"><BsLinkedin /></div>
              <div className="Media"><a href="https://x.com/EddU_Carpoling?fbclid=IwAR1qrIm-hwSVvd-iHhWmiofInsfFzHnemUmqrNRIESCmQznMrS80AmmYu_c&mx=2"><BsTwitter /></a></div>
             </div>
            </div>
           
       <div className="sec">
        <h5>About us</h5>
        <ul><li>Our Drivers</li>
        <li>Contact Us</li>
        <li>Who are We?</li>
        <li>Work with Us</li>
        </ul>
       </div>
       <div className="sec">
        <h5>Info</h5>
<ul><li>Privacy Policy</li>
<li>Terms & conditions</li>
<li>Cookies & help</li></ul>
</div>
      
       </div>
        </section>
    );
}
export default Foot;