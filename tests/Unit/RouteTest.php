<?php

namespace Tests\Unit;

use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class RouteTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testBasicTest()
    {
        $user = factory(User::class)->make();
        $response = $this->actingAs($user)->get('api/reports');

        $response
            ->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    [
                        'id' => 1,
                        'created_by' => 1,
                        'action' => 'TASK_CREATED',
                        'task_id' => 6,
                        'created_at' => '2019-03-13 12:15:54',
                        'updated_at' => '2019-03-13 12:15:54'
                    ],
                    [
                        "id" => 2,
                        "created_by" => 1,
                        "action" => "TASK_UPDATED",
                        "task_id" => 6,
                        "created_at" => "2019-03-13 12:59:43",
                        "updated_at" => "2019-03-13 12:59:43"
                    ]

                ]
            ]);
    }
}
