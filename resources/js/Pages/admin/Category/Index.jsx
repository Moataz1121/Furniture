import { useEffect, useState } from "react";
import Master from "../Master";
import { usePage, useForm } from "@inertiajs/react"; // لاستقبال البيانات من Laravel
import { Inertia } from '@inertiajs/inertia';
export default function Welcome() {
    const { categories: initialCategories, flash } = usePage().props;
    const [categories, setCategories] = useState(initialCategories || []);
    const [showMessage, setShowMessage] = useState(!!flash?.status);

    const { post } = useForm(); // استخدام useForm لإرسال الطلب

    useEffect(() => {
        if (flash?.status) {
            const timer = setTimeout(() => {
                setShowMessage(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [flash?.status]);

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this category?')) {
            Inertia.delete(route('admin.category.destroy', { category: id }), {
                preserveScroll: true,
                onSuccess: () => {
                    console.log('Category deleted successfully!');
                    setCategories((prevCategories) =>
                        prevCategories.filter((category) => category.id !== id)
                    );
                },
            });
        }
    };

    return (
        <>
            <Master>
                <h1 className="text-3xl font-bold text-center">Categories</h1>

                {/* رسالة النجاح */}
                {showMessage && (
                    <div className="alert alert-success d-flex justify-content-between">
                        {flash.status}
                        <button
                            onClick={() => setShowMessage(false)}
                            className="btn-close"
                        ></button>
                    </div>
                )}

                <div className="container bg-light my-2 p-3">
                    <a
                        href={route("admin.category.create")}
                        className="btn btn-primary text-left mb-3"
                    >
                        Create
                    </a>

                    {categories.length > 0 ? (
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category) => (
                                    <tr key={category.id}>
                                        <td>{category.id}</td>
                                        <td>{category.name}</td>
                                        <td>{category.description}</td>
                                        <td>
                                            <a
                                                href={route(
                                                    "admin.category.edit",
                                                    { category: category.id }
                                                )}
                                                className="btn btn-sm btn-warning mx-1"
                                            >
                                                Edit
                                            </a>
                                            <button
                                                onClick={() =>
                                                    handleDelete(category.id)
                                                }
                                                className="btn btn-sm btn-danger"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-center text-muted">
                            No categories available.
                        </p>
                    )}
                </div>
            </Master>
        </>
    );
}
