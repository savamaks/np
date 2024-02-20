interface IPropsRewievs {
    name: string;
    phone: string;
    rating: string;
    rewiev: string;
}

export const createRewiev = async ({ name, rewiev, phone, rating }: IPropsRewievs) => {
    const rewievData = {
        data: {
            name: name,
            text: rewiev,
            phone: phone,
            rating: rating,
        },
    };
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SRC_STRAPI}/api/rewiews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACESS_TOKEN}`,
            },
            body: JSON.stringify(rewievData),
        });
        if (res.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
    }
};
