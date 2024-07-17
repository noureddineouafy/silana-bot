let handler = async(m, { conn, text }) => {
  if (!text) throw `*لا يوجد اي رمز* ...`
  global.prefix = new RegExp('^[' + (text || global.opts['prefix'] || '‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')
  await m.reply(`*تم التغير الى*  *${text}*`)
}
handler.help = ['setprefix'].map(v => v + ' [prefix]')
handler.tags = ['owner']
handler.command = /^(تغير)$/i
handler.rowner = true

export default handler
