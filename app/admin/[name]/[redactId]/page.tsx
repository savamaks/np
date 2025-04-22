"use client";

import CardUpdate from "@/app/components/adminPanel/CardUpdate/CardUpdate";
import UpdateRequest from "@/app/components/adminPanel/updateReques/UpdateRequest";
import { useStore } from "@/app/components/store/useStore";
import useFetchData from "@/app/Hooks/useFetchData";
import NotFound from "@/app/not-found";
import { ICategory, IProduct, IRequest } from "@/app/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface IPropsData {
    name: string;
    id: string;
    token: string;
}
const getData = async ({ name, id, token }: IPropsData) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SRC_STRAPI}/api/${name}/${id}?populate=*`, {
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
        console.log(data);
        return data.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const PageRedact = ({ params }: { params: { name: string; redactId: string } }) => {
    const [data, setData] = useState<ICategory | IProduct>();
    const [dataRequest, setDataRequest] = useState<IRequest>();
    const [confirmation, setConfirmation] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const { authService } = useStore();

    const router = useRouter();
   
    const api = async () => {
        if (params.name === "requests") {
            const result = await getData({
                name: params.name,
                id: params.redactId,
                token: authService.token,
            });
            if (result === null) {
                authService.authorization(false, "");
                router.push("/admin");

                return;
            } else {
                setDataRequest(result);
                return;
            }
        }

        const result = await getData({
            name: params.name,
            id: params.redactId,

            token: authService.token,
        });
        if (result === null) {
            authService.authorization(false, "");
            router.push("/admin");

            return;
        } else {
            setData(result);
        }
    };
    useEffect(() => {
        api();
    }, [refresh]);

    if (data === null) {
        return <NotFound />;
    } else {
        return (
            <>
                {(params.name === "categories" || params.name === "products") && (
                    <div>
                        {data && (
                            <CardUpdate
                                data={data}
                                setConfirmation={setConfirmation}
                                confirmation={confirmation}
                                refresh={() => {
                                    setRefresh((prev) => !prev);
                                }}
                                link={params.name}
                            />
                        )}
                    </div>
                )}
                {dataRequest !== undefined && (
                    <UpdateRequest
                        refresh={() => {
                            setRefresh((prev) => !prev);
                        }}
                        data={dataRequest}
                    />
                )}
            </>
        );
    }
};

export default PageRedact;
