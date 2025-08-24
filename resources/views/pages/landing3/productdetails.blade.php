@extends('layout.layout_landing_three')
@push('after-style')
    @foreach ($cssFiles as $file)
        <link rel="stylesheet" href="{{ $file }}">
    @endforeach
    <style>
        .single-product {
            width: 320px !important;
            ;
            height: 320px !important;
            ;
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
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/themes/material_blue.css">
@endpush

@section('content')
    <!-- ======slider-area-start=========================================== -->
    <div class="slider-area over-hidden pt-100">
        <div class="single-page page-height3 d-flex align-items-center">
            <div class="container">
                <div class="row">
                    <div
                        class="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12  d-flex align-items-center justify-content-center">
                        <div class="page-title pt-65 pb-75 text-center">
                            <h2 class="text-capitalize theme-color mb-20">Product Details</h2>
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb justify-content-center bg-transparent">
                                    <li class="breadcrumb-item"><a class="primary-color" href="/home">Home</a></li>
                                    <li class="breadcrumb-item active text-capitalize" aria-current="page">Product Details
                                    </li>
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


    <div class="shop-single-page-area over-hidden">
        <div class="container-wrapper extra-padding-15">
            <div class="p-view-position">
                <div class="row">
                    <div class="col-xl-6  col-lg-6  col-md-12  col-sm-12 col-12 mt-10">
                        <div class="product-left-img-tab d-flex">

                            <div class="tab-content width100 thamb-lt-content text-center position-relative pt-10"
                                id="v-pills-tabContent1">
                                <div class="tab-pane fade show active" id="v-pills-home1" role="tabpanel"
                                    aria-labelledby="v-pills-home-tab1">
                                    <div class="product-gallery-btn position-absolute right-site mt-2">
                                        <a href="images/product/p-tab-large-img6.jpg"
                                            class="zoom-gallery dark-black-color bg-white d-inline-block"
                                            data-fancybox="images"><i class="fas fa-search"></i>
                                            <img class="width100 d-none details-img"
                                                src="images/product/p-tab-large-img6.jpg" alt=""></a>
                                    </div><!-- /product-gallery-btn -->
                                    <div class="product-img">
                                        <img class="width100 height100 details-img mb-50"
                                            src="images/product/p-tab-large-img6.jpg" alt="">
                                    </div><!-- /product-img -->
                                </div>

                            </div><!-- /tab-content -->
                        </div><!-- /product-left-img-tab -->
                    </div><!-- /col -->
                    <div class="col-xl-6  col-lg-6  col-md-12  col-sm-12 col-12">
                        <div class="product-view-info mt-20">
                            <div class="product-left-img-info">
                                <div class="single-product-tag ">
                                    <a href="#" class="primary-color mr-1">Product</a>
                                    {{-- <a href="product-details.html" class="primary-color">Flowerpots</a> --}}
                                </div>
                                <h3 class="details-name">Product Name</h3>
                                {{-- <div class="rating rating-shop mb-15">
                                            <ul class="d-inline-block">
                                                <li><span><i class="far fa-star"></i></span></li>
                                                <li><span><i class="far fa-star"></i></span></li>
                                                <li><span><i class="far fa-star"></i></span></li>
                                                <li><span><i class="far fa-star"></i></span></li>
                                                <li><span><i class="far fa-star"></i></span></li>
                                            </ul>
                                            <span class="add-review"><a href="#">2 customer reviews</a></span>
                                        </div> --}}
                                <div class="p-info-img-price mt-25 mb-25">
                                    <span class="d-block details-price">Rp 0</span>
                                </div>
                                 <div class="p-info-img-price mt-25 mb-25">
                                    <span class="d-block details-stock">0 in Stock</span>
                                </div>
                                <p class="details-desc pb-50">Typi non habent claritatem insitam, est usus legentis in iis
                                    qui facit
                                    eorum claritatem. Investigationes demonstraverunt lectores legere me
                                    lius quod ii legunt saepius. Claritas est etiam processus.</p>

                                <div
                                    class="all-info d-sm-flex align-items-center border-t-light-gray border-b-light-gray pb-50 pt-30">
                                    <div class="quick-add-to-cart d-lg-flex align-items-center">
                                        <div class="quantity-field position-relative d-inline-block mt-15 mr-15">
                                            <input type="text" id="f-cart-item" name="select1" data-item='1'  min="1"
                                                class="quantity-input-arrow quantity-input-2 border-light-gray2 text-center">
                                        </div>
                                        <div class="d-inline-block mt-15 mr-15">
                                            <span class="border border-light-gray2 d-inline-block text-center px-3 py-2 satuanBox" style="min-width:60px;">
                                                -
                                            </span>
                                        </div>
                                        <a href="#"
                                            class="add-cart-btn sub-btn dark-black-bg d-inline-block text-white mt-15 mr-15">Add to
                                            cart</a>
                                    </div><!-- /quick-add-to-cart -->
                                    {{-- <ul class="single-product-list-button d-flex align-items-center mt-15">
                                        <li data-toggle="tooltip" data-placement="top" title="Add to Wishlist">
                                            <a href="wishlist.html" class="d-block border-light-gray2 text-dark"><span
                                                    class="icon-heart"></span></a>
                                        </li>
                                        <li data-toggle="tooltip" data-placement="top" title="Compare">
                                            <a href="#" class="d-block border-light-gray2 text-dark"><span><i
                                                        class="fas fa-compress"></i></span></a>
                                        </li>
                                    </ul> --}}
                                    <!-- /single-product-list-button -->
                                </div>
                                {{-- <div class="sku mt-20">
                                    <span class="text-uppercase">SKU: <span class="primary-color">3-1</span></span>
                                </div> --}}
                                <div class="mega-product pt-2 pr-150">
                                    <ul>
                                        <li class="theme-color"><span>Categories:</span></li>
                                        <li><a href="#" class="primary-color">Product</a></li>
                                        {{-- <li><a href="product-details.html" class="primary-color">Chest of Drawers,</a></li>
                                        <li><a href="product-details.html" class="primary-color">Deco,</a></li>
                                        <li><a href="product-details.html" class="primary-color">Floor,</a></li>
                                        <li><a href="product-details.html" class="primary-color">Home Accessories,</a></li>
                                        <li><a href="product-details.html" class="primary-color">Lighting,</a></li>
                                        <li><a href="product-details.html" class="primary-color">Outdoor,</a></li>
                                        <li><a href="product-details.html" class="primary-color">Tables lamp,</a></li>
                                        <li><a href="product-details.html" class="primary-color">Wall lights,</a></li>
                                        <li><a href="product-details.html" class="primary-color">Bedroom</a></li>
                                        <li><a href="product-detils.html" class="primary-color">Chair & Tables H6,</a> --}}
                                        </li>
                                    </ul>
                                </div>
                                {{-- <ul class="p-tags theme-color mt-2 pb-20 border-b-light-gray">
                                            <li><span>Tags:</span></li>
                                            <li><a href="product-details.html" class="primary-color">Decor,</a></li>
                                            <li><a href="product-details.html" class="primary-color">Bedroom</a></li> 
                                        </ul> --}}
                            </div><!-- /mega-product -->
                            {{-- <div class="social-link-view-info d-sm-flex mt-20">
                                        <span class="pr-20 primary-color d-block">Share this product</span>
                                        <ul>
                                            <li class="tool" data-toggle="tooltip" data-selector="true" data-placement="bottom" title="Facebook">
                                                <a href="#"><i class="fab fa-facebook-f"></i></a>
                                            </li>
                                            <li class="tool" data-toggle="tooltip" data-selector="true" data-placement="bottom" title="Twitter ">
                                                <a href="#"><i class="fab fa-twitter"></i></a>
                                            </li>
                                            <li class="tool" data-toggle="tooltip" data-selector="true" data-placement="bottom" title="Pinterest">
                                                <a href="#"><i class="fab fa-pinterest-p"></i></a>
                                            </li>
                                            <li class="tool" data-toggle="tooltip" data-selector="true" data-placement="bottom" title="Google-plus">
                                                <a href="#"><i class="fab fa-google-plus"></i></a>
                                            </li>
                                            <li class="tool" data-toggle="tooltip" data-selector="true" data-placement="bottom" title="Linkedin">
                                                <a href="#"><i class="fab fa-linkedin-in"></i></a>
                                            </li>
                                        </ul><!-- /social-sharing -->
                                    </div> --}}
                        </div>
                    </div><!-- /col -->
                </div><!-- /row -->
            </div>
        </div><!-- /container -->
    </div>
@endsection


@push('after-script')
    <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
    <script>
        @foreach ($varJs as $varjsi)
            {!! $varjsi !!}
        @endforeach
    </script>


    @foreach ($javascriptFiles as $file)
        <script src="{{ $file }}"></script>
    @endforeach

@endpush
