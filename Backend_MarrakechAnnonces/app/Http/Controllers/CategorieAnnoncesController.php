<?php

namespace App\Http\Controllers;

use App\Models\annonce;
use App\Models\categorie_anonce;
use App\Models\membre;
use Illuminate\Http\Request;

class CategorieAnnoncesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categorie = categorie_anonce::all();
        return Response()->json(['categorieAnnonce'=>$categorie]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $categorie = new categorie_anonce();
        $categorie->libelle=$request->libelle;
        $categorie->desc=$request->desc;
        if($categorie->save())
        {
            return Response()->json(['Bien Ajouter']);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $categorieAnnonce = categorie_anonce::find($id);
        return Response()->json(['categorieAnnonce'=>$categorieAnnonce]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $categorie = categorie_anonce::find($id);
        $categorie->libelle=$request->libelle;
        $categorie->desc=$request->desc;
        if($categorie->save())
        {
            return Response()->json(['Bien Modifier']);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $categorie = categorie_anonce::find($id);
        $categorie->delete();
    }
}
