<?php

namespace App\Http\Controllers\User;

use App\Employee;
use App\Http\Controllers\Controller;
use App\Http\Controllers\UtilController;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    private $rules = [
        'first_name' => 'required|string',
        'last_name' => 'required|string',
        'email' => 'required|email|unique:employees',
        'matricule' => 'required|string|unique:employees',
        'gender' => 'required|string',
        'birthdate' => 'required|date',
        'country' => 'required|string',
        'address' => 'required|string',
        'phone' => 'required|string',
        'diploma' => 'required|string',
        'marital' => 'required|string',
        'number_children' => 'required|integer',
        'languages' => 'required|string',
        'driving_licenses' => 'required|string',
        'photo' => 'nullable|image',
    ];

    private function data()
    {
        $page = +request()->page;
        $show = request()->show;
        $search = request()->search;
        
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $total = 0;

        $data = [];
        $filteredData = Employee::latest();

        $filteredData = $filteredData
            ->when($search, function ($query, $search) {
                if ($search !== "")
                    $query
                        ->where('first_name', 'LIKE', "%$search%")
                        ->orWhere('last_name', 'LIKE', "%$search%")
                        ->orWhere('email', 'LIKE', "%$search%")
                        ->orWhere('country', 'LIKE', "%$search%")
                        ->orWhere('address', 'LIKE', "%$search%")
                        ->orWhere('phone', 'LIKE', "%$search%")
                        ->orWhere('diploma', 'LIKE', "%$search%")
                        ->orWhere('languages', 'LIKE', "%$search%")
                        ->orWhere('driving_licenses', 'LIKE', "%$search%")
                        ->orWhere('job', 'LIKE', "%$search%");
            });

        $total = $filteredData->count();

        if ($show !== 'All') $filteredData = $filteredData->skip(($page - 1) * $show)->take($show);

        $filteredData = $filteredData->get();

        foreach ($filteredData as $employee) {
            $data[] = array_merge($employee->toArray(), [
                'name' => $employee->first_name . ' ' . $employee->last_name,
                'gender' => $cms['pages'][$user->language->abbr]['backend']['pages']['employees']['form']['gender_list'][$employee->gender],
                'marital' => $cms['pages'][$user->language->abbr]['backend']['pages']['employees']['form']['marital_list'][$employee->marital],
            ]);
        }

        return [
            'employees' => $data,
            'total' => $total,
        ];
    }



    public function  index()
    {
        $data = $this->data();

        $employees = $data['employees'];
        $total = $data['total'];

        return response()->json([
            'employees' => $employees,
            'total' => $total,
        ]);
    }

    public function show($id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $employee = Employee::find($id);
        if (!$employee) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['employees']['not_found'], 'danger'),
        ]);

        $employee = $employee->toArray();

        return response()->json([
            'employee' => $employee,
        ]);
    }

    public function store(Request $request)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $request->validate($this->rules);

        $input = $request->except('photo');

        if ($file = $request->file('photo')) {
            $fileName = time() . $file->getClientOriginalName();
            $file->move('employees', $fileName);
            $input['photo'] = htmlspecialchars($fileName);
        }

        Employee::create($input);

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['employees']['created'], 'success'),
        ]);
    }

    public function update(Request $request, $id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $employee = Employee::find($id);
        if (!$employee) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['employees']['not_found'], 'danger'),
        ]);
        
        $rules = $this->rules;
        if ($request->email === $employee->email) $rules['email'] = 'required|email';
        if ($request->matricule === $employee->matricule) $rules['matricule'] = 'required|string';

        $request->validate($rules);

        $input = $request->except('photo');

        if ($file = $request->file('photo')) {
            if ($employee->photo) unlink(public_path($employee->photo));
            $fileName = time() . $file->getClientOriginalName();
            $file->move('employees', $fileName);
            $input['photo'] = htmlspecialchars($fileName);
        }

        $employee->update($input);

        return response()->json([
            'message' => [
                'type' => 'success',
                'content' => $cms['pages'][$user->language->abbr]['messages']['employees']['updated']
            ],
        ]);
    }

    public function destroy($id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $employee = Employee::find($id);
        if (!$employee) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['employees']['not_found'], 'danger'),
        ]);

        if ($employee->photo) unlink(public_path($employee->photo));
        $employee->delete();

        $data = $this->data();

        $employees = $data['employees'];
        $total = $data['total'];

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['employees']['deleted'], 'success'),
            'employees' => $employees,
            'total' => $total,
        ]);
    }
}
