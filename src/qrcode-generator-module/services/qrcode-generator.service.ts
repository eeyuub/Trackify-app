export class QrcodeGeneratorService {

    constructor() { }

    async generateQRCode(text: string): Promise<string> {
        const QRCode = require('qrcode');
        try {
            return await QRCode.toDataURL(text);
        } catch (err) {
            console.error(err);
            return null;
        }
    }
}