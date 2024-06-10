let handler = async (m, { conn, text, usedPrefix, command }) => {
    let who
        if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
        else who = m.chat
        let user = global.db.data.users[who]
        if (!who) throw `🎯 Tag Or Mention Someone\n\n📌Example : ${usedPrefix + command} @user`
    if (global.allowed.includes(who.split`@`[0])) throw '*🎯The User Mentioned Is Already Allowed To Use The Bot In Personal Chat*'
    global.allowed.push(`${who.split`@`[0]}`)
    
    conn.reply(m.chat, ` @${who.split`@`[0]} Got The Permission To Use The Bot In Personal Chat✅`, m, { mentions: [who] })
    
    }
    handler.help = ['permit']
    handler.tags = ['owner']
    handler.command = ['permit'] 
    
    handler.group = true
    handler.rowner = true
    
    export default handler
