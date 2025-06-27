let dtpr;

$(document).ready(function () {
    // $(".js-example-basic-single").select2({
    //     dropdownParent: $("#modal-data"),
    //     placeholder: "Pilih Kategori",
    // });

    getListData();
    $("#tenant-name").val(fullname_user);
    $("#phone-number").val(fullphone_user);
    $("#fulladdress").text(fulladdress_user);
});

$("#search_data").on("input", function () {
    let keyword = $(this).val();
    if (keyword.length == 0) {
        $(".content-gallery-products").empty();
        getListData();
    }
});

function search_transaction() {
    $(".content-gallery-products").empty();
    getListData();
}

function setImagePackage(urlFile, elementID) {
    console.log(urlFile);
    elementID.prop("src", null);
    if (urlFile) {
        elementID.prop("src", urlFile);
    } else {
        urlFile = "/template/admin2/assets/images/lightgallry/01.jpg";
        elementID.prop("src", urlFile);
    }
}

globProduct = [];
globArrCart = [];
function getProductFromArr(idpro) {
    arr = globProduct;
    // console.log(arr,idpro);
    res = arr.filter((x) => x.id == idpro);
    // console.log(arr,idpro);

    return res;
}

function getListData() {
    let available_status = 0;
    let wherestate = "status = " + available_status;

    if ($("#search_data").val()) {
        wherestate +=
            " and product_name LIKE '%" + $("#search_data").val() + "%'";
    }
    $.ajax({
        url: baseURL + "/loadGlobal",
        type: "POST",
        data: JSON.stringify({
            where: wherestate,
            tableName: "products",
        }),
        dataType: "json",
        contentType: "application/json",
        beforeSend: function () {
            // Swal.fire({
            //     title: "Loading",
            //     text: "Please wait...",
            // });
        },
        complete: function () {
            // Swal.close();
        },
        success: function (response) {
            // Handle response sukses
            if (response.code == 0) {
                
                if (response.data.length == 0) {
                    sweetAlert("Oops...", "Tidak ada data!", "error");
                    return;
                }

                let prods = response.data;
                globProduct = prods;
                galleryprods = ``;
                $(".content-gallery-products").html();
                for (let index = 0; index < prods.length; index++) {
                    nm = prods[index].product_name;
                    pc = prods[index].price;
                    dsc = prods[index].desc;
                    img = prods[index].file_path;
                    idp = prods[index].id;

                    $defaultimg = `<img src="/template/admin2/assets/images/lightgallry/01.jpg" class="img-fluid rounded mx-auto d-block" style="width:50px!important; height:120px!important">`;

                    if (img) {
                        $defaultimg = `<img src="/storage/${img}" class="img-fluid rounded mx-auto d-block" style="width:110px!important; height:120px!important">`;
                    }
                    // dividerconst    = 4
                    // item            = (index + 1)
                    // iszero          = 0

                    // if (item % dividerconst == iszero) {
                    //     galleryprods += ``
                    // }

                    galleryprods += `
                        <!-- end col -->
                            <div class="col-xl-6">
                                <div class="card">

                                    <div class="card-header">
                                        <h5 class="card-title mb-0">${nm}</h5>
                                    </div><!-- end card header -->

                                    <div class="card-body h-75">
                                        ${$defaultimg}
                                        <div class="d-grid gap-2 mt-3">
                                            <span class="badge text-bg-secondary mb-3">${formatRupiah(
                                                pc
                                            )} / hari</span>
                                            <button type="button" onclick='addToCart(this,${idp})' class="btn btn-outline-info rounded-pill">Tambah</button>
                                        </div>
                                    </div> <!-- end card-body -->
                                    
                                </div> <!-- end card-->
                            </div> <!-- end col -->
                    
                        `;

                    // if ((index + 1) % 4 == 0 || index == prods.length - 1) {
                    //     galleryprods += `</div>`; // end row
                    // }
                }
                $(".content-gallery-products").html(galleryprods);
            } else {
                sweetAlert("Oops...", response.message, "error");
            }
        },
        error: function (xhr, status, error) {
            // Handle error response
            // console.log(xhr.responseText);
            sweetAlert("Oops...", xhr.responseText, "error");
        },
    });
}

