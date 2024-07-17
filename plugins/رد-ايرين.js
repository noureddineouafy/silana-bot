let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];
    let name = conn.getName(m.sender);
    let taguser = '@' + m.sender.split("@s.whatsapp.net")[0];
    let message = `*${taguser}*\n *「اعـظـم بـطـل فـي الـعـالـم✨🖤」*`;

    conn.sendFile(m.chat, 'https://telegra.ph/file/ae2a5c0e2fdd0db349433.jpg', 'image.jpg', message, m);
};

handler.customPrefix = /^(ايرين)$/i;
handler.command = new RegExp;

export default handler;

