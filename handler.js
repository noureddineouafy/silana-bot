import { smsg } from './lib/simple.js'
import { format } from 'util'
import { fileURLToPath } from 'url'
import path, { join } from 'path'
import { unwatchFile, watchFile } from 'fs'
import chalk from 'chalk'
import fs from 'fs'
import fetch from 'node-fetch'
import moment from 'moment-timezone'
/**
 * @type {import('@adiwajshing/baileys')}
 */
const { 
proto,
getAggregateVotesInPollMessage
 } = (await import('@adiwajshing/baileys')).default
const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(function () {
    clearTimeout(this)
    resolve()
}, ms))

/**
 * Handle messages upsert
 * @param {import('@adiwajshing/baileys').BaileysEventMap<unknown>['messages.upsert']} groupsUpdate 
 */
 
export async function handler(chatUpdate) {
    this.msgqueque = this.msgqueque || []
    if (!chatUpdate)
        return
    conn.pushMessage(chatUpdate.messages).catch(console.error)
    let m = chatUpdate.messages[chatUpdate.messages.length - 1]
    
    
    if (!m)
        return
    if (global.db.data == null)
        await global.loadDatabase()
    try {
        m = smsg(this, m) || m
        if (!m)
            return
        m.exp = 0
        m.limit = false
        try {
            // TODO: use loop to insert data instead of this
            let user = global.db.data.users[m.sender]
            if (typeof user !== 'object')
                global.db.data.users[m.sender] = {}
            if (user) {
            } else
                global.db.data.users[m.sender] = {
                }
            let chat = global.db.data.chats[m.chat]
            if (typeof chat !== 'object')
                global.db.data.chats[m.chat] = {}
            if (chat) {
                if (!('isBanned' in chat))
                    chat.isBanned = false
                if (!('acc' in chat))
                    chat.acc = false
                if (!('welcome' in chat))
                    chat.welcome = false
                if (!('detect' in chat))
                    chat.detect = false
                if (!('sWelcome' in chat))
                    chat.sWelcome = ''
                if (!('sBye' in chat))
                    chat.sBye = ''
                if (!('sPromote' in chat))
                    chat.sPromote = ''
                if (!('sDemote' in chat))
                    chat.sDemote = ''
                if (!('delete' in chat))
                    chat.delete = false
                if (!('antiLink' in chat))
                    chat.antiLink = false
                if (!('anticall' in chat)) 
                    chat.antiCall = true
                if (!('antiSpam' in chat)) 
                    chat.antiSpaml = true
                if (!('antiFoto' in chat))
                    chat.antiFoto = false
                if (!('antiVideo' in chat))
                    chat.antiVideo = false
                if (!('antiSticker' in chat))
                    chat.antiSticker = false
                if (!('antiAudio' in chat))
                    chat.antiAudio = false
                if (!('viewonce' in chat))
                    chat.viewonce = false
                if (!('antiBadword' in chat)) 
                    chat.antiBadword = false
                if (!('simi' in chat))
                    chat.simi = false
                if (!isNumber(chat.expired))
                    chat.expired = 0
            } else
                global.db.data.chats[m.chat] = {
                    isBanned: false,
                    antiSpam: true,
                    acc: false,
                    welcome: true,
                    detect: false,
                    sWelcome: '',
                    sBye: '',
                    sPromote: '',
                    sDemote: '',
                    delete: false,
                    antiLink: false,
                    antiCall: false,
                    antiFoto: false,
                    antiVideo: false,
                    antiSticker: false,
                    antiAudio: false,
                    viewonce: false,
                    antiBadword: false,
                    simi: false,
                    expired: 0,
                    rpgs: false,
                    games: false
                }
            let settings = global.db.data.settings[this.user.jid]
            if (typeof settings !== 'object') global.db.data.settings[this.user.jid] = {}
            if (settings) {
                if (!('self' in settings)) settings.self = false
                if (!('autoread' in settings)) settings.autoread = true
                if (!('restrict' in settings)) settings.restrict = true
                if (!('autorestart' in settings)) settings.autorestart = true
                if (!('anticall' in settings)) settings.antiCall = true
                if (!('image' in settings)) settings.image = true
                if (!('gif' in settings)) settings.gif = false 
                if (!('teks' in settings)) settings.teks = false
                if (!('doc' in settings)) settings.doc = false
                if (!('loc' in settings)) settings.loc = false
            } else global.db.data.settings[this.user.jid] = {
                self: false,
                autoread: true,
                autoBio: false,
                antiCall: true, 
                restrict: true,
                image: true,
                gif: false,
                teks: false,
                doc: false,
                loc: false,
                autorestart: false,
            }
        } catch (e) {
            console.error(e)
        }
        if (opts['nyimak'])
            return
        if (!m.fromMe && opts['self'])
            return
        if (opts['pconly'] && m.chat.endsWith('g.us'))
            return
        if (opts['gconly'] && !m.chat.endsWith('g.us'))
            return
        if (opts['swonly'] && m.chat !== 'status@broadcast')
            return
        if (typeof m.text !== 'string')
            m.text = ''

        const isROwner = [conn.decodeJid(global.conn.user.id), ...global.owner.map(([number]) => number)].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)

        const isOwner = isROwner || db.data.users[m.sender].owner
        const isPrems = isROwner || db.data.users[m.sender].premium

        if (opts['queque'] && m.text && !(isMods || isPrems)) {
            let queque = this.msgqueque, time = 1000 * 5
            const previousID = queque[queque.length - 1]
            queque.push(m.id || m.key.id)
            setInterval(async function () {
                if (queque.indexOf(previousID) === -1) clearInterval(this)
                await delay(time)
            }, time)
        }

        if (m.isBaileys)
            return
        m.exp += Math.ceil(Math.random() * 10)

        let usedPrefix
        let _user = global.db.data && global.db.data.users && global.db.data.users[m.sender]

        const groupMetadata = (m.isGroup ? ((conn.chats[m.chat] || {}).metadata || await this.groupMetadata(m.chat).catch(_ => null)) : {}) || {}
        const participants = (m.isGroup ? groupMetadata.participants : []) || []
        const user = (m.isGroup ? participants.find(u => conn.decodeJid(u.id) === m.sender) : {}) || {} // User Data
        const bot = (m.isGroup ? participants.find(u => conn.decodeJid(u.id) == this.user.jid) : {}) || {} // Your Data
        const isRAdmin = user?.admin == 'superadmin' || false
        const isAdmin = isRAdmin || user?.admin == 'admin' || false // Is User Admin?
        const isBotAdmin = bot?.admin || false // Are you Admin?

        const ___dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), './plugins')
        for (let name in global.plugins) {
            let plugin = global.plugins[name]
            if (!plugin)
                continue
            if (plugin.disabled)
                continue
            const __filename = join(___dirname, name)
            if (typeof plugin.all === 'function') {
                try {
                    await plugin.all.call(this, m, {
                        chatUpdate,
                        __dirname: ___dirname,
                        __filename
                    })
                } catch (e) {
                    // if (typeof e === 'string') continue
                    console.error(e)
                    for (let [jid] of global.owner.filter(([number, _, isDeveloper]) => isDeveloper && number)) {
                        let data = (await conn.onWhatsApp(jid))[0] || {}
                        if (data.exists)
                            m.reply(`❲ SISTEM ERROR ❳

❲ 𝐅𝐫𝐨𝐦 𝐏𝐥𝐮𝐠𝐢𝐧𝐬 ❳ : ${name}
❲ 𝐅𝐫𝐨𝐦 𝐒𝐞𝐧𝐝𝐞𝐫 ❳ : ${m.sender}
❲ 𝐅𝐫𝐨𝐦 𝐂𝐡𝐚𝐭 ❳ : ${m.chat}
❲ 𝐅𝐫𝐨𝐦 𝐂𝐨𝐦𝐦𝐚𝐧𝐝 ❳ : ${m.text}

\`\`\`${format(e)}\`\`\`

${global.namebot}
`.trim(), data.jid)
                    }
                }
            }
            if (!opts['restrict'])
                if (plugin.tags && plugin.tags.includes('admin')) {
                    global.dfail('restrict', m, this)
                    continue
                }
                
            const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
            let _prefix = plugin.customPrefix ? plugin.customPrefix : conn.prefix ? conn.prefix : global.prefix
            let match = (_prefix instanceof RegExp ? // RegExp Mode?
                [[_prefix.exec(m.text), _prefix]] :
                Array.isArray(_prefix) ? // Array?
                    _prefix.map(p => {
                        let re = p instanceof RegExp ? // RegExp in Array?
                            p :
                            new RegExp(str2Regex(p))
                        return [re.exec(m.text), re]
                    }) :
                    typeof _prefix === 'string' ? // String?
                        [[new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix))]] :
                        [[[], new RegExp]]
            ).find(p => p[1])
            if (typeof plugin.before === 'function') {
                if (await plugin.before.call(this, m, {
                    match,
                    conn: this,
                    participants,
                    groupMetadata,
                    user,
                    bot,
                    isROwner,
                    isOwner,
                    isRAdmin,
                    isAdmin,
                    isBotAdmin,
                    isPrems,
                    chatUpdate,
                    __dirname: ___dirname,
                    __filename
                }))
                    continue
            }
            if (typeof plugin !== 'function')
                continue
            if ((usedPrefix = (match[0] || '')[0])) {
                let noPrefix = m.text.replace(usedPrefix, '')
                let [command, ...args] = noPrefix.trim().split` `.filter(v => v)
                args = args || []
                let _args = noPrefix.trim().split` `.slice(1)
                let text = _args.join` `
                
                command = (command || '').toLowerCase()
                let fail = plugin.fail || global.dfail // When failed
                let isAccept = plugin.command instanceof RegExp ? // RegExp Mode?
                    plugin.command.test(command) :
                    Array.isArray(plugin.command) ? // Array?
                        plugin.command.some(cmd => cmd instanceof RegExp ? // RegExp in Array?
                            cmd.test(command) :
                            cmd === command
                        ) :
                        typeof plugin.command === 'string' ? // String?
                            plugin.command === command :
                            false

                if (!isAccept)
                    continue
                m.plugin = name
                if (m.chat in global.db.data.chats || m.sender in global.db.data.users) {
                    let chat = global.db.data.chats[m.chat]
                    let user = global.db.data.users[m.sender]
                    if (name != 'own-unbanchat.js' && name != 'own-exec.js' && name != 'own-exec2.js' && name != 'own-delete.js' && chat?.isBanned && !isROwner)
                        return // Except this
                    if (name != 'own-unbanuser.js' && user?.banned && !user?.owner)
                        return
                }
                if (m.isGroup && !db.data.chats[m.chat].games && plugin.tags && plugin.tags.includes("game")) { // fitur rpg 
                fail('game', m, this)
                continue
                }
                if (m.isGroup && !db.data.chats[m.chat].rpgs && plugin.tags && plugin.tags.includes("rpg")) { // fitur rpg
                fail('rpg', m, this)
                continue
                }
                if (plugin.rowner && plugin.owner && !(isROwner || isOwner)) { // Both Owner
                    fail('owner', m, this)
                    continue
                }
                if (plugin.rowner && !isROwner) { // Real Owner
                    fail('rowner', m, this)
                    continue
                }
                if (plugin.owner && !isOwner) { // Number Owner
                    fail('owner', m, this)
                    continue
                }
                if (plugin.premium && !isPrems) { // Premium
                    fail('premium', m, this)
                    continue
                }
                if (plugin.group && !m.isGroup) { // Group Only
                    fail('group', m, this)
                    continue
                } else if (plugin.botAdmin && !isBotAdmin) { // You Admin
                    fail('botAdmin', m, this)
                    continue
                } else if (plugin.admin && !isAdmin) { // User Admin
                    fail('admin', m, this)
                    continue
                }
                if (plugin.private && m.isGroup) { // Private Chat Only
                    fail('private', m, this)
                    continue
                }
                if (plugin.register == true && _user.registered == false) { 
                    fail('unreg', m, this)
                    continue
                }
                m.isCommand = true
                let xp = 'exp' in plugin ? parseInt(plugin.exp) : 23 // mendapatkan exp tiap command 
                if (xp > 200)
                    m.reply('Ngecit')
                else
                    m.exp += xp
                if (!isPrems && plugin.limit && global.db.data.users[m.sender].limit < plugin.limit * 7) {
                    this.reply(m.chat, `The limit has reached the maximum limit.\nSubscribe immediately to get unlimited limits⚡*`, m)
                    continue // Limit habis
                }
                if (plugin.level > _user.level) {
                    this.reply(m.chat, `Level Required ${plugin.level} To Use This Command\n*Your Level:* ${_user.level}`, m)
                    continue // If the level has not been reached
                }
                let extra = {
                    match,
                    usedPrefix,
                    noPrefix,
                    _args,
                    args,
                    command,
                    text,
                    conn: this,
                    participants,
                    groupMetadata,
                    user,
                    bot,
                    isROwner,
                    isOwner,
                    isRAdmin,
                    isAdmin,
                    isBotAdmin,
                    isPrems,
                    chatUpdate,
                    __dirname: ___dirname,
                    __filename
                }
                try {
                    await plugin.call(this, m, extra)
                    if (!isPrems)
                        m.limit = m.limit || plugin.limit || false
                } catch (e) {
                    // Error occured
                    m.error = e
                    console.error(e)
                    if (e) {
                        let text = format(e)
                        for (let key of Object.values(global.APIKeys))
                            text = text.replace(new RegExp(key, 'g'), '#HIDDEN#')
                        if (e.name)
                            for (let [jid] of global.owner.filter(([number, _, isDeveloper]) => isDeveloper && number)) {
                                let data = (await conn.onWhatsApp(jid))[0] || {}
                                if (data.exists)
                                    m.reply(`❲ REPORT SISTEM ❳
                                    
❲ 𝐅𝐫𝐨𝐦 𝐏𝐥𝐮𝐠𝐢𝐧𝐬 ❳ : ${m.plugin}
❲ 𝐅𝐫𝐨𝐦 𝐒𝐞𝐧𝐝𝐞𝐫 ❳ : ${m.sender}
❲ 𝐅𝐫𝐨𝐦 𝐂𝐡𝐚𝐭 ❳ : ${m.chat}
❲ 𝐅𝐫𝐨𝐦 𝐂𝐨𝐦𝐦𝐚𝐧𝐝 ❳ : ${usedPrefix}${command} ${args.join(' ')}
❲ ERROR LOG ❳ : 

\`\`\`${text}\`\`\`

${global.namebot}
`.trim(), data.jid)
                            }
                        m.reply(text)
                    }
                } finally {
                    // m.reply(util.format(_user))
                    if (typeof plugin.after === 'function') {
                        try {
                            await plugin.after.call(this, m, extra)
                        } catch (e) {
                            console.error(e)
                        }
                    }
                }
                break
            }
        }
    } catch (e) {
        console.error(e)
    } finally {
        if (opts['queque'] && m.text) {
            const quequeIndex = this.msgqueque.indexOf(m.id || m.key.id)
            if (quequeIndex !== -1)
                this.msgqueque.splice(quequeIndex, 1)
        }
        let user, stats = global.db.data.stats
        if (m) {
            if (m.sender && (user = global.db.data.users[m.sender])) {
                user.exp += m.exp
                user.limit -= m.limit * 8
            }

            let stat
            if (m.plugin) {
              let rn = ['recording','composing']
              let jd = rn[Math.floor(Math.random() * rn.length)]
              await this.sendPresenceUpdate(jd,m.chat)
                let now = +new Date
                if (m.plugin in stats) {
                    stat = stats[m.plugin]
                    if (!isNumber(stat.total)) stat.total = 1
                    if (!isNumber(stat.success)) stat.success = m.error != null ? 0 : 1
                    if (!isNumber(stat.last)) stat.last = now
                    if (!isNumber(stat.lastSuccess)) stat.lastSuccess = m.error != null ? 0 : now
                } else stat = stats[m.plugin] = {
                    total: 1,
                    success: m.error != null ? 0 : 1,
                    last: now,
                    lastSuccess: m.error != null ? 0 : now
                }
                stat.total += 1
                
                if (m.isGroup) global.db.data.chats[m.chat].delay = now
                else global.db.data.users[m.sender].delay = now

                stat.last = now
                if (m.error == null) {
                    stat.success += 1
                    stat.lastSuccess = now
                }
            }
        }

        try {
            if (!opts['noprint']) await (await import(`./lib/print.js`)).default(m, this)
        } catch (e) {
            console.log(m, m.quoted, e)
        }
        if (global.db.data.settings[this.user.jid].autoread) await this.readMessages([m.key])
    }
}


