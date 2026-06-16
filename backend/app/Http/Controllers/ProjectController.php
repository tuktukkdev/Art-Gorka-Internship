<?php

namespace App\Http\Controllers;

use App\Traits\ApiResponse;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    use ApiResponse;
    public function index(Request $request): JsonResponse //GET /api/projects 
    {
        $filters = $request->only(['platform', 'status']);
        $limit = min((int) $request->get('limit', 10), 100);

        $projects = Project::filter($filters)->paginate($limit);

        return $this->success($projects, 'Projects fetched');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse //POST /api/projects
    {
        $validated = $request->validate([
            'title'       => ['required', 'string', 'max:255'],
            'url'         => ['required', 'url', 'max:255'],
            'platform'    => ['required', Rule::in(Project::PLATFORMS)],
            'status'      => ['required', Rule::in(Project::STATUSES)],
            'description' => ['nullable', 'string'],
        ]);

        $project = Project::create($validated);

        return response()->json($project, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse//GET /api/projects/{id}
    {
        $project = Project::find($id);

        if (!$project) {
            return $this->error('Project not found', 404);
        }

        return $this->success($project, 'Project fetched');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse//PUT /api/projects/{id}
    {
        $project = Project::find($id);

        if (!$project) {
            return $this->error('Project not found', 404);
        }

        $validated = $request->validate([
            'title'       => ['sometimes', 'string', 'max:255'],
            'url'         => ['sometimes', 'url', 'max:255'],
            'platform'    => ['sometimes', Rule::in(Project::PLATFORMS)],
            'status'      => ['sometimes', Rule::in(Project::STATUSES)],
            'description' => ['sometimes', 'nullable', 'string'],
        ]);

        $project->update($validated);
 
        return $this->success($project, 'Project updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse//DELETE /api/projects/{id}
    {
        $project = Project::find($id);
 
        if (!$project) {
            return $this->error('Project not found', 404);
        }

        $project->delete();

        return $this->success(null, 'Project deleted');
    }

    public function check(string $id): JsonResponse//POST /api/projects/{id}/check
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
