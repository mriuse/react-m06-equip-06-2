import { Container, Row, Col, Button, ModalDialog, ModalHeader, ModalBody} from 'react-bootstrap';
import React, { useState, useContext, useEffect} from 'react'
import { RiTwitterLine, RiFacebookCircleLine, RiGithubLine, RiLinkedinLine } from "react-icons/ri";

import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';

import { RMap, ROSM, RLayerVector, RFeature, RPopup } from "rlayers";
import { RStyle, RIcon} from "rlayers/style";
import { fromLonLat } from "ol/proj";
import { Point } from "ol/geom";
import "ol/ol.css";

export default function App() {
  var [mapRefresh, setMapRefresh] = useState(false)
  const [map, setMap] = useState({
    center : fromLonLat([1.72833, 41.23112]),
    zoom : 18
  })
  
  const [point, setPoint] = useState();
  
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  var listener = new window.keypress.Listener();

  const locationIcon = "https://static.vecteezy.com/system/resources/thumbnails/010/150/282/small/pin-location-icon-sign-symbol-design-free-png.png"
  
  // Es pot fer un watchPosition sense totes les opcions, realment l'unica necessària és la callback, però és molt imprecís i m'enviava a Màlaga.
  // Pd: Sembla que el navegador afecta, Edge m'encerta millor la posició que Chrome
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  } 
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  function coordenades(position){
    setLatitude(position.coords.latitude)
    setLongitude(position.coords.longitude)
    setPoint(new Point(fromLonLat([position.coords.longitude,position.coords.latitude])))
  } 

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(coordenades, error, options);
    } 
  }
  
  useEffect(() => {
    getLocation();
    console.log(latitude, longitude)
 },[])

//Listener i lògica del modal de coordenades
const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
listener.simple_combo("ctrl alt g",function(){
  handleShow()
})

//Listener i lògica de centrar el mapa
  listener.simple_combo("ctrl alt c", function(){
      setMapRefresh(false)
  })
    
  return (
    <>

       <Modal show={show} onHide={handleClose}>
          <ModalHeader closeButton>
            Coordenades actuals
          </ModalHeader> 
          <ModalBody>
            {latitude}, {longitude}
          </ModalBody>
       </Modal>


      <div className="section-dark">
        <Container className="d-flex justify-content-center align-items-center">
          <Row>
            <Col className="d-flex flex-column align-items-center">
              <h1 className='mb-0'>Contacta'ns</h1>
              <p className='mb-5'>Envia'ns el teu missatge</p>
              {/* A la accesKey he utilitzat la G en comptes de la F perque el navegador té un bind al Alt+F (Windows+Chrome)
                  Pd: He provat amb Edge i també te un bind al Alt+F
              */}
              <Button variant="outline-primary" size="lg" accessKey='g'>Formulari de contacte</Button>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="section-light">
        <Container className="d-flex justify-content-center align-items-center h-100">
            <Col className="d-flex flex-column align-items-center">
              <h1 className='mb-0'>Vols visitar-nos?</h1>
              <p className='mb-5'>Ubica'ns al mapa</p>
              {!mapRefresh ? setMapRefresh(true) : 
                <RMap width={"100%"} height={"70vh"} initial={map}>
                  <ROSM />
                  <RLayerVector zIndex={10}>
                    <RFeature geometry={new Point(map.center)}>
                      <RStyle>
                        <RIcon src={locationIcon} anchor={[0.5, 0.9]} />
                      </RStyle>
                    </RFeature>
                    {!point ? (null) : 
                    <RFeature geometry={point}>
                      <RStyle>
                        <RIcon src={locationIcon} anchor={[0.5, 0.9]} />
                      </RStyle>
                      <RPopup trigger={"hover"} className="example-overlay">
                        <Card>
                          <Card.Body className="map-popup">
                            <Card.Title className='text-white'>Vostè està aquí</Card.Title>
                          </Card.Body>
                        </Card>
                      </RPopup>
                    </RFeature>
                    } 
                  </RLayerVector>
                </RMap>
              }
            </Col>
        </Container>
      </div>

      <div className="section-links">
        <Container className="d-flex justify-content-center align-items-center h-100">
          <Row className="d-flex flex-column align-items-center text-center">
            <Col className="w-100">
              <h3>Segueix-nos a les nostres xarxes!</h3>
            </Col>
            <Col className="w-100 justify-content-between">
              <Button variant="link" size="lg">
                <RiTwitterLine className='link-custom'/>
              </Button>
              <Button variant="link" size="lg">
                <RiFacebookCircleLine className='link-custom'/>
              </Button>
              <Button variant="link" size="lg">
                <RiGithubLine className='link-custom'/>
              </Button>
              <Button variant="link" size="lg">
                <RiLinkedinLine className='link-custom'/>
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}