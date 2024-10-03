import {
  Box,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Typography
} from "@mui/material";
import React from "react";

const ShareholderCard = ({ icon, shareholderCount, name }) => {
  return (
    <Card sx={{ marginTop: "20px" }}>
      <CardContent>
        <Box>
          <Tooltip title="View ticket details">
            <IconButton>{icon}</IconButton>
          </Tooltip>
        </Box>
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
      </CardContent>
    </Card>
  );
};

export default ShareholderCard;
