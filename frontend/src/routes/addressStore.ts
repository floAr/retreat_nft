import { writable } from 'svelte/store';
export interface Entry {
    name: string
    address: string
}
export const getNext = () => {
    // retrieve one entry from Addresses and remove it
    let entry: Entry  = {
        name: '',
        address: ''
    }

    Addresses.update(data => {
        // get random entry
        if (data.length > 0) {
            const index = Math.floor(Math.random() * data.length);
            entry = data[index];
            // remove entry
            data.splice(index, 1);
        }
        return data;
    })
    return entry;
}


export const Addresses = writable<Entry[]>([
    {
        name: '1',
        address: '1'
    },
    {
        name: '2',
        address: '2'
    },
    {
        name: '3',
        address: '3'
    },
    {
        name: '4',
        address: '4'
    },

]); // we put addresses here