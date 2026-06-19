<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;
use App\Traits\ApiResponse;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    use ApiResponse;

    public function index(Request $request): JsonResponse
    {
        $projects = Project::all();

        $data = $projects->map(function ($project) {
            return [
                'id' => $project->id,
                'title' => $project->title,
                'url' => $project->url,
                'image' => $project->image ? asset('storage/' . $project->image) : null,
                'industry' => $project->industry,
                'projectType' => $project->project_type,
                'platform' => $project->platform,
                'status' => $project->status,
                'description' => $project->description,
                'stack' => json_decode($project->stack ?? '[]'),
            ];
        });

        return $this->success($data, 'Projects fetched');
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title'       => ['required', 'string', 'max:255'],
            'url'         => ['required', 'url', 'max:255'],
            'image'       => ['nullable', 'file', 'mimes:jpeg,png,jpg,gif,svg,webp', 'max:5120'],
            'industry'    => ['nullable', 'string', 'max:255'],
            'project_type'=> ['nullable', 'string', 'max:255'],
            'platform'    => ['required', Rule::in(['Wordpress', 'Bitrix', 'Кастомная платформа', 'Другое'])],
            'status'      => ['required', Rule::in(['В разработке', 'Завершено', 'Поддержка', 'Архивировано'])],
            'description' => ['nullable', 'string'],
            'stack'       => ['nullable', 'array'],
            'stack.*'     => ['nullable', 'string'],
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('projects', 'public');
            $validated['image'] = $path;
        }

        if ($request->has('stack') && is_array($request->stack)) {
            $validated['stack'] = json_encode(array_values(array_filter($request->stack)));
        }

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
            'stack' => json_decode($project->stack ?? '[]'),
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
            'image'       => ['nullable', 'file', 'mimes:jpeg,png,jpg,gif,svg,webp', 'max:5120'],
            'industry'    => ['nullable', 'string', 'max:255'],
            'project_type'=> ['nullable', 'string', 'max:255'],
            'platform'    => ['sometimes', Rule::in(['Wordpress', 'Bitrix', 'Кастомная платформа', 'Другое'])],
            'status'      => ['sometimes', Rule::in(['В разработке', 'Завершено', 'Поддержка', 'Архивировано'])],
            'description' => ['nullable', 'string'],
            'stack'       => ['nullable', 'array'],
            'stack.*'     => ['nullable', 'string'],
        ]);

        if ($request->hasFile('image')) {
            if ($project->image) {
                Storage::disk('public')->delete($project->image);
            }
            $path = $request->file('image')->store('projects', 'public');
            $validated['image'] = $path;
        }

        if ($request->has('stack') && is_array($request->stack)) {
            $validated['stack'] = json_encode(array_values(array_filter($request->stack)));
        }

        $project->update($validated);

        return $this->success($project, 'Project updated');
    }

    public function destroy(string $id): JsonResponse
    {
        $project = Project::find($id);

        if (!$project) {
            return $this->error('Project not found', 404);
        }

        if ($project->image) {
            Storage::disk('public')->delete($project->image);
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

    public function filterOptions(): JsonResponse
    {
        $industries = Project::distinct()->pluck('industry')->filter()->values();
        $projectTypes = Project::distinct()->pluck('project_type')->filter()->values();
        $platforms = Project::distinct()->pluck('platform')->filter()->values();
        $statuses = Project::distinct()->pluck('status')->filter()->values();

        return $this->success([
            'industries' => $industries,
            'project_types' => $projectTypes,
            'platforms' => $platforms,
            'statuses' => $statuses,
        ], 'Filter options fetched');
    }
}