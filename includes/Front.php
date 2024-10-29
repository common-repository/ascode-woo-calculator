<?php

namespace AsCode\WooCalculator;

class Front
{
    public function __construct()
    {
        $this->load_frontend_components();
    }

    /**
     * Load frontend components (Enqueue, Shortcode, and FrontAjax).
     *
     * @return void
     */
    public function load_frontend_components()
    {
        new Front\Enqueue(); // Enqueue styles and scripts for the frontend.
        new Front\Shortcode(); // Define custom shortcodes for the frontend.
        new Front\FrontAjax(); // Handle frontend-related AJAX actions.
    }
}
