<?php
require_once("../wp-load.php");
$json = array();
$args = array(
    'post_type' => 'event',
    'post_per_page' => 10,
    'order' => 'ASC'
);

$the_query = new WP_Query( $args );
if ( $the_query->have_posts() ) {        
	while ( $the_query->have_posts() ) {
		$the_query->the_post();
        $post_id = get_the_ID();
        $date = get_post_meta($post_id, 'snbp_event_date', true);
        $time = get_post_meta($post_id, 'snbp_event_time', true);
        $venue = get_post_meta($post_id, 'snbp_event_venue', true);
        $location = get_post_meta($post_id, 'snbp_event_location', true);
                
		$json[] = array (
            'id' => get_the_ID(),
            'title' => get_the_title(),
            'content' => wpautop($post->post_content),
            'date' => $date,
            'time' => $time,
            'venue' => $venue,
            'location' => $location
        );
	}        
} else {
	// no posts found
}
/* Restore original Post Data */
wp_reset_postdata();

echo $_GET['jsoncallback'].'({"items":'. json_encode($json).'})';
?>