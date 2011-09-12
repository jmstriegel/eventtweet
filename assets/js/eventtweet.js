
var $tweettemplate;
var $detailtemplate;
var foundtweets;
var tweetqueue;
var maxlist = 1000;
var updateinterval;
var detailinterval;
var searchinterval;


$(document).ready( function() {

    $tweettemplate = $("#tweettemplate").clone();
    $("#tweettemplate").remove();
    $detailtemplate = $("#tweetdetailtemplate").clone();
    $("#tweetdetailtemplate").remove();

    $.timeago.settings.strings['seconds'] = "%d seconds";

    foundtweets = {};
    tweetqueue = [];
   

    searchTwitter( searchquery );
    searchinterval = setInterval( function() {
        searchTwitter( searchquery );
    }, 10000);

    updateinterval = setInterval( function() {
        updateTweetList();
    }, 500 );

    detailinterval = setInterval( function() {
        updateTweetDetail();
    }, 5000 );

    setTimeout( function() {
        updateTweetDetail();
    }, 3000 );


    $("#tweetfocus").css('cursor','pointer');
    $("#tweetfocus").click( function() {
        $(this).fadeOut();
    });


});

function updateTweetDetail() {

    var $lasttweetitem = $('#tweetwall').children().first();
    if ( $lasttweetitem && $lasttweetitem.get(0) && $lasttweetitem.attr('id').match( /tweet_/ ) ) {
    
        var tweetid = $lasttweetitem.attr('id').replace(/^tweet_/, "");
        
        var tweet = foundtweets[tweetid];
        if ( ! tweet ) {
            return;
        }

        var $tweetitem = $('<div id="detail_' + tweet['id']  + '" class="detailholder">' + $detailtemplate.html() + '</div>'); 
        $tweetitem.css('display','none');
        $tweetitem.find('.photo img').attr('src', tweet['img_lrg'] );
        $tweetitem.find('.tweettext').html( tweet['text'] );
        $tweetitem.find('.author').text( '@' + tweet['user'] );
        $tweetitem.find('.created_at').text( tweet['created_at'] ).css('display','none');
        $tweetitem.find('.created_friendly').text( $.timeago(tweet['created_at']) );

        var $olditem = $('#tweetdetail').children().first();

        if ( $olditem.get(0) && $olditem.attr('id') != "detail_" + tweet['id'] ) {
           
            //fetchUserInfo( tweet['user'], $tweetitem );

            $olditem.fadeOut('fast', function(){

                $tweetitem.css('cursor','pointer');
                $tweetitem.click( function() {
                    showDetail( tweet['id'] );
                });

                $('#tweetdetail').prepend( $tweetitem );
                $tweetitem.hide().fadeIn();

                $(this).remove();
        
            });
        } else if ( $olditem.attr('id') != "detail_" + tweet['id'] ) {
            $tweetitem.css('cursor','pointer');
            $tweetitem.click( function() {
                showDetail( tweet['id'] );
            });
            //fetchUserInfo( tweet['user'], $tweetitem );
            $('#tweetdetail').prepend( $tweetitem );
            $tweetitem.hide().fadeIn();
        }
    }

}
        
function fetchUserInfo( screenname, $detaildom ) {

    var url = "http://api.twitter.com/1/users/show.json?screen_name=" + encodeURIComponent( screenname ) + "&include_entities=false&callback=?";
    $.getJSON( url, function(data) {

        if ( data && data['name'] && data['description'] ) {
            $detaildom.find('.author_name').html( data['name'] );
            $detaildom.find('.author_info').html( data['description'] );
        }
    });
    

}

function showDetail( tweetid ) {
    
    var tweet = foundtweets[tweetid];

    $tweetitem = $("#tweetfocuscontent");
    $tweetitem.find('.tweettext').html( tweet['text'] );
    $tweetitem.find('.author').text( '@' + tweet['user'] );
    $tweetitem.find('.created_at').text( tweet['created_at'] ).css('display','none');
    
    $("#tweetfocus").fadeIn();

}

function updateTweetList() {
    if ( tweetqueue.length > 0 ) {
    
        var tweet = tweetqueue.shift();

        
        var $tweetitem = $('<div id="tweet_' + tweet['id']  + '" class="tweetholder">' + $tweettemplate.html() + '</div>');
        $tweetitem.css('display','none');

        $tweetitem.find('.photo img').attr('src', tweet['img_sml'] );
        $tweetitem.find('.tweettext').html( tweet['text'] );
        $tweetitem.find('.author').text( '@' + tweet['user'] );
        //$tweetitem.find('.created_at').text( tweet['created_at'] ).css('display','none');

        $tweetitem.css('cursor','pointer');
        $tweetitem.click( function() {
            showDetail( tweet['id'] );
        });

        $('#tweetwall').prepend( $tweetitem );
        $tweetitem.children().css('visibility','hidden');
        $tweetitem.slideDown('fast', function() {
            $(this).children('.photo, .tweettext, .byline').css('visibility','visible').hide().fadeIn();
        });

    }

    $('#tweetwall, #tweetdetail, #tweetfocus').find('.created_at').each( function() {
    
        var time = $(this).text();
        $(this).parent().find('.created_friendly').text( $.timeago(time) );
    
    });

}


function fillTweetQueue( tweets ) {
    
    for ( var x = tweets.length-1; x >=0; x-- ) {
        var tweet = tweets[x];
        if ( !foundtweets[ tweet['id_str'] ] ) {
            
            var tweetdata = {};
            tweetdata['id'] = tweet['id_str'];
            tweetdata['user'] = tweet['from_user'];
            tweetdata['text'] = tweet['text'];
            tweetdata['img_sml'] = tweet['profile_image_url'];
            tweetdata['img_lrg'] = tweet['profile_image_url'].replace(/_normal\./, "_reasonably_small.");
            tweetdata['created_at'] = tweet['created_at'];
            
            foundtweets[ tweet['id_str'] ] = tweetdata;
            tweetqueue.push( tweetdata );
        }
    }

}

function searchTwitter( query ) {

    var tweets = [];

    var url = "http://search.twitter.com/search.json?rpp=10&result_type=recent&q=" + encodeURIComponent( query ) + "&callback=?";
    $.getJSON( url, function(data) {

        if ( data && data['results'] && data['results'].length > 0 ) {
            tweets = data['results'];
        }
        fillTweetQueue( tweets );
    
    });

}
