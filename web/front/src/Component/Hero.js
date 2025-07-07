import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
function Hero() {
  return (
    <div>
      <section id="hero" className="d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h1>Welcome to OptiDiognostic</h1>
              <h2>Your Personalized Pathway to Eye Health</h2>
              <Button variant="primary mt-3">
                <Link to="/screening" className="btn btn-primary">
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="why-us" className="why-us">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="content">
                <h3>Why Choose OptiDiagnostic?</h3>
                <p>
                  OptiDiagnostic collaborates with medical experts to validate
                  its AI system and ensure its effectiveness in real-world
                  healthcare settings, instilling confidence in its
                  capabilities.
                </p>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="icon-boxes">
                <div className="row">
                  <div className="col-md-4 mb-4">
                    <div className="icon-box">
                      <i className="bx bx-receipt" />
                      <h4>Early Detection</h4>
                      <p>
                        OptiDiagnostic utilizes advanced AI technology to detect
                        early signs of Diabetes Retinopathy, enabling timely
                        intervention and potentially preventing vision loss.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4 mb-4">
                    <div className="icon-box">
                      <i className="bx bx-cube-alt" />
                      <h4>Accuracy</h4>
                      <p>
                        The AI-driven system ensures accurate analysis of
                        retinal images, providing reliable results for both
                        healthcare professionals and individuals with diabetes.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4 mb-4">
                    <div className="icon-box">
                      <i className="bx bx-images" />
                      <h4>Convenience</h4>
                      <p>
                        With user-friendly web and mobile interfaces,
                        OptiDiagnostic offers a convenient way for users to
                        upload retinal images and receive prompt feedback on
                        their DR status.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
