// Certificate.js
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    flexDirection: 'column',
  },
  template: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10% 0',
    boxSizing: 'border-box',
  },
  title: {
    fontSize: 24,
    textDecoration: 'underline',

    textTransform: 'uppercase',
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '3px',

  },
  recipient: {
    fontSize: 16,
    fontFamily: 'Times new Roman'

  },
  description: {
    fontSize: 15,
    fontWeight: '600',

  },
  issuerTitle: {
    fontSize: 12,
    textDecoration: 'underline',
    textTransform: 'uppercase',

  },
  issuer: {
    fontSize: 20,
    textTransform: 'uppercase',

  },
  date: {
    fontSize: 12,
    fontWeight: '600',
  },
});

const Certificate = ({ recipient, course, date, issuer, templateSrc }) => (<>
  <Document>
    <Page size="A4" style={styles.page}>
      <View>
      <Image src={templateSrc} style={styles.template} />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>{course === '' ? 'Course Title' : course}</Text>
        <Text style={styles.subTitle}>This is presented to</Text>
        <Text style={styles.recipient}>{recipient === '' ? 'Recipient Name' : recipient}</Text>
        <Text style={styles.description}>For the active participation in the course and for giving efforts, ideas, and knowledge.</Text>
        <Text style={styles.issuerTitle}>Course Director</Text>
        <Text style={styles.issuer}>{issuer === '' ? 'Issuer Name' : issuer}</Text>
        <Text style={styles.date}>Date: {date === '' ? 'Date' : date}</Text>
      </View>
    </Page>
  </Document>
  </>
);


export default Certificate

