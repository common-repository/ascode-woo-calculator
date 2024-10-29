<?php

namespace AsCode\WooCalculator\Front;

/**
 * The frontend enqueue class
 */
class Enqueue
{

    public function __construct()
    {
        add_action('wp_enqueue_scripts', [$this, 'enqueue_frontend_scripts']); // Renamed the method for clarity
    }

    public function enqueue_frontend_scripts()
    {
        // Enqueue the frontend CSS file.
        wp_enqueue_style('ascode-woo-calculator-frontend', ASC_WOO_CALCULATOR_ASSETS . '/front/css/output.css');

        // Enqueue the frontend JavaScript file.
        wp_enqueue_script('ascode-woo-calculator-frontend', ASC_WOO_CALCULATOR_ASSETS . '/front/js/frontend.js', ['jquery'], null, true);

        // Localize the JavaScript script with necessary data.
        wp_localize_script(
            'ascode-woo-calculator-frontend',
            'output_ajax_object',
            [
                'ajax_url'   => esc_url(admin_url('admin-ajax.php')), // Properly escaped the URL
                'ajax_nonce' => wp_create_nonce('ascode-calculator-show-calculator')
            ]
        );
    }
}
