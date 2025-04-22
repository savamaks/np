"use client";
import React, { useEffect, useState, MouseEvent, ChangeEvent } from "react";
import s from "./ListProduct.module.scss";
import { IProduct } from "@/app/types";
import Button from "../../Button/Button";
import Image from "next/image";
import krestik from "@/public/krestik.svg";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useStore } from "../../store/useStore";

interface IPropsData {
    setData: (value: Array<IProduct>) => void;
    token: string;
    authorization: (value: boolean, valueTwo: string) => void;
}
const getData = async ({ setData, token, authorization }: IPropsData) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SRC_STRAPI}/api/products?populate=*&publicationState=preview`, {
            method: "GET",
            next: {
                revalidate: 0,
            },
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            authorization(false, "");
        }
        const data = await res.json();

        setData(data.data);
    } catch (error) {
        console.log(error);
    }
};
interface IProps {
    list: Array<IProduct>;
    setListIdAdded: (value: Array<string>) => void;
    setListIdNotAdded: (value: Array<string>) => void;
}

const ListProduct = ({ list, setListIdAdded, setListIdNotAdded }: IProps) => {
    const [data, setData] = useState<Array<IProduct>>([]);
    const { authService } = useStore();

    const [productsAdded, setProductsAdded] = useState<Array<IProduct>>(list);
    const [productsNotAdded, setProductsNotAdded] = useState<Array<IProduct>>([]);
    const [productsDelete, setProductsDelete] = useState<Array<IProduct>>([]);

    const [update, setUpdate] = useState<boolean>(false);
    const [deleteProduct, setDeleteProduct] = useState<IProduct>();
    const [select, setSelect] = useState<string>("");

    const handleOnDragEnd = (result: any) => {
        if (!result.destination) return;

        const items = Array.from(productsAdded);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setProductsAdded(items);
    };

    useEffect(() => {
        const arr: Array<IProduct> = [];

        data.map((product: IProduct) => {
            let count = 0;
            productsAdded.map((el: IProduct) => {
                if (+product.id === +el.id) {
                    count++;
                }
            });
            if (count === 0) {
                arr.push(product);
            }
            setProductsNotAdded(arr);
        });
    }, [data, select]);

    useEffect(() => {
        getData({ setData, token: authService.token, authorization: authService.authorization });
    }, []);

    useEffect(() => {
        const arrAdded = productsAdded.filter((el: IProduct) => el !== deleteProduct);
        setProductsAdded(arrAdded);
        const arrayNotAdded = productsNotAdded;
        if (deleteProduct !== undefined) {
            arrayNotAdded.push(deleteProduct);
        }
        setProductsNotAdded(arrayNotAdded);
    }, [deleteProduct]);

    useEffect(() => {
        const arr = productsNotAdded.filter((el: IProduct) => +el.id === +select);
        if (arr.length > 0) {
            const array = productsAdded;
            array.push(arr[0]);
            setProductsAdded(array);
        }
        setSelect("");
    }, [select]);

    useEffect(() => {
        const arrAdded: Array<string> = [];
        productsAdded.map((el: IProduct) => {
            arrAdded.push(el.id);
        });
        const arrNotAdded: Array<string> = [];
        productsNotAdded.map((el: IProduct) => {
            arrNotAdded.push(el.id);
        });
        setListIdAdded(arrAdded);
        setListIdNotAdded(arrNotAdded);
    }, [productsAdded, productsNotAdded]);
    return (
        <>
            <select
                value={select}
                name="select"
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    e.preventDefault();
                    setSelect(e.target.value);
                }}
                className={s.select}
            >
                <option value={"none"} className={s.select__option}>
                    добавьте продукты
                </option>
                {productsNotAdded.map((el: IProduct, index: number) => {
                    return (
                        <option value={el.id} key={index} className={s.select__option}>
                            {el.name}
                        </option>
                    );
                })}
            </select>

            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="productsAdded">
                    {(provided: any) => (
                        <div className={s.container} {...provided.droppableProps} ref={provided.innerRef}>
                            {productsAdded.map((el: IProduct, index: number) => {
                                const id: string = el.id;
                                return (
                                    <Draggable key={el.id} draggableId={`${id}`} index={index}>
                                        {(provided: any) => (
                                            <div
                                                className={s.container__card}
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <p className={s.container__card_text}>{el.name}</p>
                                                <Button
                                                    type="noBorder"
                                                    onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                                        e.preventDefault();
                                                        setDeleteProduct(el);
                                                    }}
                                                    className={s.container__card_button}
                                                >
                                                    <Image loading="lazy" src={krestik} width={15} height={15} alt="close" />
                                                </Button>
                                            </div>
                                        )}
                                    </Draggable>
                                );
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    );
};

export default ListProduct;
