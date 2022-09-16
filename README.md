# Sages Discort Bot
A simple discord bot made with [discordjs](https://github.com/discordjs/discord.js) and [knexjs](https://knexjs.org/) and [postgres](https://www.postgresql.org/)

Has partial support for [better-sqlite3](https://www.npmjs.com/package/better-sqlite3) that I will try and keep working. Though I mainly do all testing against postgres. But I'm keeping better-sqlite3 for an option for a quick setup as it doesn't require anything extra.

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

### Discord Bot
Not sure what permissions exactly this bot needs for the petitions but 277025602624 seems to work well.

### Database
The `.env` file should contain all settings for database connection. See `.env.example`.
The default it runs in is development. You can switch it by adding in something like `NODE_ENV=production`

The quick setup would be to use better-sqlite3:
```
## Production / Development / Testing
## DB_        / DB_DEV_     / DB_TEST_
DB_DIALECT=better-sqlite3
DB_FILE=./db/disbot.db
```

The recommended usage is to setup a postgres database and connect to it:
```
## Production / Development / Testing
## DB_ / DB_DEV_ / DB_TEST_
DB_USER=disbot
DB_HOST=localhost
DB_PASS=
DB_DATABASE=disbot
DB_PORT=5432
DB_DIALECT=postgres
```

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