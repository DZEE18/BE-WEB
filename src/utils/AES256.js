import CryptoJS from 'crypto-js'
const key = process.env.VUE_APP_AES_KEY
const iv = process.env.VUE_APP_AES_IV
const AES = {}

AES.encrypt = function(txt) {
    const cipher = CryptoJS.AES.encrypt(txt, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(iv),
        mode: CryptoJS.mode.CBC
    })
    return cipher.toString()
};

AES.dencrypt = function(txt) {
    const cipher = CryptoJS.AES.decrypt(txt, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(iv),
        mode: CryptoJS.mode.CBC
    })
    return CryptoJS.enc.Utf8.stringify(cipher).toString()
}

export default AES;