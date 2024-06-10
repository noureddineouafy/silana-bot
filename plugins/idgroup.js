var handler = async (m, {conn, groupMetadata }) => {

conn.reply(m.chat, `${await groupMetadata.id}`,   )

}
handler.help = ['idgroup']
handler.tags = ['owner']
handler.command = /^(idgroup)$/i

handler.group = true
handler.owner = true
export default handler  
