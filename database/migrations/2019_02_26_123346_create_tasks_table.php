<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->increments('id');
            $table->string('description')->nullable(true);
            $table->unsignedInteger('product_id');
            $table->foreign('product_id')->references('id')->on('products');
            $table->integer('quantity');
            $table->dateTime('at');
            $table->unsignedInteger('from_cell');
            $table->foreign('from_cell')->references('id')->on('cells');
            $table->unsignedInteger('to_cell');
            $table->foreign('to_cell')->references('id')->on('cells');
            $table->unsignedInteger('assigned_user');
            $table->foreign('assigned_user')->references('id')->on('users');
            $table->string('status')->default('OPENED');
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
        Schema::dropIfExists('tasks');
    }
}
