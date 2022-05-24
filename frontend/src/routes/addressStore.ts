import { writable } from 'svelte/store';
export interface Entry {
    name: string
    address: string
    tokenId:number
}
export const getNext = () => {
    // retrieve one entry from Addresses and remove it
    let entry: Entry  = {
        name: '',
        address: '',
        tokenId:-1
    }

    Addresses.update(data => {
        // get next entry and remove it


        if (data.length > 0) {
            // const index = Math.floor(Math.random() * data.length);
            entry = data.shift()!;
        }
        return data;
    })
    return entry;
}


export const Addresses = writable<Entry[]>([
    {
        name: '1',
        address: '1',
        tokenId:0,
    },
    {
        name: '2',
        address: '2',
        tokenId:1,
    },
    {
        name: '3',
        address: '3',
        tokenId:2,
    },
    {
        name: '4',
        address: '4',
        tokenId:3,
    },

]); // we put addresses here