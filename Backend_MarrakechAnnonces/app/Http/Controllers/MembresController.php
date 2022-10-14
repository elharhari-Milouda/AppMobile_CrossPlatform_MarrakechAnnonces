<?php

namespace App\Http\Controllers;

use App\Models\membre;
use Illuminate\Http\Request;

class MembresController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $member = membre::all();
        return Response()->json(['membre'=>$member]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $membres = new membre();
        $membres->login=$request->login;
        $membres->password=$request->password;
        $membres->adresse=$request->adresse;
        $membres->role=$request->role;
        $membres->tel=$request->tel;
        if($membres->save())
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
        $member = membre::find($id);
        return Response()->json(['membre'=>$member]);
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
        $membres = membre::find($id);
        $membres->login=$request->login;
        $membres->password=$request->password;
        $membres->adresse=$request->adresse;
        $membres->role=$request->role;
        $membres->tel=$request->tel;
        if($membres->save())
        {
            return Response()->json(['Bien modifier']);
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
        $membres = membre::find($id);
        $membres->delete();

    }
}
