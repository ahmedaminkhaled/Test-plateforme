<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTestRunRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'id' => 'sometimes|integer',
            'title' => 'required|string',
            'timestamp_label' => 'required|string',
            'browsers' => 'required|array',
            'total_tests' => 'required|integer|min:0',
            'passed_tests' => 'required|integer|min:0',
            'failed_tests' => 'required|integer|min:0',
            'skipped_tests' => 'required|integer|min:0',
            'suites' => 'required|array',
            'anomalies' => 'nullable|array',
        ];
    }
}
