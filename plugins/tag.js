let handler = async (m, { conn, text, isAdmin, participants}) => {
	
    let users = participants.map(u => u.id).filter(v => v !== conn.user.jid)
    if (!m.quoted) throw `Reply message`
    conn.sendMessage(m.chat, { forward: m.quoted.fakeObj, mentions: users } )
}

handler.help = ['tag']
handler.tags = ['owner']
handler.command = /^(منشن)$/i
handler.admin = true
handler.group = true
export default handler
