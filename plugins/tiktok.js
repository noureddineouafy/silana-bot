import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) throw `مثال : \n${usedPrefix + command} https://vt.tiktok.com/....`
  conn.sendMessage(m.chat, { react: { text: '🕐', key: m.key }})
  let kiku = await fetch(`https://aemt.me/download/ttdl?url=${text}`) 
  try {
  let res = await kiku.json()
await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
  conn.sendFile(m.chat, res.result.video[0], 'tiktok.mp4', 'success', m)
   } catch (e) {
    console.log(e);
    m.reply('not found') 
  }
}
handler.help = ['tiktok'];
handler.tags = ['downloader'];
handler.command = /^(تيك)$/i;
export default handler;
