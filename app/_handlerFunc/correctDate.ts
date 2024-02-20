export const correctDate = (value: string) => {
    const arrMounth = [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря",
    ];
    const correctDate = value.split("-").reverse();
    correctDate[1]=arrMounth[+correctDate[1]-1]
    
    return correctDate.join(' ');
};