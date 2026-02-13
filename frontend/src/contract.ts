import { openContractCall } from '@stacks/connect';

const contractAddress = "YOUR_CONTRACT_ADDRESS";
const contractName = "donation";

export const sendDonation = async (amount: number) => {
  await openContractCall({
    contractAddress,
    contractName,
    functionName: 'donate',
    functionArgs: [amount]
  });
};
