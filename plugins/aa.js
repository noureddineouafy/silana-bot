import FormData from 'form-data';
import axios from "axios";

let handler = async (m, {
conn,
usedPrefix,
command
}) => {
let q = m.quoted ? m.quoted : m
let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
if (!/audio/.test(mime)) throw `Reply Video/Vn Nya`
let media = await q.download?.()
if (!media) throw 'Can\'t download media'

    m.reply('mohon bersabar, proses ini membutuhkan waktu beberapa saat..')
let { vocal_path, instrumental_path } = await vocalRemove(media);

    try {
        await conn.sendFile(m.chat, vocal_path, '', null, {
            key: {
                participant: '6282220066467@s.whatsapp.net',
                remoteJid: '6282220066467@s.whatsapp.net'
            },
            message: {
                conversation: 'Vocal'
            }}, true, { contextInfo: {
mentionedJid: [m.sender]
}
})
        
        await conn.sendFile(m.chat, instrumental_path, '', null, {
            key: {
                participant: '6282220066467@s.whatsapp.net',
                remoteJid: '6282220066467@s.whatsapp.net'
            },
            message: {
                conversation: 'Instrumental'
            }}, false, { contextInfo: {
mentionedJid: [m.sender]
}
})
            
    } catch (e) {
        throw eror
    }

}
handler.help = ['vocalremover']
handler.tags = ['tools']
handler.limit = true
handler.command = /^(vocalremover)$/i

export default handler

const apii = await axios.create({ baseURL: 'https://aivocalremover.com' })

const getKey = async () => (await apii.get('/')).data.match(/key:"(\w+)/)[1]

const vocalRemove = async (audioBuffer) => {
	const form = new FormData()
	const fileName = Math.random().toString(36) + '.mpeg'
	form.append('fileName', audioBuffer, fileName)
	
	const [key, fileUpload] = await Promise.all([
		await getKey(),
		await apii.post('/api/v2/FileUpload', form, { headers: form.getHeaders() }).catch(e => e.response)
	])
	if (fileUpload.status !== 200) throw fileUpload.data || fileUpload.statusText
	
	const processFile = await apii.post('/api/v2/ProcessFile', new URLSearchParams({
		file_name: fileUpload.data.file_name,
		action: 'watermark_video', key, web: 'web' 
	})).catch(e => e.response)
	
	return processFile.data
}
