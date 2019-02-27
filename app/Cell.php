<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cell extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'cells';

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;
}
