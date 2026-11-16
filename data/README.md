# Data boundaries

Store requirements, acceptance criteria, and business rules in `requirements/`.
Only place approved black-box guidance in `knowledge_base/`:

- `app_docs/` — user-facing Indico documentation
- `istqb_techniques/` — testing-technique reference material
- `approved_examples/` — reviewed test-case examples

Never add Indico source code, secrets, production data, or personally identifiable
information. Generated and validated test cases belong in their respective
`test_cases/` folders and must comply with `contracts/test_case.schema.json`.
