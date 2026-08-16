<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use App\Models\Service;
use App\Models\Experience;
use App\Models\Message;
use App\Models\Setting;
use App\Models\ActivityLog;
use App\Models\Project;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function stats(): JsonResponse
    {
        return response()->json([
            'data' => [
                'projects'    => Project::count(),
                'published'   => Project::published()->count(),
                'drafts'      => Project::where('status', 'draft')->count(),
                'skills'      => Skill::count(),
                'services'    => Service::count(),
                'experiences' => Experience::count(),
                'messages'    => Message::count(),
                'unread'      => Message::unread()->count(),
            ]
        ]);
    }

    public function recentMessages(): JsonResponse
    {
        return response()->json([
            'data' => Message::latest()->limit(5)->get()
        ]);
    }

    public function activityLog(): JsonResponse
    {
        return response()->json([
            'data' => ActivityLog::with('user:id,name')->latest()->limit(20)->get()
        ]);
    }
}
