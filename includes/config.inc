<?php

ini_set('display_errors', '1');

// Edit these settings as needed.
// Create different profiles for dev and production, then use
// $config[$config['env']['variable'] in your code to pull up the
// appropriate setting.


$config['production']['event_title'] = 'Event Tweet Display';
$config['production']['twitter_search'] = '#eventtweet';


$config['production']['base_lib_path'] = '/var/www/eventtweet/';
$config['production']['base_path'] = 'http://example.com/eventtweet';

$config['env'] = 'production';




//Hack - disable magic quotes (if it's enabled)
if (get_magic_quotes_gpc()) {
    $process = array(&$_GET, &$_POST, &$_COOKIE, &$_REQUEST);
    while (list($key, $val) = each($process)) {
        foreach ($val as $k => $v) {
            unset($process[$key][$k]);
            if (is_array($v)) {
                $process[$key][stripslashes($k)] = $v;
                $process[] = &$process[$key][stripslashes($k)];
            } else {
                $process[$key][stripslashes($k)] = stripslashes($v);
            }
        }
    }
    unset($process);
}

//custom php includes for dev server mail pear and socket libraries
$baselibpath = $config[$config['env']]['base_lib_path'];
$libspath = $baselibpath .'lib';
                        
set_include_path( get_include_path() . PATH_SEPARATOR . $libspath );
