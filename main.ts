import { TelegramBot, UpdateType } from "https://deno.land/x/telegram_bot_api@0.4.0/mod.ts"

const TOKEN = Deno.env.get("WODBOT_TOKEN");
if (!TOKEN) throw new Error("Bot token is not provided");
const bot = new TelegramBot(TOKEN);

await bot.setMyCommands(<any>{
  commands: [{
    command: "upload",
    description: "Comando para fazer o upload da ficha"
  }, {
    command: "download",
    description: "Comando para fazer o download da ficha"
  }],
  scope: {
    type: "all_group_chats"
  }
})

bot.on(UpdateType.Message, async ({ message }) => {
  console.log(message);
  if (message.text?.startsWith("/download@vampire_the_masquerade_5th_bot")) {
    await bot.sendMessage({
      chat_id: message.chat.id,
      text: "Sua ficha foi enviada com sucesso!",
    });
  }
  else {
    const text = message.text || "I can't hear you";
    await bot.sendMessage({
      chat_id: message.chat.id,
      text: "Você disse: " + text,
    });
  }
});


bot.run({
  polling: true,
});