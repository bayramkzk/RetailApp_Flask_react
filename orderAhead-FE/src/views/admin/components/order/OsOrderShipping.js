import React from 'react';
import {Button, TextField, Typography, Grid, Select} from '@mui/material'

const OsOrderShipping = () => {
  const handleLoadShippingAddress = e => {
    alert('handleLoadShippingAddress')
  }
  return (
    <>
      <Typography>Shipping</Typography>
      <Grid container spacing={2}>
        <Grid item xs="12"><Button onClick={handleLoadShippingAddress} size="small" variant="outlined">Load shipping address</Button></Grid>
        <Grid item xs="6"><TextField label="First name" fullWidth size="small"></TextField></Grid>
        <Grid item xs="6"><TextField label="Last name" fullWidth size="small"></TextField></Grid>
        <Grid item xs="12"><TextField label="Company" fullWidth size="small"></TextField></Grid>
        <Grid item xs="6"><TextField label="Address line 1" fullWidth size="small"></TextField></Grid>
        <Grid item xs="6"><TextField label="Address line 2" fullWidth size="small"></TextField></Grid>
        <Grid item xs="6"><TextField label="City" fullWidth size="small"></TextField></Grid>
        <Grid item xs="6"><TextField label="Postcode / ZIP" fullWidth size="small"></TextField></Grid>
        <Grid item xs="6"><TextField label="Country / Region" fullWidth size="small"></TextField></Grid>
        <Grid item xs="6"><TextField label="State / County" fullWidth size="small"></TextField></Grid>
        <Grid item xs="6"><TextField label="Phone" fullWidth size="small"></TextField></Grid>
      </Grid>
    </>
  );
};

export default OsOrderShipping;