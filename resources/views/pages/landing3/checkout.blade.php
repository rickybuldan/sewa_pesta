@extends('layout.layout_landing_three')
@push('after-style')
    @foreach ($cssFiles as $file)
        <link rel="stylesheet" href="{{ $file }}">
    @endforeach
    <style>
    .single-product {
        width: 320px!important;;
        height: 320px!important;;
        {{-- overflow: hidden; --}}
    }

    .slick-slide img {
        width: 320px !important;
        height: 320px !important;
        object-fit: cover;
    }

    .single-product-img {
        width: 320px;
        height: 320px;
        {{-- overflow: hidden; --}}
    }

    </style>
@endpush

@section('content')
      <!-- ======slider-area-start=========================================== -->
            <div class="slider-area over-hidden pt-100">
                <div class="single-page page-height3 d-flex align-items-center">
                        <div class="container">
                            <div class="row">
                                <div class="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12  d-flex align-items-center justify-content-center">
                                    <div class="page-title pt-65 pb-75 text-center">
                                        <h2 class="text-capitalize theme-color mb-20">Checkout</h2>
                                        <nav aria-label="breadcrumb">
                                            <ol class="breadcrumb justify-content-center bg-transparent">
                                            <li class="breadcrumb-item"><a class="primary-color" href="index.html">Home</a></li>
                                            <li class="breadcrumb-item active text-capitalize" aria-current="page">Checkout</li>
                                            </ol>
                                        </nav>
                                    </div><!-- /page title -->
                                </div><!-- /col -->
                            </div><!-- /row -->
                        </div><!-- /container -->
                    <!-- </div> -->
                </div><!-- /single-slider -->
            </div>
            <!-- slider-area-end=  -->



            <!-- ====== login-area-start================================ -->
            <div class="login-area pb-120">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-8  col-lg-10  col-md-12  col-sm-12 col-12 offset-xl-2 offset-lg-1 px-xl-0">
                            <div class="login-form-area border-light-gray2 pl-90 pr-90 pt-90 pb-95">
                                <h3 class="mb-30 text-center">Login From Here</h3>
                                <form action="#">
                                    <div class="login-form">
                                        <label class="mt-25">Email Address <span class="secondary-color">**</span></label>
                                        <div class="email">
                                            <input type="email" class="form-control rounded-0 border-light-gray2 pl-20" name="email" id="r-email" placeholder="Enter Username or Email address">
                                        </div>
                                        <label class="mt-25">Password <span class="secondary-color">**</span></label>
                                        <div class="password">
                                            <input type="text" class="form-control rounded-0 border-light-gray2 pl-20" name="subject" id="subject" placeholder="Enter password">
                                        </div>
                                        <div class="forget-pass d-sm-flex align-items-center justify-content-between pt-20 pb-20">
                                            <div class="save-info d-flex mb-15">
                                                <input class="p-0 mr-2" type="checkbox" aria-label="Checkbox for following text input">
                                                <p class="mb-0"> Remember me! </p>
                                            </div>
                                            <p class="mb-15"><a class="secondary-color" href="#">Lost your password? </a></p>
                                        </div>
                                    </div><!-- /login-form -->
                                    <a href="#" class="sub-btn d-inline-block text-center text-white theme-bg transition text-uppercase width100">Login now</a>
                                    <div class="or text-center mt-30 mb-30">
                                        <span class="d-block position-relative">or</span>
                                    </div>
                                    <a href="#" class="sub-btn d-inline-block text-center text-white theme-bg transition text-uppercase width100">register now</a>
                                </form>
                            </div>
                        </div>
                    </div><!-- /row -->
                </div><!-- /container -->
            </div>
            <!-- login-area-end  -->
@endsection


@push('after-script')
    <script>
        @foreach ($varJs as $varjsi)
            {!! $varjsi !!}
        @endforeach
    </script>


    @foreach ($javascriptFiles as $file)
        <script src="{{ $file }}"></script>
    @endforeach
    <script src="{{ asset('template/admin2/assets/js/owlcarousel/owl.carousel.js') }}"></script>
@endpush
