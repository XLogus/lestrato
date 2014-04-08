<?php
require_once("../wp-load.php");
$json = array();
$args = array(
    'post_type' => 'audio',
    'post_per_page' => 10
);

$the_query = new WP_Query( $args );
if ( $the_query->have_posts() ) {        
	while ( $the_query->have_posts() ) {
		$the_query->the_post();
        $post_id = get_the_ID();
        $thumbId = get_image_id_by_link ( get_post_meta($post->ID, 'snbp_pitemlink', true) );
        $thumb = wp_get_attachment_image_src($thumbId, 'full', false);
                
		$json[] = array (
            'id' => $post_id,
            'title' => get_the_title(),
            'content' => wpautop(do_shortcode($post->post_content)),
            'thumb' => $thumb[0]
            //'thumb' => get_the_post_thumbnail( $post_id, 'medium' )
            //'thumb' => $thumb['src']            
        );
	}        
} else {
	// no posts found
}
/* Restore original Post Data */
wp_reset_postdata();

echo $_GET['jsoncallback'].'({"items":'. json_encode($json).'})';
?>