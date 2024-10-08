import { mdiAccount, mdiLock } from "@mdi/js";
import Icon from "@mdi/react";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AlertModal from "../components/alertModal";
import API from "../config/API";
import { openAlert, setAlertMessage, setAlertTitle } from "../store/alertSlice";
import "./LoginPage.css";
import { FormControl, InputLabel } from "@mui/material";

const StaffRegistration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [surname, setUsername] = useState("");
  const [otherNames, setOtherName] = useState("");
  const [dateOfBirth, setDate] = useState("");
  const [idPhoto, setPhoto] = useState("");

  const alert = useSelector((state) => state.alert);

  const [validationCode, setValidationCode] = useState("");

  useEffect(() => {
    const fetchValidationCode = async () => {
      try {
        const response = await API.get(`/api/staff/generateValidationCode`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });

        if (response.status === 200) {
          setValidationCode(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching validation code:", error);
      }
    };
    fetchValidationCode();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result.split(",")[1];
      setPhoto(base64String);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const registerStaff = async (event) => {
    event.preventDefault();
    let data = { surname, otherNames, dateOfBirth, idPhoto };
    let response;
    try {
      response = await API.put(
        `/api/staff/register?validationCode=${validationCode}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      if (response.status === 200) {
        dispatch(
          setAlertMessage(`Your Employee Number is: ${response.data.data}`)
        );
        dispatch(setAlertTitle("Success"));
        dispatch(openAlert());
      }
    } catch (error) {
      dispatch(setAlertMessage(error.response.data.message));
      dispatch(setAlertTitle("Error"));
      dispatch(openAlert());
    }
  };

  return (
    <div className="full_blue_bg">
      {/* <Container> */}
      <Row className="justify-content-md-center main_row">
        <Col sm={3} md={3} lg={4} style={{ paddingTop: "3%" }}></Col>
        <Col sm={6} md={6} lg={4} style={{ paddingTop: "3%" }}>
          {alert.open === true ? (
            <AlertModal
              sx={{ margin: "20px", width: "50%", align: "right" }}
            ></AlertModal>
          ) : (
            <></>
          )}
          <Row style={{ paddingTop: "10%" }}>
            <h3 className="primary-header">HR Management System</h3>
          </Row>
          <Row>
            {/* <Card className="login_card"> */}
            <Card className="">
              <Row>
                <Col sm={2} md={2} lg={2}></Col>
                <Col sm={8} md={8} lg={8}>
                  {/* <p>
                    {validationCode
                      ? `Your Validation Code is: ${validationCode}`
                      : "No validation code generated yet."}
                  </p> */}
                  <Card.Title id="card_title_custom">Staff Sign Up</Card.Title>
                </Col>
                <Col sm={2} md={2} lg={2}></Col>
              </Row>

              <Card.Body>
                <Form onSubmit={registerStaff}>
                  <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Row>
                      <Col id="input_icon" sm={2} md={2} lg={2}>
                        <Icon
                          path={mdiAccount}
                          title="User Profile"
                          size={1}
                          horizontal
                          color="grey"
                        />
                      </Col>
                      <Col sm={10} md={10} lg={10}>
                        <Form.Control
                          id="b_boarder_input"
                          placeholder="Surname"
                          onChange={(e) => setUsername(e.target.value)}
                        ></Form.Control>
                      </Col>
                    </Row>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Row>
                      <Col id="input_icon" sm={2} md={2} lg={2}>
                        <Icon
                          path={mdiAccount}
                          title="User Profile"
                          size={1}
                          horizontal
                          color="grey"
                        />
                      </Col>
                      <Col sm={10} md={10} lg={10}>
                        <Form.Control
                          id="b_boarder_input"
                          placeholder="Other Names"
                          onChange={(e) => setOtherName(e.target.value)}
                        ></Form.Control>
                      </Col>
                    </Row>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="Date">
                    <Row>
                      <Col id="input_icon" sm={2} md={2} lg={2}>
                        <Icon
                          path={mdiAccount}
                          title="User Profile"
                          size={1}
                          horizontal
                          color="grey"
                        />
                      </Col>
                      <Col sm={10} md={10} lg={10}>
                        <Form.Control
                          id="b_boarder_input"
                          placeholder="Date of Birth"
                          type="date"
                          onChange={(e) => setDate(e.target.value)}
                        ></Form.Control>
                      </Col>
                    </Row>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Row>
                      <Col id="input_icon" sm={2} md={2} lg={2}>
                        <Icon
                          path={mdiAccount}
                          title="User Profile"
                          size={1}
                          horizontal
                          color="grey"
                        />
                      </Col>
                      <Col sm={10} md={10} lg={10}>
                        <FormControl fullWidth margin="normal">
                          <InputLabel shrink htmlFor="id-photo-input">
                            ID Photo
                          </InputLabel>
                          <input
                            accept="image/*"
                            type="file"
                            id="id-photo-input"
                            onChange={handleImageChange}
                            style={{ marginTop: "8px" }}
                          />
                        </FormControl>
                      </Col>
                    </Row>
                  </Form.Group>

                  <Row style={{ marginTop: "1%" }}>
                    <Col sm={12} md={2} lg={2}></Col>
                    <Col sm={12} md={10} lg={10}>
                      <Button
                        id="login_btn"
                        className="login_btn"
                        type="submit"
                      >
                        Login
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Row>
        </Col>
        <Col sm={3} md={3} lg={4} style={{ paddingTop: "3%" }}></Col>
      </Row>
    </div>
  );
};

export default StaffRegistration;
