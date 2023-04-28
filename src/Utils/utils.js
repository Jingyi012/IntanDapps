import algosdk from 'algosdk';
import { ALGOkey,ALGOD_TESTNET_URL,ALGOD_PORT } from '../constant/ALGOkey';

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
export const deployContract = async (sender,tajukSijil,tarikhMula,tarikhTamat,nama)=>{

    const algodClient = new algosdk.Algodv2(ALGOkey , ALGOD_TESTNET_URL, ALGOD_PORT);

    const params = await algodClient.getTransactionParams().do();
    let enTajukSijil = new TextEncoder().encode(JSON.stringify(tajukSijil));
    let enTarikhMula = new TextEncoder().encode(JSON.stringify(tarikhMula));
    let enTarikhTamat = new TextEncoder().encode(JSON.stringify(tarikhTamat));
    let enNama = new TextEncoder().encode(JSON.stringify(nama));

    let appArgs = [enTajukSijil,enTarikhMula,enTarikhTamat,enNama];
    let note = new TextEncoder().encode(JSON.stringify("Intan Cert Creation By System"));
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
    // Sign the transaction
    const signedTxn = txn.signTxn(sender.sk);

    const tx = await algodClient.sendRawTransaction(signedTxn).do();
    console.log('Transaction ID:', tx.txId);
    console.log(algodClient.pendingTransactionInformation(tx.txId).do());
    const roundsTowait = 2;
    const confirmedTxn = await algosdk.waitForConfirmation(algodClient, tx.txId, roundsTowait);

    console.log(algodClient.getTransactionProof(tx.txId))
    const appId = confirmedTxn['application-index'];
    console.log('App ID:', appId);

    return appId;
}
//the particular admin will pay the contract after the contract was generated
export const payContract = async (sender,appId, tajukSijil,tarikhMula,tarikhTamat,nama)=>{

    const algodClient = new algosdk.Algodv2(ALGOkey , ALGOD_TESTNET_URL, ALGOD_PORT);
    const params = await algodClient.getTransactionParams().do();
    let enTajukSijil = new TextEncoder().encode(JSON.stringify(tajukSijil));
    let enTarikhMula = new TextEncoder().encode(JSON.stringify(tarikhMula));
    let enTarikhTamat = new TextEncoder().encode(JSON.stringify(tarikhTamat));
    let enNama = new TextEncoder().encode(JSON.stringify(nama));
    //give note a default value called create
    let note = new TextEncoder().encode(JSON.stringify("Admin "+sender.addr+" Create this dapps"));
    console.log(appId);
    let appArgs = [enTajukSijil,enTarikhMula,enTarikhTamat,enNama];
    let appCallTxn = algosdk.makeApplicationCallTxnFromObject({
        from: sender.addr,
        appIndex: Number(204939799),
        onComplete: algosdk.OnApplicationComplete.NoOpOC,
        suggestedParams: params,
        appArgs: appArgs,
        note: note
    });

    console.log(appCallTxn);
    const signedTxn = algosdk.signTransaction(appCallTxn, sender.sk);
    const sendTx = await algodClient.sendRawTransaction(signedTxn.blob).do();
    console.log("Transaction : " + sendTx.txId);
    // Notify about completion
    console.log("Group transaction " +  sendTx.txId);
    return sendTx.txId;
}

