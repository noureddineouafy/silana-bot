
let handler = async (m, { conn, args, text, usedPrefix, command }) => {
if (!text) throw `*✦┇اكــتـب الـرقـم الي تبغى ترسل له الـدعوه ┇✓*\n*مــثـال :\n*${usedPrefix + command}* 967780763155`
if (text.includes('+')) throw  `*✦لا تحط  العـلامة هذي +✦*`
if (isNaN(text)) throw '*✦┇دخــل الـرقـم بـدـون مـسافـات ┇✓*'
let group = m.chat
let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group)
 
      await conn.reply(text+'@s.whatsapp.net', `*دعــوه لــدـخول القروب !*\n*الــرابـط :* ${link}`, m, {mentions: [m.sender]})
        m.reply(`*✓┃✅┃تـــم ارســال رابــط الـدعـوه ✦*`) 

}
handler.help = ['invite <917xxx>']
handler.tags = ['group']
handler.command = ['دعوة','دعوه'] 
handler.group = true
handler.admin = false
handler.botAdmin = true

export default handler
