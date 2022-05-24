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
      "name": "Eric",
      "address": "0x2BED8372eDA95D442Da8B5cafd878e3C8B977634",
      "tokenId": 0
    },
    {
      "name": "Jason",
      "address": "0x1b5a76a7A6c6d05D562a2cCc1A350a2a5062875b",
      "tokenId": 1
    },
    {
      "name": "Mimi",
      "address": "0x1EDcf70Fb85dA493418CEd7D509cC3a97511Fd2d",
      "tokenId": 2
    },
    {
      "name": "John",
      "address": "0xD913eB74E5D034E32753ce137e1342B9F708057E",
      "tokenId": 3
    },
    {
      "name": "Ale",
      "address": "0x3bcE66194e0a77a93b4FEdb6eddD7FB0dFADeD92",
      "tokenId": 4
    },
    {
      "name": "David Pettey",
      "address": "0x390000182776d6f8bd80bd7a250cbfcac1490cd5",
      "tokenId": 5
    },
    {
      "name": "Andy Watson",
      "address": "0xecD3eE7fC7546Ed468467628c71c1Eebb7576d32",
      "tokenId": 6
    },
    {
      "name": "Christopher Chu",
      "address": "0x0b365dC1be555ceeCe4ba85967990d55a86185d5",
      "tokenId": 7
    },
    {
      "name": "Tasheme /vers la Lune",
      "address": "0x964d71fa3814f2ea30315a112f5e9e57ff0e0b2a",
      "tokenId": 8
    },
    {
      "name": "Ryan Leach",
      "address": "0x2F8cFe2313f38C37Fca68d3Eb27A9A8c8f639FE4",
      "tokenId": 9
    },
    {
      "name": "Zvone",
      "address": "0xAbff03C067e9bBe1C44F61F78DF67aFbD43C7b96",
      "tokenId": 10
    },
    {
      "name": "Zander",
      "address": "0x5Cd6e890E5C89bEC585DEc3be01256ab7d908930",
      "tokenId": 11
    },
    {
      "name": "Lance",
      "address": "0x0dC848ef0CA635F187663BA6dF2cB17e38a2066d",
      "tokenId": 12
    },
    {
      "name": "Ricky",
      "address": "0x5bD490Ff7d324B3A8E47Aae882aD601BFc22D1D7",
      "tokenId": 13
    },
    {
      "name": "joe evil",
      "address": "0x22084410C6364eDD08FBbd9A9E3aE79f4016e92A",
      "tokenId": 14
    },
    {
      "name": "Alex Donesky",
      "address": "0xd5eC2741CaBa839b0a7fED0E2293dbAB34E023fb",
      "tokenId": 15
    },
    {
      "name": "Thomas",
      "address": "0xc7d06bf6AbcF86f8536cb762c1946d589F592176",
      "tokenId": 16
    },
    {
      "name": "Michael",
      "address": "0x95dbe40A91feE0B7c8a2D69E01c98C60AAE5DfD3",
      "tokenId": 17
    },
    {
      "name": "Daniel Moore",
      "address": "0x4BD3eD42D3C633E00063A92D14427DC03f2e3750",
      "tokenId": 18
    },
    {
      "name": "Charles Smith",
      "address": "0x2A0b4Bdb2492eC4D8eA0015A6784ACC98216c5D2",
      "tokenId": 19
    },
    {
      "name": "Florian",
      "address": "0x6D8dEC3fD68D94a7189A98346EA52B4D32e00012",
      "tokenId": 20
    },
    {
      "name": "Gabriel Tavolaro",
      "address": "0x44033f2680AF180F33A483A1C1265E1628e37059",
      "tokenId": 21
    },
    {
      "name": "David Ceballos",
      "address": "0xc407c476C8bf1d76Ff73b6A0cC26726FF5119629",
      "tokenId": 22
    },
    {
      "name": "Diego Bernal",
      "address": "0x8558971b9FB445ff226F0E404aD18FD50b8aa89b",
      "tokenId": 23
    },
    {
      "name": "Coty",
      "address": "0xB9f6Cd55B55916d144d811423b669652C2fCb51e",
      "tokenId": 24
    },
    {
      "name": "Zunk",
      "address": "0xb63633d726A54a29bFBA0B12F57D6f847e306d9D",
      "tokenId": 25
    },
    {
      "name": "Adam",
      "address": "0xC175581b9ea0B2076b1Da9a567Ce5c8eaF8B3D3D",
      "tokenId": 26
    },
    {
      "name": "Spencer (Speezy F Baby)",
      "address": "0x8F4359D1C2166452b5e7a02742D6fe9ca5448FDe",
      "tokenId": 27
    },
    {
      "name": "Kavan",
      "address": "0x7C7F66DF5Ec08FB8bfB7444Ca52aB322F9C24921",
      "tokenId": 28
    },
    {
      "name": "Brian Rosner",
      "address": "0xdf83966583e71f9f90C9fDFD21675BA05984A82E",
      "tokenId": 29
    },
    {
      "name": "Aaron",
      "address": "0x2BD812200D8e54eAdFd7c3caE0f7Afd499a3244d",
      "tokenId": 30
    },
    {
      "name": "Allan Politano",
      "address": "0x8544B77d6f515e1e2dc1596b04D810e78B66D15d",
      "tokenId": 31
    },
    {
      "name": "Dashel",
      "address": "0x5A1A4D478F94FAb14f74110Ce33852581ca96747",
      "tokenId": 32
    },
    {
      "name": "Crew Froebel",
      "address": "0x4f00648aa62620fB287571833EDB6e7b471BAa75",
      "tokenId": 33
    },
    {
      "name": "Fabio Toste",
      "address": "0xF206528141BDd95D9B9D59E53B166CDaEB73446D",
      "tokenId": 34
    },
    {
      "name": "Ella Gilbert",
      "address": "0xb576B12747f94F51fc71eC9914fAF31d37521D1E",
      "tokenId": 35
    },
    {
      "name": "Tyler",
      "address": "0x66A49E0ac0bBEC2B2849a8E51f882A7bf6b411e6",
      "tokenId": 36
    },
    {
      "name": "Brito",
      "address": "0x1D2a04c1489b58bdBd80898E8b10BB017B26b87A",
      "tokenId": 37
    },
    {
      "name": "Eric Pavone",
      "address": "0xB553a9deFA07b9B322E1b31cbE0DCAAf32dA29c6",
      "tokenId": 38
    },
    {
      "name": "Leticia Pinheiro",
      "address": "0x15de27953BACA7Cc8eDA52bBC9A5B05eDAd92465",
      "tokenId": 39
    },
    {
      "name": "Jeebs",
      "address": "0x2ff5eb59260e44687dBc2892eA941feA4a339789",
      "tokenId": 40
    },
    {
      "name": "jake",
      "address": "0x833eBd49d19026C005803f810F430E187500C692",
      "tokenId": 41
    },
    {
      "name": "Dameon",
      "address": "0xc72E080339A041015Eb303eCEFCD2A9b4B72AF5C",
      "tokenId": 42
    },
    {
      "name": "Leandro Soares",
      "address": "0x14027db7DFfc27B8bc917BaC1d53D0B475F30452",
      "tokenId": 43
    },
    {
      "name": "lee johnson",
      "address": "0x1b3Dd429D09144c786821994A25B82d27fF22Ac4",
      "tokenId": 44
    },
    {
      "name": "Caio Filizola",
      "address": "0x3e67f840AcE4cc79735B28A4f6AE705d494e8444",
      "tokenId": 45
    },
    {
      "name": "Raymond Ladeveze",
      "address": "0xD204c770572C43576De034EDe6Cb24F741E565E2",
      "tokenId": 46
    },
    {
      "name": "Maria Oben",
      "address": "0xf643BD692700d1E062883158DA7ffd15ab6A95cb",
      "tokenId": 47
    },
    {
      "name": "Ryan",
      "address": "0xa73DD2fDF2a3131aF2d2D759637e054e95ea217C",
      "tokenId": 48
    }
  ]); // we put addresses here