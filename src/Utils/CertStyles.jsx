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
      fontFamily : 'Helvetica-Bold',
      //fontWeight: 'bold',
    },
    title: {
      
      position: 'absolute',
  
      top: 480,
      fontSize: 16,
      textTransform: 'uppercase',
    },
    recipient: {

      fontSize: 20,
  
    },
    appId: {
      fontSize: 12,
      position: 'absolute',
      top : 60,
      right: 85,
    },
    description: {
      fontSize: 15,
      fontWeight: '600',
  
    },
    mykad: {
      fontSize: 14,
      textTransform: 'uppercase',
  
    },
    date: {
      position: 'absolute',
      fontSize: 12,
      top: 570,
    },
    qrCode: {
        position: 'absolute',
        top: 70,
        right: 75,
        width: 80,
        height: 80,
      },
  });