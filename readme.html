<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laravel-Inertia-React Boilerplate Documentation</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 20px;
        }

        h1,
        h2,
        h3 {
            color: #333;
        }

        textarea {
            width: 100%;
            height: 150px;
            margin: 10px 0;
            padding: 10px;
            font-family: monospace;
            font-size: 14px;
        }

        button {
            margin-bottom: 20px;
        }
    </style>
</head>

<body>

    <div class="container">
        <h1 class="my-4">Laravel-Inertia-React Boilerplate Documentation</h1>

        <h2>Project Setup</h2>
        <p>Follow these steps to set up the boilerplate for your Shopify app (embedded and non-embedded).</p>

        <h3>1. Clone the Project</h3>
        <p>First, clone the repository to your local machine:</p>
        <textarea disabled>
git clone <repository-url>
    </textarea>
        <button onclick="copyText(this)">Copy</button>
        <textarea disabled>
cd <project-directory></textarea>
        <button onclick="copyText(this)">Copy</button>

        <h3>2. Database Configuration</h3>
        <p>- <strong>Database Type</strong>: MySQL</p>
        <p>- Configure your <code>.env</code> file with your database credentials:</p>
        <textarea disabled>
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_username
DB_PASSWORD=your_password
    </textarea>
        <button onclick="copyText(this)">Copy</button>

        <h3>3. Install Composer Dependencies</h3>
        <p>Next, install the PHP dependencies using Composer:</p>
        <textarea disabled>
composer install
    </textarea>
        <button onclick="copyText(this)">Copy</button>

        <h3>4. Install NPM Packages</h3>
        <p>After that, install the JavaScript dependencies with NPM:</p>
        <textarea disabled>
npm install
    </textarea>
        <button onclick="copyText(this)">Copy</button>

        <h3>5. Run Database Migrations</h3>
        <p>Set up your database by running the migrations:</p>
        <textarea disabled>
php artisan migrate
    </textarea>
        <button onclick="copyText(this)">Copy</button>

        <h3>6. Queue Configuration</h3>
        <p>By default, this project uses a database queue connection. If you're using Cloudways, you should change the
            queue connection to Redis:</p>
        <ol>
            <li>Update your <code>.env</code> file:</li>
            <textarea disabled>
QUEUE_CONNECTION=redis
        </textarea>
            <button onclick="copyText(this)">Copy</button>

            <li>In the <code>config/queue.php</code> file, ensure your settings look like this:</li>
            <textarea disabled>
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

],
        </textarea>
            <button onclick="copyText(this)">Copy</button>
        </ol>

        <h3>7. Shopify App Credentials</h3>
        <p>Add your Shopify app credentials to the <code>.env</code> file:</p>
        <textarea disabled>
SHOPIFY_API_VERSION="2024-10"
SHOPIFY_APP_NAME="${APP_NAME}"
SHOPIFY_API_KEY=<your_api_key>
SHOPIFY_API_SECRET=<your_api_secret>
SHOPIFY_APPBRIDGE_ENABLED=1  # Set to 1 if your app is embedded; set to 0 if your app is non-embedded
SHOPIFY_BILLING_ENABLED=0
SHOPIFY_API_SCOPES=<the_scopes_you_required_to_access_by_your_app>
    </textarea>
        <button onclick="copyText(this)">Copy</button>

        <h3>8. Session Settings for Embedded Apps</h3>
        <p>For embedded apps, add the following session settings to your <code>.env</code> file to preserve logged-in
            user details:</p>
        <textarea disabled>
SESSION_SECURE_COOKIE=true
SESSION_SAME_SITE='None'
    </textarea>
        <button onclick="copyText(this)">Copy</button>

        <h3>9. Routes Setup</h3>
        <p>To set up the routes for your application:</p>
        <ol>
            <li>If your app is embedded, copy the code from <code>routes/embedded_example_web.php</code> to
                <code>routes/web.php</code>.
            </li>
            <li>If your app is non-embedded, copy the code from <code>routes/non_embedded_example_web.php</code> to
                <code>routes/web.php</code>.
            </li>
        </ol>

        <h3>10. Additional Steps for Shopify Integration</h3>
        <p>In your Shopify app configuration:</p>
        <ol>
            <li>Add the <strong>App URL</strong>:</li>
            <textarea disabled>
https://your_app_url.com
        </textarea>
            <button onclick="copyText(this)">Copy</button>

            <li>In the <strong>Allowed redirection URL(s)</strong>, add:</li>
            <textarea disabled>
https://your_app_url.com/authenticate
        </textarea>
            <button onclick="copyText(this)">Copy</button>

            <li>Check <strong>Embedded App</strong> as <code>true</code> for embedded apps and <code>false</code> for
                non-embedded apps.</li>
            <li>Save the changes.</li>
        </ol>

        <h3>11. React Code Integration</h3>
        <p>In your React components, if your app is embedded, make sure to import the necessary hook from Inertia:</p>
        <textarea disabled>
import { usePage } from '@inertiajs/react';
    </textarea>
        <button onclick="copyText(this)">Copy</button>

        <p>You can then extract the query parameters like this:</p>
        <textarea disabled>
const page = usePage().props;
const { query } = page.ziggy;
    </textarea>
        <button onclick="copyText(this)">Copy</button>

        <p>Use the extracted query with every route you call in your app. For example:</p>
        <textarea disabled>
<Link href={route('dashboard', query)}>
    Dashboard
</Link>
    </textarea>
        <button onclick="copyText(this)">Copy</button>

        <p><strong>Note</strong>: For non-embedded apps, there is no need for this integration.</p>

        <h3>12. Running the Application</h3>
        <p>To start the development server, run:</p>
        <textarea disabled>
php artisan serve
    </textarea>
        <button onclick="copyText(this)">Copy</button>

        <p>Then, in a separate terminal, run:</p>
        <textarea disabled>
npm run dev
    </textarea>
        <button onclick="copyText(this)">Copy</button>

        <h3>13. Accessing the Application</h3>
        <p>You can access your application at:</p>
        <textarea disabled>
http://localhost:8000
    </textarea>
        <button onclick="copyText(this)">Copy</button>

        <h3>Notes</h3>
        <ul>
            <li>Ensure your local development environment meets the requirements for Laravel and Node.js.</li>
            <li>Regularly check for updates in both Laravel and the dependencies used in your project.</li>
            <li>Monitor your queues using Laravel's built-in tools or by querying the database directly.</li>
        </ul>
    </div>

    <script>
        function copyText(button) {
            const textarea = button.previousElementSibling;
            textarea.removeAttribute('disabled');
            textarea.select();
            document.execCommand('copy');
            textarea.setAttribute('disabled', 'true');
            alert('Copied to clipboard!');
        }
    </script>

</body>

</html>
