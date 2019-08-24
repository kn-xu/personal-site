<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Hit extends Model
{
    /**
     * @var string
     */
    protected $table = 'hits';

    /**
     * @var string
     */
    protected $primaryKey = 'hits_id';

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function hb()
    {
        return $this->belongsTo('App\Heartbeat', 'hash_id', 'hash_id');
    }

}
