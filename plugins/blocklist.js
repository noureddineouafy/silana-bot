// Instagram: noureddine_ouafy

let handler = async (m, { conn, usedPrefix }) => {
    await conn.fetchBlocklist().then(async data => {
        let txt = `*「 قائمة الأرقام المحظورة 」*\n\n*العدد الكلي:* ${data.length}\n\n┌─\n`
        for (let i of data) {
            txt += `├ @${i.split("@")[0]}\n`
        }
        txt += "└────"
        return conn.reply(m.chat, txt, m, { mentions: await conn.parseMention(txt) })
    }).catch(err => {
        console.log(err);
        throw 'لا يوجد أرقام محظورة!'
    })
}

handler.tags = ['owner']
handler.help = ['blocklist']
handler.command = /^(blocklist|listblock)$/i
handler.owner = true
export default handler
