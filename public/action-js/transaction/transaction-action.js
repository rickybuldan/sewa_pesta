let dtpr;

$(document).ready(function () {
    // $(".js-example-basic-single").select2({
    //     dropdownParent: $("#modal-data"),
    //     placeholder: "Pilih Kategori",
    // });

    getListData();
});

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

function getListData() {
    dtpr = $("#table-list").DataTable({
        ajax: {
            url: baseURL + "/getOverviewTransaction",
            type: "POST",
            contentType: "application/json", // Set content type to JSON
            data: function (d) {
                return JSON.stringify({
                    tableName: "transactions",
                });
            },
            dataSrc: function (response) {
                if (response.code == 0) {
                    es = response.data;
                    // console.log(es);

                    return response.data;
                } else {
                    return response;
                }
            },
            complete: function () {
                // loaderPage(false);
            },
        },
        language: {
            oPaginate: {
                sFirst: "First",
                sLast: "Last",
                sNext: ">",
                sPrevious: "<",
            },
        },
        columns: [
            {
                data: "id",
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                },
            },
            { data: "no_transaction" },
            { data: "price_total" },
            { data: "denda" },
            { data: "file_path" },
            // { data: "weight" },
            { data: "id" },
        ],
        columnDefs: [
            {
                mRender: function (data, type, row) {
                    $rowData = row.no_transaction;
                    if (row.status == 10) {
                        $rowData += ` <span class="badge rounded-pill text-bg-primary">Proses</span>`;
                    }
                     if (row.status == 20) {
                        $rowData += ` <span class="badge rounded-pill text-bg-danger">Kirim</span>`;
                    }
                    if (row.status == 30) {
                        $rowData += ` <span class="badge rounded-pill text-bg-dark">Selesai</span>`;
                    }
                    return $rowData;
                },
                visible: true,
                targets: 1,
                className: "text-center",
            },
            {
                mRender: function (data, type, row) {

                    return formatRupiah(
                        row.price_total);
                },
                visible: true,
                targets: 2,
                className: "text-center",
            },
            {
                mRender: function (data, type, row) {

                    return formatRupiah(
                        row.denda);
                },
                visible: true,
                targets: 3,
                className: "text-center",
            },
            {
                mRender: function (data, type, row) {
                  
                    
                    $rowData = `<a href="/storage/${row.file_path}"> Lihat </a>`;

                    return $rowData;
                },
                visible: true,
                targets: 4,
                className: "text-center",
            },
            // {
            //     mRender: function (data, type, row) {

            //         return row.weight + "gr";
            //     },
            //     visible: true,
            //     targets: 5,
            //     className: "text-center",
            // },
            {
                mRender: function (data, type, row) {
                    var $rowData = `<button type="button" class="btn btn-info btn-sm me-2 edit-btn">Invoice</button>`;
                    // $rowData += `<button type="button" class="btn btn-danger btn-sm me-2 delete-btn">Hapus</i></button>`;
                    // $rowData += `<button type="button" class="btn btn-dark btn-sm print-barcode-btn"><i class="fa fa-print" aria-hidden="true"></i></button>`;
                    return $rowData;
                },
                visible: true,
                targets: 5,
                className: "text-center",
            },
        ],
        drawCallback: function (settings) {
            var api = this.api();
            var rows = api.rows({ page: "current" }).nodes();
            var last = null;

            $(rows)
                .find(".edit-btn")
                .on("click", function () {
                    var tr = $(this).closest("tr");
                    var rowData = dtpr.row(tr).data();

                    editdata(rowData);
                });
            $(rows)
                .find(".delete-btn")
                .on("click", function () {
                    var tr = $(this).closest("tr");
                    var rowData = dtpr.row(tr).data();
                    deleteData(rowData);
                });
            $(rows)
                .find(".print-barcode-btn")
                .on("click", function () {
                    var tr = $(this).closest("tr");
                    var rowData = dtpr.row(tr).data();

                    $("#form-barcode-br").val(rowData.prod_code)
                    $("#modal-data-barcode").modal("show")
                });


        },
    });
}

let isObject = {};

function editdata(rowData) {
    isObject = rowData;
    rupiahprice = formatRupiah(rowData.price)

    setImagePackage("/storage/" + rowData.file_path, $(".img-paket"))
    $("#form-name").val(rowData.product_name);
    $("#form-price").val(rupiahprice);
    $("#form-desc").val(rowData.desc);
    $("#form-weight").val(rowData.weight);
    $("#form-max").val(rowData.stock_maximum);
    $("#form-min").val(rowData.stock_minimum);
    $("#form-init").val(rowData.stock);
    $("#form-code").val(rowData.prod_code)
    // generateProdCode($("#form-code").val())
    $("#modal-data").modal("show");
}

$("#add-btn").on("click", function (e) {
    e.preventDefault();
    isObject = {};
    isObject["id"] = null;
    setImagePackage(null, $(".img-paket"))
    setImagePackage(null, $(".img-prod"))

    $("#form-name").val("");
    $("#form-price").val("");
    $("#form-desc").val("");
    $("#form-weight").val("");
    $("#form-max").val("");
    $("#form-min").val("");
    $("#form-init").val("");
    $("#form-code").val("")

    $("#modal-data").modal("show");
});

$("#save-btn").on("click", function (e) {
    e.preventDefault();
    checkValidation();
});

function checkValidation() {
    // console.log($el);
    if (
        validationSwalFailed(
            (isObject["product_name"] = $("#form-name").val()),
            "Nama produk tidak boleh kosong."
        )
    )
        return false;

    // if (
    //     validationSwalFailed(
    //         (isObject["prod_code"] = $("#form-code").val()),
    //         "Kode produk tidak boleh kosong."
    //     )
    // )
    //     return false;
    pricexx = unformatRupiah($("#form-price").val());
    if (
        validationSwalFailed(
            (isObject["price"] = pricexx),
            "Harga tidak boleh kosong"
        )
    )
        return false;

    if ($("#form-img").val == null) {
        setImagePackage();
    }

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
            (isObject["desc"] = $("#form-desc").val()),
            "Deskripsi tidak boleh kosong"
        )
    )
        return false;
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
                    });
                },
                complete: function () { },
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
    console.log(isObject);
    var formData = new FormData();
    var file = $("#form-img")[0].files[0];
    formData.append("image", file);
    formData.append("data", JSON.stringify(isObject));

    $.ajax({
        url: baseURL + "/saveProduct",
        type: "POST",
        data: formData,
        dataType: "json",
        processData: false, // Important: prevent jQuery from automatically processing the data
        contentType: false,
        beforeSend: function () {
            Swal.fire({
                title: "Loading",
                text: "Please wait...",
            });
        },
        complete: function () { },
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
    $("#form-code").val("")
    setImagePackage(null, $(".img-prod"))
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

