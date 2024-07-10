let handler = async (m, { conn, text, usedPrefix, command }) => {
    let who
        if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
        else who = m.chat
        let user = global.db.data.users[who]
        if (!who) throw `🎯علامة أو ذكر شخص ما \n\n📌Example : ${usedPrefix + command} @user`
    if (global.allowed.includes(who.split`@`[0])) throw '*🎯يُسمح بالفعل للمستخدم المذكور باستخدام الروبوت في الدردشة الشخصية *'
    global.allowed.push(`${who.split`@`[0]}`)
    
    conn.reply(m.chat, ` @${who.split`@`[0]} إذن لاستخدام الروبوت في الدردشة الشخصية, m, { mentions: [who] })
    
    }
    handler.help = ['permit']
    handler.tags = ['owner']
    handler.command = ['برميوم'] 
    
    handler.group = true
    handler.rowner = true
    
    export default handler