globSumDay = 1;
globStartDate = null;
globEndDate = null;
flatpickr("#dateRange", {
    mode: "range",
    enableTime: true,
    enableSeconds: true,
    dateFormat: "Y-m-d H:i:S",
    minDate: new Date(),
    defaultDate: [
        new Date(), // hari ini
        new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000), // +1 hari
    ],
    onChange: function (selectedDates, dateStr, instance) {
        if (selectedDates.length === 2) {
            let start = selectedDates[0];
            let end = selectedDates[1];

            globStartDate = start;
            globEndDate = end;

            // Hitung selisih hari
            let diffTime = end - start;
            let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            globSumDay = diffDays;

            if (diffDays < 1) {
                // Minimal harus beda 1 hari
                validationSwalFailed(null, "Minimal penyewaan satu hari.");

                // Atur ulang end date = start date + 1 hari
                let newEnd = new Date(
                    start.getTime() + 1 * 24 * 60 * 60 * 1000
                );

                instance.setDate([start, newEnd], true); // true = trigger change again
            }
        }
        ctAllProd();
    },
    allowInput: true,
});

function countSubTotal(prc, day) {
    return prc * day;
}

function addToCart(el, params) {
    // alert(1)
    resprod = getProductFromArr(params);
    // console.log(resprod);
    globArrCart.push(resprod[0]);

    $(el).attr("onclick", `deleteCart(this,${params})`);
    $(el).html("Hapus");
    ctAllProd();
}

function ctSubProd(resprod) {
    htcontent = `
        <div class="row content-it-${resprod.id}">
            <div class="col-xl-4">
                ${resprod.product_name}
            </div>
            <div class="col-xl-4 text-end">
                ${formatRupiah(resprod.price)}
                * ${globSumDay}
            </div>
            <div class="col-xl-4 text-end">
                ${formatRupiah(countSubTotal(resprod.price, globSumDay))}
            </div>
        </div>
    `;
    return htcontent;
}

globGrandTotal = 0;
function ctAllProd() {
    htcontent = "";
    console.log(globArrCart[0]["price"]);
    total = 0;

    for (let index = 0; index < globArrCart.length; index++) {
        pnm = globArrCart[index];
        prc = pnm.price;

        total += parseInt(prc) * globSumDay;
        htcontent += ctSubProd(pnm);
    }
    globGrandTotal = total;

    $("#total-price").text(formatRupiah(total));
    $(".content-product-cart").html(htcontent);
}

function deleteCart(el, params) {
    $(`.content-it-${params}`).remove();

    globArrCart = globArrCart.filter(function (obj) {
        return obj.id !== params;
    });

    $(el).attr("onclick", `addToCart(this,${params})`);
    $(el).html("Tambah");

    ctAllProd();
}

let isObject = {};

function editdata(rowData) {
    isObject = rowData;
    rupiahprice = formatRupiah(rowData.price);

    setImagePackage("/storage/" + rowData.file_path, $(".img-paket"));
    $("#form-name").val(rowData.product_name);
    $("#form-price").val(rupiahprice);
    $("#form-desc").val(rowData.desc);
    $("#form-weight").val(rowData.weight);
    $("#form-max").val(rowData.stock_maximum);
    $("#form-min").val(rowData.stock_minimum);
    $("#form-init").val(rowData.stock);
    $("#form-code").val(rowData.prod_code);
    // generateProdCode($("#form-code").val())
    $("#modal-data").modal("show");
}

$("#add-btn").on("click", function (e) {
    e.preventDefault();
    isObject = {};
    isObject["id"] = null;
    setImagePackage(null, $(".img-paket"));
    setImagePackage(null, $(".img-prod"));

    $("#form-name").val("");
    $("#form-price").val("");
    $("#form-desc").val("");
    $("#form-weight").val("");
    $("#form-max").val("");
    $("#form-min").val("");
    $("#form-init").val("");
    $("#form-code").val("");

    $("#modal-data").modal("show");
});

$("#save-btn").on("click", function (e) {
    e.preventDefault();
    checkValidation();
});

