import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface IProps {
    token: string;
    formData: any;
}
export const changeImage = async ({ token, formData }: IProps) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SRC_STRAPI}/api/upload`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });
        if (response.status === 401) {
            return null;
        }
        if (!response.ok) {
            throw new Error(`Error uploading file: ${response.statusText}`);
        }

        const data = await response.json();
        return true;
    } catch (error) {
        console.error("Error during file upload:", error);
        return null;
    }
};
