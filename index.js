const pako = require('pako');

function compress(text) {
    return new Promise((resolve, reject) => {
        try {
            const textEncoder = new TextEncoder();
            const uint8Array = textEncoder.encode(text);
            const compressed = pako.gzip(uint8Array);
            const base64Compressed = Buffer.from(compressed).toString('base64');
            
            resolve(base64Compressed);
        } catch (err) {
            reject(err);
        }
    });
}

function decompress(compressedText) {
    return new Promise((resolve, reject) => {
        try {
            const compressedData = new Uint8Array(Buffer.from(compressedText, 'base64'));
            const decompressed = pako.ungzip(compressedData);
            const textDecoder = new TextDecoder();
            const decompressedText = textDecoder.decode(decompressed);
            
            resolve(decompressedText);
        } catch (err) {
            reject(new Error('Geçersiz sıkıştırılmış metin veya bozulmuş veri'));
        }
    });
}

const text = 'Test Mesajı';

compress(text)
    .then(compressed => {
        console.log('Sıkıştırılmış Metin:', compressed);
        return decompress(compressed);
    })
    .then(decompressed => {
        console.log('Dekompresyon Sonucu:', decompressed);
    })
    .catch(err => console.error('Hata:', err));

module.exports = { compress, decompress };