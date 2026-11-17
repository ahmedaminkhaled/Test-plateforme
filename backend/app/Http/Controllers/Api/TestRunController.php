<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TestRun;
use App\Http\Requests\StoreTestRunRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class TestRunController extends Controller
{
    /**
     * List all test runs, newest first.
     */
    public function index(): JsonResponse
    {
        $runs = TestRun::orderByDesc('id')->get();
        return response()->json($runs);
    }

    /**
     * Show a single test run.
     */
    public function show(string $id): JsonResponse
    {
        $run = TestRun::findOrFail($id);
        return response()->json($run);
    }

    /**
     * Store a new test run.
     */
    public function store(StoreTestRunRequest $request): JsonResponse
    {
        $run = TestRun::create($request->validated());
        return response()->json($run, 201);
    }

    /**
     * Delete a test run.
     */
    public function destroy(string $id): JsonResponse
    {
        $run = TestRun::findOrFail($id);
        $run->delete();
        return response()->json(null, 204);
    }
}
