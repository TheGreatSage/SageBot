const { knex } = require('./db/db');
const { log } = require('./log');
const { query } = require('./db/sql');

async function spam(client, channel, guildID) {
    try {
        let sql = await query('petition', 'select');
        const r1 = await knex.raw(sql, [guildID]);
        if (r1.rowCount === 0) {
            log.info('No petition in this guild');
            return;
        }
        const usID = r1.rows[0].send_to.toString();
        let text = `<@${usID}>`;
        text = text.concat('\n', r1.rows[0].text);
        text = text.replaceAll('\\n', '\n');
        text = text.concat('\n\nSigned,');
        sql = await query('sign_guild', 'select');
        const signs = await knex.raw(sql, [guildID]);
        if (signs.rowCount !== 0) {
            for (let i = 0; i < signs.rowCount; i++) {
                text = text.concat('\n\n', signs.rows[i].name.toString());
                if (signs.rows[i].signed > 0) {
                    const times = signs.rows[i].signed + 1;
                    text = text.concat(' x', times.toString());
                }
            }
        }
        text = text.concat('\n\n(MANY MORE COMING)');
        channel.send(text);
        try {
            const user = await client.users.fetch(usID);
            user.send(text);
        } catch (err2) {
            log.error(`spam send_to: ${err2}`);
        }
    } catch (err) {
        log.error(`spam DB Error: ${err}`);
        return;
    }
}

module.exports = {
    spam: spam,
};