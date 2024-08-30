import fetch from "node-fetch";
import {
    FormData,
    Blob
} from "formdata-node";
import {
    fileTypeFromBuffer
} from "file-type";

export async function transcribe(buffer) {
    try {
        let chunk = [buffer]
        const blob = new Blob(chunk, {
            type: 'audio/webm'
        });
        console.log('Blob = ', blob);
        const form = new FormData();
        let filename = `recording-wordpress.mp3`;
        form.append('audio', blob, filename);
        let res = await fetch('https://api.deepdev.xyz/api/openai/transcribe', {
            method: 'POST',
            body: form
        });
        let json = await res.json();
        return json;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
