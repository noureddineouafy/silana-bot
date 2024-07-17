let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];
    let name = conn.getName(m.sender);
    let taguser = '@' + m.sender.split("@s.whatsapp.net")[0];
    let message = `*${taguser}*\n *「سأحتل زيكولا من أجل أسيل🪽」*`;

    conn.sendFile(m.chat, 'https://telegra.ph/file/92a2d035ee8ac62adddf7.jpg', 'image.jpg', message, m);
};

handler.customPrefix = /^(زيكولا|اسيل)$/i;
handler.command = new RegExp;

export default handler;
