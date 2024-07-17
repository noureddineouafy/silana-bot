let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];
    let name = conn.getName(m.sender);
    let taguser = '@' + m.sender.split("@s.whatsapp.net")[0];
    let message = `*${taguser}*\n*「عمتك و مـزة كيميتسو❄️」*`;

    conn.sendFile(m.chat, 'https://telegra.ph/file/03bef07dfae8c091fec04.jpg', 'image.jpg', message, m);
};

handler.customPrefix = /^(كاناو)$/i;
handler.command = new RegExp;

export default handler;
