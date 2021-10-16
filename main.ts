import { TelegramBot, UpdateType } from "https://deno.land/x/telegram_bot_api/mod.ts"

const TOKEN = Deno.env.get("TOKEN");
if (!TOKEN) throw new Error("Bot token is not provided");
const bot = new TelegramBot(TOKEN);

bot.on(UpdateType.Message, async ({ message }) => {
  const text = message.text || "I can't hear you";
  await bot.sendMessage({
    chat_id: message.chat.id,
    text: "Você disse: " + text,
  });
});

bot.run({
  polling: true,
});