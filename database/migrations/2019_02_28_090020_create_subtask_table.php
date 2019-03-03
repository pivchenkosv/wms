<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSubtaskTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('subtasks', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('task_id');
            $table->unsignedInteger('product_id');
            $table->unsignedInteger('quantity');
            $table->foreign('task_id')->references('id')->on('tasks');
            $table->unsignedInteger('from_cell');
            $table->foreign('from_cell')->references('id')->on('cells');
            $table->unsignedInteger('to_cell');
            $table->foreign('to_cell')->references('id')->on('cells');
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
        Schema::dropIfExists('subtasks');
    }
}
