<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use App\Models\ActivityLog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ExperienceAdminController extends Controller
{
    public function index(): JsonResponse { return response()->json(['data' => Experience::orderBy('sort_order')->get()]); }

    public function store(Request $request): JsonResponse
    {
        $exp = Experience::create($request->validate(['title'=>'required','organization'=>'nullable','description'=>'nullable','type'=>'required','start_date'=>'nullable|date','end_date'=>'nullable|date','is_current'=>'boolean','skills_used'=>'nullable|array','sort_order'=>'integer','is_active'=>'boolean']));
        ActivityLog::record('create', "إضافة خبرة: {$exp->title}", $exp);
        return response()->json(['data' => $exp], 201);
    }

    public function update(Request $request, Experience $experience): JsonResponse
    {
        $experience->update($request->all());
        ActivityLog::record('update', "تعديل خبرة: {$experience->title}", $experience);
        return response()->json(['data' => $experience]);
    }

    public function destroy(Experience $experience): JsonResponse { $n=$experience->title; $experience->delete(); ActivityLog::record('delete',"حذف خبرة: $n"); return response()->json(['message'=>'تم الحذف.']); }
}
