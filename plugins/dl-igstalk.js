import fg from 'api-dylux'
let handler= async (m, { conn, args, text, usedPrefix, command }) => {
	
    if (!args[0]) throw `♨ ادخل اسم لشخص في انستغرام\n\n📌مثال: ${usedPrefix + command} mahmoud_emam9` 
    let res = await fg.igStalk(args[0])
    let te = `
*┐────【 المعلومات 】 ────┌*
⇠ *🔖 الرقم:* ${res.name} 
⇠ *🔖 الاسم:* ${res.username}
⇠ *👥 المتابعين:* ${res.followersH}
⇠ *🫂 الذي يتابعهم:* ${res.followingH}
⇠ *📌 البايو:* ${res.description}
⇠ *🏝️ المنشورات:* ${res.postsH}

⇠ *🔗 الرابط* : https://instagram.com/${res.username.replace(/^@/, '')}
*┘─────【 المعلومات 】─────└*`

     await conn.sendFile(m.chat, res.profilePic, 'tt.png', te, m)
     
}
handler.help = ['igstalk']
handler.tags = ['dl']
handler.command = ['انستغرام'] 

export default handler