# Sages Discort Bot
A simple discord bot made with [discordjs](https://github.com/discordjs/discord.js) and [knexjs](https://knexjs.org/) and [postgres](https://www.postgresql.org/)

This has several breaking bugs that don't matter enough for me to worry about fixing, like the bot getting killed when trying to send a dm to a user that it can't.

Will slowly work on. The github page for this will only recieve semi-feture complete updates. As most development is done on a private gitea repository.

## Usage

**THIS IS NOT A DOWNLOAD AND RUN BOT, IT REQUIRES SOME SETUP**

This bot really only has 1 main usage which is to start a petition then let people sign it, spamming who whoever it is set to.

Definitly not recommended to use outside of a small friend group. Think it would be easy to get this bot banned or something.

## General Commands

Get added as long as the bot has the message content intent permission.

`!sign`

This is what you will want your users to write to sign the petition.

## Admin Commands

These commands only get added to the guild that is in `.env` under `GUILD_ID` so recommend setting this to a private test server.

`/petition [guildid] [send_to] [text]`

The petition needs the id of the guild it will look for signatures for. `send_to` is the actual id of the user getting all the petition spam. `text` will be the body of the petition. The full petition will be sent something like this:
```
@User
[Petition Text]

Signed,

[Signed Users] [xSigned]

(MANY MORE COMING)
```

`/rmpet [guildid]`

To remove a petition for a guild.


## Setup

### Database
Must have a postgres database setup. This uses dotenv to for changing things like the bot token. Check .env.example for all the settings used. 

Currently this does run using an internal schema when conntecting to the database, and I havn't tested if that breaks things like mysql or sqlite. This could easily run with sqlite I think I just wanted to get setup with something a little more robust.

The default it runs in is development. You can switch it by adding in something like `NODE_ENV=production`

### Node + Schema

The recommend way to get setup in a new environment is to run `npm run setup` as it will install the node modules then get the database upto date.

Otherwise run `npm install` and once have a postgres database with a login for this to use you can use the [knexjs migration commands](https://knexjs.org/guide/migrations.html) to get the database in working order for using the bot. I wanted to start this project using migrations so it is easy to change later what its using. 

```
# Full working setup
knex migrate:latest
# Just one migration to test
knex migrate:up 
# To undo it
knex migrate:down
# When you break it
knex migrate:unlock
```

## Docker Initigration

I made a dockerfile to see if I could get it to run in docker.
It seems to work but I was only running it locally, and it used like 3gb of ram so probably not worth it.

Don't have my server setup at the moment of writing this to do some other docker tests, as this project so far isn't worth the time investment.