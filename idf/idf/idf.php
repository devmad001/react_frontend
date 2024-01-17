<?php 
/**
 * Plugin Name: Blog  API
 * Author: rafael lain
 */
// Custom Post Type
function blogPostType() {
  register_post_type('blog',
      array(
          'labels'      => array(
              'name'          => __('Blogs', 'textdomain'),
              'singular_name' => __('Blog', 'textdomain'),
          ),
          'public'      => true,
          'has_archive' => true,
          'menu_icon'   => 'dashicons',
      )
  );
    register_post_type('card',
      array(
          'labels'      => array(
              'name'          => __('Cards', 'textdomain'),
              'singular_name' => __('Card', 'textdomain'),
          ),
          'public'      => true,
          'has_archive' => true,
          'menu_icon'   => 'dashicons',
      )
  );
  register_post_type('sportcard',
      array(
          'labels'      => array(
              'name'          => __('SportCards', 'textdomain'),
              'singular_name' => __('SportCard', 'textdomain'),
          ),
          'public'      => true,
          'has_archive' => true,
          'menu_icon'   => 'dashicons',
      )
  );
}
add_action('init', 'blogPostType');


function getBlogDetails($post) {
 
  $fields = get_fields($post->ID);
   
  return array(
    'label' => $fields['blog_label'],
    'title' => $post->post_title,
    'id' => $post->ID,
    'category' => $fields['blog_category'],
    'img' => $fields['blog_img'],
  );
}

function getBlogsByType($data) {
  $posts = get_posts([
    'post_type' => 'blog',
    'numberposts' => -1,
    'post_status' => 'publish',
    'meta_key' => 'blog_category',
    'meta_value' => $data['type']
  ]);
 
  $blogs = array();
 
  foreach($posts as $post) {
    $blogs[] = getBlogDetails($post);
  }
 
  return $blogs;
}

function getAllBlogs() {
  $posts = get_posts([
    'post_type' => 'blog',
    'numberposts' => -1,
    'post_status' => 'publish',
  ]);
 
  $blogs = array();
 
  foreach($posts as $post) {
    
     $blogs[] = getBlogDetails($post);
  }
 
  return $blogs;
}


function getBlog($data) {
  $posts = get_fields($data['id']); 
  return $posts;
}

function blogRestRoutes() {
  register_rest_route( 'idf/v1', '/blogs', array(
    'methods' => 'GET',
    'callback' => 'getAllBlogs'
  ) );
 
  register_rest_route( 'idf/v1', '/blogs/(?P<type>[a-zA-Z0-9-]+)', array(
    'methods' => 'GET',
    'callback' => 'getBlogsByType'
  ) );
 
  register_rest_route( 'idf/v1', '/blog/(?P<id>\d+)', array(
    'methods' => 'GET',
    'callback' => 'getBlog'
  ) );
}
add_action( 'rest_api_init', 'blogRestRoutes' );



function getAllCards() {
  $cards = get_posts([
    'post_type' => 'card',
    'numberposts' => -1,
    'post_status' => 'publish',
  ]);
 
  $blogs = array();
 
  foreach($cards as $card) {
    
     $blogs[] = getCardDetails($card);
  }
 
  return $blogs;
}
function getCardDetails($post) {
 
  $fields = get_fields($post->ID);
   
  return array( 
    'title' => $post->post_title,
    'id' => $post->ID, 
    'img' => $fields['card_image'],
    'link'=> $fields['link']
  );
}

function cardRestRoutes() {
 
  register_rest_route( 'idf/v1', '/cards', array(
    'methods' => 'GET',
    'callback' => 'getAllCards'
  ) );
 
  register_rest_route( 'idf/v1', '/cards/(?P<type>[a-zA-Z0-9-]+)', array(
    'methods' => 'GET',
    'callback' => 'getCardsByType'
  ) );
 
  register_rest_route( 'idf/v1', '/card/(?P<id>\d+)', array(
    'methods' => 'GET',
    'callback' => 'getCard'
  ) );
}
add_action( 'rest_api_init', 'cardRestRoutes' );



function getAllSports() {
  $sports = get_posts([
    'post_type' => 'sportcard',
    'numberposts' => -1,
    'post_status' => 'publish',
  ]);
 
  $blogs = array();
 
  foreach($sports as $sport) {
    
     $blogs[] = getSportDetails($sport);
  }
 
  return $blogs;
}
function getSportDetails($post) {
 
  $fields = get_fields($post->ID);
   
  return array( 
    'hoverText' => $post->post_title,
    'id' => $post->ID, 
    'span' => $fields['span'],
    'src'=> $fields['image']
  );
}

function sportRestRoutes() {
 
  register_rest_route( 'idf/v1', '/sports', array(
    'methods' => 'GET',
    'callback' => 'getAllSports'
  ) );
 
  register_rest_route( 'idf/v1', '/sports/(?P<type>[a-zA-Z0-9-]+)', array(
    'methods' => 'GET',
    'callback' => 'getSportsByType'
  ) );
 
  register_rest_route( 'idf/v1', '/sport/(?P<id>\d+)', array(
    'methods' => 'GET',
    'callback' => 'getSport'
  ) );
}
add_action( 'rest_api_init', 'sportRestRoutes' );
// Define a custom endpoint
function custom_rest_endpoint() {
    register_rest_route('myplugin/v1', '/custom-endpoint', array(
        'methods' => 'POST',
        'callback' => 'custom_endpoint_callback',
    ));
}
add_action('rest_api_init', 'custom_rest_endpoint');

// Callback function for the custom endpoint
function custom_endpoint_callback($request) {

      $body = $request->get_json_params();
      $html="";
       if(isset($body['hub']))
          $html.="<br>hub : ".$body['hub']."<br>";
      if(isset($body['firstname']))
      {
             $html.="<br>";
             $html.=$body['isFullname'] ? "Full Name : " : "FirstName : ";
             $html.=$body['firstname'];
      }
      if(isset($body['lastname']))
          $html.="<br>lastname : ".$body['lastname']."<br>";
      if(isset($body['email']))
          $html.="<br>email : ".$body['email']."<br>";
      if(isset($body['phone']))
          $html.="<br>phone : ".$body['phone']."<br>";
      if(isset($body['message']))
          $html.="<br>message : ".$body['message']."<br>";
      if(isset($body['estate']))
          $html.="<br>estate : ".$body['estate']."<br>";
      if(isset($body['organisation']))
          $html.="<br>organisation : ".$body['organisation']."<br>";
      if(isset($body['isEstate']))
      {
        $html.="<br>";
        $html.=$body['isEstate'] ? "Estate : " : "Restaurant : ";
        $html.=$body['estate'];
      }    
      $email = new SendGrid\Email();
      //contact@idfstgeorge.org.au
      $email
          ->setFrom("contact@idfstgeorge.org.au")
          ->setHtml($html)
          ->addCategory('customCategory');

      $success=wp_mail("admin@idfstgeorge.org.au", 'Subject goes here', 'Message goes here', $email);    
      
      if(!$success)
      {
        return new WP_Error( 'no_posts', __('No post found'), array( 'status' => 404 ) ); 
      } 
        
      return new WP_REST_Response($success, 200);
      
}

?>