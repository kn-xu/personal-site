<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHeartbeatsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('heartbeats', function (Blueprint $table) {
            $table->increments('hb_id');
            $table->string('hash_id');
            $table->string('hb_url');
            $table->timestamps();
        });

        Schema::create('hits', function (Blueprint $table) {
            $table->increments('hits_id');
            $table->string('hash_id');
            $table->string('hb_url');
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('hits');
        Schema::dropIfExists('heartbeats');
    }
}
