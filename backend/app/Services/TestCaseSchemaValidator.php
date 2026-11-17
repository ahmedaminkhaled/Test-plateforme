<?php

namespace App\Services;

use JsonSchema\Validator;
use JsonSchema\Constraints\Constraint;

class TestCaseSchemaValidator
{
    private object $schema;

    public function __construct()
    {
        $schemaPath = base_path('../contracts/test_case.schema.json');
        $this->schema = json_decode(file_get_contents($schemaPath));
    }

    /**
     * Validate data against the canonical test_case.schema.json.
     * Returns an array of error messages (empty if valid).
     */
    public function validate(array $data): array
    {
        // Build only the schema-required subset for validation
        $canonical = new \stdClass();
        $canonical->id = $data['id'] ?? null;
        $canonical->user_story = $data['user_story'] ?? $data['user_story_id'] ?? null;
        $canonical->objective = $data['objective'] ?? null;
        $canonical->preconditions = $data['preconditions'] ?? [];
        $canonical->test_data = !empty($data['test_data']) ? (object) $data['test_data'] : new \stdClass();
        $canonical->steps = array_map(function ($step) {
            $obj = new \stdClass();
            $obj->order = $step['order'] ?? null;
            $obj->action = $step['action'] ?? null;
            return $obj;
        }, $data['steps'] ?? []);
        $canonical->expected_result = $data['expected_result'] ?? null;
        $canonical->type = $data['type'] ?? null;
        $canonical->design_technique = $data['design_technique'] ?? null;
        $canonical->acceptance_criterion_covered = $data['acceptance_criterion_covered'] ?? null;

        $validator = new Validator();
        $validator->validate(
            $canonical,
            $this->schema,
            Constraint::CHECK_MODE_NORMAL
        );

        if ($validator->isValid()) {
            return [];
        }

        $errors = [];
        foreach ($validator->getErrors() as $error) {
            $errors[] = sprintf('[%s] %s', $error['property'], $error['message']);
        }

        return $errors;
    }
}
