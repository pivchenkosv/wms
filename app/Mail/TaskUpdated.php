<?php

namespace App\Mail;

use App\Task;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class TaskUpdated extends Mailable
{
    use Queueable, SerializesModels;

    public $username, $task;

    /**
     * Create a new message instance.
     *
     * @param Task $task
     * @param string $username
     */
    public function __construct(Task $task, $username = '')
    {
        $this->username = $username;
        $this->task = $task;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('emails.taskUpdated');
    }
}
