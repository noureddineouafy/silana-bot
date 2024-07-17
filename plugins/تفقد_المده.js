
let handler = async (m, { conn, args, usedPrefix, command }) => {
	
	if (global.db.data.chats[m.chat].expired < 1) throw `*✦┇لم يتم تعيين هذه المجموعة لتنتهي صلاحيتها┇✦*`
    let who
    if (m.isGroup) who = args[1] ? args[1] : m.chat
    else who = args[1]

    var nDays = 86400000 * args[0]
    var now = new Date() * 1
    
    m.reply(`*✦┇ينتهي عقد الإيجار الخاص بك في┇✦*
    
    ${msToDate(global.db.data.chats[who].expired - now)}

  *❮⚠️┇بعد تلك المده سيغادر البوت جروبك تلقائياً ❯*`) 
    
}
handler.help = ['checkexpired']
handler.tags = ['group']
handler.command = /^(تفقد_المده|cexpired)$/i
handler.group = true

export default handler

function msToDate(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [d, ' *Days*\n ', h, ' *Hours*\n ', m, ' *Minutes*\n ', s, ' *Seconds* '].map(v => v.toString().padStart(2, 0)).join('')
}
