<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', '');

/** MySQL database username */
define('DB_USER', '');

/** MySQL database password */
define('DB_PASSWORD', '');

/** MySQL hostname */
define('DB_HOST', '');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');


/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '=I6v]Vig9B,)P_{3.Ptix3BC)<.A,%zl`kr8_$[VOq.,-+F/t@pk-d?$c3x0 #)_');
define('SECURE_AUTH_KEY',  'y$/^L*8~OQ<2lp9RZA3-%A[]b~-YalEt1*KgTeT]Vvyv*Wg-1#+7!g#<ps|_UI2*');
define('LOGGED_IN_KEY',    '/&$>A*K<vp`Ni)REG/!||5%=]alG 5T]El/a)]fPmhPa6.xD%fN&pPH/AMQ.Z(8>');
define('NONCE_KEY',        'UqdX2D/|[g~H2F%5jK+}9 |OW`,ZD:hI?r(-lJ-:vg:)4Dy[BBk@z5W!QYmc0b>n');
define('AUTH_SALT',        '5-D=yZEz}frG@jNk+@4HWeX+`-._]u;a>WNJ}PXgW>`GM@4KS2NVQDESw(VSE)xG');
define('SECURE_AUTH_SALT', '4d&$&9[jxtT]F+DT9tRj&4st[w]o1_ENYoHhU]#nGt3GGq=mqw&vvsQK;1tv^Is@');
define('LOGGED_IN_SALT',   '>y,Ea$u 4#>vdH|P/jha-Lqy);R-2cO #-KN M-Nx#u]-OCoTa*}/QlyO_4C.}S+');
define('NONCE_SALT',       'X#`3&gI+|}(?rv+JD>^#Xgq*TY%_MSC8s`yLcm/f@mWRx]Rfd!7YP=B[4,A:s/Q+');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', 'en_US');

define('WP_CONTENT_DIR', __DIR__ . '/content');
define('WP_CONTENT_URL', '/content');

define('WP_POST_REVISIONS', 10);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') ) {
  define('ABSPATH', dirname(__FILE__) . '/');
}

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', true);

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
