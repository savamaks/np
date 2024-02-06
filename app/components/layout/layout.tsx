import React from "react";
import Header from "../header/Header";
import Footer from "../Footer/Footer";

const Layout = ({ children }: any) => {
    return (
        <>
            <Header />
            {children}
            <Footer/>
        </>
    );
};

export default Layout;
