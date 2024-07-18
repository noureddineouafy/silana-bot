
let timeout = 60000
let poin = 500
let handler = async (m, { conn, command, usedPrefix }) => {
    conn.tebakbendera = conn.tebakbendera ? conn.tebakbendera : {}
    let id = m.chat
    if (id in conn.tebakbendera) {
        conn.reply(m.chat, '❐┃لم يتم الاجابة علي السؤال بعد┃❌ ❯', conn.tebakbendera[id][0])
        throw false
    }
    let src = await (await fetch('https://gist.githubusercontent.com/ggbot564/de6999400bb50eecd7b5f65f67f66786/raw/dd9a5a3cf73fc6bd67c04b3f1a88eea0f049f1db/cars')).json()
  let json = src[Math.floor(Math.random() * src.length)]
let caption = `*˼‏❖˹┇⇠『السؤال ${command.toUpperCase()}』*
 *「✧|────✦❯◇❮✦────|✧」*
  *〄↞┇الـوقـت⏱️↞ ${(timeout / 1000).toFixed(2)}┇*
  *〄↞┇الـجـائـزة🎖↞ ${poin} ┇*
 *「✧|────✦❯◇❮✦────|✧」*
> استخدم انسحب للأنسحاب‼️
*✧━ • ━ 「 ✤ 」 ━ • ━✧*
> ❯⏐ ᎬᏞᎯᏦᎡᎬᏰ !
     `.trim()
    conn.tebakbendera[id] = [
        await conn.sendFile(m.chat, json.img, '', caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.tebakbendera[id]) conn.reply(m.chat, `*❮ 💧┇انتهي الوقت┇💧❯*\n*❐↞┇الاجـابـة⚡️↞ ${json.name}*┇`, conn.tebakbendera[id][0])
            delete conn.tebakbendera[id]
        }, timeout)
    ]
}
handler.help = ['سيارات']
handler.tags = ['new']
handler.command = /^عربيه/i

export default handler
