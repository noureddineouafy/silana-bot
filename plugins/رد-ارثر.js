let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];
    let name = conn.getName(m.sender);
    let taguser = '@' + m.sender.split("@s.whatsapp.net")[0];
    let message = `*${taguser}*\n *「ياعم خـلاص تـعبـت وانـا برد 🙄」*`;

    conn.sendFile(m.chat, 'https://telegra.ph/file/c55c0eb6afb55c3dc5077.jpg', 'image.jpg', message, m);
};

handler.customPrefix = /^(بيبو)$/i;
handler.command = new RegExp;

export default handler;
