/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import './config.js'
import path, {
    join
} from 'path'
import {
    platform
} from 'process'
import chalk from 'chalk'
import {
    fileURLToPath,
    pathToFileURL
} from 'url'
import {
    createRequire
} from 'module'
global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') {
    return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString()
};
global.__dirname = function dirname(pathURL) {
    return path.dirname(global.__filename(pathURL, true))
};
global.__require = function require(dir = import.meta.url) {
    return createRequire(dir)
}

import * as ws from 'ws'
import {
    readdirSync,
    statSync,
    unlinkSync,
    existsSync,
    readFileSync,
    watch
} from 'fs'
import yargs from 'yargs'
import {
    spawn
} from 'child_process'
import lodash from 'lodash'
import syntaxerror from 'syntax-error'
import {
    tmpdir
} from 'os'
import os from 'os'
import Pino from 'pino';
import {
    format
} from 'util'
import {
    makeWASocket,
    protoType,
    serialize
} from './lib/simple.js';
import {
    Low
} from 'lowdb';
import fs from 'fs';
import {
    JSONFile
} from "lowdb/node"
/* import {
  mongoDB,
  mongoDBV2
} from './lib/mongoDB.js' */
import storeSys from './lib/store2.js'
const store = storeSys.makeInMemoryStore()
const {
    DisconnectReason,
    useMultiFileAuthState,
    MessageRetryMap,
    fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore,
    makeInMemoryStore,
    proto,
    jidNormalizedUser,
    PHONENUMBER_MCC,
    Browsers
} = await (await import('@adiwajshing/baileys')).default;

import readline from "readline"
import {
    parsePhoneNumber
} from "libphonenumber-js"

const {
    CONNECTING
} = ws
const {
    chain
} = lodash
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
const question = (text) => new Promise((resolve) => rl.question(text, resolve))
import NodeCache from "node-cache"
const msgRetryCounterCache = new NodeCache()
const msgRetryCounterMap = (MessageRetryMap) => {};
const {
    version
} = await fetchLatestBaileysVersion();


protoType()
serialize()
//Biarlah wk dikit huft 
/*Klo di hapus dah lah*/ //Nightmare Md
const Tio = '212717457920' //input here to number connecting
global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({
    ...query,
    ...(apikeyqueryname ? {
        [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name]
    } : {})
})) : '')
// global.Fn = function functionCallBack(fn, ...args) { return fn.call(global.conn, ...args) }
global.timestamp = {
    start: new Date
}

const __dirname = global.__dirname(import.meta.url)

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.prefix = new RegExp('^[' + (opts['prefix'] || '‎!./#\\').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']');

global.db = new Low(/https?:\/\//.test(opts['db'] || '') ? new cloudDBAdapter(opts['db']) : new JSONFile(`${opts._[0] ? opts._[0] + '_' : ''}system/database.json`))

global.DATABASE = global.db // Backwards Compatibility
global.loadDatabase = async function loadDatabase() {
    if (global.db.READ) return new Promise((resolve) => setInterval(async function() {
        if (!global.db.READ) {
            clearInterval(this)
            resolve(global.db.data == null ? await global.loadDatabase() : global.db.data)
        }
    }, 1 * 1000))
    if (global.db.data !== null) return
    global.db.READ = true
    await global.db.read().catch(console.error)
    global.db.READ = null
    global.db.data = {
        users: {},
        chats: {},
        stats: {},
        msgs: {},
        sticker: {},
        settings: {},
        menfess: {},
        simulator: {},
        ...(global.db.data || {})
    }
    global.db.chain = chain(global.db.data)
}
loadDatabase()

global.authFolder = storeSys.fixFileName(`${opts._[0] || ''}system/sessions`)
let {
    state,
    saveCreds
} = await useMultiFileAuthState(path.resolve('./system/sessions'))

const connectionOptions = {
    pairingCode: true,
    patchMessageBeforeSending: (message) => {
        const requiresPatch = !!(message.buttonsMessage || message.templateMessage || message.listMessage);
        if (requiresPatch) {
            message = {
                viewOnceMessage: {
                    message: {
                        messageContextInfo: {
                            deviceListMetadataVersion: 2,
                            deviceListMetadata: {}
                        },
                        ...message
                    }
                }
            };
        }
        return message;
    },
    msgRetryCounterMap,
    logger: Pino({
        level: 'fatal'
    }),
    auth: state,
    browser: ['Linux', 'Chrome', ''],
    version: [2, 3000, 1015901307],
    getMessage: async (key) => {
        let jid = jidNormalizedUser(key.remoteJid)
        let msg = await store.loadMessage(jid, key.id)
        return msg?.message || ""
    },
    msgRetryCounterCache,
    connectTimeoutMs: 60000,
    defaultQueryTimeoutMs: 0,
    keepAliveIntervalMs: 10000,
    emitOwnEvents: true,
    fireInitQueries: true,
    generateHighQualityLinkPreview: true,
    syncFullHistory: true,
    markOnlineOnConnect: true
}

global.conn = makeWASocket(connectionOptions)
conn.isInit = false
global.pairingCode = true

if (global.pairingCode && !conn.authState.creds.registered) {

    let phoneNumber
    if (!!global.info.pairingNumber) {
        phoneNumber = global.info.pairingNumber.replace(/[^0-9]/g, '')

        if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
            console.log(chalk.bgBlack(chalk.redBright("Start with your country's WhatsApp code, Example : 212xxx")))
            process.exit(0)
        }
    } else {
        phoneNumber = await question(chalk.bgBlack(chalk.greenBright(`Please type your WhatsApp number : `)))
        phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
        if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
            console.log(chalk.bgBlack(chalk.redBright("Start with your country's WhatsApp code, Example : 212xxx")))

            phoneNumber = await question(chalk.bgBlack(chalk.greenBright(`Please type your WhatsApp number : `)))
            phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
            rl.close()
        }
    }

    setTimeout(async () => {
        let code = await conn.requestPairingCode(phoneNumber)
        code = code?.match(/.{1,4}/g)?.join("-") || code
        console.log(chalk.yellow(chalk.bgGreen(`Your Pairing Code : `)), chalk.black(chalk.white(code)))
    }, 3000)
}

