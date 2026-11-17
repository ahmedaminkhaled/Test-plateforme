<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserStoryRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'title' => 'sometimes|string',
            'story_text' => 'sometimes|string',
            'acceptance_criteria' => 'sometimes|array',
            'business_rules' => 'sometimes|array',
            'is_generated' => 'sometimes|boolean',
        ];
    }
}
