const { bot, isAdmin, lang } = require('../lib/')

bot(
  {
    pattern: 'gpp ?(.*)',
    desc: lang.plugins.gpp.desc,
    type: 'group',
    onlyGroup: true,
  },
  async (message, match) => {
    const isRestrict = await message.groupMetadata(message.jid, 'restrict')
    if (isRestrict) {
      const participants = await message.groupMetadata(message.jid)
      const isImAdmin = await isAdmin(participants, message.client.user.jid)
      if (!isImAdmin) return await message.send(lang.plugins.common.not_admin)
    }
    if (!message.reply_message || !message.reply_message.image)
      return await message.send(lang.plugins.common.reply_to_image)
    await message.updateProfilePicture(
      await message.reply_message.downloadMediaMessage(),
      message.jid
    )
    return await message.send(lang.plugins.gpp.update)
  }
)
