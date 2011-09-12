<?

//BEGIN MAIN

//This should handle the typical page lifecycle
//Calls PageMain() when setup is complete. Define that function in
//your top level php file and render an html template within that.

$uses_session = false;
$cookie_guid = false;

if ( $uses_session ) {
    session_start();
}

$template = array();
$template['page_url'] = basename( $_SERVER['PHP_SELF'] );


if ( $cookie_guid ) {
    if ( !isset( $_COOKIE['user_guid']) ) {
        $template['user_guid'] = generateGUID();
    } else {
        $template['user_guid'] = $_COOKIE['user_guid'];
    }
    setcookie( 'user_guid', 
        $template['user_guid'], 
        time() + 60*60*24*300, //keep it for 300 days
        '/' );
}

if ( IsAuthenticated() ) {
    $template['authenticated'] = true;
} else {
    $template['authenticated'] = false;
}

PageMain();

//Cleanup code goes here

//END MAIN



//TODO
//Define this per your application's needs
function IsAuthenticated() {

global $template;

    $authenticated = false;

    return $authenticated;

}

//Use this instead of localRedirect. It can be hooked to perform any cleanup (db, etc.) first
function HandleLocalRedirect( $location ) {
  localRedirect( $location );
}

//TODO
//add any other utility functions that are commonly used in pages that use
//this application flow
