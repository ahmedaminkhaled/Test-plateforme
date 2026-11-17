<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserStoryRequest extends FormRequest
{
    public function authorize()
    {
        return true; // No auth needed for this platform
    }

    public function rules()
    {
        return [
            'id' => 'required|string|unique:user_stories,id',
            'title' => 'required|string',
            'story_text' => 'required|string',
            'acceptance_criteria' => 'required|array',
            'business_rules' => 'required|array',
            'is_generated' => 'sometimes|boolean',
        ];
    }
}
