// Connect to Alchemy
const web3 = new Web3(new Web3.providers.HttpProvider("https://eth-sepolia.alchemyapi.io/v2/iJm0ULxAk8065Yq_IhxoMdBszqSOKQkv"));

// Contract ABI and bytecode
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "a",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "b",
				"type": "uint256"
			}
		],
		"name": "add",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	}
]; // Your contract's ABI
const contractBytecode = "608060405234801561000f575f80fd5b506101a58061001d5f395ff3fe608060405234801561000f575f80fd5b5060043610610029575f3560e01c8063771602f71461002d575b5f80fd5b610047600480360381019061004291906100a9565b61005d565b60405161005491906100f6565b60405180910390f35b5f818361006a919061013c565b905092915050565b5f80fd5b5f819050919050565b61008881610076565b8114610092575f80fd5b50565b5f813590506100a38161007f565b92915050565b5f80604083850312156100bf576100be610072565b5b5f6100cc85828601610095565b92505060206100dd85828601610095565b9150509250929050565b6100f081610076565b82525050565b5f6020820190506101095f8301846100e7565b92915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f61014682610076565b915061015183610076565b92508282019050808211156101695761016861010f565b5b9291505056fea264697066735822122093bd11a580ac22b2c60fddc3b05dc81c14d7c571e7bf96068dd0965dde8e73c964736f6c63430008180033"; // Your contract's bytecode

// Deploy function
async function deployContract() {
    const accounts = await web3.eth.getAccounts();
    const contract = new web3.eth.Contract(contractABI);

    contract.deploy({
        data: contractBytecode
    })
    .send({
        from: accounts[0],
        gas:  1500000,
        gasPrice: '30000000000000'
    }, function(error, transactionHash){
        if(error) console.log(error);
        console.log(transactionHash);
    })
    .then(function(newContractInstance){
        console.log(newContractInstance.options.address) // instance with the new contract address
    });
}

// Call deployContract when the form is submitted
document.getElementById('deploy-form').addEventListener('submit', function(event) {
    event.preventDefault();
    deployContract();
});
