let handler = async (m, { conn, command, text }) => {
let intelligence = `*✦┃🔍نسبة الذكاء ┃✦*
*✦نسبة ذكاء ${text} 💡هي* *${Math.floor(Math.random() * 100)}%* *من 100%✦*
*┇📚😂هالك قوي ذكائك┇*
*✦━━━✤━ –⊰ ❖ ⊱– ━✤━━━✦*
`.trim()
m.reply(intelligence, null, { mentions: conn.parseMention(intelligence) })}
handler.help = ['intelligence']
handler.tags = ['fun']
handler.command = /^(ذكاء)$/i
export default handler
