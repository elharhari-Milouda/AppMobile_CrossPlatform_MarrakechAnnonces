<?php

namespace App\Http\Controllers;

use App\Models\annonce;
use App\Models\categorie_anonce;
use App\Models\commentaire;
use App\Models\membre;
use App\Models\type_annonces as type_annonce;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class AnnoncesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function lista()
    {
        $cat = categorie_anonce::all();
        $com = commentaire::all();
        $mem = membre::all();
        $type = type_annonce::all();
        return Response()->json(['cat' => $cat, 'com' => $com, 'mem' => $mem, 'type' => $type]);
    }

    public function index()
    {
        $annonce = DB::select('select a.* ,ca.libelle as libelle from annonces a ,categorie_anonces ca where ca.id=a.categorie_annonce_id order by created_at desc');
        return Response()->json(['annonce' => $annonce]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        //upload img
        /*  if ($request->hasFile('img')) {
              $file = $request->file('img');
              $filename = $file->getClientOriginalName();
              // $finalName = date('His') . $filename;

              if ($request->file('img')->move(public_path('img'), $filename)) {
                  $pathf = 'http://192.168.100.27:8000' . '\img\\' . $filename;
          */
        $annonce = new annonce();

        $annonce->categorie_annonce_id = $request->categorie_annonce_id;
        $annonce->tel = $request->tel;
        $annonce->titre = $request->titre;
        $annonce->texte = $request->texte;
        $annonce->etat = $request->etat;
        //      $annonce->image = $pathf;
        $annonce->visible = $request->visible;
        $annonce->publie = $request->publie;
        if ($annonce->save()) {
            return Response()->json(['Annonce Bien Ajouter']);
        } else {
            return Response()->json(['Annonce Non Ajouter Merci de ressaier']);
        }
        // }
        //}
        //return Response()->json(['Problém format img']);
        //

    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $annonce = annonce::find($id);
        return Response()->json(['annonce' => $annonce]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $annonce = annonce::find($id);
        $annonce->membre_id = $request->membre_id;
        $annonce->type_annonce_id = $request->type_annonce_id;
        $annonce->categorie_annonce_id = $request->categorie_annonce_id;
        $annonce->commentaire_id = $request->commentaire_id;
        $annonce->titre = $request->titre;
        $annonce->texte = $request->texte;
        $annonce->nbr_vue = $request->nbr_vue;
        $annonce->etat = $request->etat;
        $annonce->image = $request->image;
        $annonce->classement = $request->classement;
        $annonce->visible = $request->visible;
        $annonce->publie = $request->publie;
        if ($annonce->save()) {
            return Response()->json(['Bien Modifier']);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return Response
     */
    public function destroy($id)
    {
        $annonce = annonce::find($id);
        $annonce->delete();
    }
}
