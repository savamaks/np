import React from "react";
import s from "./MainListRequest.module.scss";
import List from "./List";

const getData = async () => {
    try {
        const response = await fetch(`https://wclouds.ru/api/requests`, {
            method: "GET",
            next: {
                revalidate: 300,
            },
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACESS_TOKEN}`,
            },
        });
        const data = response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

const MainListRequest = async () => {
    const data = await getData();

    return (
        <div className={s.container}>
            <h1>Вопросы Ответы</h1>
            <List data={data.data} />
        </div>
    );
};

export default MainListRequest;
