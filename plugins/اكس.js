import TicTacToe from '../lib/tictactoe.js'

let handler = async (m, { conn, usedPrefix, command, text }) => {
    conn.game = conn.game ? conn.game : {}
    if (Object.values(conn.game).find(room => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender))) throw `✦┇ انت ماذلت في الجيم, لحذف الجيم اكتب *${usedPrefix}حذففف┇✓*`
    if (!text) throw `✦┇وضـع رقـم في الـغـرفـة┇✦`
    let room = Object.values(conn.game).find(room => room.state === 'WAITING' && (text ? room.name === text : true))
    // m.reply('[WIP Feature]')
    if (room) {
        m.reply('*┃تـم ايـجـاد الشـخـص الاخـر┃✓*')
        room.o = m.chat
        room.game.playerO = m.sender
        room.state = 'PLAYING'
        let arr = room.game.render().map(v => {
            return {
                X: '❎',
                O: '⭕',
                1: '1️⃣',
                2: '2️⃣',
                3: '3️⃣',
                4: '4️⃣',
                5: '5️⃣',
                6: '6️⃣',
                7: '7️⃣',
                8: '8️⃣',
                9: '9️⃣',
            }[v]
        })
        let str = `
*✦┇انتظر @${room.game.currentTurn.split('@')[0]} هو اللاعب الاول┇✦*

${arr.slice(0, 3).join('')}
${arr.slice(3, 6).join('')}
${arr.slice(6).join('')}

▢ *Room ID* ${room.id}

❏ *القوانين✓*
┃🚫┃┊‣ اصنع 3 صفوف من الرموز عموديا, أفقيا او انحرافي للفوز ‣ اكتب *surrender* للانسحاب
`.trim()
        if (room.x !== room.o) await conn.reply(room.x, str, m, {
            mentions: conn.parseMention(str)
        })
        await conn.reply(room.o, str, m, {
            mentions: conn.parseMention(str)
        })
    } else {
        room = {
            id: 'tictactoe-' + (+new Date),
            x: m.chat,
            o: '',
            game: new TicTacToe(m.sender, 'o'),
            state: 'WAITING'
        }
        if (text) room.name = text

     conn.reply(m.chat, `*❏┇🀄تـوقـع الـشـريـك🀄┇❏*\n*⎔┇اكتب الامر التالي للدخول في نفس الجيم┇*
❏ *『${usedPrefix + command} ${text}』*

*↞⎔┇🎖الجائزه: 4999 اكس بي┇*`, m, {
            mentions: conn.parseMention(text)
        })

   conn.game[room.id] = room
    }

}

handler.help = ['tictactoe <tag number>']
handler.tags = ['game']
handler.command = ['tictactoe', 'ttc', 'اكس', 'xo']

export default handler
