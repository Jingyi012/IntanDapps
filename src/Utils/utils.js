import React from 'react';
import { Page, Text, View, Document, Image } from '@react-pdf/renderer';
import algosdk from 'algosdk';
import '../Constant/ALGOkey';
import { ALGOD_PORT, ALGOD_TESTNET_URL, ALGOkey,indexerClient,systemAccount } from '../Constant/ALGOkey';
import {styles} from './CertStyles';
import QrCode from "qrcode";


const QRCODE_OPTIONS = {
    errorCorrectionLevel: 'H',
    type: 'image/jpeg',
}

/**

Certificate component that renders the certificate on a PDF page.
@param {Object} props - Component properties.
@param {string} props.participantName - Name of the participant.
@param {string} props.participantMykad - Participant's MyKad number.
@param {string} props.courseName - Name of the course.
@param {string} props.courseDate - Date of the course completion.
@param {string} props.algorandExplorer - Algorand explorer URL.
@param {string} props.templateSrc - Certificate template source URL.
@param {string} props.qrCodeImage - QR code image URL.
@returns {JSX.Element} Certificate PDF page component.
*/
//use to design the certificate
export const Certificate = ({ participantName, participantMykad, courseName, courseDate, algorandExplorer, templateSrc, qrCodeImage }) => (
  <>
  <Document>
  <Page size="A4" style={styles.page}>
  <View>
  <Image src={templateSrc} style={styles.template} />
  </View>
  {qrCodeImage && <Image src={qrCodeImage} style={styles.qrCode} />}
  <View style={styles.container}>
  <Text style={styles.title}>{courseName === '' ? 'Course Title' : courseName}</Text>
  <Text style={styles.subTitle}>This is presented to</Text>
  <Text style={styles.recipient}>{participantName === '' ? 'Recipient Name' : participantName}</Text>
  <Text style={styles.description}>For the active participation in the course and for giving efforts, ideas, and knowledge.</Text>
  <Text style={styles.issuerTitle}>Course Director</Text>
  <Text style={styles.issuer}>{participantMykad === '' ? 'Issuer Name' : participantMykad}</Text>
  <Text style={styles.date}>Date: {courseDate === '' ? 'Date' : courseDate}</Text>
  </View>
  </Page>
  </Document>
  </>
  );


/**
 * Wait for the transaction to be confirmed on the Algorand network.
 * @param {Object} algodClient - An instance of the Algorand client to communicate with the network.
 * @param {string} txId - The transaction ID to wait for confirmation.
 * @return {Promise<Object>} The transaction information object after the transaction is confirmed.
 */

  //wait for confirmation for the particular transaction
export const waitForConfirmation = async (algodClient, txId) => {
    let response;
    while (true) {
        response = await algodClient.pendingTransactionInformation(txId).do();
        if (response['confirmed-round']) {
        console.log('Transaction confirmed in round', response['confirmed-round']);
        break;
        }
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 seconds before retrying
    }
    return response;
    };

