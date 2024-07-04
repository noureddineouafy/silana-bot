let handler = async (m, { conn, command, text }) => {
let love = `
۫ ˛ َِ𝗘َِ𝗟َِ𝗔َِ𝗞َِ𝗥َِ𝗔َِ𝗕 َِ𝗘َِ𝗟َِ𝗬َِ𝗢َِ𝗧َِ𝗨َِ𝗕َِ𝗘َِ𝗥 .

*↞〘 مرحبا بك في بوت العقرب 〙↞*

*↞〘 اليك قائمه بسورس البوت 〙↞*

*↞ ❋ ─━─⊰🍷⊱─━─ ❋ ↞*

*↞〘 تم تطويري وبرمجتي 〙↞*
*↞〘 بواسطه العقرب اليوتيوبر 〙↞*
*↞〘 هذا البوت يعمل بالخاص 〙↞*
*↞〘 ويعمل ايضاا بالمجموعات 〙↞*

*↞〘 يوتيوب 〙↞*

*↞⊰ https://www.youtube.com/@Elakrab ⊱↞*

*↞〘 كل معلومات المطور  〙↞*

*↞ https://atom.bio/elakrabelyotyobr ↞*

*❋ ─━─⊰🍷⊱─━─ ❋*
 `.trim()
m.reply(love, null, { mentions: conn.parseMention(love) })}
handler.help = ['love']
handler.tags = ['fun']
handler.command = /^(السورس|سورس)$/i
export default handler
