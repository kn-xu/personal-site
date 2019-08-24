<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Heartbeat extends Model
{
    /**
     * @var string
     */
    protected $table = 'heartbeats';

    /**
     * @var string
     */
    protected $primaryKey = 'hb_id';

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function hits()
    {
        return $this->hasMany('App\Hit', 'hash_id', 'hash_id');
    }
}
