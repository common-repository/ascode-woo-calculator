<?php

namespace AsCode\WooCalculator\Admin;

class AdminAction
{
    public function __construct()
    {
        // Hook into the WooCommerce product options to add a custom field.
        add_action('woocommerce_product_options_general_product_data', [$this, 'ascode_custom_field_to_product']);

        // Hook to save the custom field value when a product is updated.
        add_action('woocommerce_process_product_meta', [$this, 'woo_calculator_save_custom_field']);
    }

    /**
     * Add a custom field to the product settings in the WooCommerce admin.
     *
     * @return void
     */
    public function ascode_custom_field_to_product()
    {
        global $post;

        // Get the existing custom field value
        $custom_field_value = get_post_meta($post->ID, 'woo_calculator', true);

?>
        <div class="options_group">
            <?php
            woocommerce_wp_text_input(
                array(
                    'id'            => 'woo_calculator_value',
                    'label'         => 'Capacity',
                    'type'          => 'number',
                    'description'   => 'Enter a numeric value in Watt',
                    'value'         => $custom_field_value
                )
            );
            ?>
        </div>
<?php
    }


    /**
     * Save the custom field value from the product page.
     *
     * @param int $post_id The ID of the product being edited.
     * @return void
     */
    public function woo_calculator_save_custom_field($post_id)
    {
        // Check if the custom field value is set in the POST data.
        if (isset($_POST['woo_calculator_value'])) {
            // Sanitize the value before saving it.
            $custom_field_value = sanitize_text_field($_POST['woo_calculator_value']);
            update_post_meta($post_id, 'woo_calculator', $custom_field_value);
        }
    }
}
