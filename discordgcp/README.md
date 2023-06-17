# DiscordGCP

**DiscordGCP** which stands for **Discord Group Chat Persistence** is a mini-script coded my me that uses **2 Tokens** and **1 Group Chat ID** and the code makes the accounts add each other when removed.

> This utilizes the [`discord.js-selfbot-v13`](https://github.com/aiko-chan-ai/discord.js-selfbot-v13) module which you can install by running `npm install discord.js-selfbot-v13@latest` in your development environment, but you also need to edit a structure in this module accordingly to what is said below in the "Important Information" until the developer (hopefully) accepts my feature request to actually make the Boolean parameter a thing.

>
# Script
> **[`Latest Version` `1779a47412cc34e9a8471e756755b31e1f2634cbe597c77905d6f559839951b7`](https://github.com/xNasuni/discord/blob/main/discordgcp/main.js)**

## Important Information

> I had to edit one of the structures in the [`discord.js-selfbot-v13`](https://github.com/aiko-chan-ai/discord.js-selfbot-v13) module called [`PartialGroupDMChannel`](https://github.com/aiko-chan-ai/discord.js-selfbot-v13/blob/main/src/structures/PartialGroupDMChannel.js), and the issue was that when you get removed the group chat recipients don't get updated instantly and the [`addMember`](https://github.com/aiko-chan-ai/discord.js-selfbot-v13/blob/main/src/structures/PartialGroupDMChannel.js#L156) function inside that class it checks if the user already exists within the recipients, and it gives an error saying [`USER_ALREADY_IN_GROUP_DM_CHANNEL`](https://github.com/aiko-chan-ai/discord.js-selfbot-v13/blob/main/src/structures/PartialGroupDMChannel.js#L161) which makes it impossible for me to do it as quick as possible so I just changed the whole body and typedef to this which you can do too to make it work:
> ```js
> /**
> * Adds a user to this Group DM Channel.
> * @param {UserResolvable} user User to add to the group
> * @param {boolean} ignoreVacantCheck Ignore if the
> * @returns {Promise<PartialGroupDMChannel>}
> */
> async  addMember(user, ignoreVacantCheck) {
>   if (ignoreVacantCheck == undefined) { ignoreVacantCheck = false }
>   user = this.client.users.resolveId(user);
>   if (!user) {
>     return Promise.reject(new TypeError('User is not a User or User ID'));
>   }
>   if (this.recipients.get(user) && !ignoreVacantCheck) return Promise.reject(new Error('USER_ALREADY_IN_GROUP_DM_CHANNEL')); // Fails sometimes if member leaves recently (ex. user leave msg's channel used for adding)
>   await this.client.api.channels[this.id].recipients[user].put();
>   this.recipients.set(user, this.client.users.cache.get(user));
>   return this;
> }
> ```
