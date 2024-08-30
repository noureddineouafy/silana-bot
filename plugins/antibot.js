let handler = async (
	m,
	{ conn, usedPrefix, command, args, isOwner, isAdmin, isROwner },
) => {
	let chat = global.db.data.chats[m.chat];

	if (args[0] === "on") {
		if (chat.antiBot) {
			return m.reply("**ANTI BOT**\n_تم تفعيلها مسبقاً!_");
		} else {
			chat.antiBot = true;
			return m.reply("**ANTI BOT**\n_تم تفعيلها!_");
		}
	} else if (args[0] === "off") {
		if (!chat.antiBot) {
			return m.reply("**ANTI BOT**\n_تم إيقافها مسبقاً!_");
		} else {
			chat.antiBot = false;
			return m.reply("**ANTI BOT**\n_تم إيقافها!_");
		}
	} else {
		return m.reply(`استخدم \n ${usedPrefix}antibot <on/off>`);
	}
};

handler.help = ["antibot"];
handler.tags = ['owner'];
handler.group = true;
handler.command = ["antibot"];
handler.owner = true;
export default handler;
