<!DOCTYPE html>
<html lang="en">
    @stack('before-style')
    @include('includes.admin3.style')
    @stack('after-style')

    <body data-menu-color="light" data-sidebar="default">
        <div id="app-layout">
            @include('includes.admin3.header')
            @include('includes.admin3.sidebar')
            <div class="content-page">
                <div class="content">
                    <div class="container-fluid">
                        <div class="py-3 d-flex align-items-sm-center flex-sm-row flex-column">
                            <div class="flex-grow-1">
                                <h4 class="fs-18 fw-semibold m-0">{{ $subtitle }}</h4>
                            </div>

                            <div class="text-end">
                                <ol class="breadcrumb m-0 py-0">
                                    <li class="breadcrumb-item"><a href="javascript: void(0);">{{ $title }}</a></li>
                                    <li class="breadcrumb-item active">{{ $subtitle }}</li>
                                </ol>
                            </div>
                        </div>
                        @yield(section: 'content')
                    </div>
                </div>
            </div>
        </div>
        @stack('before-script')
        @include('includes.admin3.script')
        @stack('after-script')
    </body>

</html>
