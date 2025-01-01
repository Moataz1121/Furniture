import Master from "../Master";
import { useForm } from '@inertiajs/react'; // لاستخدام الدوال الخاصة بالفورم

export default function Create() {
    const { data, setData, post, errors } = useForm({
        name: '', // الحقل الخاص بالاسم
        description: '', // الحقل الخاص بالوصف
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.category.store')); // إرسال البيانات إلى الروت
    };

    return (
        <>
            <Master>
                <h1 className="text-3xl font-bold text-center">Create a New Category</h1>

                <div className="container bg-light my-4 p-4">
                    <form onSubmit={handleSubmit}>
                        {/* حقل الاسم */}
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Category Name</label>
                            <input
                                type="text"
                                id="name"
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                        </div>

                        {/* حقل الوصف */}
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea
                                id="description"
                                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                            ></textarea>
                            {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                        </div>

                        {/* زر الإرسال */}
                        <button type="submit" className="btn btn-primary">Create</button>
                    </form>
                </div>
            </Master>
        </>
    );
}
