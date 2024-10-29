<?php

namespace AsCode\WooCalculator\Admin;

/**
 * The admin class
 *
 * All admin Ajax will run here
 */
class AdminAjax
{

    function __construct()
    {
        add_action('wp_ajax_ascode_save_calculator_info_action', [$this, 'ascode_save_calculator_info_action']);
        add_action('wp_ajax_ascode_load_calculator_info_action', [$this, 'ascode_load_calculator_info_action']);
        add_action('wp_ajax_ascode_delete_calculator_action', [$this, 'ascode_delete_calculator_action']);
        add_action('wp_ajax_ascode_load_calculator_get_info_action', [$this, 'ascode_load_calculator_get_info_action']);
        add_action('wp_ajax_ascode_update_calculator_info_action', [$this, 'ascode_update_calculator_info_action']);
    }

    /**
     * Save calculator settings data
     *
     * @return void
     */
    public function ascode_save_calculator_info_action()
    {
        check_ajax_referer('ascode-calculator-admin-nonce');

        // Sanitize the input data using wp_kses and esc_attr as needed.
        $calculator_setting_value = sanitize_multidimensional_array($_POST);
        $calculator_name = sanitize_text_field($calculator_setting_value['calculatorInfo'][0]['calculator']['calculatorName']);

        if (!is_serialized($calculator_setting_value)) {
            $calculator_setting_value = maybe_serialize($calculator_setting_value);
        }

        $user_id = get_current_user_id();
        $calculator_post_value = array(
            'post_author'   => $user_id,
            'post_title'    => $calculator_name,
            'post_content'  => $calculator_setting_value,
            'post_type'     => 'calculator',
            'post_status'   => 'publish',
        );

        wp_insert_post($calculator_post_value);

        wp_send_json_success([
            'message' => esc_html('Calculator is created successfully.'),
        ]);

        wp_die();
    }

    /**
     * Load calculator settings data
     *
     * @return void
     */
    public function ascode_load_calculator_info_action()
    {
        check_ajax_referer('ascode-calculator-admin-nonce');
        $calculator_list = get_posts([
            'post_type' => 'calculator',
            'posts_per_page' => -1,
        ]);

        $calculator_list_array = [];

        foreach ($calculator_list as $calculator) {
            $calculator_id = $calculator->ID;
            $calculator_shortcode = '[woo-calculator id=' . $calculator_id . ']';
            $calculator_view_data = [
                'id'            => $calculator_id,
                'name'          => '',
                'description'   => '',
                'shortcode'     => ''
            ];
            $calculator_info = maybe_unserialize($calculator->post_content);
            $calculator_info_list = $calculator_info['calculatorInfo'];

            foreach ($calculator_info_list as $calculator_info) {
                $calculator_view_data['name'] = esc_html($calculator_info['calculator']['calculatorName']);
                $calculator_view_data['description'] = esc_html($calculator_info['calculator']['description']);
                $calculator_view_data['shortcode'] = $calculator_shortcode;
            }

            $calculator_list_array[] = $calculator_view_data;
        }

        wp_send_json_success($calculator_list_array);

        wp_die();
    }

    /**
     * Delete calculator
     *
     * @return void
     */
    public function ascode_delete_calculator_action()
    {
        check_ajax_referer('ascode-calculator-admin-nonce');

        $post_id = intval($_POST['calculatorId']);
        wp_delete_post($post_id);

        $calculator_list = get_posts([
            'post_type' => 'calculator',
            'posts_per_page' => -1,
        ]);

        $calculator_list_array = [];

        foreach ($calculator_list as $calculator) {
            $calculator_id = $calculator->ID;
            $calculator_shortcode = '[woo-calculator id=' . $calculator_id . ']';
            $calculator_view_data = [
                'id'            => $calculator_id,
                'name'          => '',
                'description'   => '',
                'shortcode'     => ''
            ];
            $calculator_info = maybe_unserialize($calculator->post_content);
            $calculator_info_list = $calculator_info['calculatorInfo'];

            foreach ($calculator_info_list as $calculator_info) {
                $calculator_view_data['name'] = esc_html($calculator_info['calculator']['calculatorName']);
                $calculator_view_data['description'] = esc_html($calculator_info['calculator']['description']);
                $calculator_view_data['shortcode'] = $calculator_shortcode;
            }

            $calculator_list_array[] = $calculator_view_data;
        }

        wp_send_json_success([
            'data' => $calculator_list_array,
            'message'   => esc_html('Deleted successfully')
        ]);

        wp_die();
    }

    /**
     * Data for edit calculator info
     *
     * @return void
     */
    public function ascode_load_calculator_get_info_action()
    {
        check_ajax_referer('ascode-calculator-admin-nonce');

        $calculator_info = get_post(intval($_POST['id']))->post_content;

        wp_send_json_success(maybe_unserialize($calculator_info)['calculatorInfo'][0]);

        wp_die();
    }

    /**
     * Update calculator function
     *
     * @return void
     */
    public function ascode_update_calculator_info_action()
    {
        $calculator_id = intval($_POST['calculatorInfo'][0]['edit']['calculatorId']);

        wp_update_post([
            'ID' => $calculator_id,
            'post_content' => maybe_serialize($_POST)
        ]);

        wp_send_json_success([
            'message' => esc_html('Calculator updated successfully.'),
        ]);

        wp_die();
    }
}

/**
 * Recursive function to sanitize multidimensional array values.
 *
 * @param array $array The array to sanitize.
 * @return array The sanitized array.
 */
function sanitize_multidimensional_array($array)
{
    $sanitizedArray = array();

    foreach ($array as $key => $value) {
        if (is_array($value)) {
            $sanitizedArray[$key] = sanitize_multidimensional_array($value);
        } else {
            $sanitizedArray[$key] = sanitize_text_field($value);
        }
    }

    return $sanitizedArray;
}
