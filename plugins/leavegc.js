let handler = async (m, { conn, args, command }) => {
  let group = m.chat
  await m.reply('وداعًا! 👋😃', m.chat)
  await conn.groupLeave(group)
}

handler.help = ['leavegc']
handler.tags = ['owner']
handler.command = /^(leavegc)$/i

handler.rowner = true

export default handler
