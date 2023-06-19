# DiscordGCP

**DiscordGCP** which stands for **Discord Group Chat Persistence** is a mini-script coded my me that uses **2 Tokens** and **1 Group Chat ID** and the code makes the accounts add each other when removed.

> This utilizes the [`discord.js-selfbot-v13`](https://github.com/aiko-chan-ai/discord.js-selfbot-v13) module which you can install by running `npm install discord.js-selfbot-v13@latest` in your development environment, change the config to have the two tokens and the group id and just run the code!

>
# Script
> **[`Latest Version` `d1b4ea74a43f0ad4f101507015e9829d9f385d6f8f2416b391a290e7e2100efe`](https://github.com/xNasuni/discord/blob/main/discordgcp/main.js)**

## Important Information

> ***The below is no longer required as my issue has been accepted and closed*** <br/>
> ~~I had to edit one of the structures in the [`discord.js-selfbot-v13`](https://github.com/aiko-chan-ai/discord.js-selfbot-v13) module called [`PartialGroupDMChannel`](https://github.com/aiko-chan-ai/discord.js-selfbot-v13/blob/main/src/structures/PartialGroupDMChannel.js), and the issue was that when you get removed the group chat recipients don't get updated instantly and the [`addMember`](https://github.com/aiko-chan-ai/discord.js-selfbot-v13/blob/main/src/structures/PartialGroupDMChannel.js#L156) function inside that class it checks if the user already exists within the recipients, and it gives an error saying [`USER_ALREADY_IN_GROUP_DM_CHANNEL`](https://github.com/aiko-chan-ai/discord.js-selfbot-v13/blob/main/src/structures/PartialGroupDMChannel.js#L161) which makes it impossible for me to do it as quick as possible so I just changed the whole body and typedef to this which you can do too to make it work:~~
