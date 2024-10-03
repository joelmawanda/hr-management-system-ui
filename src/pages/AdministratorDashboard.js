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
      response = await API.get(
        `/admin/metrics/http.server.requests?tag=method:GET&tag=uri:/api/v1/loans/status`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const data = response.data;
        //Loop through the available tags to update the metrics
        data.availableTags.forEach((tag) => {
          switch (tag.tag) {
            case "outcome":
              tag.values.forEach((outcome) => {
                switch (outcome) {
                  case "SUCCESS":
                    setNumPositiveRequests(numPositiveRequests + 1);
                    break;
                  case "CLIENT_ERROR":
                    setNumNegativeRequests(numNegativeRequests + 1);

                    break;
                  default:
                    break;
                }
              });

              break;
            case "exception":
            case "error":
              tag.values.forEach((value) => {
                if (value !== "none") {
                  setNumFailedValidations(numFailedValidations + 1);
                }
              });
              break;
            default:
              break;
          }
        });

        // Update the number of requests
        setNumRequests(data.measurements[0].value);
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
        <Grid item md={3}>
          <ShareholderCard
            icon={<PeopleIcon fontSize="large" sx={{ color: "#FF9E0C" }} />}
            shareholderCount={numFailedValidations}
            name={"Number of failed validations"}
          />
        </Grid>
        <Grid item md={3}>
          <ShareholderCard
            icon={<ApartmentIcon fontSize="large" sx={{ color: "#10C682" }} />}
            shareholderCount={numPositiveRequests}
            name={"Number of Positive Requests"}
          />
        </Grid>
        <Grid item md={3}>
          <ShareholderCard
            icon={<GroupsIcon fontSize="large" sx={{ color: "#D37B13" }} />}
            shareholderCount={numNegativeRequests}
            name={"Number of Negative Requests"}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdministratorDashboard;
