<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('annonces', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('membre_id')->nullable();
//            $table->unsignedInteger('type_annonce_id');
            $table->unsignedInteger('categorie_annonce_id');
           // $table->unsignedInteger('commentaire_id')->nullable();
            $table->string('titre')->nullable();
            $table->text('texte')->nullable();
            $table->integer('nbr_vue')->nullable();
            $table->string('etat')->nullable();
            $table->string('image')->nullable();
            $table->integer('classement')->nullable();
            $table->boolean('visible')->nullable();
            $table->boolean('publie')->nullable();
            $table->string('photosArray')->nullable();
            $table->string('tel')->nullable();
            $table->timestamps();
            $table->foreign('membre_id')->references('id')->on('membres')->onDelete('cascade');
  //          $table->foreign('type_annonce_id')->references('id')->on('type_annonces')->onDelete('cascade');
            $table->foreign('categorie_annonce_id')->references('id')->on('categorie_anonces')->onDelete('cascade');
         //   $table->foreign('commentaire_id')->references('id')->on('commentaires')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('annonces');
    }
};
