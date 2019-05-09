<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Model;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'role', 'auth_token',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    public function tasks()
    {
        return $this->hasManyThrough(Report::class, Task::class, 'assigned_user')
            ->where('reports.action', '=', 'TASK_COMPLETED')
            ->where('reports.created_at', '>', (new \Carbon\Carbon)->submonths(1) );
    }

    public function subtasks()
    {
        $tasks = $this->hasManyThrough(Report::class, Task::class, 'assigned_user')
            ->where('reports.action', '=', 'TASK_COMPLETED')
            ->where('reports.created_at', '>', (new \Carbon\Carbon)->submonths(1) )
            ->pluck('task_id')->toArray();
        return $this->hasManyThrough(Subtask::class, Task::class,'assigned_user')
            ->whereIn('task_id', $tasks)
            ->where('subtasks.created_at', '>', (new \Carbon\Carbon)->submonths(1) );
    }

    public function scopeRecent($query)
    {
        return $query->where('created_at', '>', (new \Carbon\Carbon)->submonths(1) );
    }
}
