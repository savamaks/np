interface IProps {
    identifier: string;
    password: string;
}

export const authAdmin = async ({ identifier, password }: IProps) => {
    const formData = new FormData();
    formData.append("identifier", identifier);
    formData.append("password", password);

    try {
        const res = await fetch(`https://wclouds.ru/api/auth/local/`, {
            method: "POST",
            body: formData,
        });
        const data = await res.json();
        if (!res.ok) {
            return res.status;
        }
        return data;
    } catch (error) {
        console.log(error);
    }
};
