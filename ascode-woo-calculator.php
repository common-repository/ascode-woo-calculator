<?php

/** 
 * Plugin Name:       AsCode Woo Load Calculator
 * Plugin URI:        https://osmanhaideradnan.wordpress.com/
 * Description:       A plugin for building and displaying a load calculator for eletronics products.
 * Version:           1.1.7
 * Requires at least: 5.2
 * Requires PHP:      7.4
 * Author:            Osman Haider Adnan
 * Author URI:        https://osmanhaideradnan.wordpress.com/
 * Text Domain:       ascode-woo-calculator
 * Domain Path:       /languages
 * Requires Plugins: woocommerce
 * @package     AsCode Woo Calculator
 * @author      Adnan <osmanhaider159@gmail.com>
 * @copyright   Copyright (C) 2023 Osman Haider Adnan. All rights reserved.
 * @license     GPLv3 or later
 * @since       1.0.0
 */

// Ensure the file is not accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

// Check if the Composer autoload file exists, and if not, show an error message.
if (!file_exists(__DIR__ . '/vendor/autoload.php')) {
    die('Please run `composer install` in the main plugin directory.');
}

require_once __DIR__ . '/vendor/autoload.php';

/**
 * Plugin main class
 */
final class AsCode_Woo_Calculator
{

    /**
     * Define plugin version
     * 
     * @var string
     */
    const version = '1.0.0';

    // Private constructor to enforce singleton pattern.
    private function __construct()
    {
        $this->define_constants();

        // Register activation hook.
        register_activation_hook(__FILE__, [$this, 'activate']);

        // Hook into the 'plugins_loaded' action to initialize the plugin.
        add_action('plugins_loaded', [$this, 'init_plugin']);
    }

    /**
     * Singleton instance
     *
     * @return AsCode_Woo_Calculator
     */
    public static function init()
    {
        static $instance = false;

        if (!$instance) {
            $instance = new self();
        }

        return $instance;
    }

    /**
     * Define constants for the plugin.
     *
     * @return void
     */
    function define_constants()
    {
        define('ASCODE_WOO_CALCULATOR_VERSION', self::version);
        define('ASCODE_WOO_CALCULATOR_FILE', __FILE__);
        define('ASCODE_WOO_CALCULATOR_DIR_PATH', plugin_dir_path(ASCODE_WOO_CALCULATOR_FILE));
        define('ASCODE_WOO_CALCULATOR_URL', plugin_dir_url(ASCODE_WOO_CALCULATOR_FILE));
        define('ASC_WOO_CALCULATOR_ASSETS', ASCODE_WOO_CALCULATOR_URL . 'assets');
    }

    /**
     * Do stuff upon plugin activation
     *
     * @return void
     */
    function activate()
    {
        // Set an option to store the installation time.
        $installed = get_option('ascode_installed_time');

        if (!$installed) {
            update_option('ascode_installed_time', time());
        }
    }

    /**
     * Initialize the plugin
     *
     * @return void
     */
    public function init_plugin()
    {
        if (is_admin()) {
            new AsCode\WooCalculator\Admin();
        }

        new AsCode\WooCalculator\Front();
    }
}

/**
 * Initialize the main plugin.
 *
 * @return AsCode_Woo_Calculator
 */
function ascode_woo_calculator()
{
    return AsCode_Woo_Calculator::init();
}

// Kick-off the plugin.
ascode_woo_calculator();
