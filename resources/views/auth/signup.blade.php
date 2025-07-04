@extends('layout.default_login_three')
@push('after-style')
    <link rel="stylesheet" type="text/css" href="{{ asset('template/admin2/assets/css/vendors/sweetalert2.css') }}">
@endpush
@section('content')
    <div class="row align-items-center g-0 px-3 py-3 vh-100">
        <div class="col-xl-5">
            <div class="row">
                <div class="col-md-8 mx-auto">
                    <div class="card">
                        <div class="card-body">
                            <div class="mb-0 p-0 p-lg-3">
                                <div class="mb-0 border-0 p-md-4 p-lg-0">
                                    <div class="mb-4 p-0 text-lg-start text-center">
                                        <div class="auth-brand">
                                            <a href="{{ url('/') }}" class="logo logo-light">
                                                <span class="logo-lg">
                                                    <img src="{{ asset('template/admin3/dist/assets/images/logo-light-3.png') }}"
                                                        alt="" height="24">
                                                </span>
                                            </a>

                                            <a href="{{ url('/') }}" class="logo logo-dark">
                                                <span class="logo-lg">
                                                    <img src="{{ asset('template/admin3/dist/assets/images/logo-dark-3.png') }}"
                                                        alt="" height="24">
                                                </span>
                                            </a>
                                        </div>
                                    </div>

                                    <div class="auth-title-section mb-4 text-lg-start text-center">
                                        <h3 class="text-dark fw-semibold mb-3">Stay in the loop – Sign Up Now!
                                        </h3>
                                        <p class="text-muted fs-14 mb-0">Sign up to unlock exclusive content, special
                                            offers, and be the first to know about exciting updates.</p>
                                    </div>

                                    <div class="row">
                                        {{-- <div class="col-6 mt-2">
                                            <a
                                                class="btn text-dark border fw-normal d-flex align-items-center justify-content-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 48 48" class="me-2">
                                                    <path fill="#ffc107"
                                                        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917" />
                                                    <path fill="#ff3d00"
                                                        d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691" />
                                                    <path fill="#4caf50"
                                                        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44" />
                                                    <path fill="#1976d2"
                                                        d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917" />
                                                </svg>
                                                <span>Google</span>
                                            </a>
                                        </div> --}}

                                        {{-- <div class="col-6 mt-2">
                                            <a
                                                class="btn text-dark border fw-normal d-flex align-items-center justify-content-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 256 256" class="me-2">
                                                    <path fill="#1877f2"
                                                        d="M256 128C256 57.308 198.692 0 128 0S0 57.308 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.348-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.959 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445" />
                                                    <path fill="#fff"
                                                        d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A129 129 0 0 0 128 256a129 129 0 0 0 20-1.555V165z" />
                                                </svg>
                                                <span>Facebook</span>
                                            </a>
                                        </div> --}}
                                    </div>

                                    {{-- <div class="saprator my-4"><span>or continue with email</span></div> --}}

                                    <div class="pt-0">
                                        <div class="theme-form" action="{{ route('login') }}" method="POST" class="my-4">
                                            @csrf
                                            <div class="form-group mb-3">
                                                <label for="emailaddress" class="form-label">Nama</label>
                                                <input class="form-control" type="text" required="" placeholder="Nama"
                                                    id="v-name">
                                            </div>
                                            <div class="form-group mb-3">
                                                <label for="emailaddress" class="form-label">Email address</label>
                                                <input class="form-control" type="email" required=""
                                                    placeholder="Test@gmail.com" id="v-email">
                                            </div>
                                            <div class="form-group mb-3">
                                                <label for="emailaddress" class="form-label">Phone</label>
                                                <input class="form-control" type="email" required=""
                                                    placeholder="08***" id="v-phone">
                                            </div>
                                            <div class="form-group mb-3">
                                                <label for="emailaddress" class="form-label">Address</label>
                                                <input class="form-control" type="email" required=""
                                                    placeholder="bandung" id="v-alamat">
                                            </div>
                                           
                                            <div class="form-group mb-3">
                                                <label for="password" class="form-label">Password</label>
                                                <input class="form-control" type="password" required=""
                                                    placeholder="Enter your password" name="password" id="v-password">
                                            </div>

                                            {{-- <div class="form-group d-flex mb-1"> --}}
                                            {{-- <div class="col-sm-6">
                                                    <div class="form-check">
                                                        <input type="checkbox" class="form-check-input" id="checkbox-signin"
                                                            checked>
                                                        <label class="form-check-label" for="checkbox-signin">Remember
                                                            me</label>
                                                    </div>
                                                </div> --}}


                                            {{-- <div class="col-sm-6 text-end">
                                                    <a class='text-muted fs-14' href='auth-recoverpw.html'>Forgot
                                                        password?</a>
                                                </div> --}}
                                            {{-- </div> --}}
                                            <div class="form-group d-flex mb-2">
                                                <div class="col-sm-12">
                                                    @if ($errors->has('email'))
                                                        <h5>
                                                            <span class="badge text-bg-danger">{{ $errors->first('email') }}
                                                            </span>
                                                        </h5>
                                                    @endif
                                                </div>
                                            </div>

                                            <div class="form-group mb-0 row">
                                                <div class="col-12">
                                                    <div class="d-grid">
                                                        <button class="btn btn-primary fw-semibold" onclick="checkValidation()" type="submit"> Sign Up
                                                        </button>
                                                    </div>
                                                </div>

                                            </div>


                                        </div>

                                        <div class="text-center text-muted">
                                            <p class="mb-0">Already have an account ?<a
                                                    class='text-primary ms-2 fw-medium' href="/login">Login</a></p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div class="col-xl-7 d-none d-xl-inline-block">
            <div class="account-page-bg rounded-4">
                <div class="auth-user-review text-center">
                    <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
                        <div class="carousel-inner">

                            <div class="carousel-item active">
                                <p class="prelead mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                                        viewBox="0 0 24 24">
                                        <path fill="#ffffff"
                                            d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621c.537-.278 1.24-.375 1.929-.311c1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5a3.87 3.87 0 0 1-2.748-1.179m10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621c.537-.278 1.24-.375 1.929-.311c1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5a3.87 3.87 0 0 1-2.748-1.179" />
                                    </svg>
                                    With Untitled, your support process can be as enjoyable as your product. With it's this
                                    easy, customers keep coming back.
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                                        viewBox="0 0 24 24">
                                        <path fill="#ffffff"
                                            d="M19.417 6.679C20.447 7.773 21 9 21 10.989c0 3.5-2.456 6.637-6.03 8.188l-.893-1.378c3.335-1.804 3.987-4.145 4.248-5.621c-.537.278-1.24.375-1.93.311c-1.804-.167-3.226-1.648-3.226-3.489a3.5 3.5 0 0 1 3.5-3.5c1.073 0 2.1.49 2.748 1.179m-10 0C10.447 7.773 11 9 11 10.989c0 3.5-2.456 6.637-6.03 8.188l-.893-1.378c3.335-1.804 3.987-4.145 4.247-5.621c-.537.278-1.24.375-1.929.311C4.591 12.323 3.17 10.842 3.17 9a3.5 3.5 0 0 1 3.5-3.5c1.073 0 2.1.49 2.748 1.179" />
                                    </svg>
                                </p>
                                <h4 class="mb-1">Camilla Johnson</h4>
                                <p class="mb-0">Software Developer</p>
                            </div>

                            <div class="carousel-item">
                                <p class="prelead mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                                        viewBox="0 0 24 24">
                                        <path fill="#ffffff"
                                            d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621c.537-.278 1.24-.375 1.929-.311c1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5a3.87 3.87 0 0 1-2.748-1.179m10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621c.537-.278 1.24-.375 1.929-.311c1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5a3.87 3.87 0 0 1-2.748-1.179" />
                                    </svg>
                                    Pretty nice theme, hoping you guys could add more features to this. Keep up the good
                                    work.
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                                        viewBox="0 0 24 24">
                                        <path fill="#ffffff"
                                            d="M19.417 6.679C20.447 7.773 21 9 21 10.989c0 3.5-2.456 6.637-6.03 8.188l-.893-1.378c3.335-1.804 3.987-4.145 4.248-5.621c-.537.278-1.24.375-1.93.311c-1.804-.167-3.226-1.648-3.226-3.489a3.5 3.5 0 0 1 3.5-3.5c1.073 0 2.1.49 2.748 1.179m-10 0C10.447 7.773 11 9 11 10.989c0 3.5-2.456 6.637-6.03 8.188l-.893-1.378c3.335-1.804 3.987-4.145 4.247-5.621c-.537.278-1.24.375-1.929.311C4.591 12.323 3.17 10.842 3.17 9a3.5 3.5 0 0 1 3.5-3.5c1.073 0 2.1.49 2.748 1.179" />
                                    </svg>
                                </p>
                                <h4 class="mb-1">Palak Awoo</h4>
                                <p class="mb-0">Lead Designer</p>
                            </div>

                            <div class="carousel-item">
                                <p class="prelead mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                                        viewBox="0 0 24 24">
                                        <path fill="#ffffff"
                                            d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621c.537-.278 1.24-.375 1.929-.311c1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5a3.87 3.87 0 0 1-2.748-1.179m10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621c.537-.278 1.24-.375 1.929-.311c1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5a3.87 3.87 0 0 1-2.748-1.179" />
                                    </svg>
                                    This is a great product, helped us a lot and very quick to work with and implement.
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                                        viewBox="0 0 24 24">
                                        <path fill="#ffffff"
                                            d="M19.417 6.679C20.447 7.773 21 9 21 10.989c0 3.5-2.456 6.637-6.03 8.188l-.893-1.378c3.335-1.804 3.987-4.145 4.248-5.621c-.537.278-1.24.375-1.93.311c-1.804-.167-3.226-1.648-3.226-3.489a3.5 3.5 0 0 1 3.5-3.5c1.073 0 2.1.49 2.748 1.179m-10 0C10.447 7.773 11 9 11 10.989c0 3.5-2.456 6.637-6.03 8.188l-.893-1.378c3.335-1.804 3.987-4.145 4.247-5.621c-.537.278-1.24.375-1.929.311C4.591 12.323 3.17 10.842 3.17 9a3.5 3.5 0 0 1 3.5-3.5c1.073 0 2.1.49 2.748 1.179" />
                                    </svg>
                                </p>
                                <h4 class="mb-1">Laurent Smith</h4>
                                <p class="mb-0">Product designer</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