if (!opts['test']) {
    if (global.db) {
        setInterval(async () => {
            if (global.db.data) await global.db.write().catch(console.error)
            clearTmp()
        }, 30 * 1000);
    }
}

const directory = './system/sessions';
function deleteFilesExceptOne(directory, fileNameToKeep) {
    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error('There is an error:', err);
            return;
        }

        files.forEach((file) => {
            const filePath = path.join(directory, file);
            if (file !== fileNameToKeep) {
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error(`Failed to delete file ${file}:`, err);
                    } else {
                        console.log(`File ${file} successfully deleted.`);
                    }
                });
            }
        });
    });
}

function clearTmp() {
    const tmp = [tmpdir(), join(__dirname, './tmp')];
    const filename = [];
    tmp.forEach((dirname) => readdirSync(dirname).forEach((file) => filename.push(join(dirname, file))));
    return filename.map((file) => {
        const stats = statSync(file);
        if (stats.isFile() && (Date.now() - stats.mtimeMs >= 5 * 60 * 1000)) return unlinkSync(file);
        return false;
    });
}

async function connectionUpdate(update) {
    const {
        connection,
        lastDisconnect,
        isNewLogin
    } = update
    global.stopped = connection;

    if (isNewLogin) conn.isInit = true
    const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode
    if (code && code !== DisconnectReason.loggedOut && conn?.ws.readyState !== ws.default.CONNECTING) {
        console.log(await global.reloadHandler(true).catch(console.error))
        global.timestamp.connect = new Date
    }
    // console.log(JSON.stringify(update, null, 4))
    if (global.db.data == null) loadDatabase()
    if (connection === "open") {
    console.log(chalk.bgGreen(chalk.white('The bot is ON')));
    }
    if (connection == 'close') {
        console.log(chalk.yellow(`📡 Connection has been lost. delete the session and retake the session to run the Bot`));
    }
}

process.on('uncaughtException', console.error)
let isInit = true;

