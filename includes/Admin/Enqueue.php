<?php

namespace AsCode\WooCalculator\Admin;

class Enqueue
{

    public function __construct()
    {
        add_action('admin_enqueue_scripts', [$this, 'admin_script'], 10, 1);
    }

    /**
     * Enqueue styles and scripts on the admin dashboard.
     *
     * @param string $page The current admin page.
     * @return void
     */
    public function admin_script($page)
    {
        // Enqueue the CSS file.
        wp_enqueue_style('ascode-woo-calculator-css', ASC_WOO_CALCULATOR_ASSETS . '/admin/css/output.css');

        // Check if the current admin page matches your target page.
        if ($page === 'toplevel_page_ascode-woo-calculator') {
            // Enqueue the JavaScript file.
            wp_enqueue_script('ascode-woo-calculator-dashboard', ASC_WOO_CALCULATOR_ASSETS . '/admin/js/dashboard.js', [], false, true);

            // Localize the script with data needed in JavaScript.
            wp_localize_script('ascode-woo-calculator-dashboard', 'ascodeWooCalculatorDashboard',  $this->dashboard_data());
        }
    }

    /**
     * Define data that is needed in the JavaScript script.
     *
     * @return array Data to be localized for JavaScript.
     */
    private function dashboard_data()
    {
        return [
            'nonce'  => wp_create_nonce('ascode-calculator-admin-nonce'), // Example data; you can add more data here.
        ];
    }
}
