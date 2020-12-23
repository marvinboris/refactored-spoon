<?php

use App\Http\Controllers\UtilController;
use App\Models\Language;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::namespace('Admin')->prefix('admin')->name('admin.')->group(function () {
    Route::post('login', 'AuthController@login')->name('login');
    Route::post('resend', 'AuthController@resend')->name('resend');
    Route::post('verify', 'AuthController@verify')->name('verify');

    Route::middleware('auth:admin')->group(function () {
        Route::get('dashboard', 'DashboardController@index')->name('dashboard');

        Route::prefix('admins')->name('admins.')->group(function () {
            Route::get('{admin}', 'AdminController@show')->name('show');
        });

        Route::name('cms.')->prefix('cms')->group(function () {
            Route::patch('global', 'CmsController@global')->name('global');
            Route::patch('general', 'CmsController@general')->name('general');
            Route::patch('components', 'CmsController@components')->name('components');
            Route::patch('frontend', 'CmsController@frontend')->name('frontend');
            Route::patch('backend', 'CmsController@backend')->name('backend');
            Route::patch('auth', 'CmsController@auth')->name('auth');

            Route::name('index')->get('', function () {
                $jsonString = file_get_contents(base_path('cms.json'));
                $cms = json_decode($jsonString, true);

                return response()->json([
                    'cms' => $cms,
                    'languages' => Language::all(),
                ]);
            });
        });

        Route::prefix('customers')->name('customers.')->group(function () {
            Route::get('{customer}', 'CustomerController@show')->name('show');
        });

        Route::prefix('employees')->name('employees.')->group(function () {
            Route::get('{employee}', 'EmployeeController@show')->name('show');
        });

        Route::prefix('features')->name('features.')->group(function () {
            Route::get('{feature}', 'FeatureController@show')->name('show');
        });

        Route::prefix('invoices')->name('invoices.')->group(function () {
            Route::get('info', 'InvoiceController@info')->name('info');
            Route::get('{invoice}', 'InvoiceController@show')->name('show');
            Route::post('{invoice}/print', 'InvoiceController@print')->name('print');
        });

        Route::prefix('languages')->name('languages.')->group(function () {
            Route::get('{language}', 'LanguageController@show')->name('show');
        });

        Route::prefix('members')->name('members.')->group(function () {
            Route::get('{member}', 'MemberController@show')->name('show');
        });

        Route::prefix('products')->name('products.')->group(function () {
            Route::get('{product}', 'ProductController@show')->name('show');
        });

        Route::prefix('roles')->name('roles.')->group(function () {
            Route::get('info', 'RoleController@info')->name('info');
            Route::get('{role}', 'RoleController@show')->name('show');
        });

        Route::prefix('tasks')->name('tasks.')->group(function () {
            Route::get('{task}', 'TaskController@show')->name('show');
        });

        Route::prefix('users')->name('users.')->group(function () {
            Route::get('info', 'UserController@info')->name('info');
            Route::get('{user}', 'UserController@show')->name('show');
        });

        Route::apiResources([
            'admins' => 'AdminController',
            'users' => 'UserController',
            'roles' => 'RoleController',
            'customers' => 'CustomerController',
            'employees' => 'EmployeeController',
            'invoices' => 'InvoiceController',
            'features' => 'FeatureController',
            'languages' => 'LanguageController',
            'members' => 'MemberController',
            'tasks' => 'TaskController',
            'products' => 'ProductController',
        ]);
    });
});