let handler = await import('./handler.js');
global.reloadHandler = async function(restatConn) {
    try {
        const Handler = await import(`./handler.js?update=${Date.now()}`).catch(console.error);
        if (Object.keys(Handler || {}).length) handler = Handler;
    } catch (error) {
        console.error;
    }
    if (restatConn) {
        const oldChats = global.conn.chats;
        try {
            global.conn.ws.close();
        } catch {}
        conn.ev.removeAllListeners();
        global.conn = makeWASocket(connectionOptions, {
            chats: oldChats
        });
        isInit = true;
    }
    if (!isInit) {
        conn.ev.off('messages.upsert', conn.handler)
        conn.ev.off('group-participants.update', conn.participantsUpdate)
        conn.ev.off('messages.update', conn.pollUpdate);
        conn.ev.off('groups.update', conn.groupsUpdate)
        //  conn.ev.off('message.delete', conn.onDelete)
        conn.ev.off('connection.update', conn.connectionUpdate)
        conn.ev.off('creds.update', conn.credsUpdate)
    }
    conn.welcome = 'Welcome to @subject, @user\n'
    conn.bye = 'Goodbye @user 👋'
    conn.spromote = '@user *Promote* to Admin '
    conn.sdemote = '@user *Demote* from Admin'
    conn.sDesc = 'Description Has Been Changed To \n@desc'
    conn.sSubject = 'Group Name Has Been Changed To \n@subject'
    conn.sIcon = 'Group Photo Has Been Changed!'
    conn.sRevoke = 'Group Link Has Been Changed To \n@revoke'
    conn.sAnnounceOn = 'The group has been closed!\now only admins can send messages.'
    conn.sAnnounceOff = 'The group is open!\nNow all participants can send messages.'
    conn.sRestrictOn = 'Edit Group Info changed to admin only!'
    conn.sRestrictOff = 'Edit Group Info changed to all participants!'

    conn.handler = handler.handler.bind(global.conn)
    conn.participantsUpdate = handler.participantsUpdate.bind(global.conn)
    conn.pollUpdate = handler.pollUpdate.bind(global.conn);
    conn.groupsUpdate = handler.groupsUpdate.bind(global.conn)
    // conn.onDelete = handler.deleteUpdate.bind(global.conn)
    conn.connectionUpdate = connectionUpdate.bind(global.conn)
    conn.credsUpdate = saveCreds.bind(global.conn)

    const currentDateTime = new Date();
    const messageDateTime = new Date(conn.ev);
    if (currentDateTime >= messageDateTime) {
        const chats = Object.entries(conn.chats).filter(([jid, chat]) => !jid.endsWith('@g.us') && chat.isChats).map((v) => v[0]);
    } else {
        const chats = Object.entries(conn.chats).filter(([jid, chat]) => !jid.endsWith('@g.us') && chat.isChats).map((v) => v[0]);
    }

    conn.ev.on('messages.upsert', conn.handler)
    conn.ev.on('group-participants.update', conn.participantsUpdate)
    conn.ev.on("messages.update", conn.pollUpdate);
    conn.ev.on('groups.update', conn.groupsUpdate)
    // conn.ev.on('message.delete', conn.onDelete)
    conn.ev.on('connection.update', conn.connectionUpdate)
    conn.ev.on('creds.update', conn.credsUpdate)
    isInit = false
    return true
}

const pluginFolder = global.__dirname(join(__dirname, './plugins/index'));
const pluginFilter = (filename) => /\.js$/.test(filename);
global.plugins = {};
async function filesInit() {
    for (const filename of readdirSync(pluginFolder).filter(pluginFilter)) {
        try {
            const file = global.__filename(join(pluginFolder, filename));
            const module = await import(file);
            global.plugins[filename] = module.default || module;
        } catch (e) {
            conn.logger.error(e);
            delete global.plugins[filename];
        }
    }
}
filesInit().then((_) => Object.keys(global.plugins)).catch(console.error);

global.reload = async (_ev, filename) => {
    if (pluginFilter(filename)) {
        const dir = global.__filename(join(pluginFolder, filename), true);
        if (filename in global.plugins) {
            if (existsSync(dir)) conn.logger.info(` Updated Plugin - '${filename}'`);
            else {
                conn.logger.warn(`Deleted Plugin - '${filename}'`);
                return delete global.plugins[filename];
            }
        } else conn.logger.info(`New Plugin - '${filename}'`);
        const err = syntaxerror(readFileSync(dir), filename, {
            sourceType: 'module',
            allowAwaitOutsideFunction: true,
        });
        if (err) conn.logger.error(`syntax error while loading '${filename}'\n${format(err)}`);
        else {
            try {
                const module = (await import(`${global.__filename(dir)}?update=${Date.now()}`));
                global.plugins[filename] = module.default || module;
            } catch (e) {
                conn.logger.error(`error require plugin '${filename}\n${format(e)}'`);
            } finally {
                global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)));
            }
        }
    }
};
Object.freeze(global.reload);
watch(pluginFolder, global.reload);
await global.reloadHandler();

/* QuickTest */
async function _quickTest() {
    const test = await Promise.all([
        spawn('ffmpeg'),
        spawn('ffprobe'),
        spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
        spawn('convert'),
        spawn('magick'),
        spawn('gm'),
        spawn('find', ['--version']),
    ].map((p) => {
        return Promise.race([
            new Promise((resolve) => {
                p.on('close', (code) => {
                    resolve(code !== 127);
                });
            }),
            new Promise((resolve) => {
                p.on('error', (_) => resolve(false));
            })
        ]);
    }));
    const [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test;
    const s = global.support = {
        ffmpeg,
        ffprobe,
        ffmpegWebp,
        convert,
        magick,
        gm,
        find
    };
    Object.freeze(global.support);
}

if (setting.autoclear) {
setInterval(async () => {
    if (stopped === 'close' || !conn || !conn.user) return;
    await deleteFilesExceptOne(directory, 'creds.json');
    await clearTmp();
    conn.reply(Tio + '@s.whatsapp.net', 'Sessions are available', null) >
        console.log(chalk.cyanBright(
            `\n╭───────────────────·»\n│\n` +
            `│  Sessions clear Successfull \n│\n` +
            `╰───❲ ${global.namebot} ❳\n`
        ));
}, 120 * 60 * 1000); // 2 jam sekali 
}

_quickTest().catch(console.error);
