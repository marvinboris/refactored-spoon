<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Controllers\UtilController;
use App\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    private $rules = [
        'name' => 'required|string',
        'description' => 'required|string',
        'details' => 'required|string',
        'popular' => 'required|numeric',
        'color' => 'required|string',
        'link' => 'required|string',
        'logo' => 'nullable|image',
    ];

    private function data()
    {
        $page = +request()->page;
        $show = request()->show;
        $search = request()->search;

        $total = 0;

        $data = [];
        $filteredData = Product::latest();

        $filteredData = $filteredData
            ->when($search, function ($query, $search) {
                if ($search !== "")
                    $query
                        ->where('name', 'LIKE', "%$search%")
                        ->orWhere('description', 'LIKE', "%$search%")
                        ->orWhere('details', 'LIKE', "%$search%")
                        ->orWhere('color', 'LIKE', "%$search%")
                        ->orWhere('link', 'LIKE', "%$search%");
            });

        $total = $filteredData->count();

        if ($show !== 'All') $filteredData = $filteredData->skip(($page - 1) * $show)->take($show);

        $filteredData = $filteredData->get();

        foreach ($filteredData as $product) {
            $data[] = array_merge($product->toArray(), []);
        }

        return [
            'products' => $data,
            'total' => $total,
        ];
    }



    public function  index()
    {
        $data = $this->data();

        $products = $data['products'];
        $total = $data['total'];

        return response()->json([
            'products' => $products,
            'total' => $total,
        ]);
    }

    public function show($id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $product = Product::find($id);
        if (!$product) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['products']['not_found'], 'danger'),
        ]);

        $product = $product->toArray();

        return response()->json([
            'product' => $product,
        ]);
    }

    public function store(Request $request)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $request->validate($this->rules);

        $input = $request->except('logo');

        if ($file = $request->file('logo')) {
            $fileName = time() . $file->getClientOriginalName();
            $file->move('products', $fileName);
            $input['logo'] = htmlspecialchars($fileName);
        }

        Product::create($input);

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['products']['created'], 'success'),
        ]);
    }

    public function update(Request $request, $id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $product = Product::find($id);
        if (!$product) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['products']['not_found'], 'danger'),
        ]);

        $request->validate($this->rules);

        $input = $request->except('logo');

        if ($file = $request->file('logo')) {
            if ($product->logo) unlink(public_path($product->logo));
            $fileName = time() . $file->getClientOriginalName();
            $file->move('products', $fileName);
            $input['logo'] = htmlspecialchars($fileName);
        }
        $input['quarter_id'] = $request->quarter;

        $product->update($input);

        return response()->json([
            'message' => [
                'type' => 'success',
                'content' => $cms['pages'][$user->language->abbr]['messages']['products']['updated']
            ],
        ]);
    }

    public function destroy($id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $product = Product::find($id);
        if (!$product) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['products']['not_found'], 'danger'),
        ]);

        if ($product->logo) unlink(public_path($product->logo));
        $product->delete();

        $data = $this->data();

        $products = $data['products'];
        $total = $data['total'];

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['products']['deleted'], 'success'),
            'products' => $products,
            'total' => $total,
        ]);
    }
}
