<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TestCase extends Model
{
    use HasFactory;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'user_story_id',
        'user_story_title',
        'title',
        'objective',
        'preconditions',
        'test_data',
        'steps',
        'expected_result',
        'type',
        'design_technique',
        'acceptance_criterion_covered',
        'status',
    ];

    protected $casts = [
        'preconditions' => 'array',
        'test_data' => 'array',
        'steps' => 'array',
    ];

    /**
     * User story this test case belongs to.
     */
    public function userStory(): BelongsTo
    {
        return $this->belongsTo(UserStory::class, 'user_story_id', 'id');
    }

    /**
     * Format into canonical structure conforming strictly to contracts/test_case.schema.json.
     */
    public function toCanonicalArray(): array
    {
        return [
            'id' => $this->id,
            'user_story' => $this->user_story_id,
            'objective' => $this->objective,
            'preconditions' => $this->preconditions ?? [],
            'test_data' => $this->test_data ?? (object)[],
            'steps' => $this->steps ?? [],
            'expected_result' => $this->expected_result,
            'type' => $this->type,
            'design_technique' => $this->design_technique,
            'acceptance_criterion_covered' => $this->acceptance_criterion_covered,
            // Platform extension attributes
            'title' => $this->title,
            'user_story_title' => $this->user_story_title,
            'status' => $this->status,
        ];
    }
}
