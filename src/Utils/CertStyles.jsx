import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
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
    qrCode: {
        position: 'absolute',
        top: 30,
        right: 30,
        width: 100,
        height: 100,
      },
  });