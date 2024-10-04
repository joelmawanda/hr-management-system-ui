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

const StaffRegistration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [otherNames, setOtherName] = useState("");
  const [date, setDate] = useState("");
  const [photo, setPhoto] = useState("");

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

  const registerStaff = async (event) => {
    event.preventDefault();
    let data = { username, otherNames, date, photo };
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
        navigate("", { replace: true });
      }
    } catch (error) {
      dispatch(setAlertMessage(error.response.data.message));
      dispatch(setAlertTitle("Error"));
      dispatch(openAlert());
      navigate("", { replace: true });
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
            <Card className="login_card">
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
                          type="date" // Set the input type to "date"
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
                        <Form.Control
                          id="b_boarder_input"
                          placeholder="ID Photo"
                          onChange={(e) => setPhoto(e.target.value)}
                        ></Form.Control>
                      </Col>
                    </Row>
                  </Form.Group>
                  {/* <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Row>
                      <Col
                        id="input_icon"
                        sm={2}
                        md={2}
                        lg={2}
                        style={{ marginTop: "15px" }}
                      >
                        <Icon
                          path={mdiLock}
                          title="User Profile"
                          size={1}
                          horizontal
                          color="grey"
                        />
                      </Col>
                      <Col
                        sm={10}
                        md={10}
                        lg={10}
                        style={{ marginTop: "15px" }}
                      >
                        <Form.Control
                          id="b_boarder_input"
                          type="password"
                          placeholder="Password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </Col>
                    </Row>
                  </Form.Group> */}
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
