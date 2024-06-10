/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import {
    promises
} from 'fs'
import {
    join
} from 'path'
import {
    spawn
} from 'child_process'

function ffmpeg(buffer, args = [], ext = '', ext2 = '') {
    return new Promise(async (resolve, reject) => {
        try {
            let tmp = join(global.__dirname(import.meta.url), '../tmp', +new Date + '.' + ext)
            let out = tmp + '.' + ext2
            await promises.writeFile(tmp, buffer)
            spawn('ffmpeg', [
                    '-y',
                    '-i', tmp,
                    ...args,
                    out
                ])
                .on('error', reject)
                .on('close', async (code) => {
                    try {
                        await promises.unlink(tmp)
                        if (code !== 0) return reject(code)
                        resolve({
                            data: await promises.readFile(out),
                            filename: out,
                            delete() {
                                return promises.unlink(out)
                            }
                        })
                    } catch (e) {
                        reject(e)
                    }
                })
        } catch (e) {
            reject(e)
        }
    })
}

/**
 * Convert Audio to Playable WhatsApp Audio
 * @param {Buffer} buffer Audio Buffer
 * @param {String} ext File Extension 
 * @returns {Promise<{data: Buffer, filename: String, delete: Function}>}
 */
function toPTT(buffer, ext) {
    return ffmpeg(buffer, [
        '-vn',
        '-c:a', 'libopus',
        '-b:a', '128k',
        '-vbr', 'on',
    ], ext, 'ogg')
}

/**
 * Convert Audio to Playable WhatsApp PTT
 * @param {Buffer} buffer Audio Buffer
 * @param {String} ext File Extension 
 * @returns {Promise<{data: Buffer, filename: String, delete: Function}>}
 */
function toAudio(buffer, ext) {
    return ffmpeg(buffer, [
        '-vn',
        '-c:a', 'libopus',
        '-b:a', '128k',
        '-vbr', 'on',
        '-compression_level', '10'
    ], ext, 'opus')
}

/**
 * Convert Audio to Playable WhatsApp Video
 * @param {Buffer} buffer Video Buffer
 * @param {String} ext File Extension 
 * @returns {Promise<{data: Buffer, filename: String, delete: Function}>}
 */
function toVideo(buffer, ext) {
    return ffmpeg(buffer, [
        '-c:v', 'libx264',
        '-c:a', 'aac',
        '-ab', '128k',
        '-ar', '44100',
        '-crf', '32',
        '-preset', 'slow'
    ], ext, 'mp4')
}

/**
 * Mengkonversi video ke resolusi dan bitrate yang diinginkan.
 * @param {Buffer} buffer Buffer video input.
 * @param {string} resolution Resolusi video (contoh: '1280x720').
 * @param {string} videoBitrate Bitrate video (contoh: '2000k').
 * @returns {Promise<Buffer>} Buffer video hasil konversi.
 */
function videoConvert(buffer, input = []) {
    return new Promise(async (resolve, reject) => {
        try {
            const tmp = join(__dirname, '../tmp', `${+new Date()}.mp4`);
            await promises.writeFile(tmp, buffer);
            const out = tmp.replace('.mp4', '_converted.mp4');
            const args = [
                '-y',
                '-i', tmp,
                ...input,
                out
            ];

            spawn('ffmpeg', args)
                .on('error', reject)
                .on('close', async (code) => {
                    try {
                        await promises.unlink(tmp);
                        if (code !== 0) return reject(code);
                        const outputVideoBuffer = await promises.readFile(out);
                        await promises.unlink(out);
                        resolve(outputVideoBuffer);
                    } catch (e) {
                        reject(e);
                    }
                });
        } catch (e) {
            reject(e);
        }
    });
}


export {
    toAudio,
    toPTT,
    toVideo,
    ffmpeg,
    videoConvert
}

import {
    fileURLToPath,
    URL
} from 'url'
import chalk from 'chalk'
import fs from 'fs'
const __filename = new URL('', import.meta.url).pathname
const __dirname = new URL('.', import.meta.url).pathname
let file = fileURLToPath(import.meta.url)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.bgGreen(chalk.black("[  UPDATE ]")), chalk.white(`${__filename}`))
    import(`${file}?update=${Date.now()}`)
})