/**

Deploy the contract on Algorand network.

@param {Object} sender - Sender's account containing the address and secret key.

@param {Array} arr - Array of contract arguments.

@return {Promise<number>} The application ID of the deployed contract.
*/
export const deployContract = async (sender, arr) => {

  //making a new instance for the Algosdk Algodv2 class, which is used to interact with the Algorand node API
    const algodClient = new algosdk.Algodv2(ALGOkey , ALGOD_TESTNET_URL, ALGOD_PORT);

    //setting the appArgs in the transaction later
    let appArgs =[];
    //param from the transaction is created here to ensure that transaction can be processed quickly by determining the first and last round
    //the first and last round must be determined appropriately without too narrow or too wide to prevent rejection or slow processing
    const params = await algodClient.getTransactionParams().do();
    console.log(params);
    //to encode it into Uint8Array
    for(let a of arr)appArgs.push(new TextEncoder().encode(JSON.stringify(a)));
    let note = new TextEncoder().encode(JSON.stringify("Intan Cert Creation By System"));

    //makeApplicationCreateTxnFromObject is a function from ALgorand to develop a new smart contract
    const txn = algosdk.makeApplicationCreateTxnFromObject({
        suggestedParams: {
            ...params,
        },
        from: sender.addr,
        genesis_id: 'testnet-v2.0',
        //globalStateSchema:globalStateSchema,
        approvalProgram: new Uint8Array(Buffer.from("AiABASI=", "base64")),
        clearProgram: new Uint8Array(Buffer.from("AiABASI=", "base64")),
        onComplete: 0,
        appArgs: appArgs,
        note: note, // Add the note with course information
    });
    console.log(txn);
    // Sign the transaction using secret key from sender
    const signedTxn = txn.signTxn(sender.sk);

    //send the signed transaction to the blockchain network for processing and inclusion in a block
    const tx = await algodClient.sendRawTransaction(signedTxn).do();
    console.log('Transaction ID:', tx.txId);

    //the block will still in pending due to no confirm it yet.
    console.log(algodClient.pendingTransactionInformation(tx.txId).do());

    const roundsTowait = 2;
    //wait the transaction be confirmed by the network.
    const confirmedTxn = await algosdk.waitForConfirmation(algodClient, tx.txId, roundsTowait);

    console.log(algodClient.getTransactionProof(tx.txId))
    const appId = confirmedTxn['application-index'];
    console.log('App ID:', appId);

    return appId;
}
/**

Pay for the contract after it has been generated by a particular admin

@param {Object} sender - The admin account object (contains public address and private key) responsible for paying the contract

@param {Number} appId - Application ID of the contract

@param {Array} arr - Array of contract arguments

@returns {String} - Transaction ID of the completed payment

@async

@function

@name payContract

*/
//add admin, action log, transaction id and date into the firestore

export const payContract = async (sender, appId, arr) => {

  // Initialize Algod client
  const algodClient = new algosdk.Algodv2(ALGOkey , ALGOD_TESTNET_URL, ALGOD_PORT);
  
  // Get transaction parameters
  const params = await algodClient.getTransactionParams().do();
  
  // Encode contract arguments as Uint8Array
  let appArgs =[];
  for(let a of arr)appArgs.push(new TextEncoder().encode(JSON.stringify(a)));

  // Create a default note for the transaction
  let note = new TextEncoder().encode(JSON.stringify("Admin " + sender.addr + " Create this cert"));
  
  // Create ApplicationCallTxn
  let appCallTxn = algosdk.makeApplicationCallTxnFromObject({
  from: sender.addr,
  appIndex: Number(appId),
  onComplete: algosdk.OnApplicationComplete.NoOpOC,
  suggestedParams: params,
  appArgs: appArgs,
  note: note
  });
  console.log(appCallTxn);
  // Sign the transaction
  const signedTxn = algosdk.signTransaction(appCallTxn, sender.sk);
  
  // Send the transaction
  const sendTx = await algodClient.sendRawTransaction(signedTxn.blob).do();
  
  // Wait for transaction confirmation
  const confirmedTxn = await algosdk.waitForConfirmation(algodClient, sendTx.txId, 4);
  
  // Log the transaction details
  console.log("Transaction : " + sendTx.txId);
  
  // Notify about completion
  console.log("Group transaction " + sendTx.txId);

   

  // Return the transaction ID
  return sendTx.txId;
  }

