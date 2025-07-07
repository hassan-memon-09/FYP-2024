import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function About() {
  return (
    <section id="about" className="about mt-5">
      <Container>
        <Row>
          <Col
            xl={5}
            lg={6}
            className="video-box d-flex justify-content-center align-items-stretch position-relative"
          ></Col>
          <Col
            xl={7}
            lg={6}
            className="icon-boxes d-flex flex-column align-items-stretch justify-content-center py-5 px-lg-5"
          >
            <h3>About Us</h3>
            <p>
              We are dedicated to revolutionizing diabetic care through early
              detection and prevention solutions for Diabetes Retinopathy.
              Leveraging cutting-edge AI-driven technology. 
            </p>
            <div className="icon-box">
              <div className="icon">
                <i className="bx bx-fingerprint" />
              </div>
              <h4 className="title">
                <Link to="/">Our Impact</Link>
              </h4>
              <p className="description">
                The impact of OptiDiagnostics extends far beyond the realm of
                technology. By enabling early detection of Diabetes Retinopathy,
                we're not just preventing vision loss—we're enhancing quality of
                life, empowering individuals with diabetes to take control of
                their health, and ultimately, preserving vision for generations
                to come.
              </p>
            </div>
            <div className="icon-box">
              <div className="icon">
                <i className="bx bx-gift" />
              </div>
              <h4 className="title">
                <Link to="/">Our Mission</Link>
              </h4>
              <p className="description">
                At OptiDiagnostics, our mission is clear: to revolutionize
                diabetic care by providing early detection and prevention
                solutions for Diabetes Retinopathy. We're committed to
                leveraging innovative technology to empower individuals with
                diabetes and healthcare professionals alike, ensuring timely
                intervention and the preservation of vision.
              </p>
            </div>
            <div className="icon-box">
              <div className="icon">
                <i className="bx bx-atom" />
              </div>
              <h4 className="title">
                <Link to="/">Our Technology</Link>
              </h4>
              <p className="description">
                OptiDiagnostics harnesses cutting-edge AI-driven technology to
                analyze retinal images with unparalleled accuracy. Our
                sophisticated algorithms can detect subtle signs of Diabetes
                Retinopathy in its earliest stages, providing users with
                reliable insights and empowering proactive management of their
                vision health.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default About;
