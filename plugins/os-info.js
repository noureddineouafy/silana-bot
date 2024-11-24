import os from 'os'
import { exec } from 'child_process'

let handler = async (m, { conn }) => {
    const systemInfo = await getSystemInfo()
    getVersions((versions) => {
        getBatteryInfo((batteryStatus) => {
            getStorageInfo((storageInfo) => {
                getLinuxInfo((linuxInfo) => {
                    let txt = `> *📊 System Information*\n\n`
                    txt += `- 🌐 *Platform*: _${systemInfo.platform}_\n`
                    txt += `- 💻 *CPU Architecture*: ${systemInfo.cpuArch}\n`
                    txt += `- 🧠 *Number of CPUs*: ${systemInfo.cpus}\n`
                    txt += `- 🗄️ *Total Memory*: ${systemInfo.totalMemory}\n`
                    txt += `- 🗃️ *Free Memory*: ${systemInfo.freeMemory}\n`
                    txt += `- ⏱️ *Uptime*: ${systemInfo.uptime}\n`
                    txt += `- 📀 *OS Version*: ${systemInfo.osVersion}\n`
                    txt += `- 📊 *Load Average (1, 5, 15 minutes)*: ${systemInfo.loadAverage}\n`
                    txt += `- 🔋 *Battery*: ${batteryStatus}\n\n`

                    txt += `> *💾 Storage*\n`
                    txt += `${storageInfo}\n\n`

                    txt += `> *🛠️ Tool Versions*\n\n`
                    txt += `- ☕ *Node.js*: ${versions.nodeVersion.trim()}\n`
                    txt += `- 📦 *NPM*: ${versions.npmVersion.trim()}\n`
                    txt += `- 🎥 *FFmpeg*: ${versions.ffmpegVersion.split('\n')[0]}\n`
                    txt += `- 🐍 *Python*: ${versions.pythonVersion.trim()}\n`
                    txt += `- 📦 *PIP*: ${versions.pipVersion.trim()}\n`
                    txt += `- 🍫 *Chocolatey*: ${versions.chocoVersion.trim()}\n\n`

                    if (os.platform() === 'linux') {
                        txt += `> *🐧 Linux Distribution*\n${linuxInfo}\n`
                    }

                    m.reply(txt)
                })
            })
        })
    })
}

handler.help = ["os-info"]
handler.tags = ["tools"]
handler.command = /^(os-info)$/i

export default handler

function formatUptime(uptime) {
    const seconds = Math.floor(uptime % 60)
    const minutes = Math.floor((uptime / 60) % 60)
    const hours = Math.floor((uptime / 3600) % 24)
    return `${hours} hours, ${minutes} minutes, ${seconds} seconds`
}

function getVersions(callback) {
    exec('node -v', (err, nodeVersion) => {
        if (err) nodeVersion = '✖️'
        exec('npm -v', (err, npmVersion) => {
            if (err) npmVersion = '✖️'
            exec('ffmpeg -version', (err, ffmpegVersion) => {
                if (err) ffmpegVersion = '✖️'
                exec('python --version || python3 --version || py --version', (err, pythonVersion) => {
                    if (err) pythonVersion = '✖️'
                    exec('pip --version || pip3 --version', (err, pipVersion) => {
                        if (err) pipVersion = '✖️'
                        exec('choco -v', (err, chocoVersion) => {
                            if (err) chocoVersion = '✖️'
                            callback({
                                nodeVersion,
                                npmVersion,
                                ffmpegVersion,
                                pythonVersion,
                                pipVersion,
                                chocoVersion
                            })
                        })
                    })
                })
            })
        })
    })
}

function getStorageInfo(callback) {
    if (os.platform() === 'win32') {
        exec('wmic logicaldisk get size,freespace,caption', (err, stdout) => {
            if (err) return callback('✖️')
            const lines = stdout.trim().split('\n').slice(1)
            const storageInfo = lines.map(line => {
                const [drive, free, total] = line.trim().split(/\s+/)
                return `🖥️ ${drive}: ${(total / (1024 ** 3)).toFixed(2)} GB total, ${(free / (1024 ** 3)).toFixed(2)} GB free`
            }).join('\n')
            callback(storageInfo)
        })
    } else {
        exec('df -h --output=source,size,avail,target', (err, stdout) => {
            if (err) return callback('✖️')
            const lines = stdout.trim().split('\n').slice(1)
            const storageInfo = lines.map(line => {
                const [device, total, free, mount] = line.trim().split(/\s+/)
                return `🖥️ ${mount}: ${total} total, ${free} free on ${device}`
            }).join('\n')
            callback(storageInfo)
        })
    }
}

function getLinuxInfo(callback) {
    exec('cat /etc/os-release', (err, osInfo) => {
        if (err) osInfo = '✖️'
        callback(osInfo.trim())
    })
}

function getBatteryInfo(callback) {
    if (os.platform() === 'linux' || os.platform() === 'darwin') {
        exec('upower -i $(upower -e | grep BAT)', (err, batteryInfo) => {
            if (err) return callback('✖️')
            callback(batteryInfo)
        })
    } else if (os.platform() === 'win32') {
        exec('WMIC Path Win32_Battery Get EstimatedChargeRemaining', (err, batteryInfo) => {
            if (err) return callback('✖️')
            callback(`🔋 ${batteryInfo.trim()}%`)
        })
    } else {
        callback('✖️')
    }
}

function getSystemInfo() {
    return {
        platform: os.platform(),
        cpuArch: os.arch(),
        cpus: os.cpus().length,
        totalMemory: (os.totalmem() / (1024 ** 3)).toFixed(2) + ' GB',
        freeMemory: (os.freemem() / (1024 ** 3)).toFixed(2) + ' GB',
        uptime: formatUptime(os.uptime()),
        osVersion: os.release(),
        loadAverage: os.loadavg().map(load => load.toFixed(2)).join(', ')
    }
}
