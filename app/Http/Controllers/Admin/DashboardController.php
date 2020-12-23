<?php

namespace App\Http\Controllers\Admin;

use App\Member;
use App\Http\Controllers\Controller;
use App\Post;
use App\Product;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $subscriptionsAmount = 0;

        $totalCustomers = Member::count();

        $expenses = Product::count();

        $totalCase = Post::count();

        return response()->json([
            'blocksData' => [
                'subscriptionsAmount' => $subscriptionsAmount,
                'totalCustomers' => $totalCustomers,
                'expenses' => $expenses,
                'totalCase' => $totalCase,
            ],
            'tasks' => [],
            'attendanceReport' => [],
            'calendar' => [],
            'chatBox' => [],
            'messages' => [],
            'workTimeTracker' => [],
        ]);
    }
}
