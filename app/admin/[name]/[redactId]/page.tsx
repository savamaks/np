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
    setData: (value: ICategory | IProduct) => void;
    router: AppRouterInstance;
    authorization: (value: boolean, valueTwo: string) => void;
    token: string;
}
const getData = async ({ name, id, setData, router, authorization, token }: IPropsData) => {
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
            authorization(false, "");
            router.push("/admin");
        }

        const data = await res.json();
        setData(data.data);
    } catch (error) {
        console.log(error);
    }
};
interface IPropsDataCat {
    setDataCategories: (value: Array<ICategory>) => void;
    router: AppRouterInstance;
    authorization: (value: boolean, valueTwo: string) => void;
    token: string;
}

const getDataCategories = async ({ setDataCategories, router, authorization, token }: IPropsDataCat) => {
    try {
        const res = await fetch(`https://wclouds.ru/api/categories`, {
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
            authorization(false, "");
            router.push("/admin");
        }
        const data = await res.json();
        setDataCategories(data.data);
    } catch (error) {
        console.log(error);
    }
};

const PageRedact = ({ params }: { params: { name: string; redactId: string } }) => {
    const [data, setData] = useState<ICategory>();
    const [dataCategories, setDataCategories] = useState<Array<ICategory>>([]);
    const [confirmation, setConfirmation] = useState(false);

    const [refresh, setRefresh] = useState(false);
    const { authService, appService } = useStore();
    const router = useRouter();

    useEffect(() => {
        getDataCategories({ setDataCategories, router, token: authService.token, authorization: authService.authorization });
        getData({ name: params.name, id: params.redactId, setData, router, token: authService.token, authorization: authService.authorization });
    }, [refresh]);

    useEffect(() => {
        if (!authService.login) {
            router.push("/admin");
        }
    }, [authService.login]);

    if (data === null) {
        return <NotFound />;
    } else {
        if (data === undefined) return <></>;
        const previews = data.attributes.image.data
            ? `https://wclouds.ru${data.attributes.image.data.attributes.url}`
            : "https://wclouds.ru/uploads/free_icon_image_editing_8304794_ce7538248f.png";

        const idCat = data.attributes.category?.data.id ? data.attributes.category?.data.id : null;
        const image = data.attributes.image;
        const images = data.attributes.images?.data ? data.attributes.images?.data : null;
        const productsList = data.attributes.products?.data ? data.attributes.products?.data : null;
        const category = data.attributes.category?.data ? data.attributes.category.data : null;

        interface IPropsSaveChange {
            files: FileList;
            file: FileList;
            name: string;
            title: string;
            description: string;
            idCategory: string;
            listIdConnect: Array<string>;
            listIdDisconnect: Array<string>;
        }
        const saveChange = async ({ files, file, name, title, description, idCategory, listIdConnect, listIdDisconnect }: IPropsSaveChange) => {
            const dataUpdate: INewData = {
                name: name,
                title: title,
                description: description,
            };
            if (idCategory !== null) {
                dataUpdate.category = {
                    connect: [
                        {
                            id: idCategory,
                            position: {
                                start: true,
                            },
                        },
                    ],
                };
            }
            if (params.name === "categories") {
                dataUpdate.products = {
                    connect: listIdConnect,
                    disconnect: listIdDisconnect,
                };
            }
            const result = await saveChangeCategory({
                data: dataUpdate,
                id: data ? data?.id : "",
                link: params.name,
                token: authService.token,
                router,
                authorization: authService.authorization,
            });

            //сохранение изображения

            if (file !== null) {
                const formData = new FormData();

                const linkApi = params.name === "categories" ? "category" : "product";

                formData.append("files", file[0]);
                formData.append("ref", `api::${linkApi}.${linkApi}`);
                formData.append("refId", data ? data?.id : "");
                formData.append("field", "image");

                await changeImage({ token: authService.token, formData, router, authorization: authService.authorization });

                if (image?.data !== null && image !== undefined) {
                    const res = await deleteImage({ token: authService.token, id: image.data.id, router, authorization: authService.authorization });
                    if (res.data !== null) {
                        setRefresh((prev) => !prev);
                    }
                }
                appService.changePreview([]);
            }

            if (files !== null) {
                const formData = new FormData();

                const linkApi = params.name === "categories" ? "category" : "product";

                for (let index = 0; index < files.length; index++) {
                    formData.append("files", files[index]);
                }
                formData.append("ref", `api::${linkApi}.${linkApi}`);
                formData.append("refId", data ? data?.id : "");
                formData.append("field", "images");

                await changeImage({ token: authService.token, formData, router, authorization: authService.authorization });

                appService.changeArrPreviews([]);
            }
            setConfirmation(false);

            setRefresh((prev) => !prev); //обновляет страницу и получает новые данные с API
        };
        return (
            <div>
                {data?.attributes && (
                    <CardUpdate
                        setConfirmation={setConfirmation}
                        confirmation={confirmation}
                        id={data.id}
                        names={data.attributes.name}
                        titles={data.attributes.title}
                        descriptions={data.attributes.description}
                        previews={previews}
                        dataCategories={dataCategories}
                        image={image}
                        images={images}
                        productsList={productsList}
                        category={category}
                        refresh={() => {
                            setRefresh((prev) => !prev);
                        }}
                        link={params.name}
                        idCat={idCat}
                        saveChange={saveChange}
                    />
                )}
            </div>
        );
    }
};

export default PageRedact;
