import { useForm, usePage } from "@inertiajs/react"; // إضافة usePage لجلب البيانات من Laravel
import Master from "../Master";

export default function Create() {
    const { categories } = usePage().props; // جلب التصنيفات من Laravel

    const { data, setData, post, errors } = useForm({
        name: "",
        description: "",
        price: "",
        quantity: "",
        status: "instock",
        category_id: "",
        images: null, // لحفظ الصور
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.product.store"), {
            forceFormData: true, // لإرسال الصور بشكل صحيح
        });
    };

    return (
        <>
            <Master>
                <h1 className="text-3xl font-bold text-center mb-4">
                    Let's Create a New Product
                </h1>

                <div className="container bg-light my-4 p-4">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="row">
                            {/* الحقل الأول والثاني */}
                            <div className="col-md-6 mb-3">
                                <label htmlFor="name" className="form-label">
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className={`form-control ${
                                        errors.name ? "is-invalid" : ""
                                    }`}
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                                {errors.name && (
                                    <div className="invalid-feedback">
                                        {errors.name}
                                    </div>
                                )}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="price" className="form-label">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    id="price"
                                    className={`form-control ${
                                        errors.price ? "is-invalid" : ""
                                    }`}
                                    value={data.price}
                                    onChange={(e) =>
                                        setData("price", e.target.value)
                                    }
                                />
                                {errors.price && (
                                    <div className="invalid-feedback">
                                        {errors.price}
                                    </div>
                                )}
                            </div>

                            {/* الحقل الثالث والرابع */}
                            <div className="col-md-6 mb-3">
                                <label htmlFor="quantity" className="form-label">
                                    Quantity
                                </label>
                                <input
                                    type="number"
                                    id="quantity"
                                    className={`form-control ${
                                        errors.quantity ? "is-invalid" : ""
                                    }`}
                                    value={data.quantity}
                                    onChange={(e) =>
                                        setData("quantity", e.target.value)
                                    }
                                />
                                {errors.quantity && (
                                    <div className="invalid-feedback">
                                        {errors.quantity}
                                    </div>
                                )}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="status" className="form-label">
                                    Status
                                </label>
                                <select
                                    id="status"
                                    className={`form-select ${
                                        errors.status ? "is-invalid" : ""
                                    }`}
                                    value={data.status}
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                >
                                    <option value="instock">In Stock</option>
                                    <option value="outofstock">
                                        Out of Stock
                                    </option>
                                </select>
                                {errors.status && (
                                    <div className="invalid-feedback">
                                        {errors.status}
                                    </div>
                                )}
                            </div>

                            {/* حقل الوصف */}
                            <div className="col-12 mb-3">
                                <label htmlFor="description" className="form-label">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    className={`form-control ${
                                        errors.description ? "is-invalid" : ""
                                    }`}
                                    rows="4"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                ></textarea>
                                {errors.description && (
                                    <div className="invalid-feedback">
                                        {errors.description}
                                    </div>
                                )}
                            </div>

                            {/* الحقل الخامس والسادس */}
                            <div className="col-md-6 mb-3">
                                <label htmlFor="category_id" className="form-label">
                                    Category
                                </label>
                                <select
                                    id="category_id"
                                    className={`form-select ${
                                        errors.category_id ? "is-invalid" : ""
                                    }`}
                                    value={data.category_id}
                                    onChange={(e) =>
                                        setData("category_id", e.target.value)
                                    }
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.category_id && (
                                    <div className="invalid-feedback">
                                        {errors.category_id}
                                    </div>
                                )}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="images" className="form-label">
                                    Upload Images
                                </label>
                                <input
                                    type="file"
                                    id="images"
                                    className={`form-control ${
                                        errors.images ? "is-invalid" : ""
                                    }`}
                                    multiple // السمة التي تجعل الحقل يقبل صور متعددة
                                    onChange={(e) =>
                                        setData("images", e.target.files)
                                    } // تخزين الصور كـ FileList
                                />
                                {errors.images && (
                                    <div className="invalid-feedback">
                                        {errors.images}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* زر الإرسال */}
                        <button type="submit" className="btn btn-primary">
                            Create Product
                        </button>
                    </form>
                </div>
            </Master>
        </>
    );
}
