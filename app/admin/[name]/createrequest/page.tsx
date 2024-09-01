"use client";

import CardButtons from "@/app/components/adminPanel/CardButtons/CardButtons";
import Confirmation from "@/app/components/adminPanel/Confirmation/Confirmation";
import Input from "@/app/components/adminPanel/Input/Input";
import React, { useState, MouseEvent } from "react";
import s from "./page.module.scss";
import { createData } from "@/app/_handlerFunc/admin/createData";
import { useStore } from "@/app/components/store/useStore";
import { useRouter } from "next/navigation";

const PageCreateRequest = () => {
    const [request, setRequest] = useState("");
    const [answer, setAnswer] = useState("");
    const [confirmation, setConfirmation] = useState(false);

    const { authService } = useStore();
    const router = useRouter();

    const saveChange = async (e: MouseEvent<HTMLButtonElement>) => {
        if (request !== "" && answer !== "") {
            const data = {
                request: request,
                answer: answer,
                publishedAt: null,
            };
            const res = await createData({ data, link: "requests", token: authService.token });

            if (res.id) {
                router.push(`/admin/requests/${res.id}`);
            }
            if (res === null) {
                authService.authorization(false, "");
                router.push("/admin");
            }
            setConfirmation(false);
        }
    };
    
    return (
        <div className={s.card}>
            <Input types="textarea" title="Вопрос" name="request" className={s.card__input} type="text" value={request} setValue={setRequest} />
            <Input types="textarea" title="Ответ" name="answer" className={s.card__input} type="text" value={answer} setValue={setAnswer} />
            <CardButtons setConfirmation={setConfirmation} publishedDisable={true} />
            <Confirmation text="Предыдущие данные будут потеряны, сохранить изменения?" active={confirmation} setActive={setConfirmation} functionConfirmation={saveChange} />
        </div>
    );
};

export default PageCreateRequest;
