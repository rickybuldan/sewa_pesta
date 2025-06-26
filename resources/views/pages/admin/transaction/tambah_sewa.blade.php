@extends('layout.default_three')
@push('after-style')
    @foreach ($cssFiles as $file)
        <link rel="stylesheet" href="{{ $file }}">
    @endforeach
@endpush
@section('content')
    <!-- Container-fluid starts-->
    <div class="container-fluid">
        <div class="row mb-4">
            <div class="col-xl-11 ">
                <div class="position-relative topbar-search">
                    <input type="text" id="search_data" class="form-control ps-4" placeholder="Cari Barang..." />
                    <i class="mdi mdi-magnify fs-16 position-absolute text-muted top-50 translate-middle-y ms-2"></i>
                </div>
            </div>
            <div class="col-xl-1 ">
                <button class="btn btn-dark" type="button" onclick="search_transaction()">Cari</button>
            </div>
              
        </div>
        <div class="row">
            
            <div class="col-xl-8 ">
                <div class="row content-gallery-products">
                </div>
            </div>
            <div class="col-xl-4">
                <div class="card">

                    <div class="card-header">
                        <h5 class="card-title mb-0">Detail Sewa</h5>
                    </div><!-- end card header -->

                    <div class="card-body h-75">
                        <div class="mb-3">
                            <label for="simpleinput" class="form-label">Nama Penyewa</label>
                            <input type="text" id="tenant-name" class="form-control">
                        </div>
                       
                        <div class="mb-3">
                            <label for="simpleinput" class="form-label">Hari</label>
                            <input type="text" id="dateRange" class="form-control">
                        </div>

                        <div class="mb-3">
                            <label for="simpleinput" class="form-label">Phone</label>
                            <input type="text" id="phone-number" class="form-control">
                        </div>
                        <div class="mb-3">
                            <label for="simpleinput" class="form-label">Alamat</label>
                            <textarea class="form-control" id="fulladdress" rows="5" spellcheck="false"></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="simpleinput" class="form-label">Bukti Pembayaran</label>
                            <input id="form-img" type="file" accept="image/*" class="form-control">
                        </div>
                       
                        {{-- <div class="mb-">
                            <label for="simpleinput" class="form-label">List Barang</label>
                        </div> --}}
                        <hr>
                        <div class="mb-3 content-product-cart">
                            

                        </div>
                        <hr>
                        <div class="row mb-3">
                            <div class="col-xl-6">
                                <b>Grand Total</b>
                            </div>
                            <div class="col-xl-6 text-end">
                                <b id="total-price">Rp 0</b>
                            </div>
                        </div>
                       
                        
                        <div class="d-grid gap-2 mt-3">
                            <button type="button" class="btn btn-outline-info rounded-pill" onclick="checkValidation()">Simpan</button>
                        </div>
                    </div> <!-- end card-body -->
                    
                </div> <!-- end card-->
            </div> <!-- end col -->
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
                                    <input id="form-img" type="file" accept="image/*" class="form-control"
                                        >
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
                                    <input id="form-barcode-jml" type="number" class="form-control" >
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
