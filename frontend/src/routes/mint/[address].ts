import type {  RequestHandler } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params }) {
	const { address } = params;
	return handle( address);
}

async function handle( address: string) {


	return {
		// body: skullData
	};
}