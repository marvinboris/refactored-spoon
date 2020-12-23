<?php

namespace App\Http\Controllers\User;

use App\Customer;
use App\Http\Controllers\Controller;
use App\Http\Controllers\UtilController;
use App\Invoice;
use App\Task;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    private $rules = [
        'customer_id' => 'required|exists:customers,id',
        'date' => 'required|date',
        'paid_amount' => 'required|numeric',
        'total_amount' => 'required|numeric',
        'discount' => 'required|numeric',
        'tax' => 'required|numeric',
        'prices.*' => 'required|numeric',
        'quantities.*' => 'required|integer',
        'tasks.*' => 'required|exists:tasks,id',
        'photo' => 'nullable|image',
    ];

    private function data()
    {
        $page = +request()->page;
        $show = request()->show;
        $search = request()->search;

        $total = 0;

        $data = [];
        $filteredData = Invoice::latest();

        $filteredData = $filteredData
            ->join('customers', 'customers.id', '=', 'invoices.customer_id')
            ->select('invoices.*')
            ->when($search, function ($query, $search) {
                if ($search !== "")
                    $query
                        ->where('customers.name', 'LIKE', "%$search%")
                        ->orWhere('no', 'LIKE', "%$search%")
                        ->orWhere('paid_amount', 'LIKE', "%$search%")
                        ->orWhere('discount', 'LIKE', "%$search%")
                        ->orWhere('tax', 'LIKE', "%$search%")
                        ->orWhere('total_amount', 'LIKE', "%$search%");
            });

        $total = $filteredData->count();

        if ($show !== 'All') $filteredData = $filteredData->skip(($page - 1) * $show)->take($show);

        $filteredData = $filteredData->get();

        foreach ($filteredData as $invoice) {
            $data[] = array_merge($invoice->toArray(), [
                'customer' => $invoice->customer->name,
            ]);
        }

        return [
            'invoices' => $data,
            'total' => $total,
        ];
    }



    public function  index()
    {
        $data = $this->data();

        $invoices = $data['invoices'];
        $total = $data['total'];

        return response()->json([
            'invoices' => $invoices,
            'total' => $total,
        ]);
    }

    public function info()
    {
        $tasks = Task::all();
        $customers = Customer::all();

        return response()->json([
            'tasks' => $tasks,
            'customers' => $customers,
        ]);
    }

    public function show($id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $invoice = Invoice::find($id);
        if (!$invoice) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['invoices']['not_found'], 'danger'),
        ]);

        $invoice_tasks = [];
        foreach ($invoice->tasks as $task) {
            $invoice_tasks[] = $task;
        }

        $invoice = array_merge($invoice->toArray(), [
            'prices' => array_map(function ($task) {
                return $task->pivot->price;
            }, $invoice_tasks),
            'quantities' => array_map(function ($task) {
                return $task->pivot->quantity;
            }, $invoice_tasks),
            'tasks' => array_map(function ($task) {
                return $task->id;
            }, $invoice_tasks),
            'totals' => array_map(function ($task) {
                return $task->pivot->price * $task->pivot->quantity;
            }, $invoice_tasks),
        ]);

        $tasks = Task::all();
        $customers = Customer::all();

        return response()->json([
            'invoice' => $invoice,
            'tasks' => $tasks,
            'customers' => $customers,
        ]);
    }

    public function store(Request $request)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $request->validate($this->rules);

        $input = $request->except('photo');

        $no = Invoice::no();
        $input['no'] = $no;

        if ($file = $request->file('photo')) {
            $fileName = time() . $file->getClientOriginalName();
            $file->move('invoices', $fileName);
            $input['photo'] = htmlspecialchars($fileName);
        }

        $invoice = Invoice::create($input);

        $tasks = [];
        foreach ($request->tasks as $index => $task_id) {
            $tasks[$task_id] = [
                'price' => $request->prices[$index],
                'quantity' => $request->quantities[$index],
            ];
        }

        $invoice->tasks()->sync($tasks);

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['invoices']['created'], 'success'),
        ]);
    }

    public function update(Request $request, $id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $invoice = Invoice::find($id);
        if (!$invoice) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['invoices']['not_found'], 'danger'),
        ]);

        $request->validate($this->rules);

        $input = $request->except('photo');

        if ($file = $request->file('photo')) {
            if ($invoice->photo) unlink(public_path($invoice->photo));
            $fileName = time() . $file->getClientOriginalName();
            $file->move('invoices', $fileName);
            $input['photo'] = htmlspecialchars($fileName);
        }

        $invoice->update($input);

        $tasks = [];
        foreach ($request->tasks as $index => $task_id) {
            $tasks[$task_id] = [
                'price' => $request->prices[$index],
                'quantity' => $request->quantities[$index],
            ];
        }

        $invoice->tasks()->sync($tasks);

        return response()->json([
            'message' => [
                'type' => 'success',
                'content' => $cms['pages'][$user->language->abbr]['messages']['invoices']['updated']
            ],
        ]);
    }

    public function destroy($id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $invoice = Invoice::find($id);
        if (!$invoice) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['invoices']['not_found'], 'danger'),
        ]);

        if ($invoice->photo) unlink(public_path($invoice->photo));
        $invoice->delete();

        $data = $this->data();

        $invoices = $data['invoices'];
        $total = $data['total'];

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['invoices']['deleted'], 'success'),
            'invoices' => $invoices,
            'total' => $total,
        ]);
    }

    public function print(Request $request, $id)
    {
        $invoice = Invoice::find($id);

        $tasks = [];
        $subtotal = 0;
        foreach ($invoice->tasks as $task) {
            $tasks[] = $task->toArray() + [
                'pivot' => $task->pivot,
            ];
            $subtotal += $task->pivot->price * $task->pivot->quantity;
        }

        $pdf = \PDF::loadView('pdf.print', $invoice->toArray() + [
            'customer' => $invoice->customer,
            'tasks' => $tasks,
            'subtotal' => $subtotal,
        ]);

        return $pdf->download($request->name);
    }
}
