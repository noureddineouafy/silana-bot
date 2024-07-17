let handler = async (m, { conn, args, command }) => {
await m.reply('*اسف لو ازعجت حد سلام اخواتي بوت العقرب اليوتيوبر*') 
await  conn.groupLeave(m.chat)}
handler.command = /^(out|leavegc|اخرج|برا)$/i
handler.group = true
handler.rowner = true
export default handler
