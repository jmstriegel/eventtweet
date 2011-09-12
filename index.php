<?php
$templatesdir = 'templates/';
$includesdir = 'includes/';

require_once $includesdir . 'config.inc';
require_once $includesdir . 'common.inc';


//Sets up normal page variables, performs auth, runs PageMain()
require_once $includesdir . 'standard_page_logic.inc';

function PageMain() {
    global $template, $templatesdir, $includesdir, $config;

    //Do any page logic here.

    $template['title'] = $config[$config['env']]['event_title'];
    $template['searchquery'] = $config[$config['env']]['twitter_search'];

    require_once $templatesdir . 'pages/index.inc';

}
