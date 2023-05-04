import React, { useRef, useState } from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import {Certificate} from './utils';
import {
  TextField,
  Button,
  Grid,
  Container,
  Box,
  Typography,
} from '@mui/material';
import { CloudDownload as CloudDownloadIcon } from '@mui/icons-material';
import certificate from '../Certificate.png'

const Testing = () => {
  const [formData, setFormData] = useState({
    recipient: '',
    course: '',
    date: '',
    issuer: '',
  });
  const [preview, setPreview] = useState(false);

  const handleChange = (e) => {
    setPreview(true);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const templateSrc = certificate;

  const previewRef = useRef();

  const getPreview = () => {
    return (
      <div style={{ position: 'relative', border: '1px solid gray' }} ref={previewRef}>
  <img src={templateSrc} style={{ width: '100%' }}></img>
  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
      <h2 style={{ textTransform: 'uppercase', color: '#0e4573', textDecoration: 'underline', marginBottom: '1rem' }}>{formData.course === '' ? 'Course Title' : formData.course}</h2>
      <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#ff9800', textTransform: 'uppercase', letterSpacing: '3px' }}>This is presented to</h3>
      <h1 style={{ fontSize: '3rem', color: '#33d5ac' }}>{formData.recipient === '' ? 'Recipient Name' : formData.recipient}</h1>
      <p style={{ fontSize: '15px', fontWeight: '600', color: '#ff9800' }}>For the active participation in the course and for giving efforts, ideas, and knowledge.</p>
      <h2 style={{ fontSize: '12px', color: '#0e4573', textDecoration: 'underline', textTransform: 'uppercase' }}>Course Director</h2>
      <h1 style={{ fontSize: '20px', color: '#ff9800', textTransform: 'uppercase' }}>{formData.issuer === '' ? 'Issuer Name' : formData.issuer}</h1>
      <p style={{ fontSize: '12px', fontWeight: '600', color: '#0e4573' }}>Date: {formData.date === '' ? 'Date' : formData.date}</p>
    </div>
  </div>
</div>

    );
  };

  return (
    <Container>
      <Box mt={4} mb={4}>
        <Typography variant="h4" align="center">
          Certificate Generator
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            label="Recipient"
            name="recipient"
            value={formData.recipient}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            label="Course"
            name="course"
            value={formData.course}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            label="Date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            label="Issuer"
            name="issuer"
            value={formData.issuer}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <PDFDownloadLink
            document={<Certificate {...formData} templateSrc={templateSrc} />}
            fileName="certificate.pdf"
          >
            {({ loading }) => (
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                startIcon={<CloudDownloadIcon />}
                disabled={loading}
              >
                {loading ? 'Loading document...' : 'Download Certificate'}
              </Button>
            )}
          </PDFDownloadLink>
        </Grid>
      </Grid>
      {preview && (
            <Box mt={4}>
              <PDFViewer width="100%" height="600px">
                <Certificate {...formData} templateSrc={templateSrc} />
              </PDFViewer>
            </Box>
          )}

      <Box mt={4}>
        {getPreview()}
      </Box>
    </Container>
  );
};

export default Testing;