/**
 * Handle groups participants update
 * @param {import('@adiwajshing/baileys').BaileysEventMap<unknown>['group-participants.update']} groupsUpdate 
 */
export async function participantsUpdate({ id, participants, action }) {
    if (opts['self'])
        return
    if (this.isInit)
        return
    if (global.db.data == null)
        await loadDatabase()
    let chat = global.db.data.chats[id] || {}
    let text = ''
    switch (action) {
        case 'add':
        case 'remove':
            if (chat.welcome) {
                let groupMetadata = await this.groupMetadata(id) || (conn.chats[id] || {}).metadata
                let member = groupMetadata.participants.length
                let gpname = await this.getName(id)
                                              
                for (let user of participants) {
                    let pp = media.profil 
                    let ppgc = media.profil
                    
                    try {
                        pp = await this.profilePictureUrl(user, 'image')
                        ppgc = await this.profilePictureUrl(id, 'image')
                        
                    } catch (e) {
                    } finally {
                        text = (action === 'add' ? (chat.sWelcome || this.welcome || conn.welcome || 'Welcome, @user!').replace('@user', await this.getName(user)).replace('@subject', await this.getName(id)).replace('@desc', groupMetadata.desc?.toString() || 'unknow') :
                            (chat.sBye || this.bye || conn.bye || 'Bye, @user!').replace('@user', await this.getName(user)).replace('@subject', await this.getName(id)).replace('@desc', await groupMetadata.desc?.toString() || 'unknown'))
                            
   let _wel = global.db.data.settings[this.user.jid]

/*
const canWel = await new canvafy.WelcomeLeave()
    .setAvatar(pp)
    .setBackground("image", "https://telegra.ph/file/39ef0462ab2a3cc5ebfcc.jpg")
    .setTitle("Welcome")
    .setDescription(`Selamat datang di Grup ${groupMetadata.subject}`)
    .setBorder("#2a2e35")
    .setAvatarBorder("#2a2e35")
    .setOverlayOpacity(0.3)
    .build();
const canLea = await new canvafy.WelcomeLeave()
    .setAvatar(pp)
    .setBackground("image", "https://telegra.ph/file/39ef0462ab2a3cc5ebfcc.jpg")
    .setTitle("Goodbye")
    .setDescription("Selamat jalan kawan!")
    .setBorder("#2a2e35")
    .setAvatarBorder("#2a2e35")
    .setOverlayOpacity(0.3)
    .build();
    
let xnxx = action === 'add' ? canWel : canLea
*/
let xnxx = media.thumbnail
if (_wel.gcImg) {

    this.sendMessage(id, {
        //video: {url: gif},
        //gifPlayback: true,
        text: text,
        contextInfo: {
            externalAdReply: {
                title: action === 'add' ? 'W E L C O M E' : ' G O O D B Y E',
                body: '',
                thumbnail: xnxx,
                sourceUrl: url.sgc,
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    })

} else if (_wel.gcGif) {

    this.sendMessage(id, {
        video: {
            url: action === 'add' ? media.wel : media.bye
        },
        gifPlayback: true,
        caption: text,
    })

} else if (_wel.gcTeks) {

    this.reply(id, text, null)

} else if (_wel.gcDoc) {

    this.sendMessage(id, {
        document: fs.readFileSync("./package.json"),
        fileName: action === 'add' ? 'W E L C O M E' : ' G O O D B Y E',
        fileLength: 100000000000,
        pageCount: "1000",
        caption: '',
        contextInfo: {
            externalAdReply: {
                containsAutoReply: true,
                mediaType: 1,
                mediaUrl: 'https://telegra.ph/file/74abb87ac6082571db546.jpg',
                renderLargerThumbnail: true,
                showAdAttribution: true,
                sourceUrl: url.sgc,
                thumbnailUrl: pp,
                title: action === 'add' ? 'W E L C O M E' : ' G O O D B Y E',
                body: text,
            },
        },
    });
}
      
                    }
                }
            }
            break
        case 'promote':
            text = (chat.sPromote || this.spromote || conn.spromote || '@user ```is now Admin```')
        case 'demote':
            if (!text)
                text = (chat.sDemote || this.sdemote || conn.sdemote || '@user ```is no longer Admin```')
            text = text.replace('@user', '@' + participants[0].split('@')[0])
            if (chat.detect)
                this.sendMessage(id, { text, mentions: this.parseMention(text) })
            break
    }
}

export async function pollUpdate(message) {
    for (const {
            key,
            update
        }
        of message) {
        if (message.pollUpdates) {
            const pollCreation = await conn.serializeM(conn.loadMessage(key.id))
            if (pollCreation) {
                const pollMessage = await getAggregateVotesInPollMessage({
                    message: pollCreation.message,
                    pollUpdates: pollCreation.pollUpdates,
                })
                message.pollUpdates[0].vote = pollMessage

                await console.log(pollMessage)
                conn.appenTextMessage(message, message.pollUpdates[0].vote || pollMessage.filter((v) => v.voters.length !== 0)[0]?.name, message.message);
            }
        }
    }
}
/**
 * Handle groups update
 * @param {import('@adiwajshing/baileys').BaileysEventMap<unknown>['groups.update']} groupsUpdate 
 */
export async function groupsUpdate(groupsUpdate) {
    if (opts['self'])
        return
    for (const groupUpdate of groupsUpdate) {
        const id = groupUpdate.id
        if (!id) continue
        let chats = global.db.data.chats[id], text = ''
        if (!chats?.detect) continue
        if (groupUpdate.desc) text = (chats.sDesc || this.sDesc || conn.sDesc || '```Description has been changed to```\n@desc').replace('@desc', groupUpdate.desc)
        if (groupUpdate.subject) text = (chats.sSubject || this.sSubject || conn.sSubject || '```Subject has been changed to```\n@subject').replace('@subject', groupUpdate.subject)
        if (groupUpdate.icon) text = (chats.sIcon || this.sIcon || conn.sIcon || '```Icon has been changed to```').replace('@icon', groupUpdate.icon)
        if (groupUpdate.revoke) text = (chats.sRevoke || this.sRevoke || conn.sRevoke || '```Group link has been changed to```\n@revoke').replace('@revoke', groupUpdate.revoke)
        if (!text) continue
        await conn.sendMessage(id, { text: text })
    }
}

export async function deleteUpdate(message) {
    try {
        const { fromMe, id, participant } = message
        if (fromMe)
            return
        let msg = conn.serializeM(conn.loadMessage(id))
        if (!msg)
            return
        let chat = global.db.data.chats[id] || {}
    
        if (chat.delete) return
        
        await conn.reply(msg.chat, `
Detected @${participant.split`@`[0]} has deleted the message just now
To turn off this feature, type
*.disable antidelete*
`.trim(), msg, {
            mentions: [participant]
        })
        conn.copyNForward(msg.chat, msg).catch(e => console.log(e, msg))
    } catch (e) {
        console.error(e)
    }
}

global.dfail = (type, m, conn) => {
let tag = `@${m.sender.replace(/@.+/, '')}`
let mentionedJid = [m.sender]
let name = conn.getName(m.sender)

let msg = {
    premium: 'Sorry, this feature can only be used by *Premium* users',
    group: 'This feature can only be used within groups',       
    private: 'This feature can only be used within private',       
    botAdmin: 'Make the bot an admin, to be able to access the group',
    admin: 'Make the admin, to be able to access the group',
    restrict: 'Restrict Not Turned On For This Chat',
    game: 'Feature *Game* Not Turned On For This Chat',
    rpg: 'Feature *Rpg* Not Turned On For This Chat',
    rowner: 'Real Owner special feature, *Users* cannot access it :!',
    owner: 'Real Owner special feature, *Users* cannot access it :!',
    unreg: `*To be able to access all Bot features,*\n*You have to \`\`\`REGISTER\`\`\` first.*\*To _register_ the method is quite easy*\n*type: /register name.age *\nother way:\n*type: @verify*`
        }[type]
        
  if (msg) return conn.sendMessage(m.chat, {
      text: msg, 
      contextInfo: {
      externalAdReply: {
      title: '✖️ Y O U R  N O T  A C C E S S',
      body: '',
      thumbnailUrl: media.akses,
      sourceUrl: url.sgc,
      mediaType: 1,
      renderLargerThumbnail: true
      }}}, { quoted: m})
             
        }

function ucapan() {
  const time = moment.tz('Asia/Jakarta').format('HH')
  let res = "This morning, bro / sis, I still haven't sleep ?"
  if (time >= 4) {
    res = "🌞 🌄"
  }
  if (time >= 10) {
    res = "🌅 ☀️"
  }
  if (time >= 15) {
    res = " 🌇"
  }
  if (time >= 18) {
    res = "🌆 🌙"
  }
  return res
}

function pickRandom(list) {
     return list[Math.floor(Math.random() * list.length)]
     }

let file = global.__filename(import.meta.url, true)
watchFile(file, async () => {
    unwatchFile(file)
    console.log(chalk.redBright("Update 'handler.js'"))
    if (global.reloadHandler) console.log(await global.reloadHandler())
})
