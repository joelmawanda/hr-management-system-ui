import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Modal,
  Button,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { Visibility } from "@mui/icons-material";
import API from "../config/API";

const StaffTable = () => {
  const token = localStorage.getItem("token");
  const [staffData, setStaffData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  console.log("The token: ", token);

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await API.get("/api/staff/retrieve", {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        });
        setStaffData(response.data.data);
      } catch (error) {
        console.error("Error fetching staff data:", error);
      }
    };

    fetchStaffData();
  }, []);

  const handleOpenModal = (staff) => {
    setSelectedStaff(staff);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedStaff(null);
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(`/api/staff/update`, selectedStaff, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const response = await axios.get("/api/staff/retrieve");
      setStaffData(response.data);
      handleCloseModal();
    } catch (error) {
      console.error("Error updating staff data:", error);
    }
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Surname</TableCell>
              <TableCell>Other Names</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staffData.map((staff) => (
              <TableRow key={staff.id}>
                <TableCell>{staff.surname}</TableCell>
                <TableCell>{staff.otherNames}</TableCell>
                <TableCell>{staff.dateOfBirth}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenModal(staff)}>
                    <Visibility />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Editing Staff Data */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <div
          style={{
            padding: "20px",
            backgroundColor: "white",
            margin: "100px auto",
            maxWidth: "400px",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h6">Edit Staff</Typography>
          <TextField
            label="Surname"
            value={selectedStaff?.surname || ""}
            onChange={(e) =>
              setSelectedStaff({ ...selectedStaff, surname: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Other Names"
            value={selectedStaff?.otherNames || ""}
            onChange={(e) =>
              setSelectedStaff({ ...selectedStaff, otherNames: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Date of Birth"
            type="date"
            value={selectedStaff?.dateOfBirth || ""}
            onChange={(e) =>
              setSelectedStaff({
                ...selectedStaff,
                dateOfBirth: e.target.value,
              })
            }
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveChanges}
          >
            Save Changes
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default StaffTable;
