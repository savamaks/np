import React, { FC, MouseEvent } from "react";
import s from "./CardButtons.module.scss";
import { useRouter } from "next/navigation";
import Button from "../../Button/Button";
import { useStore } from "../../store/useStore";
import cn from "classnames";

interface IProps {
    setConfirmation: (value: boolean) => void;
    publishedAt?: string | null;
    changePublished?: (e: MouseEvent<HTMLButtonElement>) => void;
    publishedDisable?: boolean;
    deleteEntry?: (value: boolean) => void;
}
const CardButtons: FC<IProps> = ({ setConfirmation, publishedAt, changePublished, publishedDisable, deleteEntry }) => {
    const { appService } = useStore();
    const router = useRouter();

    return (
        <div className={s.box}>
            <Button
                onClick={() => {
                    setConfirmation(true);
                }}
                className={s.box__saveBtn}
            >
                Сохранить
            </Button>
            <Button
                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                    router.back();
                    appService.changeArrPreviews([]);
                }}
                className={s.box__savebtn}
            >
                Выйти
            </Button>
            {!publishedDisable && (
                <Button onClick={changePublished} type="noBorder" className={cn(s.box__published, publishedAt !== null ? "" : s.box__draft)}>
                    {publishedAt !== null ? "опубликован" : "неопубликован"}
                </Button>
            )}
            {deleteEntry !== undefined && (
                <Button
                    onClick={(e: MouseEvent<HTMLButtonElement>) => {
                        deleteEntry(true);
                    }}
                    className={s.box__deleteBtn}
                >
                    Удалить
                </Button>
            )}
        </div>
    );
};

export default CardButtons;
