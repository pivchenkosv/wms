<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCellPoductTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cell_product', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('product_id');
            $table->foreign('product_id')->references('id')->on('products');
            $table->unsignedInteger('cell_id');
            $table->foreign('cell_id')->references('id')->on('cells');
            $table->unsignedInteger('quantity');
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
        Schema::dropIfExists('cell_product');
    }
}
