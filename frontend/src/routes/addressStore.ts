import { writable } from 'svelte/store';
export interface Entry {
    name:string
    address:string
}

export const Addresses = writable<Entry[]>([
    {
        name: 'floAr',
        address: 'abcd'
    },
    {
        name: 'dfasfaf',
        address: 'abcd'
    },
]); // we put addresses here