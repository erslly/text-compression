const { compress, decompress } = require('./index');

describe('Metin Sıkıştırma', () => {
    it('metni doğru bir şekilde sıkıştırmalı', async () => {
        const text = 'Test metni';
        const compressed = await compress(text);
        expect(compressed).toBeDefined();
        expect(compressed).not.toEqual(text);
    });

    it('sıkıştırılmış metni doğru bir şekilde açılmalı', async () => {
        const text = 'Test metni';
        const compressed = await compress(text);
        const decompressed = await decompress(compressed);
        expect(decompressed).toBe(text);
    });

    it('geçersiz sıkıştırılmış metin', async () => {
        const invalidCompressedText = 'gecersizmetin';
        await expect(decompress(invalidCompressedText)).rejects.toThrow();
    });
});