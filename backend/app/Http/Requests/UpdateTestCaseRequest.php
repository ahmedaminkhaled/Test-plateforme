<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTestCaseRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'title' => 'sometimes|string',
            'objective' => 'sometimes|string',
            'preconditions' => 'sometimes|array',
            'test_data' => 'sometimes|array',
            'steps' => 'sometimes|array',
            'expected_result' => 'sometimes|string',
            'type' => 'sometimes|in:positive,negative',
            'design_technique' => 'sometimes|string',
            'acceptance_criterion_covered' => 'sometimes|string',
            'status' => 'sometimes|string',
        ];
    }
}
