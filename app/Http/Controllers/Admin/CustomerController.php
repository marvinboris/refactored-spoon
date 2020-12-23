<?php

namespace App\Http\Controllers\Admin;

use App\Customer;
use App\Http\Controllers\Controller;
use App\Http\Controllers\UtilController;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    private $rules = [
        'name' => 'required|string',
        'address' => 'required|string', 
        'country' => 'required|string',
        'phone' => 'required|string',
        'email' => 'required|string',
        'logo' => 'nullable|image',
    ];

    private function data()
    {
        $page = +request()->page;
        $show = request()->show;
        $search = request()->search;

        $total = 0;

        $data = [];
        $filteredData = Customer::latest();

        $filteredData = $filteredData
            ->when($search, function ($query, $search) {
                if ($search !== "")
                    $query
                        ->where('name', 'LIKE', "%$search%")
                        ->orWhere('address', 'LIKE', "%$search%")
                        ->orWhere('phone', 'LIKE', "%$search%")
                        ->orWhere('email', 'LIKE', "%$search%");
            });

        $total = $filteredData->count();

        if ($show !== 'All') $filteredData = $filteredData->skip(($page - 1) * $show)->take($show);

        $filteredData = $filteredData->get();

        foreach ($filteredData as $customer) {
            $data[] = array_merge($customer->toArray(), []);
        }

        return [
            'customers' => $data,
            'total' => $total,
        ];
    }



    public function  index()
    {
        $data = $this->data();

        $customers = $data['customers'];
        $total = $data['total'];

        return response()->json([
            'customers' => $customers,
            'total' => $total,
        ]);
    }

    public function show($id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $customer = Customer::find($id);
        if (!$customer) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['customers']['not_found'], 'danger'),
        ]);

        $customer = $customer->toArray();

        return response()->json([
            'customer' => $customer,
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
            $file->move('customers', $fileName);
            $input['logo'] = htmlspecialchars($fileName);
        }

        Customer::create($input);

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['customers']['created'], 'success'),
        ]);
    }

    public function update(Request $request, $id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $customer = Customer::find($id);
        if (!$customer) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['customers']['not_found'], 'danger'),
        ]);

        $request->validate($this->rules);

        $input = $request->except('logo');

        if ($file = $request->file('logo')) {
            if ($customer->logo) unlink(public_path($customer->logo));
            $fileName = time() . $file->getClientOriginalName();
            $file->move('customers', $fileName);
            $input['logo'] = htmlspecialchars($fileName);
        }

        $customer->update($input);

        return response()->json([
            'message' => [
                'type' => 'success',
                'content' => $cms['pages'][$user->language->abbr]['messages']['customers']['updated']
            ],
        ]);
    }

    public function destroy($id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $customer = Customer::find($id);
        if (!$customer) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['customers']['not_found'], 'danger'),
        ]);

        if ($customer->logo) unlink(public_path($customer->logo));
        $customer->delete();

        $data = $this->data();

        $customers = $data['customers'];
        $total = $data['total'];

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['customers']['deleted'], 'success'),
            'customers' => $customers,
            'total' => $total,
        ]);
    }
}
