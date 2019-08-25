<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Heartbeat as HBModel;

/**
 * Class HeartbeatsController
 * @package App\Http\Controllers
 */
class HeartbeatsController extends Controller
{
    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function get(Request $request)
    {
        $userHash = $request->get('h');

        if ($userHash) {
            $hashes = HBModel::with(['hits' => function ($query) use ($userHash) {
                $query->where('hash_id', $userHash);
            }])->get();
            return response()->json($hashes);
        }

        return response()->json([
            'data' => []
        ]);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     * @throws \Throwable
     */
    public function post(Request $request)
    {
        $formData = $request->post();

        try {
            $heartBeat = new HBModel();
            $heartBeat->hb_url = $this->generateNewHBUrl();
            $heartBeat->hash_id = $formData['hashed_id'];
            $heartBeat->saveOrFail();

            $heartBeats = HBModel::where('hash_id', $formData['hashed_id'])->get();

            return response()->json($heartBeats);
        } catch (\Exception $e) {
            $heartBeat->saveOrFail();

            return response()->json([
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * @param int $length
     * @return bool|string
     */
    private function generateNewHBUrl($length = 7)
    {
        return "h/" . substr(str_shuffle(MD5(microtime())), 0, $length);
    }
}
