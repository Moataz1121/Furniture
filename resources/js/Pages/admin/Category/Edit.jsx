import { usePage, useForm } from '@inertiajs/react';
import Master from '../Master';

export default function Edit() {
    const { category } = usePage().props; // جلب بيانات التصنيف الممررة من Laravel
    const { data, setData, put, errors } = useForm({
        name: category.name || '',
        description: category.description || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.category.update', { category: category.id }), {
            onSuccess: () => {
                console.log('Category updated successfully!');
            },
        });
    };

    return (
        <Master>
            <h1 className="text-3xl font-bold text-center">Edit Category</h1>
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
                    <button type="submit" className="btn btn-primary">Update</button>
                </form>
            </div>
        </Master>
    );
}
