@extends('layout.default_three')
@push('after-style')
    @foreach ($cssFiles as $file)
        <link rel="stylesheet" href="{{ $file }}">
    @endforeach
@endpush
@section('content')
    <!-- Container-fluid starts-->
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-3">
                <div class="row">
                    <div class="col-md-6 col-lg-4 col-xl-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="widget-first">

                                    <div class="d-flex align-items-center mb-2">
                                        <div
                                            class="p-2 border border-primary border-opacity-10 bg-primary-subtle rounded-2 me-2">
                                            <div class="bg-primary rounded-circle widget-size text-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                    viewBox="0 0 24 24">
                                                    <path fill="#ffffff"
                                                        d="M7 15h2c0 1.08 1.37 2 3 2s3-.92 3-2c0-1.1-1.04-1.5-3.24-2.03C9.64 12.44 7 11.78 7 9c0-1.79 1.47-3.31 3.5-3.82V3h3v2.18C15.53 5.69 17 7.21 17 9h-2c0-1.08-1.37-2-3-2s-3 .92-3 2c0 1.1 1.04 1.5 3.24 2.03C14.36 11.56 17 12.22 17 15c0 1.79-1.47 3.31-3.5 3.82V21h-3v-2.18C8.47 18.31 7 16.79 7 15" />
                                                </svg>
                                            </div>
                                        </div>
                                        <p class="mb-0 text-dark fs-15">Total Penyewaan</p>
                                    </div>

                                    <div class="d-flex justify-content-between align-items-center">
                                        <h3 class="mb-0 fs-22 text-dark me-3 total-rent">0</h3>
                                        {{-- <div class="text-center">
                                            <span class="text-primary fs-14"><i class="mdi mdi-trending-up fs-14"></i>
                                                12.5%</span>
                                            <p class="text-dark fs-13 mb-0">Last 7 days</p>
                                        </div> --}}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-4 col-xl-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="widget-first">

                                    <div class="d-flex align-items-center mb-2">
                                        <div
                                            class="p-2 border border-primary border-opacity-10 bg-primary-subtle rounded-2 me-2">
                                            <div class="bg-primary rounded-circle widget-size text-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                                    <path fill="#ffffff" d="m10 17l-5-5l1.41-1.42L10 14.17l7.59-7.59L19 8m-7-6A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <p class="mb-0 text-dark fs-15">Total Harga Semua Penyewaan</p>
                                    </div>

                                    <div class="d-flex justify-content-between align-items-center">
                                        <h3 class="mb-0 fs-22 text-dark me-3 total-revenue-rent">0</h3>
                                        {{-- <div class="text-center">
                                            <span class="text-primary fs-14"><i class="mdi mdi-trending-up fs-14"></i>
                                                12.5%</span>
                                            <p class="text-dark fs-13 mb-0">Last 7 days</p>
                                        </div> --}}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-4 col-xl-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="widget-first">

                                    <div class="d-flex align-items-center mb-2">
                                        <div
                                            class="p-2 border border-primary border-opacity-10 bg-primary-subtle rounded-2 me-2">
                                            <div class="bg-primary rounded-circle widget-size text-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                    viewBox="0 0 24 24">
                                                    <path fill="#ffffff"
                                                        d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4" />
                                                </svg>
                                            </div>
                                        </div>
                                        <p class="mb-0 text-dark fs-15">Customer</p>
                                    </div>

                                    <div class="d-flex justify-content-between align-items-center">
                                        <h3 class="mb-0 fs-22 text-dark me-3 total-customers">0</h3>
                                        {{-- <div class="text-center">
                                            <span class="text-primary fs-14"><i class="mdi mdi-trending-up fs-14"></i>
                                                12.5%</span>
                                            <p class="text-dark fs-13 mb-0">Last 7 days</p>
                                        </div> --}}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="col-sm-9">
                <div class="card">
                    <div class="card-header">
                        <div class="d-flex justify-content-between">
                            <div class="p-2">
                                <h5>Jadwal Penyewaan</h5>
                            </div>
                            <div class="p-2">
                                {{-- <a class="btn btn-primary" id="add-btn"><i class="fa fa-plus"></i> Tambah</a> --}}
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div id="calendar"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="modal-data" tabindex="-1" aria-labelledby="exampleModalCenter1" style="display: none;"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Form Data</h5>
                        <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="basic-form">

                            <div class="mb-3 row">
                                <label class="col-sm-3 col-form-label">Nama Produk</label>
                                <div class="col-sm-9">
                                    <input id="form-name" type="text" class="form-control" placeholder="Nama">
                                </div>
                            </div>
                            {{-- <div class="mb-3 row">
                                <label class="col-sm-3 col-form-label">Kode Produk</label>
                                <div class="col-sm-5">
                                    <input id="form-code" type="text" class="form-control" placeholder="Kode Produk">
                                </div>
                                <div class="col-sm-3">
                                    <div class="btn-group btn-group-square" role="group" aria-label="Basic example">
                                        <button class="btn btn-danger" type="button" onclick="setNullProd()"><i
                                                class="fa fa-eraser" aria-hidden="true"></i></button>
                                        <button class="btn btn-primary" type="button" onclick="generateProdCode()"><i
                                                class="fa fa-refresh" aria-hidden="true"></i></button>
                                    </div>
                                </div>
                            </div> --}}

                            {{-- <div class="mb-3 row d-flex justify-content-center">
                                <img src="/template/admin2/assets/images/lightgallry/01.jpg" style="width:50% "
                                    class="img-prod" itemprop="thumbnail" alt="Image description">
                            </div> --}}
                            <div class="mb-3 row">
                                <label class="col-sm-3 col-form-label">Harga</label>
                                <div class="col-sm-9">
                                    <input id="form-price" type="text" oninput="formatRupiahByElement(this)"
                                        class="form-control" placeholder="Harga">
                                </div>
                            </div>
                            <div class="mb-3 row d-flex justify-content-center">
                                <img src="/template/admin2/assets/images/lightgallry/01.jpg" style="width:30% "
                                    class="img-paket" itemprop="thumbnail" alt="Image description">
                            </div>
                            <div class="mb-3 row">
                                <label class="col-sm-3 col-form-label">Foto</label>
                                <div class="col-sm-9">
                                    <input id="form-img" type="file" accept="image/*" class="form-control">
                                </div>
                            </div>
                            {{-- <div class="mb-3 row">
                                <label class="col-sm-3 col-form-label">Berat</label>
                                <div class="col-sm-9">
                                    <input id="form-weight" type="number" class="form-control" placeholder="Gram">
                                </div>
                            </div> --}}
                            {{-- <div class="mb-3 row">
                                <label class="col-sm-3 col-form-label">Stok</label>
                                <div class="col-sm-3">
                                    <input id="form-min" type="number" class="form-control" placeholder="Minimum">
                                </div>
                                <div class="col-sm-3">
                                    <input id="form-max" type="number" class="form-control" placeholder="Maksimum">
                                </div>
                                <div class="col-sm-9">
                                    <input id="form-init" type="number" class="form-control" placeholder="Awal">
                                </div>
                            </div> --}}
                            <div class="mb-3 row">
                                <label class="col-sm-3 col-form-label">Deskripsi</label>
                                <div class="col-sm-9">
                                    <textarea class="form-control" id="form-desc" placeholder="Deskripsi" required=""></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger light" data-bs-dismiss="modal">Close</button>
                        <button type="button" id="save-btn" class="btn btn-primary">Save</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="modal-data-barcode" tabindex="-1" aria-labelledby="exampleModalCenter1"
            style="display: none;" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Form Data</h5>
                        <button class="btn-close py-0" type="button" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="basic-form">
                            <div class="mb-3 row">
                                <label class="col-sm-3 col-form-label">Barcode</label>
                                <div class="col-sm-9">
                                    <input id="form-barcode-br" type="text" class="form-control" readonly>
                                </div>
                            </div>

                        </div>
                        <div class="basic-form">
                            <div class="mb-3 row">
                                <label class="col-sm-3 col-form-label">Jumlah Barcode</label>
                                <div class="col-sm-9">
                                    <input id="form-barcode-jml" type="number" class="form-control">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger light" data-bs-dismiss="modal">Close</button>
                        <button type="button" onclick="printImages()" class="btn btn-primary">Print</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Container-fluid Ends-->
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
@endpush
