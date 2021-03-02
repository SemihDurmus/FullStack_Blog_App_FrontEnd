import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Navbar from "../components/navbar/Navbar";
import ChangePassword from "../components/changePassword/ChangePassword";
import ChangeCredentials from "../components/changeCredentials/ChangeCredentials";
import DeleteAccount from "../components/deleteAccount/DeleteAccount";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import Grid from "@material-ui/core/Grid";
import EditIcon from "@material-ui/icons/Edit";
import PersonIcon from "@material-ui/icons/Person";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const useStyles = makeStyles({
  table: {
    width: "100%",
    backgroundColor: "#ffd384",
  },
});

//-----INLINE STYLES-----

const bodyStyle = {
  width: "60%",
  maxWidth: "600px",
  minWidth: "300px",
  display: "flex",
  flexDirection: "column",
  margin: "auto",
};
const header = {
  width: "100%",
  fontSize: "1.8rem",
  color: "#361E39",
  textAlign: "center",
  margin: "2rem auto",
  fontWeight: "bold",
};

const cellStyle = {
  fontWeight: "bold",
};

const buttonStyle = {
  cursor: "pointer",
  textAlign: "center",
  backgroundColor: "#709fb0",
  color: "#fff",
  fontWeight: "bold",
  border: "none",
  outline: "none",
  fontSize: "11px",
  padding: "8px",
  width: "100px",
  borderRadius: "12px",
  boxShadow: " 3px 3px 3px #837777",
};
//-----------MAIN FUNC-----------------
function AccountPage() {
  const classes = useStyles();
  let history = useHistory();
  const [userData, setUserData] = useState([]);

  //----------Modal------------------------
  const [openPassword, setOpenPassword] = useState(false);
  const [openCredentials, setOpenCredentials] = useState(false);
  const [openDeleteAccount, setOpenDeleteAccount] = useState(false);

  //----------Fetch User Data------------
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.get(
        `https://fs-blog-backend.herokuapp.com/user/edit/`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: token ? "Token " + token : null,
          },
        }
      );
      setUserData(result.data);
      console.log(result.data);
    } catch ({ response }) {
      if (response) {
        console.log("No data");
      } else {
        console.log("Something went wrong!");
      }
    }
  };

  const refreshData = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        <Navbar />
        <div style={header}>
          <p>Account Settings</p>
        </div>

        <div style={bodyStyle}>
          <TableContainer component={Paper} style={{ marginBottom: "1rem" }}>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                <TableRow style={{ color: "#fff" }}>
                  <TableCell component="th" scope="row">
                    <p style={cellStyle}>Username</p>
                  </TableCell>
                  <TableCell align="right">{userData?.username}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <p style={cellStyle}>Email</p>
                  </TableCell>
                  <TableCell align="right">{userData?.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <p style={cellStyle}>Member Since</p>
                  </TableCell>
                  <TableCell align="right">
                    {moment(userData?.date_joined).format("MMMM Do YYYY, h:mm")}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <p style={cellStyle}>Last Login</p>
                  </TableCell>
                  <TableCell align="right">
                    {moment(userData?.last_login).format("MMMM Do YYYY, h:mm")}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Grid container justify="center">
            <ChangePassword
              openPassword={openPassword}
              setOpenPassword={setOpenPassword}
            />
          </Grid>
          <Grid container justify="center">
            <ChangeCredentials
              open={openCredentials}
              setOpen={setOpenCredentials}
              user={userData}
              refresh={refreshData}
            />
          </Grid>
          <Grid container justify="center">
            <DeleteAccount
              open={openDeleteAccount}
              setOpen={setOpenDeleteAccount}
            />
          </Grid>
          {/* ---------Buttons----------- */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "60%",
              maxWidth: "600px",
              minWidth: "300px",
              alignSelf: "center",
              margin: "1rem auto",
            }}
          >
            <button
              style={buttonStyle}
              title="Change Credentials"
              onClick={() => {
                setOpenCredentials(true);
              }}
            >
              <PersonIcon fontSize="small" />
              <br /> CHANGE CREDENTIALS
            </button>

            <button
              style={{
                ...buttonStyle,
                marginLeft: "10px",
                marginRight: "10px",
              }}
              title="Change Password"
              onClick={() => setOpenPassword(true)}
            >
              <EditIcon fontSize="small" />
              <br />
              CHANGE PASSWORD
            </button>

            <button
              style={{ ...buttonStyle, backgroundColor: "tomato" }}
              title="Delete Account"
              onClick={() => setOpenDeleteAccount(true)}
            >
              <DeleteIcon fontSize="small" />
              <br /> DELETE ACCOUNT
            </button>
          </div>
        </div>
        <Grid container xs={12} justify="center">
          <button
            style={{
              ...buttonStyle,
              backgroundColor: "#025955",
              padding: "0 14px",
              height: "2.5rem",
              lineHeight: "2.5rem",
              position: "relative",
              textAlign: "right",
              letterSpacing: "3px",
            }}
            onClick={() => history.goBack()}
          >
            <ArrowBackIosIcon
              style={{
                position: "absolute",
                left: "20%",
                top: "50%",
                transform: "translateY(-50%)",
              }}
              fontSize="small"
            />
            &nbsp; BACK
          </button>
        </Grid>
      </div>
    </>
  );
}

export default AccountPage;
