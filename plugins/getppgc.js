import fetch from "node-fetch";
let handler = async (m, { conn, command }) => {
	try {
		let q = m.quoted ? m.quoted : m
		let pp = await conn
			.profilePictureUrl(q.chat, "image")
			.catch((_) => "https://telegra.ph/file/24fa902ead26340f3df2c.png");
		conn.sendFile(m.chat, pp, "nih bang.png", "*هذه هي صورة البروفايل الخاصة بهذه المجموعة....*\nتابع صاحب البوت في حسابه تشجيعا له ♥\ninstagram.com/noureddine_ouafy", m, {
			jpegThumbnail: await (await fetch(pp)).buffer(),
		});
	} catch {
		let pp = await conn
			.profilePictureUrl(m.chat, "image")
			.catch((_) => "https://telegra.ph/file/24fa902ead26340f3df2c.png");
		conn.sendFile(m.chat, pp, "ppsad.png", "*هذه هي صورة البروفايل الخاصة بهذه المجموعة....*\nتابع صاحب البوت في حسابه تشجيعا له ♥\nhttps://atom.bio/elakrabelyotyobr", m, {
			jpegThumbnail: await (await fetch(pp)).buffer(),
		});
	}
};
handler.help = ["getppgc"];
handler.tags = ['owner'];
handler.command = /^(بروفايل-جروب)$/i;
export default handler;
