import Master from "../Master";
import { usePage } from "@inertiajs/react"; // لجلب البيانات القادمة من Laravel

export default function Welcome() {
    const { products } = usePage().props; // الحصول على البيانات المرسلة من Laravel

    return (
        <>
            <Master>
                <h1 className="text-3xl font-bold text-center">Products</h1>

                <div className="container bg-light my-4 p-4">
                    {/* <a href={route("admin.products.create")} className="btn btn-primary" >Create</a> */}
                    {/* التحقق من وجود المنتجات */}
                    <a
                        href={route("admin.product.create")}
                        className="btn btn-primary text-left mb-3"
                    >
                        Create
                    </a>
                    {products.data.length > 0 ? (
                        <>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Status</th>
                                        <th>Images</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.data.map((product) => (
                                        <tr key={product.id}>
                                            <td>{product.name}</td>
                                            <td>{product.price}</td>
                                            <td>{product.status}</td>
                                            <td>
                                                {product.images.length > 0 ? (
                                                    <img
                                                        src={`http://127.0.0.1:8000/storage/${product.images[0].image}`} // عرض أول صورة فقط مع إضافة المسار الكامل
                                                        alt={product.name}
                                                        style={{
                                                            width: "50px",
                                                            height: "50px",
                                                            marginRight: "5px",
                                                        }}
                                                    />
                                                ) : (
                                                    <span>No Images</span>
                                                )}
                                            </td>
                                            <td>
                                                <a href="" className="btn btn-primary">Edit</a>
                                        <a href="" className="btn btn-danger mx-2">Delete</a>
                                        <a href="" className="btn btn-info">Show</a>

                                    </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>

                            {/* عرض روابط التصفح (pagination) */}
                            <div className="d-flex justify-content-between align-items-center mt-4">
                                {products.links.map((link, index) => (
                                    <button
                                        key={index}
                                        className={`btn ${
                                            link.active
                                                ? "btn-primary"
                                                : "btn-outline-primary"
                                        }`}
                                        onClick={() => {
                                            if (link.url) {
                                                window.location.href = link.url;
                                            }
                                        }}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    ></button>
                                ))}
                            </div>
                        </>
                    ) : (
                        <p className="text-center text-muted">
                            No products available.
                        </p>
                    )}
                </div>
            </Master>
        </>
    );
}