function checkValidation() {
    // console.log($el);
    // if (
    //     validationSwalFailed(
    //         (isObject["product_name"] = $("#form-name").val()),
    //         "Nama produk tidak boleh kosong."
    //     )
    // )
    //     return false;

    // if (
    //     validationSwalFailed(
    //         (isObject["prod_code"] = $("#form-code").val()),
    //         "Kode produk tidak boleh kosong."
    //     )
    // )
    //     return false;
    // pricexx = unformatRupiah($("#form-price").val());
    // if (
    //     validationSwalFailed(
    //         (isObject["price"] = pricexx),
    //         "Harga tidak boleh kosong"
    //     )
    // )
    //     return false;

    // if ($("#form-img").val == null) {
    //     setImagePackage();
    // }

    // if (
    //     validationSwalFailed(
    //         (isObject["weight"] = $("#form-weight").val()),
    //         "Berat tidak boleh kosong"
    //     )
    // )
    //     return false;

    // if (
    //     validationSwalFailed(
    //         (isObject["min"] = $("#form-min").val()),
    //         "Stok minimun tidak boleh kosong"
    //     )
    // )
    //     return false;
    // if (
    //     validationSwalFailed(
    //         (isObject["max"] = $("#form-max").val()),
    //         "Stok maksimum tidak boleh kosong"
    //     )
    // )
    //     return false;

    // if (
    //     validationSwalFailed(
    //         (isObject["init"] = $("#form-init").val()),
    //         "Stok awal tidak boleh kosong"
    //     )
    // )
    //     return false;

    if (
        validationSwalFailed(
            (isObject["tenant_name"] = $("#tenant-name").val()),
            "Nama penyewa tidak boleh kosong"
        )
    )
        return false;

    if (globArrCart.length <= 0) {
        validationSwalFailed(null, "Pilih barang terlebih dahulu.");
        return false;
    }

    if (
        validationSwalFailed(
            (isObject["phone_number"] = $("#phone-number").val()),
            "Phone tidak boleh kosong"
        )
    )
        return false;

    if (
        validationSwalFailed(
            (isObject["address"] = $("#fulladdress").val()),
            "Alamat tidak boleh kosong"
        )
    )
        return false;

    isObject["items"] = globArrCart;
    isObject["grand_total"] = globGrandTotal;
    isObject["day"] = globSumDay;

    let rangeValue = $("#dateRange").val();

    if (rangeValue.includes(" to ")) {
        let [startDate, endDate] = rangeValue.split(" to ");
        globStartDate = startDate;
        globEndDate = endDate;
    }

    isObject["start_date"] = globStartDate;
    isObject["end_date"] = globEndDate;

    saveData();
}

function deleteData(data) {
    swal({
        title: "Are you sure to delete ?",
        text: "You will not be able to recover this imaginary file !!",
        type: "warning",
        showCancelButton: !0,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it !!",
        cancelButtonText: "No, cancel it !!",
        closeOnConfirm: !1,
        closeOnCancel: !1,
    }).then(function (e) {
        console.log(e);
        if (e.value) {
            $.ajax({
                url: baseURL + "/deleteGlobal",
                type: "POST",
                data: JSON.stringify({ id: data.id, tableName: "products" }),
                dataType: "json",
                contentType: "application/json",
                beforeSend: function () {
                    Swal.fire({
                        title: "Loading",
                        text: "Please wait...",
                        showConfirmButton: false,
                    });
                },
                complete: function () {},
                success: function (response) {
                    // Handle response sukses
                    if (response.code == 0) {
                        swal("Deleted !", response.message, "success").then(
                            function () {
                                location.reload();
                            }
                        );
                    } else {
                        sweetAlert("Oops...", response.message, "error");
                    }
                },
                error: function (xhr, status, error) {
                    // Handle error response
                    // console.log(xhr.responseText);
                    sweetAlert("Oops...", xhr.responseText, "error");
                },
            });
        } else {
            swal(
                "Cancelled !!",
                "Hey, your imaginary file is safe !!",
                "error"
            );
        }
    });
}

