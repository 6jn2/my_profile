<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\JsonResponse;

class ProjectController extends Controller
{
    public function index(): JsonResponse
    {
        $projects = Project::published()
            ->with(['media' => fn($q) => $q->where('is_cover', true)])
            ->orderBy('sort_order')
            ->orderByDesc('featured')
            ->get()
            ->map(fn($p) => [
                'id'                => $p->id,
                'title'             => $p->title,
                'slug'              => $p->slug,
                'short_description' => $p->short_description,
                'technologies'      => $p->technologies,
                'category'          => $p->category,
                'featured'          => $p->featured,
                'github_url'        => $p->github_url,
                'demo_url'          => $p->demo_url,
                'cover_image'       => $p->cover_image
                    ? asset('storage/' . $p->cover_image)
                    : ($p->media->first()?->url),
            ]);

        return response()->json(['data' => $projects]);
    }

    public function show(string $slug): JsonResponse
    {
        $project = Project::published()
            ->with(['media'])
            ->where('slug', $slug)
            ->firstOrFail();

        return response()->json([
            'data' => [
                'id'                => $project->id,
                'title'             => $project->title,
                'slug'              => $project->slug,
                'short_description' => $project->short_description,
                'description'       => $project->description,
                'challenge'         => $project->challenge,
                'solution'          => $project->solution,
                'results'           => $project->results,
                'features'          => $project->features,
                'technologies'      => $project->technologies,
                'category'          => $project->category,
                'github_url'        => $project->github_url,
                'demo_url'          => $project->demo_url,
                'cover_image'       => $project->cover_image ? asset('storage/' . $project->cover_image) : null,
                'media'             => $project->media->map(fn($m) => [
                    'id'        => $m->id,
                    'type'      => $m->type,
                    'url'       => str_starts_with($m->url, 'http') ? $m->url : asset('storage/' . $m->url),
                    'thumbnail' => $m->thumbnail,
                    'title'     => $m->title,
                    'provider'  => $m->provider,
                    'is_cover'  => $m->is_cover,
                ]),
            ]
        ]);
    }
}
