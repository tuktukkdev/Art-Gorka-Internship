<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse //GET /api/projects 
    {
        $filters = $request->only(['platform', 'status']);

        $limit = min((int) $request->get('limit', 10), 100);

        $projects = Project::filter($filters)->paginate($limit);
 
        return response()->json($projects, 200);
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
        $project = Project::findOrFail($id);
 
        return response()->json($project, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse//PUT /api/projects/{id}
    {
        $project = Project::findOrFail($id);

        $validated = $request->validate([
            'title'       => ['sometimes', 'string', 'max:255'],
            'url'         => ['sometimes', 'url', 'max:255'],
            'platform'    => ['sometimes', Rule::in(Project::PLATFORMS)],
            'status'      => ['sometimes', Rule::in(Project::STATUSES)],
            'description' => ['sometimes', 'nullable', 'string'],
        ]);

        $project->update($validated);
 
        return response()->json($project, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse//DELETE /api/projects/{id}
    {
        $project = Project::findOrFail($id);
 
        $project->delete();

        return response()->json(['message' => 'Проект удалён'], 200);
    }

    public function check(string $id): JsonResponse//POST /api/projects/{id}/check
    {
        $project = Project::findOrFail($id);

        try {

            $response = \Illuminate\Support\Facades\Http::timeout(10)->get($project->url);

            return response()->json([
                'url'          => $project->url,
                'status_code'  => $response->status(),
                'is_available' => $response->successful(), 
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'url'          => $project->url,
                'status_code'  => null,
                'is_available' => false,
                'error'        => 'Сайт недоступен: ' . $e->getMessage(),
            ], 200);
        }
    }
}
