const contractAddress = "TVtd6PSWS9qfW9RBYkwinoSAVD56zAzSMK";
// "TP3knTX2vSsPxpffb5Fe8XMgMCuqhXZdms" Version = 2
// 'TLoV6Qr7tqDnHi641jG2hXZLQYUd4RTTAs' Version = 1

const utils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(contractAddress)
    },

};

export default utils;