/**

Delete a product from the Algorand blockchain application

@param {Number} appIndex - Application ID to be deleted

@returns {Promise} - Resolves when the transaction is completed

@async

@function

@name deleteProductAction

*/
export const deleteProductAction = async (appIndex) => {
  // Log initial information
  console.log('Deleting application...');
  console.log('Default Account Address: ', systemAccount);
  
  // Initialize Algod client
  const algodClient = new algosdk.Algodv2(ALGOkey , ALGOD_TESTNET_URL, ALGOD_PORT);
  
  // Get transaction parameters
  let params = await algodClient.getTransactionParams().do();
  params.fee = algosdk.ALGORAND_MIN_TX_FEE;
  params.flatFee = true;
  
  // Create ApplicationDeleteTxn
  let deleteTxn = algosdk.makeApplicationDeleteTxnFromObject({
  from: systemAccount.addr,
  suggestedParams: params,
  appIndex: Number(appIndex),
  accounts: ['LBYHFLX4CPWPQOSQNNGHMJAIVOOB33UQAKN6DRB4I5DJGBIDBVYQYRGSK4']
  });
  console.log(algodClient.accountApplicationInformation(appIndex));

  // Sign the transaction
  const signedDeleteTxn = deleteTxn.signTxn(systemAccount.sk);
  
  // Send the transaction
  const tx = await algodClient.sendRawTransaction(signedDeleteTxn).do();

  // Wait for transaction to be confirmed
  const confirmedTxn = await algosdk.waitForConfirmation(algodClient, tx.txId, 4);
  
  // Log the completed transaction details
  console.log('Transaction ' + tx.txId + ' confirmed in round ' + confirmedTxn['confirmed-round']);
  
  // Get application id of deleted application and notify about completion
  let transactionResponse = await algodClient.pendingTransactionInformation(tx.txId).do();
  let appId = transactionResponse['txn']['txn'].apid;
  console.log('Deleted app-id: ', appId);

  return tx.txId;
  };
  

/**
  * Update certificate information
  * @param {Object} senderAcc - The account object that will be used to update the certificate (contains public address and private key)
  * @param {Number} appId - Application ID
  * @param {Array} arr - Array of certificate information
  * @returns {Number} - Transaction ID
  * @async
  * @function
  * @name updateCertificateAction
*/
export const updateCertificateAction = async (senderAcc, appId, arr) => {
  // Log initial information
  console.log("Updating certificate...");
  console.log("App ID: ", appId);
  console.log("Sender Address: ", senderAcc.addr);
  // Initialize Algod client
  const algodClient = new algosdk.Algodv2(ALGOkey , ALGOD_TESTNET_URL, ALGOD_PORT);
  
  // Get transaction parameters
  let params = await algodClient.getTransactionParams().do();
  params.fee = algosdk.ALGORAND_MIN_TX_FEE;
  params.flatFee = true;
  
  // Encode new certificate information as Uint8Array
  let appArgs = [];
  for(let a of arr) appArgs.push(new TextEncoder().encode(JSON.stringify(a)));
  
  // Create ApplicationUpdateTxn
  let txn = algosdk.makeApplicationUpdateTxnFromObject({
  approvalProgram: new Uint8Array(Buffer.from("AiABASI=", "base64")),
  clearProgram: new Uint8Array(Buffer.from("AiABASI=", "base64")),
  from: senderAcc.addr,
  appIndex: Number(appId),
  suggestedParams: params,
  appArgs: appArgs,
  note: new Uint8Array(Buffer.from("Update certificate"))
  });
  
  // Sign & submit the transaction
  const signedTxn = await txn.signTxn(senderAcc.sk);
  const tx = await algodClient.sendRawTransaction(signedTxn).do();
  
  // Log transaction ID
  console.log("Signed transaction with txID: %s", tx.txId);
  
  // Wait for transaction to be confirmed
  const confirmedTxn = await algosdk.waitForConfirmation(algodClient, tx.txId, 4);
  
  // Log the completed transaction details
  console.log("Transaction " + tx.txId + " confirmed in round " + confirmedTxn["confirmed-round"]);
  
  // Notify about completion
  console.log("Updated certificate with app-id: ", appId);
  return tx.txId;
  };

// Get a QR code in the form of Data URL, which can be set as <img>'s src attribute
export async function getQrCodeDataUrl(data) {
  return await QrCode.toDataURL(data, QRCODE_OPTIONS);
}

