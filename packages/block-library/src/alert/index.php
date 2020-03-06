<?php

function create_block_todo_list_block_init() {
	register_block_type( 'core/alert', array(
		'render_callback' => function ( $attributes ) {
			$time = date( "d-m-Y H=>i=>s" );
			$title = $attributes['title'] ?? '';
			$text = $attributes['text'] ?? '';
			$textAlign = $attributes['textAlign'] ?? '';
			$className = $attributes['className'] ?? '';

			return <<<HTML
	        <div class="wp-block-create-block-todo-list $className has-text-align-$textAlign">
	            <h3>
	                $title
	            </h3>
	            <p>
	                $text
	            </p>
	            <p>
	                Oh by the way, the time is=> $time
	            </p>
	        </div>
HTML;
		},
	) );
}

add_action( 'init', 'create_block_todo_list_block_init' );
