<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Siswa;
use Redirect,Response;
use App\Http\Controllers\Controller;


class SiswaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $data['posts'] = Siswa::orderBy('id','desc')->paginate(8);

        return view('siswa.index',$data);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $postID = $request->post_id;
        $post   =   Siswa::updateOrCreate(['id' => $postID],
                    ['nama' => $request->nama, 'no_hp' => $request->no_hp, 'email' => $request->email]);
    
        return Response::json($post);
    }



    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
        $where = array('id' => $id);
        $post  = Siswa::where($where)->first();
 
        return Response::json($post);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $post = Siswa::where('id',$id)->delete();
        return Response::json($post);
    }
}