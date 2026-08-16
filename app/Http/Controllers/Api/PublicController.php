<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use App\Models\Service;
use App\Models\Experience;
use App\Models\Setting;
use App\Models\Message;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PublicController extends Controller
{
    public function skills(): JsonResponse
    {
        $skills = Skill::active()->orderBy('sort_order')->get();
        return response()->json(['data' => $skills]);
    }

    public function services(): JsonResponse
    {
        $services = Service::active()->orderBy('sort_order')->get();
        return response()->json(['data' => $services]);
    }

    public function experiences(): JsonResponse
    {
        $experiences = Experience::active()->orderBy('sort_order')->orderByDesc('start_date')->get();
        return response()->json(['data' => $experiences]);
    }

    public function settings(): JsonResponse
    {
        $settings = Setting::whereIn('group', ['general', 'contact', 'social', 'seo'])->get()
            ->pluck('value', 'key');
        return response()->json(['data' => $settings]);
    }

    public function contact(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:100',
            'email'   => 'required|email|max:150',
            'phone'   => 'nullable|string|max:30',
            'subject' => 'nullable|string|max:200',
            'message' => 'required|string|min:10|max:5000',
        ]);

        Message::create([
            ...$validated,
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'تم إرسال رسالتك بنجاح، سأقوم بالرد عليك في أقرب وقت.',
        ]);
    }
}
