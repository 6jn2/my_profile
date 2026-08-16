<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use App\Models\ActivityLog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SettingAdminController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(['data' => Setting::all()->pluck('value', 'key')]);
    }

    public function update(Request $request): JsonResponse
    {
        foreach ($request->all() as $key => $value) {
            if (is_array($value)) {
                Setting::set($key, json_encode($value));
            } elseif ($request->hasFile($key)) {
                $path = $request->file($key)->store('settings', 'public');
                Setting::set($key, asset('storage/' . $path));
            } else {
                Setting::set($key, $value);
            }
        }
        ActivityLog::record('update', 'تعديل إعدادات الموقع');
        return response()->json(['message' => 'تم حفظ الإعدادات بنجاح.']);
    }

    public function uploadImage(Request $request): JsonResponse
    {
        $request->validate(['image' => 'required|image|max:5120', 'key' => 'required|string']);
        $path = $request->file('image')->store('settings', 'public');
        $url  = asset('storage/' . $path);
        Setting::set($request->key, $url);
        return response()->json(['url' => $url]);
    }

    public function uploadCV(Request $request): JsonResponse
    {
        $request->validate([
            'cv' => 'required|mimes:pdf,doc,docx|max:10240', // Max 10MB
        ]);

        // Delete old CV if exists
        $old = Setting::where('key', 'cv_url')->value('value');
        if ($old) {
            $oldPath = str_replace(asset('storage/'), '', $old);
            Storage::disk('public')->delete($oldPath);
        }

        $path = $request->file('cv')->storeAs('cv', 'Mohammed_Mojib_CV.' . $request->file('cv')->extension(), 'public');
        $url  = asset('storage/' . $path);

        Setting::set('cv_url', $url);
        ActivityLog::record('upload', 'رفع السيرة الذاتية');

        return response()->json([
            'message' => 'تم رفع السيرة الذاتية بنجاح.',
            'url'     => $url,
        ]);
    }
}
