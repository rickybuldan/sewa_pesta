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
    <div class="slider-area over-hidden">
        <div class="slider-active">
            <div class="single-slider slider-height d-flex align-items-center"
                data-background="{{ asset('/template/frontend2/images/banner1.png') }}">
                <div class="container">
                    <div class="row">
                        <div
                            class="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12  d-flex align-items-center justify-content-center">
                            <div class="slider-content text-center">
                                {{-- <span data-animation="slideInUp" data-delay=".7s" class="d-block">Get 20% Off All Products
                                    In Store</span>
                                <h1 data-animation="fadeInUp" data-delay="1s" class="pt-2 reveal-text">Flamingo Decor 2018
                                </h1>
                                <a data-animation="fadeInUp" data-delay="1.7s" href="#"
                                    class="slider-btn d-inline-block mt-80 text-uppercase theme-color">Discover Now</a> --}}
                            </div>
                        </div><!-- /col -->
                    </div><!-- /row -->
                </div><!-- /container -->
            </div><!-- /single-slider -->
            <div class="single-slider slider-height d-flex align-items-center"
                data-background="/{{ asset('/template/frontend2/images/banner2.png') }}">
                <div class="container">
                    <div class="row">
                        <div
                            class="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12  d-flex align-items-center justify-content-center">
                            {{-- <div class="slider-content text-center">
                                <span data-animation="fadeInUp" data-delay=".7s" class="d-block">Get 60% Off All Products In
                                    Store</span>
                                <h1 data-animation="fadeInUp" data-delay="1s" class="pt-2">A Beautiful Design.</h1>
                                <a data-animation="fadeInUp" data-delay="1.8s" href="#"
                                    class="slider-btn d-inline-block mt-80 text-uppercase theme-color">Discover Now</a>
                            </div> --}}
                        </div><!-- /col -->
                    </div><!-- /row -->
                </div><!-- /container -->
            </div><!-- /single-slider -->
            {{-- <div class="single-slider slider-height d-flex align-items-center"
                data-background="images/slider/homess_slide_3.jpg">
                <div class="container">
                    <div class="row">
                        <div
                            class="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12  d-flex align-items-center justify-content-center">
                            <div class="slider-content text-center">
                                <span data-animation="fadeInUp" data-delay=".7s" class="d-block">Get 60% Off All Products In
                                    Store</span>
                                <h1 data-animation="fadeInUp" data-delay="1s" data-animate-duration="5s" class="pt-2">
                                    Perfect Work Space</h1>
                                <a data-animation="fadeInUp" data-delay="1.7s" href="#"
                                    class="slider-btn d-inline-block mt-80 text-uppercase theme-color">Discover Now</a>
                            </div>
                        </div><!-- /col -->
                    </div><!-- /row -->
                </div><!-- /container -->
            </div><!-- /single-slider --> --}}
        </div><!-- /slider-active -->
    </div>
    <!-- slider-area-end=  -->

    <!-- ====== service feature-area-start=========================================== -->
    <div class="service-feature-area">
        <div class="container-wrapper extra-padding-15 pt-95">
            <div class="row pb-65">
                <div class="col-xl-4  col-lg-4  col-md-4  col-sm-12 col-12">
                    <div class="single-service-feature text-center mb-30">
                        <div class="ser-feature-icon text-center mb-10">
                            <span class="primary-color text-center d-block"><i
                                    class="ser-f-icon flaticon-worldwide"></i></span>
                        </div>
                        <h4 class="py-1">Sewa Alat Pesta Terlengkap</h4>
                        <p>Duis autem vel eum iriure dolor in hendrerit vulputate velit esse molestie consequat.</p>
                    </div>
                </div><!-- /col -->
                <div class="col-xl-4  col-lg-4  col-md-4  col-sm-12 col-12">
                    <div class="single-service-feature text-center mb-30">
                        <div class="ser-feature-icon text-center mb-10">
                            <span class="primary-color text-center d-block"><i
                                    class="ser-f-icon flaticon-24-hours-support"></i></span>
                        </div>
                        <h4 class="py-1">Dukungan Online 24/7</h4>
                        <p>Duis autem vel eum iriure dolor in hendrerit vulputate velit esse molestie consequat.</p>
                    </div>
                </div><!-- /col -->
                <div class="col-xl-4  col-lg-4  col-md-4  col-sm-12 col-12">
                    <div class="single-service-feature text-center">
                        <div class="ser-feature-icon text-center mb-10">
                            <span class="primary-color text-center d-block"><i
                                    class="ser-f-icon flaticon-recommend"></i></span>
                        </div>
                        <h4 class="py-1">Kualitas Terjamin</h4>
                        <p>Duis autem vel eum iriure dolor in hendrerit vulputate velit esse molestie consequat.</p>
                    </div>
                </div><!-- /col -->
            </div><!-- /row -->
            <div class="bottom-line"></div>
        </div><!-- /container -->
    </div>
    <!-- service feature-area-end -->

    <!-- ====== product-tabs-area-start================================ -->
    <div class="product-tabs-area product-area pt-95">
        <div class="container-wrapper extra-padding-15">
            <div class="row">
                <div class="col-xl-6  col-lg-6  col-md-10  col-sm-12 col-12 offset-xl-3 offset-lg-3 offset-md-1">
                    <div class="section-title text-center">
                        <h2 class="pb-20">#Sewa Alat Pesta Terlengkap 2025</h2>
                        <p>Nam liber tempor cum soluta nobis eleifend option congue nihil. Doming id quod mazim placerat
                            facer possim assum. Typi non habent claritatem insitam.</p>
                    </div><!-- /section-title -->
                </div><!-- /col -->
            </div><!-- /row -->
            <div class="product-content single-product-tab-content  mt-70 pb-105">
                <ul class="single-product-tab nav" id="myTab" role="tablist">
                    <li class="nav-item mb-15">
                        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab"
                            aria-controls="home" aria-selected="true">
                            <span>Products</span><sup class="ml-1 total-products">0</sup>
                        </a>
                    </li>
                    {{-- <li class="nav-item mb-15">
                        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab"
                            aria-controls="profile" aria-selected="false">
                            <span>Tables</span><sup class="ml-1">17</sup>
                        </a>
                    </li>
                    <li class="nav-item mb-15">
                        <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab"
                            aria-controls="contact" aria-selected="false">
                            <span> Lightings</span><sup class="ml-1">20</sup>
                        </a>
                    </li>
                    <li class="nav-item mb-15">
                        <a class="nav-link" id="setting-tab" data-toggle="tab" href="#setting" role="tab"
                            aria-controls="setting" aria-selected="false">
                            <span>Decor</span><sup class="ml-1">19</sup>
                        </a>
                    </li>
                    <li class="nav-item mb-15">
                        <a class="nav-link" id="message-tab" data-toggle="tab" href="#message" role="tab"
                            aria-controls="message" aria-selected="false">
                            <span>Accessories</span><sup class="ml-1">19</sup>
                        </a>
                    </li> --}}
                </ul>
                <div class="tab-content mt-25" id="myTabContent">
                    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <div class="row product-active product-new-added mlr--20">
                            
                            <!-- /col -->
                            
                        </div><!-- /row -->
                    </div>
                
                </div>
                {{-- <div class="row mt-55">
                    <div class="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12 d-flex justify-content-center">
                        <a class="more-view-btn d-inline-block border-light-gray2 white-bg theme-color text-capitalize"
                            href="shop.html">view more products</a>
                    </div><!-- /col -->
                </div><!-- /row --> --}}
            </div><!-- /product-content -->
            <div class="bottom-line"></div>
        </div><!-- /container -->
    </div>
    <!-- product-area-end  -->

    <!-- ====== blog-area-start=============================================== -->
    {{-- <div class="blog-area mt-100">
        <div class="container-wrapper extra-padding-10">
            <div class="row">
                <div class="col-xl-6  col-lg-6  col-md-10  col-sm-12 col-12 offset-xl-3 offset-lg-3 offset-md-1">
                    <div class="section-title text-center">
                        <h2 class="pb-20">From Our Blog </h2>
                        <p>Eget ac donec odio pharetra pulvinar elit luctus sit morbi placerat justo odio aliquam, urna at
                            augue hac tellus egestas.</p>
                    </div><!-- /section-title -->
                </div><!-- /col -->
            </div><!-- /row -->
            <div class="row mt-40 blog-post-active pb-80">
                <div class="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12 pl-20 pr-20">
                    <div class="single-blog">
                        <div class="blog-img">
                            <a href="blog-details.html"><img src="images/blog/blog1.jpg" alt=""></a>
                        </div>
                        <div class="single-blog-content mt-20">
                            <ul class="single-blog-info d-flex mb-1">
                                <li class="admin mr-1">
                                    <span>By</span>
                                    <span><a href="#" class="secondary-color">Admin</a></span>
                                </li>
                                <li><span>/</span></li>
                                <li class="date ml-1">
                                    <span>May</span>
                                    <span>23,</span>
                                    <span>2018</span>
                                </li>
                            </ul>
                            <h4><a href="blog-details.html">Outsmart Today’s Downpour With These 14 Rainy Day</a></h4>
                            <p class="pt-2">Diga, Koma and Torus are three kitchen utensils designed for Ommo, a new
                                design-oriented brand introduced at the Ambiente show in February 2016. Minimalist
                                approach,…</p>
                        </div>
                    </div>
                </div><!-- /col -->
                <div class="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12 pl-20 pr-20">
                    <div class="single-blog">
                        <div class="blog-img">
                            <a href="blog-details.html"><img src="images/blog/blog2.jpg" alt=""></a>
                        </div>
                        <div class="single-blog-content mt-20">
                            <ul class="single-blog-info d-flex mb-1">
                                <li class="admin mr-1">
                                    <span>By</span>
                                    <span><a href="#" class="secondary-color">Admin</a></span>
                                </li>
                                <li><span>/</span></li>
                                <li class="date ml-1">
                                    <span>May</span>
                                    <span>23,</span>
                                    <span>2018</span>
                                </li>
                            </ul>
                            <h4><a href="blog-details.html">Outsmart Today’s Downpour With These 14 Rainy Day</a></h4>
                            <p class="pt-2">Diga, Koma and Torus are three kitchen utensils designed for Ommo, a new
                                design-oriented brand introduced at the Ambiente show in February 2016. Minimalist
                                approach,…</p>
                        </div>
                    </div>
                </div><!-- /col -->
                <div class="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12 pl-20 pr-20">
                    <div class="single-blog">
                        <div class="blog-img">
                            <a href="blog-details.html"><img src="images/blog/blog3.jpg" alt=""></a>
                        </div>
                        <div class="single-blog-content mt-20">
                            <ul class="single-blog-info d-flex mb-1">
                                <li class="admin mr-1">
                                    <span>By</span>
                                    <span><a href="#" class="secondary-color">Admin</a></span>
                                </li>
                                <li><span>/</span></li>
                                <li class="date ml-1">
                                    <span>May</span>
                                    <span>23,</span>
                                    <span>2018</span>
                                </li>
                            </ul>
                            <h4><a href="blog-details.html">Outsmart Today’s Downpour With These 14 Rainy Day</a></h4>
                            <p class="pt-2">Diga, Koma and Torus are three kitchen utensils designed for Ommo, a new
                                design-oriented brand introduced at the Ambiente show in February 2016. Minimalist
                                approach,…</p>
                        </div>
                    </div>
                </div><!-- /col -->
                <div class="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12 pl-20 pr-20">
                    <div class="single-blog">
                        <div class="blog-img">
                            <a href="blog-details.html"><img src="images/blog/blog4.jpg" alt=""></a>
                        </div>
                        <div class="single-blog-content mt-20">
                            <ul class="single-blog-info d-flex mb-1">
                                <li class="admin mr-1">
                                    <span>By</span>
                                    <span><a href="#" class="secondary-color">Admin</a></span>
                                </li>
                                <li><span>/</span></li>
                                <li class="date ml-1">
                                    <span>May</span>
                                    <span>23,</span>
                                    <span>2018</span>
                                </li>
                            </ul>
                            <h4><a href="blog-details.html">Outsmart Today’s Downpour With These 14 Rainy Day</a></h4>
                            <p class="pt-2">Diga, Koma and Torus are three kitchen utensils designed for Ommo, a new
                                design-oriented brand introduced at the Ambiente show in February 2016. Minimalist
                                approach,…</p>
                        </div>
                    </div>
                </div><!-- /col -->
                <div class="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12 pl-20 pr-20">
                    <div class="single-blog">
                        <div class="blog-img">
                            <a href="blog-details.html"><img src="images/blog/blog5.jpg" alt=""></a>
                        </div>
                        <div class="single-blog-content mt-20">
                            <ul class="single-blog-info d-flex mb-1">
                                <li class="admin mr-1">
                                    <span>By</span>
                                    <span><a href="#" class="secondary-color">Admin</a></span>
                                </li>
                                <li><span>/</span></li>
                                <li class="date ml-1">
                                    <span>May</span>
                                    <span>23,</span>
                                    <span>2018</span>
                                </li>
                            </ul>
                            <h4><a href="blog-details.html">Outsmart Today’s Downpour With These 14 Rainy Day</a></h4>
                            <p class="pt-2">Diga, Koma and Torus are three kitchen utensils designed for Ommo, a new
                                design-oriented brand introduced at the Ambiente show in February 2016. Minimalist
                                approach,…</p>
                        </div>
                    </div>
                </div><!-- /col -->
            </div><!-- /row -->
            <div class="bottom-line"></div>
        </div><!-- /container -->
    </div> --}}
    <!-- blog-area-end -->

    <!-- ====== subscribe-area-start ========================================= -->
    
    <div class="subscribe-area mt-100 mb-100">
        <div class="container">
            <div class="row">
                <div class="col-xl-8  col-lg-10  col-md-12  col-sm-12 col-12 offset-xl-2 offset-lg-1">
                    <div class="section-title text-center pl-50 pr-50">
                        <h2 class="pb-20">Booking Now! </h2>
                        <p>Sewa alat pesta terbaik hanya untuk anda.</p>
                    </div><!-- /section-title -->
                </div><!-- /col -->
            </div><!-- /row -->
            <div class="row d-none">
                <div class="col-xl-10  col-lg-12  col-md-12  col-sm-12 col-12 offset-xl-1">
                    <div class="subscribe-form text-center mt-0 pl-90 pr-90">
                        <form action="#">
                            {{-- <input class="sub-name form-control text-center" type="text" name="-name"
                                id="name" placeholder="Subscribe to our newsletter..."> --}}
                            <a href="/login"
                                class="sub-btn d-inline-block text-white theme-bg border-0">Login/Register</a>
                        </form>
                    </div>
                </div><!-- /col -->
            </div>
            <!-- /row -->
        </div><!-- /container -->
    </div>
    <!-- subscribe-area-end  -->
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
