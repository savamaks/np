interface IPropsRequest {
    name: string;
    adress: string;
    phone: string;
}
const API = `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN}/sendMessage`;

export const TelegramBotRequest = async ({ name, adress, phone }: IPropsRequest) => {
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


interface IPropsRewievs {
    name: string;
    phone: string;
    rating: string;
    rewiev:string
}
export const TelegramBotRewievs = async ({ name, rewiev, phone, rating }: IPropsRewievs) => {
    const text = `
    Отзыв: 
    Имя: ${name},
    Отзыв: ${rewiev} ,
    телефон: ${phone},
    рейтинг: ${rating}`;
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
