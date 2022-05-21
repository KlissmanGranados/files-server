import 'dotenv/config';
import { Storage } from "@google-cloud/storage";

const storage = new Storage({ keyFilename: 'key.json' });
const bucketName = process.env.BUCKET;

export default class {

    static async upload(destFileName: string, folder: string, contents: string | Buffer) {
        try {

            const data = storage.bucket(bucketName).file(`${folder}/${destFileName}`);
            await data.save(contents);
            await data.makePublic();
            console.log(
                `${destFileName}, upload to ${folder}/${destFileName}.`
            );
            return data.publicUrl();
        } catch (err) {
            console.error(err);
        }
    }

    static async remove(destFileName: string, folder: string) {
        try {
            await storage.bucket(bucketName).file(`${folder}/${destFileName}`).delete();
            console.log(
                `${destFileName} was remove from ${folder}/${destFileName}.`
            );
        } catch (err) {
            console.error(err);
        }
    }

}
