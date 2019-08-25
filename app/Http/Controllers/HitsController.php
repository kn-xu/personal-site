<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Heartbeat as HBModel;
use App\Hit;

/**
 * Class HitsController
 * @package App\Http\Controllers
 */
class HitsController extends Controller
{
    /**
     * @param Request $request
     * @param $h
     * @throws \Throwable
     */
    public function get(Request $request, $h)
    {
        if ($h) {
            $hitInfo = array(
                'userAgent' => $request->userAgent(),
                'ip' => $request->getClientIp()
            );

            $heartBeat = HBModel::where('hb_url', 'h/' . $h)->first();

            if (!$heartBeat) {
                abort(404);
            }

            $hit = new Hit;
            $hit->hb_url = $h;
            $hit->info = json_encode($hitInfo);

            $heartBeat->hits()->save($hit);

            return;
        }

        abort(404);
    }
}
