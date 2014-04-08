<?php
require_once("../wp-load.php");
$json = array();
$args = array(
    'post_type' => 'post',
    'post_per_page' => 10
);

$the_query = new WP_Query( $args );
if ( $the_query->have_posts() ) {        
	while ( $the_query->have_posts() ) {
		$the_query->the_post();
        $post_id = get_the_ID();
        $thumb = get_post_meta($post_id, 'sn_image_post_preview', true);
                
		$json[] = array (
            'id' => $post_id,
            'title' => get_the_title(),
            'content' => wpautop($post->post_content),
            //'thumb' => get_the_post_thumbnail( $post_id, 'medium' )
            'thumb' => $thumb['src']            
        );
	}        
} else {
	// no posts found
}
/* Restore original Post Data */
wp_reset_postdata();

echo $_GET['jsoncallback'].'({"items":'. json_encode($json).'})';
?>