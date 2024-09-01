
interface IProps {
    token: string;
    id: string;
}
export const deleteImage = async ({ token, id }: IProps) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SRC_STRAPI}/api/upload/files/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.status === 401) {
            return null;
        }
        if (!response.ok) {
            throw new Error(`Ошибка удаления файла: ${response.statusText}`);
        }

        const data = await response.json();

        return true;
    } catch (error) {
        console.error("Ошибка:", error);
        return null;
    }
};
