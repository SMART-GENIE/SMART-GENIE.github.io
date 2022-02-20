const contractAddress = 'TLoV6Qr7tqDnHi641jG2hXZLQYUd4RTTAs'

const utils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(contractAddress)
    },

};

export default utils;

