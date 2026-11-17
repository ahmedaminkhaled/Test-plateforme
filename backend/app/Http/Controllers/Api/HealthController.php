<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;

class HealthController extends Controller
{
    /**
     * Invoke the health check.
     */
    public function __invoke(): JsonResponse
    {
        $status = [
            'status' => 'ok',
            'timestamp' => now()->toIso8601String(),
        ];
        // Test DB connection
        try {
            DB::connection()->getPdo();
            $status['database'] = 'connected';
        } catch (\Exception $e) {
            $status['database'] = 'error';
            $status['db_error'] = $e->getMessage();
        }
        return response()->json($status);
    }
}
