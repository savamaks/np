import Categories from "../components/adminPanel/Categories/Categories";
import Create from "../components/adminPanel/create/create";
import s from './page.module.scss'
// const getData = async () => {
//     try {
//         const res = await fetch(`https://wclouds.ru/api/categories?populate=*`, {
//             method: "GET",
//             next: {
//                 revalidate: 0,
//             },
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACESS_TOKEN}`,
//             },
//         });
//         const data = res.json();
//         return data;
//     } catch (error) {
//         console.log(error);
//     }
// };
const AdminPage = async () => {
    // const data = await getData();

    return (
        <div>
            <Categories />
            {/* <Create /> */}
        </div>
    );
};

export default AdminPage;
