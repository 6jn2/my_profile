<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\ProjectMedia;
use App\Models\ActivityLog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class ProjectAdminController extends Controller
{
    public function index(): JsonResponse
    {
        $projects = Project::with(['media' => fn($q) => $q->where('is_cover', true)])
            ->orderBy('sort_order')->orderByDesc('created_at')->get();
        return response()->json(['data' => $projects]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'title'             => 'required|string|max:200',
            'short_description' => 'nullable|string',
            'description'       => 'nullable|string',
            'challenge'         => 'nullable|string',
            'solution'          => 'nullable|string',
            'results'           => 'nullable|string',
            'features'          => 'nullable|array',
            'technologies'      => 'nullable|array',
            'category'          => 'nullable|string',
            'github_url'        => 'nullable|url',
            'demo_url'          => 'nullable|url',
            'featured'          => 'boolean',
            'status'            => 'in:draft,published',
            'sort_order'        => 'integer',
        ]);

        $data['slug'] = Str::slug($data['title']) . '-' . Str::random(4);

        if ($request->hasFile('cover_image')) {
            $data['cover_image'] = $request->file('cover_image')->store('projects/covers', 'public');
        }

        $project = Project::create($data);
        ActivityLog::record('create', "إنشاء مشروع جديد: {$project->title}", $project);

        return response()->json(['data' => $project, 'message' => 'تم إنشاء المشروع بنجاح.'], 201);
    }

    public function show(Project $project): JsonResponse
    {
        return response()->json(['data' => $project->load('media')]);
    }

    public function update(Request $request, Project $project): JsonResponse
    {
        $data = $request->validate([
            'title'             => 'sometimes|string|max:200',
            'short_description' => 'nullable|string',
            'description'       => 'nullable|string',
            'challenge'         => 'nullable|string',
            'solution'          => 'nullable|string',
            'results'           => 'nullable|string',
            'features'          => 'nullable|array',
            'technologies'      => 'nullable|array',
            'category'          => 'nullable|string',
            'github_url'        => 'nullable|url',
            'demo_url'          => 'nullable|url',
            'featured'          => 'boolean',
            'status'            => 'in:draft,published',
            'sort_order'        => 'integer',
        ]);

        if ($request->hasFile('cover_image')) {
            if ($project->cover_image) Storage::disk('public')->delete($project->cover_image);
            $data['cover_image'] = $request->file('cover_image')->store('projects/covers', 'public');
        }

        $project->update($data);
        ActivityLog::record('update', "تعديل مشروع: {$project->title}", $project);

        return response()->json(['data' => $project, 'message' => 'تم تحديث المشروع بنجاح.']);
    }

    public function destroy(Project $project): JsonResponse
    {
        $title = $project->title;
        // Delete media files
        foreach ($project->media as $media) {
            if ($media->provider === 'local') Storage::disk('public')->delete($media->url);
        }
        if ($project->cover_image) Storage::disk('public')->delete($project->cover_image);
        $project->delete();
        ActivityLog::record('delete', "حذف مشروع: {$title}");
        return response()->json(['message' => 'تم حذف المشروع بنجاح.']);
    }

    public function publish(Project $project): JsonResponse
    {
        $project->update(['status' => 'published']);
        ActivityLog::record('publish', "نشر مشروع: {$project->title}", $project);
        return response()->json(['message' => 'تم نشر المشروع بنجاح.']);
    }

    public function unpublish(Project $project): JsonResponse
    {
        $project->update(['status' => 'draft']);
        ActivityLog::record('unpublish', "إلغاء نشر مشروع: {$project->title}", $project);
        return response()->json(['message' => 'تم إلغاء نشر المشروع.']);
    }

    public function reorder(Request $request): JsonResponse
    {
        $request->validate(['order' => 'required|array', 'order.*.id' => 'required|exists:projects,id', 'order.*.sort_order' => 'required|integer']);
        foreach ($request->order as $item) {
            Project::where('id', $item['id'])->update(['sort_order' => $item['sort_order']]);
        }
        return response()->json(['message' => 'تم تحديث الترتيب.']);
    }

    // ── Media ──────────────────────────────────────────────────────────────
    public function uploadMedia(Request $request, Project $project): JsonResponse
    {
        $request->validate([
            'file'     => 'required|file|mimes:jpg,jpeg,png,webp,gif,mp4,mov|max:51200',
            'type'     => 'in:image,video',
            'is_cover' => 'boolean',
        ]);

        $file = $request->file('file');
        $type = $request->input('type', str_starts_with($file->getMimeType(), 'video') ? 'video' : 'image');
        $path = $file->store("projects/{$project->id}", 'public');

        if ($request->boolean('is_cover')) {
            ProjectMedia::where('project_id', $project->id)->update(['is_cover' => false]);
        }

        $media = ProjectMedia::create([
            'project_id' => $project->id,
            'type'       => $type,
            'url'        => $path,
            'provider'   => 'local',
            'is_cover'   => $request->boolean('is_cover'),
            'sort_order' => ProjectMedia::where('project_id', $project->id)->count(),
        ]);

        return response()->json(['data' => $media, 'url' => asset('storage/' . $path)], 201);
    }

    public function deleteMedia(ProjectMedia $media): JsonResponse
    {
        if ($media->provider === 'local') Storage::disk('public')->delete($media->url);
        $media->delete();
        return response()->json(['message' => 'تم حذف الملف.']);
    }

    public function addVideoUrl(Request $request, Project $project): JsonResponse
    {
        $request->validate(['url' => 'required|url', 'provider' => 'in:youtube,vimeo,external', 'title' => 'nullable|string']);
        $media = ProjectMedia::create([
            'project_id' => $project->id,
            'type'       => 'video',
            'url'        => $request->url,
            'title'      => $request->title,
            'provider'   => $request->input('provider', 'youtube'),
            'sort_order' => ProjectMedia::where('project_id', $project->id)->count(),
        ]);
        return response()->json(['data' => $media], 201);
    }
}
