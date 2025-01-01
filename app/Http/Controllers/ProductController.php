<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $products = Product::with('images')->paginate(10);
        return inertia('admin/Products/Index', [
            'products' => $products
        ]);
    }

    /**
     * Show the form for creating a wonew resource.
     */
    public function create()
    {
        //
        $categories = Category::all();
        return inertia('admin/Products/Create', [
            'categories' => $categories
        ]);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        //
        $validated = $request->validated();
      $product =  Product::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'category_id' => $validated['category_id'],
            'price' => $validated['price'],
            'quantity' => $validated['quantity'],
            'status' => $validated['status'],
        ]);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('products', 'public'); // رفع الصورة
                $product->images()->create([
                    'image' => $path,
                ]);
            }
        }
        return redirect()->route('admin.product.index')->with('status', 'Product created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
        $product = Product::with('images')->find($product->id);
        // dd($product);
        return inertia('admin/Products/Show', [
            'product' => $product
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $product = Product::with('images')->find($product->id);
        $categories = Category::all();
        return inertia('admin/Products/Edit', [
            'product' => $product,
            'categories' => $categories
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        // dd($request->all());
        $data = $request->validated();

        // تحديث المنتج
        $product->update($data);

        // رفع الصور الجديدة
        if ($request->hasFile('new_images')) {
            foreach ($request->file('new_images') as $image) {
                $path = $image->store('products', 'public');
                $product->images()->create([
                    'image' => $path,
                ]);
            }
        }

        return redirect()->route('admin.product.index')->with('status', 'Product updated successfully.');
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
        $product->delete();
        return redirect()->route('admin.product.index')->with('status', 'Product deleted successfully.');
    }

    public function deleteImage($id){
        $image = ProductImage::find($id);

    if (!$image) {
        return response()->json(['message' => 'Image not found'], 404);
    }

    if (Storage::exists('public/' . $image->image_url)) {
        Storage::delete('public/' . $image->image_url);
    }

    $image->delete();

    return redirect()->back()->with('success', 'Image deleted successfully');
    }
}
