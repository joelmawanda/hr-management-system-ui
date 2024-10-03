import { Card, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import React from "react";

const TicketsCard = ({ name, shareholderCount, chip }) => {
  return (
    <Card sx={{ marginTop: "20px" }}>
      <CardContent>
        <Typography
          sx={{
            fontStyle: "normal",
            fontWeight: "500",
            fontSize: "16px",
            color: " #2D3131",
          }}
        >
          {name}
        </Typography>
        <Grid container spacing={2}>
          <Grid item md={6}>
            {" "}
            <Typography
              sx={{
                fontStyle: "normal",
                fontWeight: "700",
                fontSize: "30px",
                color: " #0A2240",
              }}
            >
              {shareholderCount}
            </Typography>
          </Grid>
          <Grid item md={6}>
            {chip}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TicketsCard;
