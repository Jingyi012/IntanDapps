import React from 'react';
import { Page, Text, View, Document, Image } from '@react-pdf/renderer';
import algosdk from 'algosdk';
import '../Constant/ALGOkey';
import { ALGOD_PORT, ALGOD_TESTNET_URL, ALGOkey,systemAccount } from '../Constant/ALGOkey';
import {styles} from './CertStyles';

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

//the system deploy the contract
export const deployContract = async (sender,arr)=>{

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
//the particular admin will pay the contract after the contract was generated
export const payContract = async (sender,appId,arr)=>{

    const algodClient = new algosdk.Algodv2(ALGOkey , ALGOD_TESTNET_URL, ALGOD_PORT);
    const params = await algodClient.getTransactionParams().do();
    let appArgs =[];
    for(let a of arr)appArgs.push(new TextEncoder().encode(JSON.stringify(a)));
    //give note a default value called create
    let note = new TextEncoder().encode(JSON.stringify("Admin "+sender.addr+" Create this dapps"));
    console.log(appId);
    //makeApplicationCreateTxnFromObject is a function from ALgorand to call a previous contract and develop a new contract
    let appCallTxn = algosdk.makeApplicationCallTxnFromObject({
        from: sender.addr,
        appIndex: Number(appId),
        onComplete: algosdk.OnApplicationComplete.NoOpOC,//NoOpOc means will just simply call 
        suggestedParams: params,
        appArgs: appArgs,
        note: note
    });

    console.log(appCallTxn);
    const signedTxn = algosdk.signTransaction(appCallTxn, sender.sk);
    const sendTx = await algodClient.sendRawTransaction(signedTxn.blob).do();
    const confirmedTxn = await algosdk.waitForConfirmation(algodClient,sendTx.txId,4);
    console.log("Transaction : " + sendTx.txId);
    // Notify about completion
    console.log("Group transaction " +  sendTx.txId);
    return sendTx.txId;
}

export const deleteProductAction = async (appIndex) => {
    console.log('Deleting application...');
    console.log('Default Account Address: ', systemAccount);
    const algodClient = new algosdk.Algodv2(ALGOkey , ALGOD_TESTNET_URL, ALGOD_PORT);
    let params = await algodClient.getTransactionParams().do();
    params.fee = algosdk.ALGORAND_MIN_TX_FEE;
    params.flatFee = true;
  
    // Create ApplicationDeleteTxn by deleting the smart contract
    let deleteTxn = algosdk.makeApplicationDeleteTxnFromObject({
      //from: defaultAccountAddress,
      from: systemAccount.addr,
      suggestedParams: params,
      appIndex: Number(appIndex),
      accounts: ['LBYHFLX4CPWPQOSQNNGHMJAIVOOB33UQAKN6DRB4I5DJGBIDBVYQYRGSK4']
    });

    const signedDeleteTxn = await deleteTxn.signTxn(systemAccount.sk);
    const tx = await algodClient.sendRawTransaction(signedDeleteTxn).do();

    const confirmedTxn = await algosdk.waitForConfirmation(algodClient, tx.txId, 4);
  
    // Get the completed Transaction
    console.log('Transaction ' + tx.txId + ' confirmed in round ' + confirmedTxn['confirmed-round']);
  
    // Get application id of deleted application and notify about completion
    let transactionResponse = await algodClient.pendingTransactionInformation(tx.txId).do();
    let appId = transactionResponse['txn']['txn'].apid;
    console.log('Deleted app-id: ', appId);
  };
  
  // UPDATE CERTIFICATE: ApplicationUpdateTxn
export const updateCertificateAction = async (senderAcc, appId, arr) => {

  console.log("Updating certificate...");
  console.log("App ID: ", appId);
  console.log("Sender Address: ", senderAcc.addr);
  //console.log("New Certificate Info: ", newCertificateInfo);
  const algodClient = new algosdk.Algodv2(ALGOkey , ALGOD_TESTNET_URL, ALGOD_PORT);
  let params = await algodClient.getTransactionParams().do();
  params.fee = algosdk.ALGORAND_MIN_TX_FEE;
  params.flatFee = true;

  let appArgs =[];
  for(let a of arr)appArgs.push(new TextEncoder().encode(JSON.stringify(a)));

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


 const signedTxn = await txn.signTxn(senderAcc.sk);
    const tx = await algodClient.sendRawTransaction(signedTxn).do();

  console.log("Signed transaction with txID: %s", tx.txId);

  // Wait for transaction to be confirmed
  const confirmedTxn = await algosdk.waitForConfirmation(algodClient, tx.txId, 4);

  // Get the completed Transaction
  console.log("Transaction " + tx.txId + " confirmed in round " + confirmedTxn["confirmed-round"]);

  // Notify about completion
  console.log("Updated certificate with app-id: ", appId);
  return tx.txId;
};




