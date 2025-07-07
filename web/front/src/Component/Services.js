import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import retinalAnalysis from '../img/analysis.png';
import personalizedReports from '../img/eye.jpg';
import educationalResources from '../img/education.jpg';
import remoteMonitoring from '../img/remote.png';
import deleCardo from '../img/eye.jpg';
import diveraDon from '../img/education.jpg';
import { Fade } from 'react-reveal';

function Services() {
  return (
    <section id="services" className="services bg-light py-5">
      <div className="container">
        <div className="section-title text-center mb-5">
          <h2 className="mb-3 mt-5">Our Services</h2>
          <p className="text-muted">Empowering you with innovative solutions for proactive management of Diabetes Retinopathy</p>
        </div>
        <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          <Col>
            <Fade>
              <Card className="border-0 shadow h-100">
                <Card.Img variant="top" src={retinalAnalysis} className="card-img-top rounded-top" />
                <Card.Body>
                  <Card.Title className="text-center">Retinal Image Analysis</Card.Title>
                  <Card.Text className="card-text-limit">Upload retinal images securely for AI-driven analysis of Diabetes Retinopathy risk.</Card.Text>
                </Card.Body>
              </Card>
            </Fade>
          </Col>
          <Col>
            <Fade>
              <Card className="border-0 shadow h-100">
                <Card.Img variant="top" src={personalizedReports} className="card-img-top rounded-top" />
                <Card.Body>
                  <Card.Title className="text-center">Personalized Reports</Card.Title>
                  <Card.Text className="card-text-limit">Generate user-friendly reports detailing DR risk assessment and recommendations.</Card.Text>
                </Card.Body>
              </Card>
            </Fade>
          </Col>
          <Col>
            <Fade>
              <Card className="border-0 shadow h-100">
                <Card.Img variant="top" src={educationalResources} className="card-img-top rounded-top" />
                <Card.Body>
                  <Card.Title className="text-center">Educational Resources</Card.Title>
                  <Card.Text className="card-text-limit">Offer informative articles, videos, and FAQs to educate users about Diabetes Retinopathy.</Card.Text>
                </Card.Body>
              </Card>
            </Fade>
          </Col>
          <Col>
            <Fade>
              <Card className="border-0 shadow h-100">
                <Card.Img variant="top" src={remoteMonitoring} className="card-img-top rounded-top" />
                <Card.Body>
                  <Card.Title className="text-center">Remote Monitoring</Card.Title>
                  <Card.Text className="card-text-limit">Track changes in retinal health over time by securely storing and comparing retinal images.</Card.Text>
                </Card.Body>
              </Card>
            </Fade>
          </Col>
          <Col>
            <Fade>
              <Card className="border-0 shadow h-100">
                <Card.Img variant="top" src={deleCardo} className="card-img-top rounded-top" />
                <Card.Body>
                  <Card.Title className="text-center">Secure Data Handling</Card.Title>
                  <Card.Text className="card-text-limit"> Implement strict privacy regulations to ensure the secure storage and handling of user data.</Card.Text>
                </Card.Body>
              </Card>
            </Fade>
          </Col>
          <Col>
            <Fade>
              <Card className="border-0 shadow h-100">
                <Card.Img variant="top" src={diveraDon} className="card-img-top rounded-top" />
                <Card.Body>
                  <Card.Title className="text-center">User-Friendly Interface</Card.Title>
                  <Card.Text className="card-text-limit">Design a user-friendly web and mobile interface for easy uploading of retinal images.</Card.Text>
                </Card.Body>
              </Card>
            </Fade>
          </Col>
        </Row>
      </div>
    </section>
  );
}

export default Services;
