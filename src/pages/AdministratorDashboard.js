import ApartmentIcon from "@mui/icons-material/Apartment";
import GroupsIcon from "@mui/icons-material/Groups";
import PeopleIcon from "@mui/icons-material/People";
import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import ShareholderCard from "../components/AdministratorDashboard/ShareholderCard";
import MenuAppBar from "../components/navigation/AppBar";
import API from "../config/API";

const AdministratorDashboard = () => {
  const token = localStorage.getItem("token");

  const [numRequests, setNumRequests] = useState(0);
  const [numFailedValidations, setNumFailedValidations] = useState(0);
  const [numPositiveRequests, setNumPositiveRequests] = useState(0);
  const [numNegativeRequests, setNumNegativeRequests] = useState(0);

  useEffect(() => {
    getMetrics();
  }, []);

  const getMetrics = async () => {
    let response;
    try {
      response = await API.get(`/actuator/metrics/http.server.requests`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const data = response.data;

        // Initialize counts
        let successCount = 0;
        let clientErrorCount = 0;
        let exceptionCount = 0;

        // Loop through available tags to process metrics
        data.availableTags.forEach((tag) => {
          switch (tag.tag) {
            case "outcome":
              tag.values.forEach((outcome) => {
                if (outcome === "SUCCESS") {
                  successCount += 1; // Count successful requests
                } else if (outcome === "CLIENT_ERROR") {
                  clientErrorCount += 1; // Count client errors
                }
              });
              break;

            case "exception":
            case "error":
              tag.values.forEach((value) => {
                if (value !== "none") {
                  exceptionCount += 1; // Count requests with exceptions/errors
                }
              });
              break;

            default:
              break;
          }
        });

        // Set the state for positive (successful) and negative (failed) requests
        setNumPositiveRequests(successCount);
        setNumNegativeRequests(clientErrorCount);

        // Summing the number of positive and negative requests
        const total = successCount + clientErrorCount;

        // Set the total number of requests as the sum of positive and negative requests
        setNumRequests(total);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <MenuAppBar />
      <Grid
        container
        spacing={2}
        sx={{ marginLeft: "5px", marginRight: "10px", marginTop: "20px" }}
      >
        <Grid item md={3}>
          <ShareholderCard
            icon={<GroupsIcon fontSize="large" sx={{ color: "#01422A" }} />}
            shareholderCount={numRequests}
            name={"Number of Requests"}
          />
        </Grid>
        {/* <Grid item md={3}>
          <ShareholderCard
            icon={<PeopleIcon fontSize="large" sx={{ color: "#FF9E0C" }} />}
            shareholderCount={numFailedValidations}
            name={"Number of failed validations"}
          />
        </Grid> */}
        <Grid item md={3}>
          <ShareholderCard
            icon={<ApartmentIcon fontSize="large" sx={{ color: "#10C682" }} />}
            shareholderCount={numPositiveRequests}
            name={"Number of Successful Requests"}
          />
        </Grid>
        <Grid item md={3}>
          <ShareholderCard
            icon={<GroupsIcon fontSize="large" sx={{ color: "#D37B13" }} />}
            shareholderCount={numNegativeRequests}
            name={"Number of Failed Requests"}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdministratorDashboard;
