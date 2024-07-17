import { createHash } from 'crypto'
import { canLevelUp, xpRange } from '../lib/levelling.js'
import fetch from 'node-fetch'
import fs from 'fs'
const { levelling } = '../lib/levelling.js'
import moment from 'moment-timezone'
import { promises } from 'fs'
import { join } from 'path'
const time = moment.tz('Egypt').format('HH')
let wib = moment.tz('Egypt').format('HH:mm:ss')
//import db from '../lib/database.js'

let handler = async (m, {conn, usedPrefix, usedPrefix: _p, __dirname, text, isPrems}) => {
    let d = new Date(new Date + 3600000)
    let locale = 'ar'
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
if (!(who in global.db.data.users)) throw `✳️ The user is not found in my database`
let videoUrl = 'https://telegra.ph/file/666f347726644b3f59504.mp4';
  let vn = './media/menu.mp3';
  const user = global.db.data.users[m.sender];
  const {money, joincount} = global.db.data.users[m.sender];
  const {exp, limit, level, role} = 
    global.db.data.users[m.sender];
let { min, xp, max } = xpRange(user.level, global.multiplier)
let username = conn.getName(who)
let math = max - xp
let sn = createHash('md5').update(who).digest('hex')
let totalreg = Object.keys(global.db.data.users).length;
let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length 
let more = String.fromCharCode(8206)
let readMore = more.repeat(900) 
  const taguser = '@' +  m.sender.split('@s.whatsapp.net')[0];
let str = `📜شرح اوامر البوت📜
 *♡↞『نورت ${taguser}』*
╮─────✦❯┇🌿┇❮✦─────╭
*〄┃ بـووت ↞👑 بيبو 』*
*〄┃اليوم ↞ 🪧『 ${week} 』*
*〄┃وقت التشغيل ↞ ⌛『 ${uptime}』*
*〄┃لوضـع الـبوت ↞ 🪧『 عـام 』*
*〄┃الـمـنـصـه ↞ 🌐『 مفيش منصة دائمة』*
╯─────✦❯┇📜┇❮✦─────╰

*✧━━ • ━ 「 👑 」 ━ • ━━✧*
 *〄┃شـرح الـاوامـر┃ ↞ ❮ 📜 ❯* 
*✧━━ • ━ 「 👑 」 ━ • ━━✧*
*📜✬⃝┇اوامــر الــقـروب 』*
*↞ ❮ .اوامر-المشرفين ❯* 

*📜✬⃝┇اوامــر  الـأعـضـاء』*
*↞ ❮ .الاعضاء ❯* 

*📜✬⃝┇اوامــر الـتـرفــيـه 』*
*↞ ❮ .العاب ❯* 

*📜✬⃝┇اوامــر الــتـنـزيـل 』* 
*↞ ❮ .التحميلات ❯*

*📜✬⃝┇اوامــر الــصــور 』*
*↞ ❮ .الصور ❯* 

*📜✬⃝┇اوامـــر الـلــفــل 』*
*↞ ❮ .اللفل ❯* 

*📜✬⃝┇اوامــر الـمـلصـقات 』*
*↞ ❮ .ستيكرات ❯* 

*📜✬⃝┇اوامــر الـاصــوات 』*
*↞ ❮ .الاصوات ❯* 

*📜✬⃝┇اوامـر دينـي+سـؤال』*
*↞ ❮ .دين ❯* 

*📜✬⃝┇اوامــر  فتح الـبـوت』*
*↞ ❮ .فتح-البوت ❯* 

*📜✬⃝┇اوامــر الــمـطـور 』*
*↞ ❮ .قائمة_المطور ❯* 

*📜✬⃝┇جــمـيـع الـاوامــر 』*
 *↞ ❮ .المهام ❯* 
*✧━━ • ━ 「 ✤ 」 ━ • ━━✧*
❯⏐ 𝐵𝛩𝑇 𝐸𝐿𝐴𝐾𝑅𝐴𝐵
*「✧|───✦❯┇♥┇❮✦───|✧」*

`.trim();

conn.sendMessage(m.chat, {
        video: { url: videoUrl }, caption: str,
  mentions: [m.sender,global.conn.user.jid],
  gifPlayback: true,gifAttribution: 0
    }, { quoted: m });
}; 
handler.help = ['الاوامر']
handler.tags = ['hhs']
handler.command = ['الاوامر'] 

export default handler
function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}

    function ucapan() {
      const time = moment.tz('Egypt').format('HH')
      let res = "بداية يوم سعيده ☀️"
      if (time >= 4) {
        res = "صباح الخير 🌄"
      }
      if (time >= 10) {
        res = "مساء الخير ☀️"
      }
      if (time >= 15) {
        res = "مساء الخير 🌇"
      }
      if (time >= 18) {
        res = "مساء الخير 🌙"
      }
      return res
      }
