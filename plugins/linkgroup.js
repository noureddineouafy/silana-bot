import { areJidsSameUser } from '@adiwajshing/baileys'

let handler = async (m, { conn, args }) => {
    let group = m.chat
    if (/^[0-9]{5,16}-?[0-9]+@g\.us$/.test(args[0])) group = args[0]
    if (!/^[0-9]{5,16}-?[0-9]+@g\.us$/.test(group)) throw 'يمكن استخدام هذا الأمر فقط داخل المجموعات.'
    let groupMetadata = await conn.groupMetadata(group)
    if (!groupMetadata) throw 'بيانات المجموعة غير معرّفة :\\'
    if (!('participants' in groupMetadata)) throw 'قائمة الأعضاء غير معرّفة :('
    let me = groupMetadata.participants.find(user => areJidsSameUser(user.id, conn.user.id))
    if (!me) throw 'أنا لست في هذه المجموعة :('
    if (!me.admin) throw 'لست مشرفًا في هذه المجموعة T_T'
    m.reply('https://chat.whatsapp.com/' + await conn.groupInviteCode(group))
}

handler.help = ['linkgroup']
handler.tags = ['tools']
handler.command = /^linkgroup$/i

export default handler
