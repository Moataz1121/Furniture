import Footer from "./Layouts/Footer";
import Nav from "./Layouts/Nav";
import Script from "./Layouts/Script";
import Side from "./Layouts/Side";

export default function Master({ children }) {
    return (
        <>
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    <Side />
                    <div className="layout-page">
                        <Nav />
                        <div className="content-wrapper">
                            <div className="container-xxl flex-grow-1 container-p-y">
                                {children}
                            </div>
                            <Footer />
                        </div>
                    </div>
                </div>
            </div>
            <Script />
        </>
    );
}
