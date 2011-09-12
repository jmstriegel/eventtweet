<?php include $templatesdir . 'shared/header.inc' ?>

<img id="logo" src="<?= $config[$config['env']]['base_path'] ?>/assets/images/logo.png" />
<div id="overview">
<h1><strong>Have a question?</strong> Ask it on Twitter:</h1>
<h2><?= htmlspecialchars( $config[$config['env']]['twitter_search'] ) ?></h2>
</div>

<div id="tweetwall">



<div id="tweettemplate">
    <div class="photo"><img width="48" height="48"  src="<?= $config[$config['env']]['base_path'] ?>/assets/images/blank.gif" /></div>
    <div class="byline"> 
        <span class="author"></span>
    </div>
    <div class="tweettext"></div>
</div>

</div>

<div id="tweetdetail">


<div id="tweetdetailtemplate">
    <div class="authordetails">
        <div class="photo"><img width="128" height="128" src="<?= $config[$config['env']]['base_path'] ?>/assets/images/blank.gif" /></div>
        <span class="author"></span>
        <span class="author_name"></span>
        <div class="author_info"></div>
        <div class="created_at"></div>
        <div class="created_friendly"></div>
    </div>
    <div class="tweettext"></div>
</div>

</div>


<div id="tweetfocus" style="display:none">
<div id="tweetfocus_bg"></div>
<div id="tweetfocuscontent">
    <div class="tweettext"></div>
    <div class="authordetails"><span class="author_name"></span><span class="author"></span></div>
    <div class="created_at"></div>
    <div class="created_friendly"></div>
</div>

</div>

<?php include $templatesdir . 'shared/footer.inc' ?>
