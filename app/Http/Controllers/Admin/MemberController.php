<?php

namespace App\Http\Controllers\Admin;

use App\Member;
use App\Http\Controllers\Controller;
use App\Http\Controllers\UtilController;
use Illuminate\Http\Request;

class MemberController extends Controller
{
    private $rules = [
        'first_name' => 'required|string',
        'last_name' => 'required|string',
        'job' => 'required|string',
        'quote' => 'required|string',
        'social_media.*' => 'required|string',
        'photo' => 'nullable|image',
    ];

    private function data()
    {
        $page = +request()->page;
        $show = request()->show;
        $search = request()->search;

        $total = 0;

        $data = [];
        $filteredData = Member::latest();

        $filteredData = $filteredData
            ->when($search, function ($query, $search) {
                if ($search !== "")
                    $query
                        ->where('first_name', 'LIKE', "%$search%")
                        ->orWhere('last_name', 'LIKE', "%$search%")
                        ->orWhere('job', 'LIKE', "%$search%")
                        ->orWhere('quote', 'LIKE', "%$search%");
            });

        $total = $filteredData->count();

        if ($show !== 'All') $filteredData = $filteredData->skip(($page - 1) * $show)->take($show);

        $filteredData = $filteredData->get();

        foreach ($filteredData as $member) {
            $data[] = array_merge($member->toArray(), []);
        }

        return [
            'members' => $data,
            'total' => $total,
        ];
    }



    public function  index()
    {
        $data = $this->data();

        $members = $data['members'];
        $total = $data['total'];

        return response()->json([
            'members' => $members,
            'total' => $total,
        ]);
    }

    public function show($id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $member = Member::find($id);
        if (!$member) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['members']['not_found'], 'danger'),
        ]);

        $member = $member->toArray();

        return response()->json([
            'member' => $member,
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
            $file->move('members', $fileName);
            $input['photo'] = htmlspecialchars($fileName);
        }

        Member::create($input);

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['members']['created'], 'success'),
        ]);
    }

    public function update(Request $request, $id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $member = Member::find($id);
        if (!$member) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['members']['not_found'], 'danger'),
        ]);

        $request->validate($this->rules);

        $input = $request->except('photo');

        if ($file = $request->file('photo')) {
            if ($member->photo) unlink(public_path($member->photo));
            $fileName = time() . $file->getClientOriginalName();
            $file->move('members', $fileName);
            $input['photo'] = htmlspecialchars($fileName);
        }
        $input['quarter_id'] = $request->quarter;

        $member->update($input);

        return response()->json([
            'message' => [
                'type' => 'success',
                'content' => $cms['pages'][$user->language->abbr]['messages']['members']['updated']
            ],
        ]);
    }

    public function destroy($id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $member = Member::find($id);
        if (!$member) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['members']['not_found'], 'danger'),
        ]);

        if ($member->photo) unlink(public_path($member->photo));
        $member->delete();

        $data = $this->data();

        $members = $data['members'];
        $total = $data['total'];

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['members']['deleted'], 'success'),
            'members' => $members,
            'total' => $total,
        ]);
    }
}
