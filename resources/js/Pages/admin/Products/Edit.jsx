import { useForm, usePage } from "@inertiajs/react";
import Master from "../Master";
import { Inertia } from "@inertiajs/inertia";

export default function Edit() {
    const { product, categories } = usePage().props; // جلب المنتج والتصنيفات من Laravel

    // التحقق إذا لم يتم تحميل المنتج أو التصنيفات
    if (!product || !categories) {
        return (
            <Master>
                <div className="text-center p-4">
                    <h2>Loading product details...</h2>
                </div>
            </Master>
        );
    }

    const { data, setData, errors } = useForm({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        quantity: product.quantity || "",
        status: product.status || "instock",
        category_id: product.category_id || "",
        images: product.images || [],
        new_images: null, // لحفظ الصور الجديدة
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        // إضافة البيانات النصية
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("quantity", data.quantity);
        formData.append("status", data.status);
        formData.append("category_id", data.category_id);

        // إضافة الصور الجديدة
        if (data.new_images) {
            Array.from(data.new_images).forEach((file, index) => {
                formData.append(`new_images[${index}]`, file);
            });
        }

        // تمرير _method مع القيمة PUT
        formData.append("_method", "PUT");

        // إرسال الطلب مع التوجيه بعد النجاح
        Inertia.post(route("admin.product.update", { product: product.id }), formData, {
            onSuccess: () => {
                // التوجيه بعد النجاح إلى صفحة index
                Inertia.visit(route("admin.product.index"));
            },
            onError: (errors) => {
                console.error(errors); // مراقبة الأخطاء
            },
        });
    };



    const handleImageDelete = (imageId) => {
        if (confirm("Are you sure you want to delete this image?")) {
            Inertia.delete(route("admin.product-images.destroy", { image: imageId }), {
                onSuccess: () => {
                    setData("images", data.images.filter((img) => img.id !== imageId));
                },
            });
        }
    };

    return (
        <>
            <Master>
                <h1 className="text-3xl font-bold text-center mb-4">Edit Product</h1>

                <div className="container bg-light my-4 p-4">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="row">
                            {/* الحقول النصية */}
                            <div className="col-md-6 mb-3">
                                <label htmlFor="name" className="form-label">
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                />
                                {errors.name && (
                                    <div className="invalid-feedback">{errors.name}</div>
                                )}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="price" className="form-label">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    id="price"
                                    className={`form-control ${errors.price ? "is-invalid" : ""}`}
                                    value={data.price}
                                    onChange={(e) => setData("price", e.target.value)}
                                />
                                {errors.price && (
                                    <div className="invalid-feedback">{errors.price}</div>
                                )}
                            </div>

                            <div className="col-md-6 mb-3">
                                <label htmlFor="quantity" className="form-label">
                                    Quantity
                                </label>
                                <input
                                    type="number"
                                    id="quantity"
                                    className={`form-control ${errors.quantity ? "is-invalid" : ""}`}
                                    value={data.quantity}
                                    onChange={(e) => setData("quantity", e.target.value)}
                                />
                                {errors.quantity && (
                                    <div className="invalid-feedback">{errors.quantity}</div>
                                )}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="status" className="form-label">
                                    Status
                                </label>
                                <select
                                    id="status"
                                    className={`form-select ${errors.status ? "is-invalid" : ""}`}
                                    value={data.status}
                                    onChange={(e) => setData("status", e.target.value)}
                                >
                                    <option value="instock">In Stock</option>
                                    <option value="outofstock">Out of Stock</option>
                                </select>
                                {errors.status && (
                                    <div className="invalid-feedback">{errors.status}</div>
                                )}
                            </div>

                            <div className="col-12 mb-3">
                                <label htmlFor="description" className="form-label">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    className={`form-control ${errors.description ? "is-invalid" : ""}`}
                                    rows="4"
                                    value={data.description}
                                    onChange={(e) => setData("description", e.target.value)}
                                ></textarea>
                                {errors.description && (
                                    <div className="invalid-feedback">{errors.description}</div>
                                )}
                            </div>

                            <div className="col-md-6 mb-3">
                                <label htmlFor="category_id" className="form-label">
                                    Category
                                </label>
                                <select
                                    id="category_id"
                                    className={`form-select ${errors.category_id ? "is-invalid" : ""}`}
                                    value={data.category_id}
                                    onChange={(e) => setData("category_id", e.target.value)}
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.category_id && (
                                    <div className="invalid-feedback">{errors.category_id}</div>
                                )}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="new_images" className="form-label">
                                    Upload New Images
                                </label>
                                <input
                                    type="file"
                                    id="new_images"
                                    className={`form-control ${errors.new_images ? "is-invalid" : ""}`}
                                    multiple
                                    onChange={(e) => setData("new_images", e.target.files)}
                                />
                                {errors.new_images && (
                                    <div className="invalid-feedback">{errors.new_images}</div>
                                )}
                            </div>
                        </div>

                        {/* الصور القديمة */}
                        <div className="mb-4">
                            <h4>Existing Images</h4>
                            <div className="d-flex flex-wrap">
                                {data.images && data.images.length > 0 ? (
                                    data.images.map((image) => (
                                        <div key={image.id} className="position-relative mx-2">
                                            <img
                                                src={`http://127.0.0.1:8000/storage/${image.image}`}
                                                alt={product.name}
                                                style={{
                                                    width: "100px",
                                                    height: "100px",
                                                    borderRadius: "5px",
                                                }}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleImageDelete(image.id)}
                                                className="btn btn-danger position-absolute"
                                                style={{
                                                    top: "0",
                                                    right: "0",
                                                    borderRadius: "50%",
                                                }}
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <p>No images available.</p>
                                )}
                            </div>
                        </div>

                        {/* زر التحديث */}
                        <button type="submit" className="btn btn-primary">
                            Update Product
                        </button>
                    </form>
                </div>
            </Master>
        </>
    );
}
