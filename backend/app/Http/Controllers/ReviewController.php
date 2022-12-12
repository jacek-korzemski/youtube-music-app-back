<?php

namespace App\Http\Controllers;
use App\Models\Review;

use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function store(Request $request)
    {
        $body = json_decode($request->getContent());

        if ($body->secret != env('GLOBAL_USER_SECRET')) 
        {
            echo 'Critical error!';
            return false;
        }
 
        $review = new Review;
 
        $review->userId = $body->userId;
        $review->userName = $body->userName;
        $review->videoId = $body->videoId;
        $review->content = $body->content;
 
        $review->save();

        echo '{"message": "ok"}';
    }
}
