import React, { ComponentProps } from "react";
import { useParams } from "react-router-dom";
import { Formik, Form, useField } from "formik";
import { Box, Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";

import { selectClaimedListingById } from "../redux/listings";
import { Submission } from "../lib/applicationTypes";
import { requestExtension } from "../lib/api";
import { useNavigate } from "react-router-dom";
import { addSubmission } from '../redux/submissions'; 
import { useAppSelector, useAppDispatch } from "../lib/useAppSelector";


type AppFieldProps = {
  label: string;
  name: string;
  // This line allows you to pass any styling options to the MaterialUI text
  // field that are allowed by TextField.
  sx?: ComponentProps<typeof TextField>["sx"];
}

// AppField is mostly a simple wrapper around MaterialUI's TextField, but
// hooks into Formik. Just saves us allot of typing.
const AppField: React.FC<AppFieldProps> = ({
  label,
  name,
  sx,
}) => {
  const [field] = useField(name);
  const value = field.value || "";

  return (
    <TextField
      fullWidth
      variant="outlined"
      id={name}
      label={label}
      sx={sx}
      {...field}
    />
  );
};

export default function Listing() {
  const { id = null } = useParams();
  const listing = useAppSelector((state) => selectClaimedListingById(state, id))
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const dispatch = useAppDispatch(); // Initialize the useAppDispatch hook



  if (!listing) {
    return (
      <Box>Listing was not found!</Box>
    );
  }

  const initialValues: Submission = {
    listing,
  };

  // Submission Object, API needs a Submission Object to populate the response from the server
  let updatedValues: Submission;

  // API call fires on the 'Submit' button click
  const handleFormSubmit = (values: Submission) => {
    updatedValues = {
      listing: {
        ...values.listing,
        },
        reason: values.reason || "",
      };
      handleExtensionClick(updatedValues) 
    };
  

  // API call to requestExtension
  const handleExtensionClick = async (updatedValues: Submission) => {
    try {
      if (!updatedValues.reason) {
        alert("Reason for filing is required"); // Alert the user if the reason field is empty
        return;
      }
      const response = await requestExtension(updatedValues); // Takes the new values written by the User and POSTS those to the API endpoint
      console.log('Extension request submitted:', response);
      dispatch(addSubmission(response)); // Adds the recent submission to the submission slice in the redux file
      navigate("/submissions"); // Navigates the user to the Submission page after the 'Submit' button is clicked
    } catch (error) {
      console.error('Error submitting extension request:', error);
    }
  };


  return (
    <Container sx={{ mt: 2 }}>
      <Paper sx={{ p: 5, mt: 2 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Request An Extension For {listing.name}
        </Typography>

        <Formik
          initialValues={{
            listing,
            reason: ""
          }}
          onSubmit={handleFormSubmit}
        >
          <Form>
            <AppField label="Name" name="listing.name" />

            <Box sx={{ mt: 3 }}>
              <Typography variant="h6">
                Mailing Address
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <AppField
                    label="Address 1"
                    name="listing.mailingAddress.address1"/>
                </Grid>
                <Grid item xs={3}>
                  <AppField
                    label="Address 2"
                    name="listing.mailingAddress.address2"
                  />
                </Grid>
                <Grid item xs={2}>
                  <AppField
                    label="City"
                    name="listing.mailingAddress.city"
                  />
                </Grid>
                <Grid item xs={2}>
                  <AppField
                    label="State"
                    name="listing.mailingAddress.state"
                  />
                </Grid>
                <Grid item xs={2}>
                  <AppField
                    label="Zip"
                    name="listing.mailingAddress.zip"
                  />
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ mt: 3 }}>
              <Typography variant="h6">
                Physical Address
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <AppField
                    label="Address 1"
                    name="listing.physicalAddress.address1"
                  />
                </Grid>
                <Grid item xs={3}>
                  <AppField
                    label="Address 2"
                    name="listing.physicalAddress.address2"
                  />
                </Grid>
                <Grid item xs={2}>
                  <AppField
                    label="City"
                    name="listing.physicalAddress.city"
                  />
                </Grid>
                <Grid item xs={2}>
                  <AppField
                    label="State"
                    name="listing.physicalAddress.state"
                  />
                </Grid>
                <Grid item xs={2}>
                  <AppField
                    label="Zip"
                    name="listing.physicalAddress.zip"
                  />
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ mt: 3 }}>
              <Typography variant="h6">
                Reason for filing
              </Typography>
              <Grid item xs={2}>
                <AppField
                  label="Reason for filing extension"
                  name="reason"
                />
              </Grid>
              <br />
              <Button 
                variant="contained" 
                type="submit"
              >
                Submit Request
              </Button>
            </Box>
          </Form>
        </Formik>
      </Paper>
    </Container>
  );
}
