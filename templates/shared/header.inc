<html>
<head>
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js"></script>
    <script type="text/javascript" src="<?= $config[$config['env']]['base_path'] ?>/assets/js/jquery.timeago.js"></script>

    <script>
        var searchquery = <?= json_encode( $template['searchquery'] ) ?>;
    </script>
    <script type="text/javascript" src="<?= $config[$config['env']]['base_path'] ?>/assets/js/eventtweet.js"></script>

    <link href='http://fonts.googleapis.com/css?family=Open+Sans:300,400,700' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="<?= $config[$config['env']]['base_path'] ?>/assets/css/eventtweet.css" type="text/css" media="screen" />

    <title><?php echo $template['title'] ?></title>
</head>
<body>
