<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class UserStory extends Model
{
    use HasFactory;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'title',
        'story_text',
        'acceptance_criteria',
        'business_rules',
        'is_generated',
    ];

    protected $casts = [
        'acceptance_criteria' => 'array',
        'business_rules' => 'array',
        'is_generated' => 'boolean',
    ];

    /**
     * Test cases associated with this user story.
     */
    public function testCases(): HasMany
    {
        return $this->hasMany(TestCase::class, 'user_story_id', 'id');
    }
}
