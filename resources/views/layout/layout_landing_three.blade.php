<!DOCTYPE html>
<html class="no-js" lang="en">
    @stack('before-style')
    @include('includes.layout_frontend_two.style')
    @stack('after-style')

    <body>
        @include('includes.layout_frontend_two.header')
        <main class="main">
            @yield(section: 'content')
        </main>
        @include('includes.layout_frontend_two.footer')
        
        @stack('before-script')
        @include('includes.layout_frontend_two.script')
        @stack('after-script')
    </body>

</html>
