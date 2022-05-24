import type { RequestHandler } from '@sveltejs/kit';
import 'dotenv/config';
import { Contract, Wallet } from 'ethers';

import NiftyRetreatContract from './NiftyRetreatNFT.json';

const { abi } = NiftyRetreatContract;

const NRWallet = new Wallet(process.env.PRIVATE_KEY || '');

const NRContract = new Contract(process.env.PUBLIC_ADDRESS || '', abi, NRWallet);

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params }) {
	const { address } = params;
	return handle(address);
}

async function handle(address: string) {
	const txn = await NRContract.mintTo(address);
	return txn.wait();

}
