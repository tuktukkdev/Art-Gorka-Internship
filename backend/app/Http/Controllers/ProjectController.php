<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;
use App\Traits\ApiResponse;

class ProjectController extends Controller
{
    use ApiResponse;

    public function filterOptions(): JsonResponse
    {
        return $this->success([
            'industry'    => Project::whereNotNull('industry')->distinct()->orderBy('industry')->pluck('industry'),
            'projectType' => Project::whereNotNull('project_type')->distinct()->orderBy('project_type')->pluck('project_type'),
        ], 'Filter options fetched');
    }

    public function index(Request $request): JsonResponse
    {
        $query = Project::query();

        if ($request->has('platform')) {
            $query->where('platform', $request->platform);
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('service')) {
            $query->whereJsonContains('stack', $request->service);
        }

        if ($request->has('industry')) {
            $industries = is_array($request->industry) 
                ? $request->industry 
                : explode(',', $request->industry);
            $query->whereIn('industry', $industries);
        }

        if ($request->has('project_type')) {
            $types = is_array($request->project_type) 
                ? $request->project_type 
                : explode(',', $request->project_type);
            $query->whereIn('project_type', $types);
        }

        $limit = min((int) $request->get('limit', 10), 100);
        $projects = $query->paginate($limit);

        $data = $projects->map(fn ($project) => [
            'id'          => $project->id,
            'title'       => $project->title,
            'url'         => $project->url,
            'image'       => $project->image ? asset('storage/' . $project->image) : null,
            'industry'    => $project->industry,
            'projectType' => $project->project_type,
            'platform'    => $project->platform,
            'status'      => $project->status,
            'description' => $project->description,
            'stack'       => $project->stack ?? [],
            'created_at'  => $project->created_at,
            'updated_at'  => $project->updated_at,
        ]);

        return $this->success($data, 'Projects fetched');
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title'       => ['required', 'string', 'max:255'],
            'url'         => ['required', 'url', 'max:255'],
            'image'       => ['nullable', 'string', 'max:255'],
            'industry'    => ['nullable', 'string', 'max:255'],
            'project_type'=> ['nullable', 'string', 'max:255'],
            'platform'    => ['required', Rule::in(Project::PLATFORMS)],
            'status'      => ['required', Rule::in(['В разработке', 'Завершено', 'Поддержка', 'Архивировано'])],
            'description' => ['nullable', 'string'],
            'stack'       => ['nullable', 'array'],
        ]);

        $project = Project::create($validated);

        return $this->success($project, 'Project created', 201);
    }

    public function show(string $id): JsonResponse
    {
        $project = Project::find($id);

        if (!$project) {
            return $this->error('Project not found', 404);
        }

        return $this->success([
            'id' => $project->id,
            'title' => $project->title,
            'url' => $project->url,
            'image' => $project->image ? asset('storage/' . $project->image) : null,
            'industry' => $project->industry,
            'projectType' => $project->project_type,
            'platform' => $project->platform,
            'status' => $project->status,
            'description' => $project->description,
            'stack' => $project->stack ?? [],
            'created_at' => $project->created_at,
            'updated_at' => $project->updated_at,
        ], 'Project fetched');
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $project = Project::find($id);

        if (!$project) {
            return $this->error('Project not found', 404);
        }

        $validated = $request->validate([
            'title'       => ['sometimes', 'string', 'max:255'],
            'url'         => ['sometimes', 'url', 'max:255'],
            'image'       => ['nullable', 'string', 'max:255'],
            'industry'    => ['nullable', 'string', 'max:255'],
            'project_type'=> ['nullable', 'string', 'max:255'],
            'platform'    => ['sometimes', Rule::in(Project::PLATFORMS)],
            'status'      => ['sometimes', Rule::in(['В разработке', 'Завершено', 'Поддержка', 'Архивировано'])],
            'description' => ['nullable', 'string'],
            'stack'       => ['nullable', 'array'],
        ]);

        $project->update($validated);

        return $this->success($project, 'Project updated');
    }

    public function destroy(string $id): JsonResponse
    {
        $project = Project::find($id);

        if (!$project) {
            return $this->error('Project not found', 404);
        }

        $project->delete();

        return $this->success(null, 'Project deleted');
    }

    public function check(string $id): JsonResponse
    {
        $project = Project::find($id);

        if (!$project) {
            return $this->error('Project not found', 404);
        }

        try {
            $response = \Illuminate\Support\Facades\Http::timeout(10)->get($project->url);

            return $this->success([
                'url'          => $project->url,
                'status_code'  => $response->status(),
                'is_available' => $response->successful(),
            ], 'Site checked');
        } catch (\Exception $e) {
            return $this->success([
                'url'          => $project->url,
                'status_code'  => null,
                'is_available' => false,
            ], 'Site is not available');
        }
    }
}