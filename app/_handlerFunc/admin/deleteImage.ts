import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface IProps {
    token: string;
    id: string;
    router: AppRouterInstance;
    authorization: (value: boolean, valueTwo: string) => void;
}
export const deleteImage = async ({ token, id, router, authorization }: IProps) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SRC_STRAPI}/api/upload/files/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.status === 401) {
            authorization(false, "");
            router.push("/admin");
        }
        if (!response.ok) {
            throw new Error(`Ошибка удаления файла: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Ошибка:", error);
    }
};
