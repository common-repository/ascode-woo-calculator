<?php

namespace AsCode\WooCalculator\Front;

class FrontAjax
{

    public function __construct()
    {
        // Register AJAX actions for logged-in users and non-logged-in users.
        add_action('wp_ajax_ascode_load_calculator_preview_info_action', [$this, 'ascode_load_calculator_preview_info_action']);
        add_action('wp_ajax_nopriv_ascode_load_calculator_preview_info_action', [$this, 'ascode_load_calculator_preview_info_action']);

        // Register AJAX actions for previewing a product.
        add_action('wp_ajax_ascode_preview_product_action', [$this, 'ascode_preview_product_action']);
        add_action('wp_ajax_nopriv_ascode_preview_product_action', [$this, 'ascode_preview_product_action']);
    }

    /**
     * Load calculator preview information via AJAX.
     */
    public function ascode_load_calculator_preview_info_action()
    {
        check_ajax_referer('ascode-calculator-show-calculator');

        $single_calculator_id = sanitize_text_field($_POST['calculator_id']);
        $single_calculator_data = get_post($single_calculator_id);
        $calculator_info = maybe_unserialize($single_calculator_data->post_content);

        $calculator_fields = $calculator_info['calculatorInfo'][0];

        wp_send_json_success($calculator_fields);
        wp_die();
    }

    /**
     * Preview a product based on the total value via AJAX.
     */
    public function ascode_preview_product_action()
    {
        check_ajax_referer('ascode-calculator-show-calculator');

        global $wpdb;
        $total_value = absint($_POST['total_value']); // Ensure the total value is a positive integer
        $metaKey = 'woo_calculator';
        $query = $wpdb->prepare(
            "
            SELECT p.ID
            FROM {$wpdb->posts} AS p
            JOIN {$wpdb->postmeta} AS pm ON p.ID = pm.post_id
            WHERE p.post_type = 'product'
            AND p.post_status = 'publish'
            AND pm.meta_key = %s
            AND (
                CAST(pm.meta_value AS SIGNED) >= %d
            )
            ORDER BY CAST(pm.meta_value AS SIGNED) ASC
            LIMIT 1
            ",
            $metaKey,
            $total_value
        );        
        
        $results = $wpdb->get_results($query, ARRAY_A);

        error_log(print_r($results, true));

        if (!empty($results)) {
            $product_id = (int) $results[0]['ID'];
            $product = wc_get_product($product_id);

            $product_view_data = [
                'product_image' => esc_url(wp_get_attachment_image_src($product->get_image_id(), 'full')[0]),
                'product_name'  => esc_html($product->get_name()),
                'product_url'   => esc_url(get_permalink($product_id)),
                'product_price' => esc_html($product->get_price()),
                'add_to_cart'   => esc_url($product->add_to_cart_url()),
                'currency_code' => esc_html(get_option('woocommerce_currency'))
            ];

            wp_send_json_success($product_view_data, true);
        } else {
            wp_send_json_error(['message' => 'No products found.']); // Handle no product found case
        }

        wp_die();
    }
}
