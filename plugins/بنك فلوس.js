let handler = async (m, {conn, usedPrefix}) => {
	
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let user = global.db.data.users[who]
    let username = conn.getName(who)
    //let { wealth } = global.db.data.users[who]
    if (!(who in global.db.data.users)) throw `✳️ لم يتم العثور على المستخدم في قاعدة البيانات الخاصة بي`

    var wealth = '❁┇حطم😭↞'
     if (`${user.bank}`           <= 3000){
            wealth = '❁┇حطم😭↞'
      } else if (`${user.bank}`   <= 6000){
            wealth = '❁┇فقير😢↞'
        } else if (`${user.bank}` <= 100000){
            wealth = '❁┇متوسط💸↞'
        } else if (`${user.bank}` <= 1000000){
            wealth = '❁┇ثري💸💰↞'
        } else if (`${user.bank}` <= 10000000){
            wealth = 'مليونير🤑↞'
        } else if (`${user.bank}` <= 1000000000){
            wealth = '❁┇صاحب اموال طائلة🤑↞'
        } else if (`${user.bank}` <= 10000000000){
            wealth = '❁┇الملياردير🤑🤑↞'
        }    
    
    conn.reply(m.chat, `┃🚫┃┊✓🏦 *Bank↞ | ${username}*

*❁┇🪙 Gold┇↞* : ${user.bank}

*Wealth :* ${wealth}

`, m, { mentions: [who] })  //${user.chicken}
}
handler.help = ['bank']
handler.tags = ['economy']
handler.command = ['بنك', 'vault'] 

export default handler
