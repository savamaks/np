"use client";
import { changeImage } from "@/app/_handlerFunc/admin/changeImage";
import { deleteImage } from "@/app/_handlerFunc/admin/deleteImage";
import { saveChangeCategory } from "@/app/_handlerFunc/admin/saveChangeCategory";
import CardUpdate from "@/app/components/adminPanel/CardUpdate/CardUpdate";
import { useStore } from "@/app/components/store/useStore";
import NotFound from "@/app/not-found";
import { ICategory, INewData, IProduct } from "@/app/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface IPropsData {
    name: string;
    id: string;
    token: string;
}
const getData = async ({ name, id, token }: IPropsData): Promise<ICategory | IProduct | null> => {
    try {
        const res = await fetch(`https://wclouds.ru/api/${name}/${id}?populate=*`, {
            method: "GET",
            next: {
                revalidate: 0,
            },
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.status === 401) {
            return null;
        }

        const data = await res.json();
        return data.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};
interface IPropsDataCat {
    token: string;
}

const getDataCategories = async ({ token }: IPropsDataCat): Promise<Array<ICategory> | null> => {
    try {
        const res = await fetch(`https://wclouds.ru/api/categories?&publicationState=preview`, {
            method: "GET",
            next: {
                revalidate: 0,
            },
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.status === 401) {
            return null;
        }
        const data = await res.json();
        return data.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const PageRedact = ({ params }: { params: { name: string; redactId: string } }) => {
    const [data, setData] = useState<ICategory | IProduct>();
    const [dataCategories, setDataCategories] = useState<Array<ICategory>>([]);
    const [confirmation, setConfirmation] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const { authService, appService } = useStore();

    const router = useRouter();

    const api = async () => {
        const resultCategory = await getDataCategories({
            token: authService.token,
        });
        if (resultCategory === null) {
            authService.authorization(false, "");
            router.push("/admin");

            return;
        } else {
            setDataCategories(resultCategory);

            const resultProduct = await getData({
                name: params.name,
                id: params.redactId,

                token: authService.token,
            });
            if (resultProduct === null) {
                authService.authorization(false, "");
                router.push("/admin");

                return;
            } else {
                setData(resultProduct);
            }
        }
    };
    useEffect(() => {
        api();
    }, [refresh]);

    if (data === null) {
        return <NotFound />;
    } else {
        if (data === undefined) return <></>;

        // setPublic(data.attributes.publishedAt)

        interface IPropsSaveChange {
            files: FileList;
            file: FileList;
            name: string;
            title: string;
            description: string;
            idCategory: string;
            listIdConnect: Array<string>;
            listIdDisconnect: Array<string>;
            published: string;
        }
        const saveChange = async ({
            files,
            file,
            name,
            title,
            description,
            idCategory,
            listIdConnect,
            listIdDisconnect,
            published,
        }: IPropsSaveChange) => {
            // const dataUpdate: INewData = {
            //     name: name,
            //     title: title,
            //     description: description,
            //     publishedAt: published,
            // };
            // if (idCategory !== null) {
            //     dataUpdate.category = {
            //         connect: [
            //             {
            //                 id: idCategory,
            //                 position: {
            //                     start: true,
            //                 },
            //             },
            //         ],
            //     };
            // }
            // if (params.name === "categories") {
            //     dataUpdate.products = {
            //         connect: listIdConnect,
            //         disconnect: listIdDisconnect,
            //     };
            // }
            // const result = await saveChangeCategory({
            //     data: dataUpdate,
            //     id: data ? data?.id : "",
            //     link: params.name,
            //     token: authService.token,
            //     router,
            //     authorization: authService.authorization,
            // });

            // //сохранение изображения

            // if (file !== null) {
            //     const formData = new FormData();

            //     const linkApi = params.name === "categories" ? "category" : "product";

            //     formData.append("files", file[0]);
            //     formData.append("ref", `api::${linkApi}.${linkApi}`);
            //     formData.append("refId", data ? data?.id : "");
            //     formData.append("field", "image");

            //     await changeImage({ token: authService.token, formData, router, authorization: authService.authorization });

            //     if (image?.data !== null && image !== undefined) {
            //         const res = await deleteImage({ token: authService.token, id: image.data.id, router, authorization: authService.authorization });
            //         if (res.data !== null) {
            //             setRefresh((prev) => !prev);
            //         }
            //     }
            //     appService.changePreview([]);
            // }

            // if (files !== null) {
            //     const formData = new FormData();

            //     const linkApi = params.name === "categories" ? "category" : "product";

            //     for (let index = 0; index < files.length; index++) {
            //         formData.append("files", files[index]);
            //     }
            //     formData.append("ref", `api::${linkApi}.${linkApi}`);
            //     formData.append("refId", data ? data?.id : "");
            //     formData.append("field", "images");

            //     await changeImage({ token: authService.token, formData, router, authorization: authService.authorization });

            //     appService.changeArrPreviews([]);
            // }
            // setConfirmation(false);

            // setRefresh((prev) => !prev); //обновляет страницу и получает новые данные с API
        };
        return (
            <div>
                {data?.attributes && (
                    <CardUpdate
                        data={data}
                        setConfirmation={setConfirmation}
                        confirmation={confirmation}
                        dataCategories={dataCategories}
                        refresh={() => {
                            setRefresh((prev) => !prev);
                        }}
                        link={params.name}
                        saveChange={saveChange}
                    />
                )}
            </div>
        );
    }
};

export default PageRedact;
