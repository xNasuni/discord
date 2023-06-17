
const { Token1, Token2, GCID } = require('./config.json');
const Discord = require('discord.js-selfbot-v13');

const Client1 = new Discord.Client({
    checkUpdate: false
});

const Client2 = new Discord.Client({
    checkUpdate: false
})

var Client1GC
var Client2GC

var Confirm1 = false
var Confirm2 = false

const DMType = "GROUP_DM"

async function Start() {

    Client1.login(Token1)
    Client2.login(Token2)

    Client1.on('ready', async () => {
        Client1GC = await Client1.channels.resolve(GCID)
        console.log(`${Client1.user.username} initialized, GC ${Client1GC}`)

        if (Client1GC == null) {
            Confirm1 = true
            if (Confirm2) {
                console.error(`Both tokens did not have access to the group chat, this usually means neither are in it. Stopping!`)
                process.exit(1)
            }
        }

        if (Client1GC != null) {
            var OtherUserFound

            Client1GC.recipients.map((UserData, UserID) => {
                if (UserID == Client2.user.id) {
                    OtherUserFound = true
                }
            })

            if (!OtherUserFound) {
                console.log(`${Client2.user.username} was not in Group Chat when initializing, they will be added by ${Client1.user.username}.`)
                try {
                    await Client1GC.addMember(Client2.user)
                    while (await Client2.channels.resolve(GCID) != null) {
                        Client2GC = await Client2.channels.resolve(GCID)
                        console.log(`Set ${Client2.user.username}'s GC to ${Client2GC} from ${Client2.user.username}.`)
                        break
                    }
                } catch (err) {
                    console.error(`Groupchat is full (10/10) and ${Client1.user.username} is not able to add ${Client2.user.username} into ${Client1GC}, Stacktrace: \n${err}`)
                    process.exit(1)
                }
            }
        }

        Client1.on('channelDelete', async (channel) => {
            if (channel.type === DMType && channel.id == GCID) {
                Client2GC.addMember(Client1.user, true)
                console.log(`${Client2.user.username} added back ${Client1.user.username} to ${Client2GC}`)
            }
        })
    })

    Client2.on('ready', async () => {
        Client2GC = await Client2.channels.resolve(GCID)
        console.log(`${Client2.user.username} initialized, GC ${Client2GC}`)

        if (Client2GC == null) {
            Confirm2 = true
            if (Confirm1) {
                console.error(`Both tokens did not have access to the group chat, this usually means neither are in it. Stopping!`)
                process.exit(1)
            }
        }

        if (Client2GC != null) {
            var OtherUserFound

            Client2GC.recipients.map((UserData, UserID) => {
                if (UserID == Client1.user.id) {
                    OtherUserFound = true
                }
            })

            if (!OtherUserFound) {
                console.log(`${Client1.user.username} was not in Group Chat when initializing, they will be added by ${Client2.user.username}.`)
                try {
                    await Client2GC.addMember(Client1.user)
                    while (await Client1.channels.resolve(GCID) != null) {
                        Client1GC = await Client1.channels.resolve(GCID)
                        console.log(`Set ${Client1.user.username}'s GC to ${Client1GC} from ${Client1.user.username}.`)
                        break
                    }
                } catch (err) {
                    console.error(`Groupchat is full (10/10) and ${Client2.user.username} is not able to add ${Client1.user.username} into ${Client2GC}, Stacktrace: \n${err}`)
                    process.exit(1)
                }
            }
        }

        Client2.on('channelDelete', async (channel) => {
            if (channel.type === DMType && channel.id == GCID) {
                Client1GC.addMember(Client2.user, true)
                console.log(`${Client1.user.username} added back ${Client2.user.username} to ${Client1GC}`)
            }
        })
    })
}

Start()
