import { INewData, IRequest } from "@/app/types";
import React, { FC, useState, MouseEvent } from "react";
import Input from "../Input/Input";
import s from "./UpdateRequest.module.scss";
import CardButtons from "../CardButtons/CardButtons";
import { useStore } from "../../store/useStore";
import { useRouter } from "next/navigation";
import { saveChangeCategory } from "@/app/_handlerFunc/admin/saveChangeCategory";
import Confirmation from "../Confirmation/Confirmation";
import { deleteEntry } from "@/app/_handlerFunc/admin/deleteEntry";

interface IProps {
    data: IRequest;
    refresh: () => void;
}

const UpdateRequest: FC<IProps> = ({ data, refresh }) => {
    const [request, setRequest] = useState(data.attributes.request);
    const [answer, setAnswer] = useState(data.attributes.answer);
    const [confirmationSave, setConfirmationSave] = useState(false);
    const [confirmationDel, setConfirmationDel] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const { authService } = useStore();

    const changePublished = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const time = new Date().toLocaleDateString().split(".").reverse().join("-");

        const newData: INewData = {
            publishedAt: data.attributes.publishedAt !== null ? null : time,
        };
        const result = await saveChangeCategory({ data: newData, id: data.id, link: "requests", token: authService.token });

        if (result === null) {
            authService.authorization(false, "");
            router.push("/admin");
        } else if (result) {
            refresh();
        }
    };
    const saveChange = async (e: MouseEvent<HTMLButtonElement>) => {
        setLoading(true);

        e.preventDefault();
        const newData = {
            request: request,
            answer: answer,
        };

        const result = await saveChangeCategory({ data: newData, id: data.id, link: "requests", token: authService.token });
        console.log(result);
        if (result === null) {
            authService.authorization(false, "");
            router.push("/admin");
        }
        setConfirmationSave(false);
        setLoading(false);
    };

    const delEntry = async () => {
        setLoading(true);
        const res = await deleteEntry({ id: data.id, link: "requests", token: authService.token });
        if (res) {
            router.push("/admin/requests");
        }

        if (res === null) {
            authService.authorization(false, "");
            router.push("/admin");
        }
        setLoading(false);
    };

    return (
        <section className={s.card}>
            <p>ID: {data.id}</p>
            <Input types="textarea" title="Вопрос" name="request" className={s.card__input} type="text" value={request} setValue={setRequest} />
            <Input types="textarea" title="Ответ" name="answer" className={s.card__input} type="text" value={answer} setValue={setAnswer} />
            <CardButtons
                setConfirmation={setConfirmationSave}
                changePublished={changePublished}
                publishedAt={data.attributes.publishedAt}
                deleteEntry={setConfirmationDel}
            />
            <Confirmation
                text="Предыдущие данные будут потеряны, сохранить изменения?"
                active={confirmationSave}
                setActive={setConfirmationSave}
                functionConfirmation={saveChange}
                loading={loading}
            />
            <Confirmation
                text="Вы точно хотите удалить запись?"
                active={confirmationDel}
                setActive={setConfirmationDel}
                functionConfirmation={delEntry}
                loading={loading}
            />
        </section>
    );
};

export default UpdateRequest;
