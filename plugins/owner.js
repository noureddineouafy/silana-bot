import fetch from 'node-fetch'
let handler = async (m, { conn }) => {
  let caption = `
*「 معلومات عن صاحب البوت 」*
مرحبًا! أنا العقرب، يوتيوبر ومبرمج ومطور بوتات. أعمل على تقديم محتوى تقني مميز وتعليمي على قناتي، وأشارككم آخر تطورات البرمجة وتطوير البوتات. تابعوني لتتعلموا المزيد عن هذا العالم المثير!
*Number :*\nwa.me/201028085788

`.trim()
  m.reply(caption)
}
handler.help = ['owner']
handler.tags = ['infobot']
handler.command = /^(المطور)$/i
handler.limit = false

export default handler
