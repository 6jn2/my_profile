<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use App\Models\ActivityLog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SkillAdminController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(['data' => Skill::orderBy('sort_order')->get()]);
    }

    public function store(Request $request): JsonResponse
    {
        $skill = Skill::create($request->validate([
            'name'        => 'required',
            'category'    => 'required',
            'icon'        => 'nullable',
            'icon_color'  => 'nullable',
            'level'       => 'integer|min:0|max:100',
            'description' => 'nullable',
            'sort_order'  => 'integer',
            'is_active'   => 'boolean',
        ]));
        ActivityLog::record('create', "إضافة مهارة: {$skill->name}", $skill);
        return response()->json(['data' => $skill], 201);
    }

    public function update(Request $request, Skill $skill): JsonResponse
    {
        $skill->update($request->validate([
            'name'        => 'sometimes',
            'category'    => 'sometimes',
            'icon'        => 'nullable',
            'icon_color'  => 'nullable',
            'level'       => 'integer|min:0|max:100',
            'description' => 'nullable',
            'sort_order'  => 'integer',
            'is_active'   => 'boolean',
        ]));
        ActivityLog::record('update', "تعديل مهارة: {$skill->name}", $skill);
        return response()->json(['data' => $skill]);
    }

    public function destroy(Skill $skill): JsonResponse
    {
        $name = $skill->name;
        $skill->delete();
        ActivityLog::record('delete', "حذف مهارة: $name");
        return response()->json(['message' => 'تم الحذف.']);
    }

    public function reorder(Request $request): JsonResponse
    {
        foreach ($request->validate(['order' => 'required|array'])['order'] as $item) {
            Skill::where('id', $item['id'])->update(['sort_order' => $item['sort_order']]);
        }
        return response()->json(['message' => 'تم تحديث الترتيب.']);
    }
}
