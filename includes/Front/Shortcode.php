<?php

namespace AsCode\WooCalculator\Front;

/**
 * The Shortcode handelar class
 */
class Shortcode
{
    public function __construct()
    {
        add_shortcode('woo-calculator', [$this, 'ascode_calculator_shortcode']);
    }
    /**
     * Display Calculator in the page
     *
     * @param $atts
     *
     * @return string
     */
    function ascode_calculator_shortcode($atts)
    {
        $calculator_id = sanitize_text_field($atts['id']);
        ob_start();
?>
        <div id="ascode_calculator_view" data-value="<?php echo $calculator_id; ?>">
        </div>

<?php
        return ob_get_clean();
    }
}
