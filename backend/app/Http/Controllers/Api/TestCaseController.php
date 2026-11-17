<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TestCase as TestCaseModel;
use App\Services\TestCaseSchemaValidator;
use App\Http\Requests\StoreTestCaseRequest;
use App\Http\Requests\UpdateTestCaseRequest;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TestCaseController extends Controller
{
    protected TestCaseSchemaValidator $validatorService;

    public function __construct(TestCaseSchemaValidator $validatorService)
    {
        $this->validatorService = $validatorService;
    }

    public function index(Request $request): JsonResponse
    {
        $query = TestCaseModel::query();
        if ($request->has('user_story_id')) {
            $query->where('user_story_id', $request->query('user_story_id'));
        }
        if ($request->has('type')) {
            $query->where('type', $request->query('type'));
        }
        if ($request->has('status')) {
            $query->where('status', $request->query('status'));
        }
        if ($request->has('search')) {
            $search = $request->query('search');
            $query->where(function($q) use ($search) {
                $q->where('title', 'ilike', "%$search%")
                  ->orWhere('objective', 'ilike', "%$search%");
            });
        }
        $cases = $query->get();
        return response()->json($cases);
    }

    public function show(string $id): JsonResponse
    {
        $case = TestCaseModel::findOrFail($id);
        return response()->json($case);
    }

    public function store(StoreTestCaseRequest $request): JsonResponse
    {
        $data = $request->validated();
        
        // Validate against canonical JSON schema
        $errors = $this->validatorService->validate($data);
        if (!empty($errors)) {
            return response()->json(['errors' => $errors], 422);
        }

        $case = TestCaseModel::create($data);
        return response()->json($case, 201);
    }

    public function update(UpdateTestCaseRequest $request, string $id): JsonResponse
    {
        $case = TestCaseModel::findOrFail($id);
        $merged = array_merge($case->toArray(), $request->validated());

        // Validate updated state against canonical JSON schema
        $errors = $this->validatorService->validate($merged);
        if (!empty($errors)) {
            return response()->json(['errors' => $errors], 422);
        }

        $case->update($request->validated());
        return response()->json($case);
    }

    public function destroy(string $id): JsonResponse
    {
        $case = TestCaseModel::findOrFail($id);
        $case->delete();
        return response()->json(null, 204);
    }
}
