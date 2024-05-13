"use client"
import { useState } from "react";
import Item from "./Item";

const List = ({ arr }: any) => {
    const [count, setCount] = useState<number | null>(null);

    return (
        <div className="contBox">
            {arr.map((el: any, index: number) => {
                return (
                    <Item count={count} setCount={setCount} index={index} key={index} request={el.request} close={"+"}>
                        <p className="text">{el.answer}</p>
                    </Item>
                );
            })}
        </div>
    );
};

export default List;
