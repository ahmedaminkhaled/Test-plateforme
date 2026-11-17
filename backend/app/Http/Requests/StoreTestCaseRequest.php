<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTestCaseRequest extends FormRequest
{
    public function authorize()
    {
        return true; // No authentication required
    }

    public function rules()
    {
        return [
            'id' => 'required|string|unique:test_cases,id',
            'user_story_id' => 'required|string|exists:user_stories,id',
            'title' => 'required|string',
            'objective' => 'required|string',
            'preconditions' => 'required|array',
            'test_data' => 'required|array',
            'steps' => 'required|array',
            'expected_result' => 'required|string',
            'type' => 'required|in:positive,negative',
            'design_technique' => 'required|string',
            'acceptance_criterion_covered' => 'required|string',
            'status' => 'sometimes|string',
        ];
    }
}
