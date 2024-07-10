"use client";
import { FC, useState } from "react";
import Item from "./Item";
import { IRequest } from "@/app/types";

interface IProps {
    data: Array<IRequest>;
}

const List: FC<IProps> = ({ data }) => {
    const [count, setCount] = useState<number | null>(null);

    return (
        <div className="contBox">
            {data.map((el: IRequest, index: number) => {
                return (
                    <Item count={count} setCount={setCount} index={index} key={index} request={el.attributes.request} close={"+"}>
                        <p className="text">{el.attributes.answer}</p>
                    </Item>
                );
            })}
        </div>
    );
};

export default List;
