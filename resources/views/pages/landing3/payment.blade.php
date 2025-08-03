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
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/themes/material_blue.css">
@endpush

@section('content')
      <!-- ======slider-area-start=========================================== -->
            <div class="slider-area over-hidden pt-100">
                <div class="single-page page-height3 d-flex align-items-center">
                        <div class="container">
                            <div class="row">
                                <div class="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12  d-flex align-items-center justify-content-center">
                                    <div class="page-title pt-65 pb-75 text-center">
                                        <h2 class="text-capitalize theme-color mb-20">Payment</h2>
                                        <nav aria-label="breadcrumb">
                                            <ol class="breadcrumb justify-content-center bg-transparent">
                                            <li class="breadcrumb-item"><a class="primary-color" href="/home">Home</a></li>
                                            <li class="breadcrumb-item active text-capitalize" aria-current="page">Payment</li>
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
                                <h3 class="mb-30 text-center">Payment Details</h3>
                              
                                    <div class="login-form mb-50">
                                        <label class="mt-25">Nama <span class="secondary-color">**</span></label>
                                        <div class="">
                                            <input type="text" class="form-control rounded-0 border-light-gray2 pl-20"  id="f-name" placeholder="Nama" readonly>
                                        </div>
                                        <label class="mt-25">Phone <span class="secondary-color">**</span></label>
                                        <div class="">
                                            <input type="text" class="form-control rounded-0 border-light-gray2 pl-20"  id="f-phone" placeholder="Alamat" readonly>
                                        </div>
                                        <label class="mt-25">Alamat <span class="secondary-color">**</span></label>
                                        <div class="">
                                            <input type="text" class="form-control rounded-0 border-light-gray2 pl-20"  id="f-address" placeholder="Alamat" readonly>
                                        </div>
                                        <label class="mt-25">Jumlah Hari <span class="secondary-color">**</span></label>
                                        <div class="">
                                            <input type="text" class="form-control rounded-0 border-light-gray2 pl-20"  id="dateRange" placeholder="Hari" disabled>
                                        </div>
                                        <label class="mt-25">Item Details<span class="secondary-color"></span></label>
                                        <div class="">
                                            <table class="order_table table table-striped" >
                                                <thead>
                                                    <th>Barang</th>
                                                    <th>Item</th>
                                                    <th>Total</th>
                                                </thead>
                                                <tbody></tbody>
                                            </table>
                                        </div>

                                        <p>Notes: Transaksi menggunakan DP harus melakukan pelunasan 1 hari sebelum tanggal awal penyewaan</p>
                                        <label class="mt-25">Tipe Pembayaran<span class="secondary-color">**</span></label>
                                        <div>
                                            <select class="custom-select" id="s-type-pay" disabled>
                                                <option value="1">Cash</option>
                                                <option value="0">DP - Down Payment</option>
                                            </select>
                                        </div>
                                        <label class="mt-25 ct-nominal-dp">Nominal<span class="secondary-color">**</span></label>
                                        <div class="ct-nominal-dp">
                                            <input type="text" class="form-control rounded-0 border-light-gray2 pl-20"  id="f-nominal-dp" placeholder="Nominal" readonly>
                                        </div>
                                        
                                        <label class="mt-25">Transfer Ke:<span class="secondary-color"></span></label>
                                        <div class="">
                                            <table class="table table-striped" >
                                                <thead>
                                                    <th>No Rekening</th>
                                                    <th>A/N</th>
                                                    <th>Total</th>
                                                </thead>
                                                <tbody>
                                                    <td class="text-center">111222333455</td>
                                                    <td class="text-center">John Doe</td>
                                                    <td class="text-right total-transfer">Rp 0</td>
                                                </tbody>
                                            </table>
                                        </div>
                                        
                                        <div id="countdown-timer">Menghitung waktu...</div>
                                        <label class="mt-25">Bukti Pembayaran <span class="secondary-color">**</span></label>
                                        <div class="">
                                            <input type="file" class="form-control rounded-0 border-light-gray2 pl-20"  id="form-img" placeholder="Alamat">
                                        </div>

                                        
                                        

                                    </div><!-- /login-form -->
                                    <input type="hidden" id="current-status" value="10" />
                                    <button id="payButton" class="sub-btn d-inline-block text-center text-white theme-bg transition text-uppercase width100">Pay Now!</button>
                                   
                            </div>
                        </div>
                        
                    </div><!-- /row -->
                </div><!-- /container -->
            </div>
            <!-- login-area-end  -->
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
    <script src="{{ asset('template/admin2/assets/js/owlcarousel/owl.carousel.js') }}"></script>
 
@endpush
