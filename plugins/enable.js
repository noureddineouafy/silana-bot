//import db from '../lib/database.js'

let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
	
const sections = [
   {
	title: `*≡ قــايــمة الــاخــتـيارات !*`,
	rows: [
	{title: "🔮 | ترحيب", rowId: `${usedPrefix + command} ترحيب`},
	{title: "🌎 | عام", rowId: `${usedPrefix + command} عام`},
	{title: "🔞 | عيب", rowId: `${usedPrefix + command} عيب`},
	{title: "🧬 | انجليزي", rowId: `${usedPrefix + command} انجليزي`},
	{title: "🔗 | الروابط", rowId: `${usedPrefix + command} الروابط`},
    {title: "🚫 | الحذف", rowId: `${usedPrefix + command} الحذف`},
    {title: "🖼 | الملصق", rowId: `${usedPrefix + command} الملصق`},
	{title: "⏏️ | اللفل", rowId: `${usedPrefix + command} اللفل`},
	{title: "🗣️ | التكلم", rowId: `${usedPrefix + command} التكلم`},
	{title: "🔎 | كشف", rowId: `${usedPrefix + command} كشف`},
	{title: "📑 | الملفات", rowId: `${usedPrefix + command} الملفات`},
	{title: "🛡️ | قيد", rowId: `${usedPrefix + command} قيد`},
	{title: "💬 | خاص", rowId: `${usedPrefix + command} خاص`},
	{title: "👥 | جروبات", rowId: `${usedPrefix + command} جروبات`}
	]
    },
]

const listMessage = {
  text: '\n*فيما يلي قائمة بما يمكنك تشغيله وإيقافه*',
  footer: igfg,
  title: `*≡ قـايـمة الأخــتـيارات*`,
  buttonText: "*اضــغط هـنا*",
  sections
}

  let isEnable = /true|enable|فعل|(turn)?on|1/i.test(command)
  let chat = global.db.data.chats[m.chat]
  let user = global.db.data.users[m.sender]
  let bot = global.db.data.settings[conn.user.jid] || {}
  let type = (args[0] || '').toLowerCase()
  let isAll = false, isUser = false
  switch (type) {
    case 'ترحيب':
    case 'bv':
    case 'bienvenida':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.welcome = isEnable
      break
      
      case 'كشف':
      case 'detector':
        if (!m.isGroup) {
         if (!isOwner) {
           global.dfail('group', m, conn)
          throw false
        }
       } else if (!isAdmin) {
         global.dfail('admin', m, conn)
         throw false
       }
       chat.detect = isEnable
     break
      case 'الملصق':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.autosticker = isEnable
      break
    case 'الحذف':
    case 'delete':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.delete = !isEnable
      break

    case 'الملفات':
    case 'documento':
    if (m.isGroup) {
        if (!(isAdmin || isOwner)) return dfail('admin', m, conn)
      }
    chat.useDocument = isEnable
    break
    case 'عام':
    case 'publico':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['self'] = !isEnable
      break
    case 'الروابط':
    case 'antilinkwa':
    case 'antilinkwha':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiLink = isEnable
      break
      
      case 'انجليزي':
      case 'sololatin':
      case 'onlyenglishs':
      case 'onlyeng':
      case 'onlyenglish':
      case 'soloenglish':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.onlyenglish = isEnable
      break
      
      case 'عيب':
      case '+18':
       if (m.isGroup) {
         if (!(isAdmin || isOwner)) {
           global.dfail('admin', m, conn)
            throw false
           }}
    chat.nsfw = isEnable          
    break

    case 'اللفل':
    isUser = true
     user.autolevelup = isEnable
     break
     
     case 'التكلم':
     case 'autosimi':
     case 'autosimsimi':
      isUser = true
      user.chatbot = isEnable
     break
     
    case 'قيد':
    case 'restringir':
      isAll = true
      if (!isOwner) {
        global.dfail('owner', m, conn)
        throw false
      }
      bot.restrict = isEnable
      break
    
    case 'خاص':
    case 'onlydm':
    case 'onlymd':
    case 'solopv':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['pconly'] = isEnable
      break
      
    case 'جروبات':
    case 'onlygp':
    case 'grouponly':
    case 'sologp':
    case 'sologrupo':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['gconly'] = isEnable
      break
      
    default:
     if (!/[01]/.test(command)) return m.reply(`
*≡ قــايـمة الاخــتـيارات !*

*【❖❘ الـمشـرفـيـن ❘❖】*
*༺━┈┈┉ ⊱╠✣╣⊰ ┉┈┈━༻*
*┆ ترحيب*
*┆ الروابط*
*┆ عيب*
*┆ انجليزي*
*┆ الملصق*
*┆ كشف*
*┆ الحذف*
*༺━┈┈┉ ⊱╠✣╣⊰ ┉┈┈━༻* 

*【❖❘ الـمـسـتخدم ❘❖】*
*༺━┈┈┉ ⊱╠✣╣⊰ ┉┈┈━༻*
*┆ اللفل*
*┆ التكلم*  
*༺━┈┈┉ ⊱╠✣╣⊰ ┉┈┈━༻*

*【❖❘ الــمـطـور ❘❖】*
*༺━┈┈┉ ⊱╠✣╣⊰ ┉┈┈━༻*
*┆ عام*
*┆ خاص*
*┆ جروبات*
*༺━┈┈┉ ⊱╠✣╣⊰ ┉┈┈━༻*
*📌 مــثال :*
*${usedPrefix}فعل ترحيب*
*${usedPrefix}اوقف ترحيب*
`)
      throw false
  }
  /*conn.sendButton(m.chat, `
≡ *OPTIONS*
┌───────────
▢ 🗂️ *Type:* ${type} 
▢ ⚙️ *Condition:* ${isEnable ? 'Active ✅' : 'Deactive 🔴'}
▢ 🏮 *For:* ${isAll ? 'this bot' : isUser ? '' : 'this chat'}
└───────────
`,igfg, null, [[`${isEnable ? '🔴 Deactive' : '✅ Active'}`, `${isEnable ? `${usedPrefix}off ${type}` : `${usedPrefix}on ${type}`}`], ['⦙☰ Menu', `${usedPrefix}help`]],m)
*/

m.reply(`
*تــم ${isEnable ? 'تــفـعـيل' : 'ايــقاف'} ${type} ${isAll ? 'لــهذا الـبوت' : isUser ? '' : 'لــهذا الـبوت'}*
`.trim()) 

}
handler.help = ['en', 'dis'].map(v => v + 'able <option>')
handler.tags = ['nable']
handler.command = /^فعل|وقف$/i

export default handler
