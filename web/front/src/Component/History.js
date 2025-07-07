import React, { useState, useEffect } from 'react';
import { db } from './Firebaseconfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from './AuthContext';
import { Card, Row, Col } from 'react-bootstrap';

function History() {
  const { currentUser } = useAuth();
  const [screeningData, setScreeningData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScreeningData = async () => {
      if (currentUser) {
        const q = query(collection(db, 'screeningData'), where('uid', '==', currentUser.uid));
        try {
          const querySnapshot = await getDocs(q);
          const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setScreeningData(data);
        } catch (error) {
          console.error('Error fetching screening data:', error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchScreeningData();
  }, [currentUser]);

  const handleImageClick = (imageUrl) => {
    window.open(imageUrl, "_blank");
  };

  return (
    <section id="services" className="services bg-light py-5">
      <div className="container">
        <div className="section-title text-center mb-5">
          <h2 className="mb-3 mt-5">Your Previous History</h2>
          <Row className="justify-content-center">
            <Col lg={8}>
              {loading ? (
                <p className="text-center">Loading...</p>
              ) : (
                screeningData.length === 0 ? (
                  <p className="text-center">You have no previous history</p>
                ) : (
                  screeningData.map(item => (
                    <Card key={item.id} className="mb-3">
                      <Card.Body className="d-flex flex-column flex-lg-row align-items-center justify-content-between">
                        <div className="mb-3 mb-lg-0">
                          <span><p><b>Result: </b></p>{item.result}</span>
                          <br />
                          <small className="text-muted">{new Date(item.timestamp?.toDate()).toLocaleString()}</small>
                        </div>
                        <div className="mb-3 mb-lg-0">
                          <p><b>Original Image</b></p>
                          <img src={item.imageURL} alt="Uploaded" className="img-fluid rounded mb-2" style={{ maxHeight: '100px' }} onClick={() => handleImageClick(item.imageURL)} />
                        </div>
                        <div className="mb-3 mb-lg-0">
                          <p><b> Optic Disc </b></p>
                          <img src={item.contourImageURL1} alt="Contour 1" className="img-fluid rounded" style={{ maxHeight: '100px' }} onClick={() => handleImageClick(item.contourImageURL1)} />
                        </div>
                        <div>
                          <p><b> Soft Exudates </b></p>
                          <img src={item.contourImageURL2} alt="Contour 2" className="img-fluid rounded" style={{ maxHeight: '100px' }} onClick={() => handleImageClick(item.contourImageURL2)} />
                        </div>
                      </Card.Body>
                    </Card>
                  ))
                )
              )}
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
}

export default History;
