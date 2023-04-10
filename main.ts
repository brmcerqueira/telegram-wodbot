import { BotCommand, TelegramBot, UpdateType } from "https://deno.land/x/telegram_bot_api@0.4.0/mod.ts"

const TOKEN = Deno.env.get("WODBOT_TOKEN");

if (!TOKEN) throw new Error("Bot token is not provided");

const bot = new TelegramBot(TOKEN);

const upload: BotCommand = {
  command: "enviar",
  description: "Comando para fazer o upload da ficha"
};

const download: BotCommand = {
  command: "baixar",
  description: "Comando para fazer o download da ficha"
};

await bot.setMyCommands(<any>{
  commands: [upload, download],
  scope: {
    type: "all_group_chats"
  }
})

const me = await bot.getMe();

console.log(me);

bot.on(UpdateType.Message, async ({ message }) => {
  console.log(message);
  const name = message.from?.username || message.from?.first_name;
  if (message.text?.startsWith(`/${upload.command}@${me.username}`)) {
    await bot.sendMessage({
      chat_id: message.chat.id,
      text: `@${name} Envie sua ficha em anexo, para que eu possa salvar!`
    });
  }
  else if (message.text?.startsWith(`/${download.command}@${me.username}`)) {
    await bot.sendMessage({
      chat_id: message.chat.id,
      text: `@${name} Sua ficha foi enviada na sua caixa privada!`
    });
  }
  else if (message.document) {
    console.log(message.document);
    await bot.sendMessage({
      chat_id: message.chat.id,
      text: `@${name} Sua ficha foi enviada com sucesso!`
    });
  }
  else {
    const text = message.text || "I can't hear you";
    await bot.sendMessage({
      chat_id: message.chat.id,
      text: "Você disse: " + text
    });
  }
});

bot.run({
  polling: true,
  
});