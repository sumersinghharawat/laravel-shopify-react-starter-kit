<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ \Osiset\ShopifyApp\Util::getShopifyConfig('app_name') }}</title>
    @yield('styles')
</head>

<body>
    <div class="app-wrapper">
        <div class="app-content">
            <main role="main">
                @yield('content')
            </main>
        </div>
    </div>

    @if (\Osiset\ShopifyApp\Util::getShopifyConfig('appbridge_enabled') && \Osiset\ShopifyApp\Util::useNativeAppBridge())
        <script
            src="{{ config('shopify-app.appbridge_cdn_url') ?? 'https://unpkg.com' }}/@shopify/app-bridge{{ \Osiset\ShopifyApp\Util::getShopifyConfig('appbridge_version') ? '@' . config('shopify-app.appbridge_version') : '' }}">
        </script>
        <script
        @if (\Osiset\ShopifyApp\Util::getShopifyConfig('turbo_enabled')) data-turbolinks-eval="false" @endif>
            var AppBridge = window['app-bridge'];
            var actions = AppBridge.actions;
            var utils = AppBridge.utilities;
            var createApp = AppBridge.default;
            var AppLink = AppBridge.actions.AppLink;
            var NavigationMenu = AppBridge.actions.NavigationMenu;



            var app = createApp({
                apiKey: "{{ \Osiset\ShopifyApp\Util::getShopifyConfig('api_key', $shopDomain ?? Auth::user()->name) }}",
                host: "{{ \Request::get('host') }}",
                forceRedirect: true,
            });


            // const indexLink = AppLink.create(app, {
            //     label: 'Dashboard',
            //     destination: '/',
            // });

            // const dashboardLink = AppLink.create(app, {
            //     label: 'Dashboard',
            //     destination: '/vendor/dashboard',
            // });


            const productsLink = AppLink.create(app, {
                label: 'Products',
                destination: '/vendor/products',
            });

            const settingsLink = AppLink.create(app, {
                label: 'Settings',
                destination: '/settings',
            });

            const navigationMenu = NavigationMenu.create(app, {
                items: [productsLink, settingsLink],
            });

            const {
                fetch: originalFetch
            } = window;

            window.fetch = async (...args) => {
                let [resource, config] = args;
                // request interceptor here
                let token = await utils.getSessionToken(app);
                config = {
                    ...config,
                    headers: {
                        ...config?.headers,
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
                const response = await originalFetch(resource, config);
                // response interceptor here
                return response;
            };
        </script>

        @include('shopify-app::partials.token_handler')
        @include('shopify-app::partials.flash_messages')
    @endif

    @yield('scripts')
</body>

</html>
