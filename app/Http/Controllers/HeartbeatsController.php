<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Heartbeat as HBModel;

class HeartbeatsController extends Controller
{
    public function get(Request $request)
    {
        $userHash = $request->get('h');

        if ($userHash) {
            $hashes = HBModel::where('hash_id', $userHash)->get();
            return response()->json($hashes);
        }

        return response()->json([
            'data' => []
        ]);
    }

    public function post(Request $request)
    {
        $formData = $request->post();

        try {
            $heartBeat = new HBModel();
            $heartBeat->hb_url = $formData['url'];
            $heartBeat->hash_id = $formData['h'];
            $heartBeat->saveOrFail();

            return response()->json($heartBeat);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ]);
        }
    }
}
