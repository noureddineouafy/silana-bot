let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];
    let name = conn.getName(m.sender);
    let taguser = '@' + m.sender.split("@s.whatsapp.net")[0];
    let message = `*${taguser}*\n *وش تـبـي مـن عـمـك🔱*`;

    conn.sendFile(m.chat, 'https://telegra.ph/file/8fdf39609ee6ce3ad4163.jpg', 'image.jpg', message, m);
};

handler.customPrefix = /^(شانكوس)$/i;
handler.command = new RegExp;

export default handler;