$("#form-img").change(function () {
    var file = $(this).prop("files")[0]; // Use $(this) to refer to the element that triggered the event
    if (file) {
        if (file) {
            var reader = new FileReader();

            reader.onload = function (e) {
                var imageUrl = e.target.result;

                var img = $("<img>");
                img.attr("class", "img-paket");
                img.attr("src", imageUrl);
                img.attr("style", "width:30%");

                $(".img-paket").replaceWith(img);
            };

            reader.readAsDataURL(file);
        }
    } else {
        var img = $("<img>");
        img.attr("class", "img-paket");
        imageUrl = "/template/admin2/assets/images/lightgallry/01.jpg";
        img.attr("src", imageUrl);
    }
});

function saveData() {
    // formdata
    var formData = new FormData();
    var file = $("#form-img")[0].files[0];
    formData.append("image", file);
    formData.append("data", JSON.stringify(isObject));

    $.ajax({
        url: baseURL + "/saveTransaction",
        type: "POST",
        data: formData,
        dataType: "json",
        processData: false, // Important: prevent jQuery from automatically processing the data
        contentType: false,
        beforeSend: function () {
            Swal.fire({
                title: "Loading",
                text: "Please wait...",
                showConfirmButton: false,
            });
        },
        complete: function () {},
        success: function (response) {
            // Handle response sukses
            if (response.code == 0) {
                swal("Saved !", response.message, "success").then(function () {
                    location.reload();
                });
                // Reset form
            } else {
                sweetAlert("Oops...", response.message, "error");
            }
        },
        error: function (xhr, status, error) {
            // Handle error response
            // console.log(xhr.responseText);
            sweetAlert("Oops...", xhr.responseText, "error");
        },
    });
}

let imgUrls = [];

// async function generateProdCode(code_br) {
//     try {

//         const data = await new Promise((resolve, reject) => {
//             $.ajax({
//                 url: baseURL + "/getRandomCode",
//                 type: "POST",
//                 contentType: "application/json",
//                 data: JSON.stringify({ barcode_code: code_br }),
//                 success: function (response) {

//                     if (parseInt(response.code) == 0) {
//                         resolve(response.data);
//                     } else {
//                         reject(new Error(response.message));
//                     }
//                 },
//                 error: function (xhr, status, error) {
//                     reject(new Error(xhr.responseText || error));
//                 },
//             });
//         });

//         $("#img-prod").attr("src", data.img_url);
//         setImagePackage(data.img_url, $(".img-prod"));
//         $("#form-code").val(data.prod_code);

//         const imgUrl = data.img_url;
//         imgUrls.push(imgUrl);

//     } catch (error) {
//         sweetAlert("Oops...", error.message, "error");
//     }
// }

function setNullProd() {
    $("#form-code").val("");
    setImagePackage(null, $(".img-prod"));
}

// async function printImages() {
//     jml_barcode = $('#form-barcode-jml').val()

//     Swal.fire({
//         title: "Loading",
//         text: "Please wait...",
//         allowOutsideClick: false,
//         onBeforeOpen: () => {
//             Swal.showLoading();
//         }
//     });

//     if (jml_barcode > 0) {
//         for (let index = 0; index < jml_barcode; index++) {
//             await generateProdCode($("#form-barcode-br").val())
//         }
//     }

//     Swal.close();

//     if (imgUrls.length == 0) {
//         alert("Tidak ada gambar untuk dicetak.");
//         return;
//     }

//     let printWindow = window.open('', '_blank');

//     // Buat konten untuk jendela baru
//     let imagesHtml = imgUrls.map(url => `<img src="${url}" alt="Product Image" style="max-width: 100%; height: auto; margin: 10px;">`).join('');

//     printWindow.document.write(`
//         <html>
//         <head>

//             <style>
//                 body {
//                     text-align: center;
//                     margin: 0;
//                 }
//                 img {
//                     max-width: 200px;
//                     max-height: 150px;
//                     height: auto;
//                     margin: 15px;
//                 }
//             </style>
//         </head>
//         <body>
//             <h1>${$("#form-barcode-br").val()}</h1>
//             ${imagesHtml}
//         </body>
//         </html>
//     `);

//     printWindow.document.close();
//     printWindow.focus();

//     printWindow.onload = function () {
//         printWindow.print();
//         printWindow.onafterprint = function () {
//             printWindow.close();
//         };
//     };
// }