@push('after-script')
    <script src="{{ asset('template/admin/vendor/sweetalert2/dist/sweetalert2.min.js') }}" aria-hidden="true"></script>
    <script type="text/javascript">
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
        });
        isObject = {}
        var baseURL = window.location.origin;

        function validationSwalFailed(param, isText) {
            // console.log(param);
            if (param == "" || param == null) {
                sweetAlert("Oops...", isText, "warning");

                return 1;
            }
        }

        $("#save-btn").on("click", function(e) {
            e.preventDefault();
            checkValidation();
        });

        function checkValidation() {
            // console.log($el);
            if (
                validationSwalFailed(
                    (isObject["name"] = $("#v-name").val()),
                    "Nama tidak boleh kosong."
                )
            )
                return false;
            if (
                validationSwalFailed(
                    (isObject["email"] = $("#v-email").val()),
                    "Email tidak boleh kosong"
                )
            )
                return false;
            if (
                validationSwalFailed(
                    (isObject["phone"] = $("#v-phone").val()),
                    "Phone tidak boleh kosong"
                )
            )
                return false;
            if (
                validationSwalFailed(
                    (isObject["address"] = $("#v-alamat").val()),
                    "Alamat tidak boleh kosong"
                )
            )
                return false;
            if (
                validationSwalFailed(
                    (isObject["password"] = $("#v-password").val()),
                    "Password tidak boleh kosong."
                )
            )
                return false;


            saveData();
        }

        function saveData() {
            isObject.id = null;
            $.ajax({
                url: baseURL + "/sign-up",
                type: "POST",
                data: JSON.stringify(isObject),
                dataType: "json",
                contentType: "application/json",
                beforeSend: function() {
                    Swal.fire({
                        title: "Loading",
                        text: "Please wait...",
                        showConfirmButton: false
                    });
                },
                complete: function() {},
                success: function(response) {
                    // Handle response sukses
                    if (response.code == 0) {
                        swal("Saved !", "Silakan cek email anda!", "success").then(function() {
                            window.location.href = '/';
                        });
                        // Reset form
                    } else {
                        sweetAlert("Oops...", response.message, "error");
                    }
                },
                error: function(xhr, status, error) {
                    // Handle error response
                    // console.log(xhr.responseText);
                    sweetAlert("Oops...", xhr.responseText, "error");
                },
            });
        }
    </script>
@endpush
