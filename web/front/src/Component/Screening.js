import React, { useState } from "react";
import { Modal, Button, Spinner, Card, Row, Col } from "react-bootstrap";
import { useAuth } from "./AuthContext";
import { db, storage } from "./Firebaseconfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import table from '../img/table.jpg';

function Screening() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [contourImage1, setContourImage1] = useState(null);
  const [contourImage2, setContourImage2] = useState(null);
  const [error, setError] = useState(null);

  const { currentUser } = useAuth();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:5000/evaluate", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error evaluating image");
      }

      const data = await response.json();

      setResult(data.result);
      setContourImage1(data.contour_image_1);
      setContourImage2(data.contour_image_2);
      setShowModal(true);

      
      const imageRef = ref(
        storage,
        `images/${currentUser.uid}_${Date.now()}_original.jpg`
      );
      const contourRef = ref(
        storage,
        `contours/${currentUser.uid}_${Date.now()}_contour.jpg`
      );
      const contourImageBlob1 = await fetch(
        `data:image/jpeg;base64,${data.contour_image_1}`
      ).then((res) => res.blob());
      const contourImageBlob2 = await fetch(
        `data:image/jpeg;base64,${data.contour_image_2}`
      ).then((res) => res.blob());
      await Promise.all([
        uploadBytes(ref(contourRef, "contour1"), contourImageBlob1),
        uploadBytes(ref(contourRef, "contour2"), contourImageBlob2),
        uploadBytes(imageRef, image),
      ]);
      const [contourImageUrl1, contourImageUrl2] = await Promise.all([
        getDownloadURL(ref(contourRef, "contour1")),
        getDownloadURL(ref(contourRef, "contour2")),
      ]);
      const imageUrl = await getDownloadURL(imageRef);

      await addDoc(collection(db, "screeningData"), {
        uid: currentUser.uid,
        imageURL: imageUrl,
        contourImageURL1: contourImageUrl1,
        contourImageURL2: contourImageUrl2,
        result: data.result,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error evaluating image:", error);
      setError("Failed to evaluate the image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleImageClick = (imageUrl) => {
    window.open(imageUrl, "_blank");
  };

  return (
    <div>
      <div
        className="screening-container"
        style={{ backgroundColor: "#f0f2f5" }}
      >
        <div className="row row-cols-1 row-cols-md-4 g-4 justify-content-center mb-4 mt-5">
          <Card
            bg="primary"
            text="white"
            style={{
              width: "18rem",
              margin: "10px",
              marginTop: "50px",
              height: "17rem",
            }}
          >
            <Card.Body>
              <Card.Title>
                <b>Step 1</b>
              </Card.Title>
              <Card.Text>
                <b>
                  Look for the section labeled "Upload Retina Image" or similar.
                  Click on the button or area designated for uploading images.
                  This will open a file dialog box.
                </b>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card
            bg="primary"
            text="white"
            style={{
              width: "18rem",
              margin: "10px",
              marginTop: "50px",
              height: "17rem",
            }}
          >
            <Card.Body>
              <Card.Title>
                <b>Step 2</b>
              </Card.Title>
              <Card.Text>
                {" "}
                <b>
                  Browse through your files and select the retina image you want
                  to upload.The selected image will begin uploading. Depending
                  on the size of the image and your internet connection speed,
                  this process may take a few moments.
                </b>{" "}
              </Card.Text>
            </Card.Body>
          </Card>
          <Card
            bg="primary"
            text="white"
            style={{
              width: "18rem",
              margin: "10px",
              marginTop: "50px",
              height: "17rem",
            }}
          >
            <Card.Body>
              <Card.Title>
                <b>Step 3</b>
              </Card.Title>
              <Card.Text>
                <b>
                  After the image has been successfully uploaded,Click on the
                  "Evaluate" button to start the evaluation process. The system
                  will begin processing the uploaded image using the screening
                  algorithm. This process may take some time.
                </b>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card
            bg="primary"
            text="white"
            style={{
              width: "18rem",
              margin: "10px",
              marginTop: "50px",
              height: "17rem",
            }}
          >
            <Card.Body>
              <Card.Title>
                <b>Step 4</b>
              </Card.Title>
              <Card.Text>
                <b>
                  After the evaluation process is finished, you will see the
                  screening results displayed on the screen. Carefully review
                  the predicted result provided by the system.
                </b>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="text-center mt-5">
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            className="text-warning mr-2"
            size="lg" 
          />
          <span className="text-danger">
            <b>
              The retinal scan must have sufficient amount of lighting effect.
            </b>
          </span>
        </div>
        <div className="container-fluid d-flex justify-content-center align-items-center 50vh">
          <div className="col-lg-6 col-md-8 col-sm-10 col-12">
            <div className="border p-4 rounded-lg">
              <h2 className="mb-4 text-center">DR Screening Page</h2>
              <div className="mb-3">
                <form onSubmit={handleSubmit}>
                  <label htmlFor="imageUpload" className="form-label">
                    Upload Retina Image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="imageUpload"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={loading} 
                  />
                  <button
                    type="submit"
                    className="btn btn-primary btn-block mt-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner animation="border" size="sm" /> Evaluating...
                      </>
                    ) : (
                      "Evaluate"
                    )}
                  </button>
                </form>
                <img
          src={table}
          alt="Table Image"
          className="img-fluid mx-auto d-block mt-4"
          style={{ maxHeight: "200px" }}
        />
              </div>
            </div>
          </div>

          <Modal show={showModal} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>Screening Result</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
              <Row>
                <Col md={6}>
                  {image && (
                    <>
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Uploaded"
                        className="img-fluid rounded mb-3"
                        style={{ maxHeight: "300px", cursor: "pointer" }}
                        onClick={() =>
                          handleImageClick(URL.createObjectURL(image))
                        }
                      />
                      <h5>Results: {result} </h5>
                    </>
                  )}
                </Col>

                
                <Col md={6}>
                  <Row>
                    <Col>
                      {contourImage1 && (
                        <div
                          onClick={() => handleImageClick(contourImage1)}
                          style={{ cursor: "pointer" }}
                        >
                          <img
                            src={`data:image/jpeg;base64,${contourImage1}`}
                            alt="Segmentation Contour 1"
                            className="img-fluid rounded mb-3"
                            style={{ maxHeight: "150px", maxWidth: "500px" }}
                            onError={() =>
                              setError("Failed to load the contour image.")
                            }
                          />
                          <h5>Optic Disc 1</h5>
                        </div>
                      )}
                    </Col>
                    <Col>
                      {contourImage2 && (
                        <div
                          onClick={() => handleImageClick(contourImage2)}
                          style={{ cursor: "pointer" }}
                        >
                          <img
                            src={`data:image/jpeg;base64,${contourImage2}`}
                            alt="Segmentation Contour 2"
                            className="img-fluid rounded mb-3"
                            style={{ maxHeight: "150px", maxWidth: "500px" }}
                            onError={() =>
                              setError("Failed to load the contour image.")
                            }
                          />
                          <h5>Soft Exudates</h5>
                        </div>
                      )}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Screening;
