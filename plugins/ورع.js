let handler = async (m, { conn, command, text }) => {
let love = `
*✦┇نسبة الوراعه 🪄${text}  هي *${Math.floor(Math.random() * 100)}%* *من 100%┇✦*
*✦ورع مسكين🐤🪄✦*
`.trim()
m.reply(love, null, { mentions: conn.parseMention(love) })}
handler.help = ['love']
handler.tags = ['fun']
handler.command = /^(ورع|ورعه)$/i
export default handler
