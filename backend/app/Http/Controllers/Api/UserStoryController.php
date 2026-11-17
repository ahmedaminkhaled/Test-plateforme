<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserStory;
use App\Http\Requests\StoreUserStoryRequest;
use App\Http\Requests\UpdateUserStoryRequest;
use Illuminate\Http\JsonResponse;

class UserStoryController extends Controller
{
    public function index(): JsonResponse
    {
        $stories = UserStory::withCount('testCases')->get();
        return response()->json($stories);
    }

    public function show(string $id): JsonResponse
    {
        $story = UserStory::with('testCases')->findOrFail($id);
        return response()->json($story);
    }

    public function store(StoreUserStoryRequest $request): JsonResponse
    {
        $story = UserStory::create($request->validated());
        return response()->json($story, 201);
    }

    public function update(UpdateUserStoryRequest $request, string $id): JsonResponse
    {
        $story = UserStory::findOrFail($id);
        $story->update($request->validated());
        return response()->json($story);
    }

    public function destroy(string $id): JsonResponse
    {
        $story = UserStory::findOrFail($id);
        $story->delete();
        return response()->json(null, 204);
    }
}
