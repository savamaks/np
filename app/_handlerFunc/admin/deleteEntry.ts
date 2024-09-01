interface IProps {
    id: string;
    link: string;
    token: string;
}
export const deleteEntry = async ({ id, link, token }: IProps) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SRC_STRAPI}/api/${link}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await res.json();
        if (res.status === 401) {
            return null;
        }
        return true;
    } catch (error) {
        console.log(error);
        return null;
    }
};
