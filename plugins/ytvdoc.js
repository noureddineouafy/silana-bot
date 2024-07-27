import fetch from 'node-fetch'
let handler = async (m, { conn, text }) => {
if (!text) throw 'اكتب   الامر متبوع برابط فيديو من منصة اليوتوب '
m.react('🕐')
try {
let api = await (await fetch(`https://api.yowes.net/youtube/download?url=${text}`))
let json = await api.json()
await conn.sendFile(m.chat, json.urls[0].url, 'vid.mp4', 'YTMP4', m)
m.react('✅')
} catch (e) {
throw 'تعذر علي  التحميل '
m.react('❌')
}}
handler.help = ['ytvdoc']
handler.tags = ['downloader']
handler.command = ['ytvdoc']
export default handler
