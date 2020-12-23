<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Controllers\UtilController;
use App\Language;
use Illuminate\Http\Request;

class CmsController extends Controller
{
    public function auth(Request $request)
    {
        $jsonString = file_get_contents(base_path('cms.json'));
        $cms = json_decode($jsonString, true);

        $request->validate($this->rules);

        $input = $request->except('_method');

        foreach (Language::get() as $language) {
            $cms['pages'][$language->abbr]['auth'] = $input[$language->abbr]['auth'];
        }

        $contentText = json_encode($cms);
        file_put_contents(base_path('cms.json'), $contentText);

        return response()->json([
            'message' => UtilController::message('Contenu modifié avec succès.', 'success'),
            'cms' => $cms,
        ]);
    }

    public function backend(Request $request)
    {
        $jsonString = file_get_contents(base_path('cms.json'));
        $cms = json_decode($jsonString, true);

        $request->validate($this->rules);

        $input = $request->except('_method');

        foreach (Language::get() as $language) {
            $cms['pages'][$language->abbr]['backend'] = $input[$language->abbr]['backend'];
        }

        $contentText = json_encode($cms);
        file_put_contents(base_path('cms.json'), $contentText);

        return response()->json([
            'message' => UtilController::message('Contenu modifié avec succès.', 'success'),
            'cms' => $cms,
        ]);
    }

    public function components(Request $request)
    {
        $jsonString = file_get_contents(base_path('cms.json'));
        $cms = json_decode($jsonString, true);

        $request->validate($this->rules);

        $input = $request->except('_method');

        foreach (Language::get() as $language) {
            $cms['pages'][$language->abbr]['components'] = $input[$language->abbr]['components'];
        }

        $contentText = json_encode($cms);
        file_put_contents(base_path('cms.json'), $contentText);

        return response()->json([
            'message' => UtilController::message('Contenu modifié avec succès.', 'success'),
            'cms' => $cms,
        ]);
    }

    public function frontend(Request $request)
    {
        $jsonString = file_get_contents(base_path('cms.json'));
        $cms = json_decode($jsonString, true);

        $request->validate($this->rules);

        $input = $request->except('_method');

        foreach (Language::get() as $language) {
            $cms['pages'][$language->abbr]['frontend'] = $input[$language->abbr]['frontend'];
        }

        $contentText = json_encode($cms);
        file_put_contents(base_path('cms.json'), $contentText);

        return response()->json([
            'message' => UtilController::message('Contenu modifié avec succès.', 'success'),
            'cms' => $cms,
        ]);
    }

    public function general(Request $request)
    {
        $jsonString = file_get_contents(base_path('cms.json'));
        $cms = json_decode($jsonString, true);

        $request->validate($this->rules);

        $input = $request->except('_method');

        foreach (Language::get() as $language) {
            $cms['pages'][$language->abbr]['general'] = $input[$language->abbr]['general'];
        }

        $contentText = json_encode($cms);
        file_put_contents(base_path('cms.json'), $contentText);

        return response()->json([
            'message' => UtilController::message('Contenu modifié avec succès.', 'success'),
            'cms' => $cms,
        ]);
    }

    public function global(Request $request)
    {
        $jsonString = file_get_contents(base_path('cms.json'));
        $cms = json_decode($jsonString, true);

        $request->validate($this->rules);

        $input = $request->except('_method');

        foreach (['logo'] as $image) {
            if ($file = $request->file($image)) {
                $fileName = $file->getClientOriginalName();
                $file->move('images', $fileName);
                $input[$image] = '/images/' . htmlspecialchars($fileName);
            } else $input[$image] = $cms['global'][$image];
        }

        $cms['global'] = $input;

        $contentText = json_encode($cms);
        file_put_contents(base_path('cms.json'), $contentText);

        return response()->json([
            'message' => UtilController::message('Contenu modifié avec succès.', 'success'),
            'cms' => $cms,
        ]);
    }

    public function messages(Request $request)
    {
        $jsonString = file_get_contents(base_path('cms.json'));
        $cms = json_decode($jsonString, true);

        $request->validate($this->rules);

        $input = $request->except('_method');

        foreach (Language::get() as $language) {
            $cms['pages'][$language->abbr]['messages'] = $input[$language->abbr]['messages'];
        }

        $contentText = json_encode($cms);
        file_put_contents(base_path('cms.json'), $contentText);

        return response()->json([
            'message' => UtilController::message('Contenu modifié avec succès.', 'success'),
            'cms' => $cms,
        ]);
    }
}
