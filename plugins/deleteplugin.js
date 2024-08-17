import { tmpdir } from 'os'
import path, { join } from 'path'
import {
  readdirSync,
  statSync,
  unlinkSync,
  existsSync,
  readFileSync,
  watch
} from 'fs'
let handler = async (m, { conn, usedPrefix: _p, __dirname, args, text }) => {

let ar = Object.keys(plugins)
    let ar1 = ar.map(v => v.replace('.js', ''))
    if (!text) throw `هذا الأمر خاص بحذف اي ميزة في البوت بشكل نهائي مثال :\n*.deleteplugin* apk`
    if (!ar1.includes(args[0])) return m.reply(`*🗃️ الميزة غير موجودة  في قائمة الميزات المرجو اختيار الاسم الصحيح للميزة التي تريد حذفها من البوت : إليـك قائمة جميع الميزات الموجودة لديك في البوت !*\n=============================\n\n${ar1.map(v => ' ' + v).join`\n`}`)
const file = join(__dirname, '../plugins/' + args[0] + '.js')
unlinkSync(file)
conn.reply(m.chat, `تم حذف الميزة بنجاح\n "plugins/${args[0]}.js"`, m)
    
}
handler.help = ['deleteplugin']
handler.tags = ['owner']
handler.command = /^(deleteplugin)$/i
handler.owner = true
export default handler
