// Certificate.js
import React from 'react';
import { Page, Text, View, Document, Image } from '@react-pdf/renderer';
import algosdk from 'algosdk';
import '../constant/ALGOkey';
import MyAlgo from '@randlabs/myalgo-connect';
import { ALGOD_PORT, ALGOD_TESTNET_URL, ALGOkey } from '../constant/ALGOkey';
import {styles} from './CertStyles';
const algodClient = new algosdk.Algodv2(ALGOkey , ALGOD_TESTNET_URL, ALGOD_PORT);

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
 * Deploy the contract on Algorand network.
 * @param {Object} sender - Sender's account containing the address and secret key.
 * @param {Object} note - Note object to be added to the transaction.
 * @return {Promise<number>} The application of the deployed contract.
 */
export const deployContract = async (sender, Note, infoDate)=>{


    const params = await algodClient.getTransactionParams().do();
    let info = new TextEncoder().encode(Note);
    let date = new TextEncoder().encode(infoDate);

    let appArgs = [info,date];
    const txn = algosdk.makeApplicationCreateTxnFromObject({
        suggestedParams: {
            ...params,
        },
        from: sender.addr,
        numLocalByteSlices: 4,
        numGlobalByteSlices: 2,
        numLocalInts: 0,
        numGlobalInts: 2,
        approvalProgram: new Uint8Array(Buffer.from("AiABASI=", "base64")),
        clearProgram: new Uint8Array(Buffer.from("AiABASI=", "base64")),
        onComplete: 0,
        appArgs: appArgs,
        note: algosdk.encodeObj(Note), // Add the note with course information
    });

    // Sign the transaction
    const signedTxn = txn.signTxn(sender.sk);

    const tx = await algodClient.sendRawTransaction(signedTxn).do();
    console.log('Transaction ID:', tx.txId);

    const roundsTowait = 2;
    const confirmedTxn = await algosdk.waitForConfirmation(algodClient, tx.txId, roundsTowait);
    console.log(confirmedTxn);
    const appId = confirmedTxn['application-index'];
    console.log('App ID:', appId);

    return appId;
}

/**
 * Pay the smart contract by making an ApplicationCall transaction.
 *
 * @param {Object} recoveredAccount - The account that will pay for the transaction.
 * @param {Object} account - The account that will receive the payment.
 * @param {Object} appId - The application ID of the smart contract.
 * @throws Will throw an error if the transaction fails.
 */
export const paySmartContract = async (recoveredAccount, account, appId) => {
    console.log('Buying product...');
    console.log(account);
    console.log(appId['appId']);

    let params = await algodClient.getTransactionParams().do();
    params.fee = algosdk.ALGORAND_MIN_TX_FEE;
    params.flatFee = true;

    // Create ApplicationCallTxn
    let appCallTxn = algosdk.makeApplicationCallTxnFromObject({
      from: recoveredAccount.addr,
      appIndex: Number(appId['appId']),
      onComplete: algosdk.OnApplicationComplete.NoOpOC,
      suggestedParams: params,
    });
    const signedTxn = algosdk.signTransaction(appCallTxn, recoveredAccount.sk);
    const sendTx = await algodClient.sendRawTransaction(signedTxn.blob).do();
    console.log('Transaction', signedTxn);
    console.log('Transaction : ' + sendTx.txId);

    // Wait for confirmation
    const confirmedTxn = await algosdk.waitForConfirmation(
      algodClient,
      sendTx.txId,
      4
    );

    // Notify about completion
    console.log(
      'Transaction ' +
        sendTx.txId +
        ' confirmed in round ' +
        confirmedTxn['confirmed-round']
    );
  };

  /**
  * Delete an Algorand application using ApplicationDelete transaction.
 *
 * @param {string} defaultAccountAddress - The address of the account performing the deletion.
 * @param {string} adminAddress - The address of the admin account.
 * @param {number} appIndex - The application ID of the smart contract to delete.
 * @throws Will throw an error if the transaction fails.
 */
export const deleteProductAction = async (defaultAccountAddress, adminAddress, appIndex) => {
    console.log('Deleting application...');
    console.log('App Index: ', appIndex);
    console.log('Admin Address: ', adminAddress);
    console.log('Default Account Address: ', defaultAccountAddress);
  
    let params = await algodClient.getTransactionParams().do();
    params.fee = algosdk.ALGORAND_MIN_TX_FEE;
    params.flatFee = true;
  
    // Create ApplicationDeleteTxn
    let deleteTxn = algosdk.makeApplicationDeleteTxnFromObject({
      from: defaultAccountAddress,
      suggestedParams: params,
      appIndex: Number(appIndex),
    });
  
    // Sign the transaction
    const myAlgoConnect = new MyAlgo();
    const signedDeleteTxn = await myAlgoConnect.signTransaction(deleteTxn.toByte());
  
    // Send the transaction
    const signedTxns = [signedDeleteTxn.blob];
    const tx = await algodClient.sendRawTransaction(signedTxns).do();

  
    // Get the transaction ID
    let txId = deleteTxn.txID().toString();
  
    // Wait for transaction to be confirmed
    const confirmedTxn = await algosdk.waitForConfirmation(algodClient, txId, 4);
  
    // Get the completed Transaction
    console.log('Transaction ' + txId + ' confirmed in round ' + confirmedTxn['confirmed-round']);
  
    // Get application id of deleted application and notify about completion
    let transactionResponse = await algodClient.pendingTransactionInformation(txId).do();
    let appId = transactionResponse['txn']['txn'].apid;
    console.log('Deleted app-id: ', appId);
  };
  
  // UPDATE CERTIFICATE: ApplicationUpdateTxn
export const updateCertificateAction = async (senderAddress, appId, newCertificateInfo) => {

  console.log("Updating certificate...");
  console.log("App ID: ", appId);
  console.log("Sender Address: ", senderAddress);
  console.log("New Certificate Info: ", newCertificateInfo);

  let params = await algodClient.getTransactionParams().do();
  params.fee = algosdk.ALGORAND_MIN_TX_FEE;
  params.flatFee = true;

  // Build required app args as Uint8Array
  let updateArg = new TextEncoder().encode("update");
  let newCertificateInfoArg = new TextEncoder().encode(newCertificateInfo);
  let appArgs = [updateArg, newCertificateInfoArg];

  // Create ApplicationUpdateTxn
  let txn = algosdk.makeApplicationUpdateTxnFromObject({
    approvalProgram: new Uint8Array(Buffer.from("AiABASI=", "base64")),
    clearProgram: new Uint8Array(Buffer.from("AiABASI=", "base64")),
    from: senderAddress,
    appIndex: Number(appId),
    suggestedParams: params,
    appArgs: appArgs,
    note: new Uint8Array(Buffer.from("Update certificate"))
  });

  // Get transaction ID
  let txId = txn.txID().toString();

  // Sign & submit the transaction
  const myAlgoConnect = new MyAlgo();
  let signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
  console.log("Signed transaction with txID: %s", txId);
  await algodClient.sendRawTransaction(signedTxn.blob).do();

  // Wait for transaction to be confirmed
  const confirmedTxn = await algosdk.waitForConfirmation(algodClient, txId, 4);

  // Get the completed Transaction
  console.log("Transaction " + txId + " confirmed in round " + confirmedTxn["confirmed-round"]);

  // Notify about completion
  console.log("Updated certificate with app-id: ", appId);
};


