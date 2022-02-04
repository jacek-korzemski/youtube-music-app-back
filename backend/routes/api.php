<?php

use App\Models\Music;
use App\Models\Channels;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get("/getNewVideos", function() {
    return Music::orderBy('published_at', 'desc')->take(100)->get();
});

Route::get("/getVideoById/{id}", function($id) {
    return Music::where('id', $id)->get();
});

Route::get("/getAllChannels", function() {
    return Channels::all();
});

Route::get('/getChannelById/{id}', function($id) {
    $channel_id = Channels::where('id', $id)->get()[0]['channel_id'];
    return Music::where('channel_id', $channel_id)->get();
});

Route::get('/search/{s}', function($s) {
    return Music::where('title', 'like', '%'.$s.'%')->get();
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
