import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface IProps {
    token: string;
    formData: any;
    router: AppRouterInstance;
    authorization: (value: boolean, valueTwo: string) => void;
}
export const changeImage = async ({ token, formData, router, authorization }: IProps) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SRC_STRAPI}/api/upload`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });
        if (response.status === 401) {
            authorization(false, "");
            router.push("/admin");
        }
        if (!response.ok) {
            throw new Error(`Error uploading file: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Категория изменена", data);
    } catch (error) {
        console.error("Error during file upload:", error);
    }
};
