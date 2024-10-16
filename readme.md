## Tech Stack

![Laravel Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Laravel_logo.svg/800px-Laravel_logo.svg.png)
![Shopify Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Shopify_logo_2018.svg/1024px-Shopify_logo_2018.svg.png)
![React Logo](https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg)

# Laravel-Inertia-React Boilerplate Documentation

## Project Setup

Follow these steps to set up the boilerplate for your Shopify app (embedded and non-embedded).

## 1. Clone the Project

First, clone the repository to your local machine:

```bash
git clone https://github.com/Haseeb9229/laravel-shopify-react-starter-kit.git
cd laravel-shopify-react-starter-kit
```

## 2. Database Configuration

Database Type: MySQL

Configure your .env file with your database credentials:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

## 3. Install Composer Dependencies

Next, install the PHP dependencies using Composer:

```bash
composer install
```

## 4. Install NPM Packages

After that, install the JavaScript dependencies with NPM:

```bash
npm install
```

## 5. Run Database Migrations

Set up your database by running the migrations:

```bash
php artisan migrate
```

## 6. Queue Configuration

By default, this project uses a database queue connection. If you're using Cloudways, you should change the queue connection to Redis:

1. Update your .env file:

```env
QUEUE_CONNECTION=redis
```

2. In the config/queue.php file, ensure your settings look like this:

```php
'connections' => [
    'redis' => [
        'driver' => 'database',
        'connection' => env('DB_QUEUE_CONNECTION'),
        'table' => env('DB_QUEUE_TABLE', 'jobs'),
        'queue' => env('DB_QUEUE', 'default'),
        'retry_after' => (int) env('DB_QUEUE_RETRY_AFTER', 90),
        'after_commit' => false,
    ],

    'database' => [
        'driver' => 'redis',
        'connection' => env('REDIS_QUEUE_CONNECTION', 'default'),
        'queue' => env('REDIS_QUEUE', 'default'),
        'retry_after' => (int) env('REDIS_QUEUE_RETRY_AFTER', 90),
        'block_for' => null,
        'after_commit' => false,
    ],
]
```

## 7. Shopify App Credentials

Add your Shopify app credentials to the .env file:

```env
SHOPIFY_API_VERSION="2024-10"
SHOPIFY_APP_NAME="${APP_NAME}"
SHOPIFY_API_KEY=<your_api_key>
SHOPIFY_API_SECRET=<your_api_secret>
SHOPIFY_APPBRIDGE_ENABLED=1  # Set to 1 if your app is embedded; set to 0 if your app is non-embedded
SHOPIFY_BILLING_ENABLED=0
SHOPIFY_API_SCOPES=<the_scopes_you_required_to_access_by_your_app>
```

## 8. Session Settings for Embedded Apps

For embedded apps, add the following session settings to your .env file to preserve logged-in user details:

```env
SESSION_SECURE_COOKIE=true
SESSION_SAME_SITE='None'
```

## 9. Routes Setup

To set up the routes for your application:

1. If your app is embedded, copy the code from routes/embedded_example_web.php to routes/web.php.
    
2. If your app is non-embedded, copy the code from routes/non_embedded_example_web.php to routes/web.php.

## 10. Additional Steps for Shopify Integration

In your Shopify app configuration:

1. Add the App URL:

```text
https://your_app_url.com
```

2. In the Allowed redirection URL(s), add:

```text
https://your_app_url.com/authenticate
```

3. Check Embedded App as true for embedded apps and false for non-embedded apps.
4. Save the changes.

## 11. React Code Integration

In your React components, if your app is embedded, make sure to import the necessary hook from Inertia:

```javascript
import { usePage } from '@inertiajs/react';
```

You can then extract the query parameters like this:

```javascript
const page = usePage().props;
const { query } = page.ziggy;
```

Use the extracted query with every route you call in your app. For example:

```javascript
<Link href={route('dashboard', query)}>
    Dashboard
</Link>
```

# Note: For non-embedded apps, there is no need for this integration.

## 12. Running the Application

To start the development server, run:

```bash
php artisan serve
```

Then, in a separate terminal, run:

```bash
npm run dev
```

## 13. Accessing the Application

You can access your application at:

```bash
http://localhost:8000
```

# Notes

1. Ensure your local development environment meets the requirements for Laravel and Node.js.
2. Regularly check for updates in both Laravel and the dependencies used in your project.
3. Monitor your queues using Laravel's built-in tools or by querying the database directly.
