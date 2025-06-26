<!DOCTYPE html>
<html lang="en">
    @stack('before-style')
    @include('includes.admin3.login.style')
    @stack('after-style')
    <body>
        <!-- Begin page -->
        <div class="account-page">
            <div class="container-fluid p-0">
                @yield('content')
            </div>
        </div>
        @stack('before-script')
        @include('includes.admin3.login.script')
        @stack('after-script')
    </body>

</html>