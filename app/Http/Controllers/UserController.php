<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Client info controller
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function client(Request $request)
    {
        // Build client info
        $clientInfo = array();
        $clientInfo['data'] = array(
            "IP" => $request->getClientIp(),
            "userAgent" => $request->userAgent(),
            "language" => $request->getLanguages()[0]
        );
        $clientInfo['code'] = JsonResponse::HTTP_OK;

        // Return with json
        return response()->json($clientInfo);
    }
}
