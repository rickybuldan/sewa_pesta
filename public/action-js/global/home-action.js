// $(document).ready(function () {

// });
loadProduct();
loadCart()



function loadProduct() {
    $.ajax({
        url: baseURL + "/home/loadGlobal",
        type: "POST",
        data: JSON.stringify({ tableName: "products", where: "status = 0" + " and items > 0" }),
        dataType: "json",
        contentType: "application/json",
        beforeSend: function () {
            // Swal.fire({
            //     title: "Loading",
            //     text: "Please wait...",
            // });
        },

        complete: function () { },
        success: function (response) {
            console.log(response);
            // Handle response sukses
            if (response.code == 0) {
                // swal("Saved !", response.info, "success").then(function () {
                //     // location.reload();
                //     location.href = baseURL+"/invoice?noinvoice="+response.data.no_transaction
                // });
                // Reset form
                data = response.data;
                $(".total-products").text(data.length)

                imgslider = "";
                let el = '';
                for (let index = 0; index < data.length; index++) {
                    // Tambahkan pembuka row setiap 3 item
                    if (index % 4 === 0) {
                        el += `<div class="row">`;
                    }

                    el += `
                            
                        <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 mb-100">
                            <div class="single-product mb-40">
                                <div class="single-product-img position-relative over-hidden">
                                    <div class="single-product-label position-absolute">
                                        <span class="text-center text-white d-block brown-l-bg">Hot</span>
                                    </div>
                                    <a class="position-relative d-block" href="#" tabindex="0">
                                    
                                        <img style="width: 320px; height: 320px; object-fit: cover;"  src="/storage/${data[index]["file_path"]}" alt="">
                                        <img style="width: 320px; height: 320px; object-fit: cover;"  class="hover-img position-absolute" src="/storage/${data[index]["file_path"]}" alt="product">
                                    </a>
                                    <ul class="view-btn position-absolute transition-3">
                                        <li class="text-center">
                                            <a onclick="selectedProduct(${data[index]["id"]})" class="theme-color white-bg text-center d-inline-block" data-toggle="tooltip" data-placement="top" title="" data-original-title="Blossom Porcelain Side bottle" tabindex="0">Quick View</a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="single-product-info position-relative mt-10">
                                    <div class="single-product-tag">
                                        <a href="#" class="primary-color mr-1" tabindex="0">Product</a>
                                    </div>
                                    <h5 class="single-product-name"><a href="#" tabindex="0">${data[index]["product_name"]}</a></h5>
                                    <div class="single-product-action d-flex position-relative transition-3">
                                        <ul class="single-product-price d-flex">
                                            <li>
                                                <span>${formatRupiah(data[index]["price"])}/Hari</span>
                                            </li>
                                        </ul>
                                        <div class="add-to-cart position-absolute transition-3">
                                            <a onclick="selectedProduct(${data[index]["id"]})" href="#" class="d-block theme-color text-uppercase" data-toggle="tooltip" data-placement="top" title="" data-original-title="Add to cart" tabindex="0">
                                                <span class="mr-2"><span class="icon-shopping-bag"></span></span>add to cart
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;

                    // Tutup row setiap 3 item atau di item terakhir
                    if ((index + 1) % 4 === 0 || index === data.length - 1) {
                        el += `</div>`;
                    }
                }
                // Masukkan ke elemen HTML
                $(".product-active").html(el).slick({
                    dots: false,
                    arrows: false,
                    infinite: false,
                    slidesToShow: 4,
                    slidesToScroll: 2,
                    responsive: [
                        {
                            breakpoint: 1199,
                            settings: {
                                slidesToShow: 3,
                            }
                        },
                        {
                            breakpoint: 687,
                            settings: {
                                slidesToShow: 2,
                            }
                        },
                        {
                            breakpoint: 475,
                            settings: {
                                slidesToShow: 1,
                            }
                        }
                    ]
                });

            } else {
                sweetAlert("Oops...", response.info, "error");
            }
        },
        error: function (xhr, status, error) {
            // Handle error response
            // console.log(xhr.responseText);
            sweetAlert("Oops...", xhr.responseText, "error");
        },
    });
}



// function checkValidation() {
//     // console.log($el);
//     if (
//         validationSwalFailed(
//             (isObject["pet_name"] = $("#form-name").val()),
//             "Nama pet tidak boleh kosong."
//         )
//     )
//         return false;

//     // if (
//     //     validationSwalFailed(
//     //         (isObject["desc"] = $("#form-desc").val()),
//     //         "Deskripsi tidak boleh kosong"
//     //     )
//     // )
//     //     return false;
//     saveData();
// }


function saveCart(id_product, qty) {
    isObject = {};

    if (uid == "") {
        sweetAlert("Oops...", "Silakan login terlebih dahulu.", "warning");
        return false;
    }

    isObject.id_product = id_product;
    isObject.id_user = uid;
    isObject.qty = qty;

    $.ajax({
        url: baseURL + "/home/saveCart",
        type: "POST",
        data: JSON.stringify(isObject),
        dataType: "json",
        contentType: "application/json",
        beforeSend: function () {
            // Swal.fire({
            //     title: "Loading",
            //     text: "Please wait...",
            // });
        },
        complete: function () { },
        success: function (response) {
            // Handle response sukses
            if (response.code == 0) {
                swal("Saved !", response.info, "success").then(function () {
                    // location.reload();
                    loadCart()
                });
                // Reset form
            } else {
                sweetAlert("Oops...", response.info, "error");
            }
        },
        error: function (xhr, status, error) {
            // Handle error response
            // console.log(xhr.responseText);
            sweetAlert("Oops...", xhr.responseText, "error");
        },
    });
}

// $(".mini-cart-icon" ).hover(
//     loadCart()
// );
$("a.mini-cart-icon").mouseenter(function () {
    loadCart();
});