Route::namespace('User')->prefix('user')->name('user.')->group(function () {
    Route::post('login', 'AuthController@login')->name('login');
    Route::post('forgot', 'AuthController@forgot')->name('forgot');
    Route::post('reset/{id}/{code}', 'AuthController@reset')->name('reset');

    Route::middleware('auth:api')->group(function () {
        Route::get('dashboard', 'DashboardController@index')->name('dashboard');

        Route::middleware('permission')->group(function () {
            Route::name('cms.')->prefix('cms')->group(function () {
                Route::patch('global', 'CmsController@global')->name('global');
                Route::patch('general', 'CmsController@general')->name('general');
                Route::patch('components', 'CmsController@components')->name('components');
                Route::patch('frontend', 'CmsController@frontend')->name('frontend');
                Route::patch('backend', 'CmsController@backend')->name('backend');
                Route::patch('auth', 'CmsController@auth')->name('auth');
    
                Route::name('index')->get('', function () {
                    $jsonString = file_get_contents(base_path('cms.json'));
                    $cms = json_decode($jsonString, true);
    
                    return response()->json([
                        'cms' => $cms,
                        'languages' => Language::all(),
                    ]);
                });
            });

            Route::prefix('customers')->name('customers.')->group(function () {
                Route::get('{customer}', 'CustomerController@show')->name('show');
            });

            Route::prefix('employees')->name('employees.')->group(function () {
                Route::get('{employee}', 'EmployeeController@show')->name('show');
            });

            Route::prefix('features')->name('features.')->group(function () {
                Route::get('{feature}', 'FeatureController@show')->name('show');
            });

            Route::prefix('invoices')->name('invoices.')->group(function () {
                Route::get('info', 'InvoiceController@info')->name('info');
                Route::get('{invoice}', 'InvoiceController@show')->name('show');
                Route::post('{invoice}/print', 'InvoiceController@print')->name('print');
            });

            Route::prefix('languages')->name('languages.')->group(function () {
                Route::get('{language}', 'LanguageController@show')->name('show');
            });

            Route::prefix('members')->name('members.')->group(function () {
                Route::get('{member}', 'MemberController@show')->name('show');
            });

            Route::prefix('products')->name('products.')->group(function () {
                Route::get('{product}', 'ProductController@show')->name('show');
            });

            Route::prefix('roles')->name('roles.')->group(function () {
                Route::get('info', 'RoleController@info')->name('info');
                Route::get('{role}', 'RoleController@show')->name('show');
            });

            Route::prefix('tasks')->name('tasks.')->group(function () {
                Route::get('{task}', 'TaskController@show')->name('show');
            });

            Route::prefix('users')->name('users.')->group(function () {
                Route::get('info', 'UserController@info')->name('info');
                Route::get('{user}', 'UserController@show')->name('show');
            });

            Route::apiResources([
                'users' => 'UserController',
                'roles' => 'RoleController',
                'customers' => 'CustomerController',
                'employees' => 'EmployeeController',
                'invoices' => 'InvoiceController',
                'features' => 'FeatureController',
                'languages' => 'LanguageController',
                'members' => 'MemberController',
                'tasks' => 'TaskController',
                'products' => 'ProductController',
            ]);
        });
    });
});

Route::middleware('auth:admin,api')->group(function () {
    Route::get('logout', 'UtilController@logout')->name('logout');
    Route::get('user', 'UtilController@user')->name('user');

    Route::prefix('notifications')->name('notifications.')->group(function () {
        Route::get('{notification}', 'UtilController@notification')->name('show');
        Route::get('', 'UtilController@notifications')->name('index');
    });

    Route::name('export.')->prefix('export')->group(function () {
        Route::name('xlsx')->post('xlsx', 'ExportController@xlsx');
        Route::name('csv')->post('csv', 'ExportController@csv');
        Route::name('pdf')->post('pdf', 'ExportController@pdf');
    });

    Route::prefix('content')->name('content.')->group(function () {
        Route::get('language/{language}', function ($id) {
            $user = UtilController::get(request());

            $jsonString = file_get_contents(base_path('cms.json'));
            $cmsFile = json_decode($jsonString, true);

            $language = Language::find($id);
            if (!$language) return response()->json([
                'message' => UtilController::message($cmsFile['pages'][$user->language->abbr]['messages']['languages']['not_found'], 'danger')
            ]);

            $user->update(['language_id' => $id]);

            $cms = [
                'global' => $cmsFile['global'],
                'pages' => $cmsFile['pages'][$language->abbr],
            ];

            return response()->json([
                'language' => $language->toArray(),
                'cms' => $cms,
            ]);
        })->name('language');
    });
});

Route::prefix('calculation')->name('calculation.')->group(function () {
    Route::get('info', 'FrontendController@info')->name('info');
    Route::post('pdf', 'FrontendController@pdf')->name('pdf');
    Route::post('', 'FrontendController@calculate')->name('calculate');
});

Route::prefix('content')->name('content.')->group(function () {
    Route::get('{language}', function ($lang) {
        $jsonString = file_get_contents(base_path('cms.json'));
        $cmsFile = json_decode($jsonString, true);

        $cms = [
            'global' => $cmsFile['global'],
            'pages' => $cmsFile['pages'][$lang],
        ];

        return response()->json([
            'cms' => $cms,
        ]);
    })->name('cms');
});
