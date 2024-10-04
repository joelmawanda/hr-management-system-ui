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
  FormControl,
  InputLabel,
  Box,
  Grid,
} from "@mui/material";
import { Visibility } from "@mui/icons-material";
import API from "../config/API";
import { useDispatch, useSelector } from "react-redux";

import { openAlert, setAlertMessage, setAlertTitle } from "../store/alertSlice";
import AlertModal from "../components/alertModal";
import MenuAppBar from "../components/navigation/AppBar";

const StaffTable = () => {
  const dispatch = useDispatch();

  const alert = useSelector((state) => state.alert);
  const token = localStorage.getItem("token");
  const [staffData, setStaffData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

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
        const filteredData = response.data.data.filter(
          (staff) => staff.surname !== null
        );

        setStaffData(filteredData);
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result.split(",")[1];
      setSelectedStaff({ ...selectedStaff, idPhoto: base64String });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const employeeNumber = selectedStaff.employeeNumber;

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const updateResponse = await API.put(
        `/api/staff/update?employeeNumber=${employeeNumber}`,
        selectedStaff,
        { headers }
      );

      if (updateResponse.status === 200) {
        dispatch(
          setAlertMessage(
            updateResponse.data.message || "Staff updated successfully."
          )
        );
        dispatch(setAlertTitle("Success"));
        dispatch(openAlert());

        const staffResponse = await API.get(`/api/staff/retrieve`, { headers });
        const filteredUpadatedData = staffResponse.data.data.filter(
          (staff) => staff.surname !== null
        );

        setStaffData(filteredUpadatedData);

        handleCloseModal();
      }
    } catch (error) {
      console.error("Error updating staff data:", error);

      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while updating the staff data.";

      dispatch(setAlertMessage(errorMessage));
      dispatch(setAlertTitle("Error"));
      dispatch(openAlert());

      handleCloseModal();
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
        <Grid item md={2}></Grid>
        <Grid item md={8}>
          <TableContainer component={Paper}>
            {alert.open === true ? (
              <AlertModal
                sx={{ margin: "20px", width: "50%", align: "right" }}
              ></AlertModal>
            ) : (
              <></>
            )}
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Surname</TableCell>
                  <TableCell>Other Names</TableCell>
                  <TableCell>Date of Birth</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {staffData.map((staff) => (
                  <TableRow key={staff.id}>
                    <TableCell>
                      {staff.idPhoto ? (
                        <img
                          src={`data:image/jpeg;base64,${staff.idPhoto}`}
                          alt="Staff ID"
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "4px",
                          }}
                        />
                      ) : (
                        <span>No Image</span>
                      )}
                    </TableCell>
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
              {selectedStaff?.idPhoto && (
                <img
                  src={`data:image/jpeg;base64,${selectedStaff.idPhoto}`}
                  alt="Selected Staff ID"
                  style={{ width: "100px", height: "100px", marginTop: "10px" }}
                />
              )}

              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveChanges}
              >
                Save Changes
              </Button>
            </div>
          </Modal>
        </Grid>
        <Grid item md={2}></Grid>
      </Grid>
    </Box>
  );
};

export default StaffTable;
