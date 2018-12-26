<?php

function get_datafile($file_name, $foldel, $cache_time = 120, $url){
	$cache_path = '../../data/api/'.$foldel;
	$cache_file = sprintf('%s/%s', $cache_path, $file_name);
	if( file_exists($cache_file) ){
		$time = time() - filemtime($cache_file);
	}
	$response = false;
	if( file_exists($cache_file) && $time < $cache_time ) {
		$response = file_get_contents($cache_file);
	}else{
		$req_prefs['http']['method'] = 'GET';
		$req_prefs['http']['header'] = 'X-Auth-Token: 5ea50d419a36495c8bdddfa4b027c982';
		$stream_context = stream_context_create($req_prefs);
    $response = @file_get_contents($url, false, $stream_context);
    if(!$response) {
      $response = file_get_contents($cache_file);
      echo $response;
      return;
    }
    file_put_contents($cache_file, $response);
	}
	echo $response;
}

$name = $_POST['name'].'.json';
$url = $_POST['url'];
$time = $_POST['time'];
$foldel = $_POST['foldel'];
get_datafile($name, $foldel, $time, $url)

?>