export const getData = async ({setData}:any) => {
    try {
        const res = await fetch(`https://wclouds.ru/api/categories?populate=*`, {
            method: "GET",
            next: {
                revalidate: 0,
            },
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACESS_TOKEN}`,
            },
        });
        const data = await res.json();
        setData(data.data);
    } catch (error) {
        console.log(error);
    }
};
