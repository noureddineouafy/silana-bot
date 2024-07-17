//import db from '../lib/database.js'
//كيلوا جو تابع لقنات
//https://whatsapp.com/channel/0029VaWuSkHGehEKy41ibw3k

import { createHash } from 'crypto'
let Reg = /\|?(.*)( *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix, command }) {
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)
  if (user.registered === true) throw `✳️ أنت ملقب بالفعل يا حب`
  if (!Reg.test(text)) throw `⚠️ تنسيق غير صحيح\n\n✳️ استخدم هذا الأمر: *${usedPrefix + command} القب*\n📌 مثال: *${usedPrefix + command}* كيلوا كلاود\n📌`
  let [_, name] = text.match(Reg)
  if (!name) throw '⚠️ تنسيق غير صحيح\n\n✳️ استخدم هذا الأمر: .لقبني اللقب النقابه\n📌 مثال: .لقبني كايدن كلاود'
  if (name.length >= 30) throw '✳️ اللقب طويل جدًا'
  user.name = name.trim()
  user.regTime = + new Date
  user.registered = true
  let sn = createHash('md5').update(m.sender).digest('hex')
  m.reply(`
┌─「 *ملقب* 」─
▢ *القب:* ${name}
▢ *الرقم* : ${m.sender.split`@`[0]}
└──────────────

 *${usedPrefix}اوامر* لعرض القائمة
`.trim())
}

handler.help = ['لقبني'].map(v => v + ' <الاسم>')
handler.tags = ['rg']
handler.command = ['لقبني']

export default handler
