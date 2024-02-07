interface ITelegramBotProps {
    name: string;
    adress: string;
    phone: string;
}
const API = `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN}/sendMessage`;

export const TelegramBot = async ({ name, adress, phone }: ITelegramBotProps) => {
    const text = `
    Заявка на замер потолка: 
    Имя: ${name},
    адрес: ${adress} ,
    телефон: ${phone}`;
    try {
        const response = await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                chat_id: process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID,
                text,
            }),
        });
        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
    }
};
