import { INewData, INewDataRequest } from "@/app/types";

interface IProps {
    data: INewData | INewDataRequest;
    link: string;
    token: string;
    files?:FileList
}

export const createData = async ({ data, link, token,files }: IProps) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SRC_STRAPI}/api/${link}`, {
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
        return data.data;
        
    } catch (error) {
        console.error("Error during file upload:", error);
        return null;
    }
};
