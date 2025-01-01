import { usePage } from "@inertiajs/react";
import Master from "../Master";

export default function Show() {
    const { product } = usePage().props; // جلب بيانات المنتج من Laravel

    if (!product) {
        return (
            <Master>
                <div className="bg-white p-4">
                    <h1 className="text-3xl font-bold text-center">
                        Product Not Found
                    </h1>
                </div>
            </Master>
        );
    }

    return (
        <>
            <Master>
                <div className="bg-white p-4">
                    <h1 className="text-3xl font-bold mb-4">Product Details</h1>

                    {/* تفاصيل المنتج */}
                    <div className="mb-4">
                        <h2 className="text-2xl font-semibold">
                            {product.name}
                        </h2>
                        <p className="text-muted">{product.description}</p>
                        <p>
                            <strong>Price:</strong> ${product.price}
                        </p>
                        <p>
                            <strong>Quantity:</strong> {product.quantity}
                        </p>
                        <p>
                            <strong>Status:</strong>{" "}
                            {product.status === "instock"
                                ? "In Stock"
                                : "Out of Stock"}
                        </p>
                    </div>

                    {/* صور المنتج */}
                    <div>
                        <h3 className="text-xl font-bold mb-2">Images</h3>
                        {product.images.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {product.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={`http://127.0.0.1:8000/storage/${image.image}`}
                                        alt={`${product.name} - ${index + 1}`}
                                        className="w-full h-auto rounded shadow"
                                    />
                                ))}
                            </div>
                        ) : (
                            <p>No images available for this product.</p>
                        )}
                    </div>
                </div>
            </Master>
        </>
    );
}
