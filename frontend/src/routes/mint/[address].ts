import type { RequestHandler } from '@sveltejs/kit';
import 'dotenv/config';
import { Contract, Wallet, ethers } from 'ethers';

import NiftyRetreatContract from './NiftyRetreatNFT.json';

const { abi } = NiftyRetreatContract;

function getProvider(): ethers.providers.Provider {
	return ethers.getDefaultProvider('rinkeby', {
		alchemy: process.env.ALCHEMY_API_KEY
	});
}

const NRWallet = new Wallet(process.env.PRIVATE_KEY || '', getProvider());

const NRContract = new Contract(process.env.CONTRACT_ADDRESS || '', abi, NRWallet);

async function handle(address: string) {
	console.log('GOT HERE', address);
	const txn = await NRContract.mintTo(address);
	return txn.wait();
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params }) {
	const { address } = params;
	// console.log(NRWallet);
	return handle(address);
}

// try {
// 	const increasedTokens = Math.min(20, tokensToMint + 1);
// 	let estimatedGas: ethers.BigNumber = ethers.BigNumber.from(0);
// 	for (let i = 0; i < 10; i++) {
// 		const gas = await expansionPunks.instance.estimateGas.mint(
// 			tokensToMint,
// 			{
// 				value: ethers.utils.parseUnits(priceForMint.toString(), 'ether'),
// 			}
// 		);
// 		if (gas.gt(estimatedGas)) estimatedGas = gas;
// 		console.log('t');
// 	}
// 	// const gas = await expansionPunks.instance.estimateGas.mint(
// 	//   tokensToMint,
// 	//   {
// 	//     value: ethers.utils.parseUnits(priceForMint.toString(), 'ether'),
// 	//   }
// 	// );
// 	const gasAdjusted = estimatedGas.add(estimatedGas.div(7));
// 	// console.log(estimatedGas.toString(), gasAdjusted.toString());
// 	const tx = await expansionPunks.instance.mint(tokensToMint, {
// 		value: ethers.utils.parseUnits(priceForMint.toString(), 'ether'),
// 		gasLimit: gasAdjusted,
// 	});
