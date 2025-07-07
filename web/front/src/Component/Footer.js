import { Link } from "react-router-dom"

function Footer() {
  return (
    <>
<footer id="footer">
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6 footer-contact">
                <h3>OptiDiognostic</h3>
                <p>
                  Institute<br />
                  Of Bussiness Administration<br />
                  Sukkur <br /><br />
                  <strong>Phone:</strong> +92 3108434140 <br />
                  <strong>Email:</strong> mhdhassan@gmail.com<br />
                </p>
              </div>
              <div className="col-lg-2 col-md-6 footer-links">
                <h4>Useful Links</h4>
                <ul>
                  <li><i className="bx bx-chevron-right" /> <Link to="/web/front/src/Component/Hero.js">Home</Link></li>
                  <li><i className="bx bx-chevron-right" /> <Link to="/web/front/src/Component/About.js">About us</Link></li>
                  <li><i className="bx bx-chevron-right" /> <Link to="/web/front/src/Component/Services.js">Services</Link></li>
                  <li><i className="bx bx-chevron-right" /> <Link to="/web/front/src/Component/Screening.js">Screening</Link></li>
                  <li><i className="bx bx-chevron-right" /> <Link to="/web/front/src/Component/History.js">history</Link></li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-6 footer-links">
                <h4>Our Services</h4>
                <ul>
                  <li><i className="bx bx-chevron-right" /> <Link to="#">Retinal Image Analysis</Link></li>
                  <li><i className="bx bx-chevron-right" /> <Link to="#">Personalized Reports</Link></li>
                  <li><i className="bx bx-chevron-right" /> <Link to="#">Educational Resources</Link></li>
                  <li><i className="bx bx-chevron-right" /> <Link to="#">Remote Monitoring</Link></li>
                
                </ul>
              </div>
              <div className="col-lg-4 col-md-6 footer-newsletter">
                <h4>For feedback</h4>
                <p>You Can Give You Feedback Here</p>
                <form action method="post">
                  <input type="email" name="email" /><input type="submit" defaultValue="Subscribe" />
                </form>
              </div>
            </div>
          </div>
        </div>
        
      </footer>
    </>
  )
}

export default Footer
