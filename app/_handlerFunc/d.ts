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
    const dataUpdate: INewData = {
        name: name,
        title: title,
        description: description,
        publishedAt: published,
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