<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Controllers\UtilController;
use App\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    private $rules = [
        'title' => 'required|string',
        'description' => 'required|string',
    ];

    private function data()
    {
        $page = +request()->page;
        $show = request()->show;
        $search = request()->search;

        $total = 0;

        $tasks = [];
        $filteredData = Task::orderBy('id');

        $filteredData = $filteredData
            ->when($search, function ($query, $search) {
                if ($search !== "")
                    $query
                        ->where('title', 'LIKE', "%$search%")
                        ->orWhere('description', 'LIKE', "%$search%");
            });

        $total = $filteredData->count();

        if ($show !== 'All') $filteredData = $filteredData->skip(($page - 1) * $show)->take($show);

        $filteredData = $filteredData->get();

        foreach ($filteredData as $task) {
            $tasks[] = $task->toArray();
        }

        return [
            'tasks' => $tasks,
            'total' => $total,
        ];
    }



    public function index()
    {
        $data = $this->data();

        $tasks = $data['tasks'];
        $total = $data['total'];

        return response()->json([
            'tasks' => $tasks,
            'total' => $total,
        ]);
    }

    public function show($id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $task = Task::find($id);
        if (!$task) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['tasks']['not_found'], 'danger'),
        ]);

        return response()->json([
            'task' => $task,
        ]);
    }

    public function store(Request $request)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $request->validate($this->rules);

        $input = $request->all();

        Task::create($input);

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['tasks']['created'], 'success'),
        ]);
    }

    public function update(Request $request, $id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $task = Task::find($id);
        if (!$task) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['tasks']['not_found'], 'danger'),
        ]);

        $request->validate($this->rules);

        $input = $request->all();

        $task->update($input);

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['tasks']['updated'], 'success'),
            'task' => $task,
        ]);
    }

    public function destroy($id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $task = Task::find($id);
        if (!$task) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['tasks']['not_found'], 'danger'),
        ]);

        $task->delete();

        $data = $this->data();

        $tasks = $data['tasks'];
        $total = $data['total'];

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['tasks']['deleted'], 'success'),
            'tasks' => $tasks,
            'total' => $total,
        ]);
    }
}
