import fetch from 'node-fetch'
let handler = async (m, { conn }) => {
  let caption = `
*「 معلومات عن صاحب البوت 」*

*Number :*\nwa.me/201028085788

*youtube:*\nhttps://www.youtube.com/@Elakrab


`.trim()
  m.reply(caption)
}
handler.help = ['owner']
handler.tags = ['infobot']
handler.command = /^(المطور)$/i
handler.limit = false

export default handler
