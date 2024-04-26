import { ethers } from 'ethers';
import certificate from '../Constant/certificate.json';
import moment from 'moment/moment';
const { abi, bytecode } = certificate;


// Common function to get a provider and signer
export const getProvider = () => {
    if (typeof window.ethereum !== 'undefined') {
        return new ethers.BrowserProvider(window.ethereum);
    } else {
        console.error("MetaMask is not installed!");
        return null;
    }
}

export async function checkTransactionAndFetchData(txnId) {
    try {
        //check txnId if all are Capital, and no prefix '0x'
        if (txnId === txnId.toUpperCase()) {
            return null;
        }
        const provider = getProvider();
        // Fetch the transaction receipt using the transaction ID
        const receipt = await provider.getTransactionReceipt(txnId);
        console.log("Transaction receipt:", receipt);
        if (!receipt) {
            console.log("Transaction not found on Ethereum.");
            return null;
        }

        console.log("Transaction found. Details:", receipt);

        // Check if the transaction has a contract address (for contract creation transactions)
        if (receipt.contractAddress) {
            console.log("Contract address from the transaction:", receipt.contractAddress);
            // Additional function to interact with the contract if needed
            const contractData = await readCertificate(receipt.contractAddress);
            return { ...contractData, contractAddress: receipt.contractAddress, transactionId: txnId, isEther: true };
        } else {
            // For regular transactions, just return receipt or specific receipt details
            const contractAddress = receipt.to;
            const contractData = await readCertificate(contractAddress);
            return { ...contractData, contractAddress, transactionId: txnId, isEther: true };
        }
    } catch (error) {
        console.error("Error checking transaction or fetching data:", error);
        throw new Error("Failed to process the transaction data.");
    }
}

// This function prompts the user to connect their MetaMask wallet and returns their address
export const connectWallet = async () => {
    if (window.ethereum) {
        try {
            // Request account access if needed
            await window.ethereum.request({ method: 'eth_requestAccounts' });

            // We can also use ethers to create a provider and get the signer
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            // Fetch the address associated with the signer
            const address = await signer.getAddress();
            console.log("Connected account:", address);

            // Return the address
            return address;
        } catch (error) {
            console.error("Error connecting to MetaMask:", error);
            throw new Error("Failed to connect MetaMask");
        }
    } else {
        // If MetaMask is not installed, alert the user
        alert("Please install MetaMask to use this feature!");
        throw new Error("MetaMask not installed");
    }
}


export const requestAccount = async () => {
    const provider = getProvider();
    if (!provider) return;
    await provider.send("eth_requestAccounts", []);
    return provider.getSigner();
}

// Load the contract
export const loadContract = async (address) => {
    const signer = await requestAccount();
    return new ethers.Contract(address, abi, signer);
}

export const deployContract = async (args) => {
    const { tajukSijil, nama, NRIC, tarikhMula, tarikhTamat } = args;
    try {
        const signer = await requestAccount();
        const provider = signer.provider;

        // Get current gas price from the network

        const courseTitle = tajukSijil;
        const recipientName = nama;
        const recipientIC = NRIC;
        const startDate = tarikhMula;
        const endDate = tarikhTamat;

        console.log("Deploying contract with arguments:", courseTitle, recipientName, recipientIC, startDate, endDate);

        const factory = new ethers.ContractFactory(abi, bytecode, signer);


        // Deploy the contract with the provided arguments
        const contract = await factory.deploy(courseTitle, recipientName, recipientIC, startDate, endDate);

        console.log("Contract deployed to:", contract);
        await contract.waitForDeployment();
        console.log("Contract deployed successfully.", contract);

        // Optionally, getting the transaction hash from the deployment
        const transactionHash = contract.deploymentTransaction().hash;
        const accountAddress = await signer.getAddress();

        return {
            contractAddress: contract.getAddress(),
            transactionId: transactionHash,
            accountAddr: accountAddress
        };
    } catch (error) {
        console.error("Failed to deploy the contract:", error);
        throw new Error("Deployment failed: " + error.message);
    }
}
export const updateCertificate = async (contractAddress, courseTitle, recipientName, NRIC, startDate, endDate) => {
    try {

        const contract = await loadContract(contractAddress);
        console.log(contract)
        const signer = contract.signer; // Getting the signer from the contract
        console.log(signer)

        // Execute the transaction to update the certificate
        const transaction = await contract.updateCertificate(courseTitle, recipientName, NRIC, startDate, endDate);
        const receipt = await transaction.wait(); // Wait for the transaction to be mined

        console.log("Certificate updated successfully.", receipt);

        // Get the user's address from the signer
        const userAddress = receipt.from;

        // Return the transaction hash and user's address
        return {
            transactionHash: transaction.hash,
            userAddress: userAddress
        };
    } catch (error) {
        console.error("Failed to update the certificate:", error);
        throw new Error("Update failed: " + error.message);
    }
}

// Function to invalidate the certificate
export const invalidateCertificate = async (contractAddress) => {
    const contract = await loadContract(contractAddress);
    const transaction = await contract.invalidateCertificate();
    await transaction.wait();
    console.log("Certificate invalidated successfully.");
    return {
        transactionHash: transaction.hash,
    }
}

// Read certificate data
export const readCertificate = async (contractAddress) => {
    console.log("Reading certificate data from contract:", contractAddress);
    try {
        const contract = await loadContract(contractAddress);
        const data = await contract.certificateData();
        console.log("Read certificate data:", data);
        return {
            courseTitle: data.courseTitle,
            recipientName: data.recipientName,
            recipientIC: data.recipientIC,
            startDate: data.startDate,
            endDate: data.endDate,
            isValid: data.isValid
        };
    } catch (error) {
        console.error("Failed to read certificate data:", error);
        return null;
    }
}

// Get the modification log
export const getModifications = async (contract) => {
    const mods = await contract.getModifications();
    return mods.map(mod => ({
        dateModified: new Date(Number(mod.dateModified) * 1000).toISOString(),
        action: mod.action,
        modifiedBy: mod.modifiedBy
    }));
}
