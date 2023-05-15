import algosdk from 'algosdk';
/*there are 3 main tools used in developing the algorand blockchain in this system:
1. algosdk: a high level sdk to interact with the algorand blockchain like generating wallet, 
build & sign transaction, query the blockchain for accounts balance, transaction history and more.(making)
2. algodClient: low level HTTP provide basic acc management, transaction submission, block retrievel 
and blockchain-related tasks. (manage)
3. indexerClient: similar to algodClient but the purpose of this tool is to adavance 
query and search blockchain data (query)
*/
//private key that will be used for algosdk to sign transactions send to the network
export const ALGOkey = '';
//this is the url that the client will communicate with
export const ALGOD_TESTNET_URL = 'https://testnet-api.algonode.cloud';
export const ALGOD_PORT = '';

//here, indexerServer use algorand node's indexer API, which provides advanced query capabilities on the blockchain data
const indexerServer = "https://testnet-idx.algonode.cloud";

export const MNEMONIC_KEY = 'leg cage army someone purse hurt imitate reform impulse west girl find abuse empty bone employ air post bid custom guilt surge weather abstract bulb';
export const systemAccount = algosdk.mnemonicToSecretKey(MNEMONIC_KEY);
 const token = '';
//indexerClient is used here because of the need for advanced querying data from the algorand blockchain
export const indexerClient = new algosdk.Indexer(token, indexerServer, '');

