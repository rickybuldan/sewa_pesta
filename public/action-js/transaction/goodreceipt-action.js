let dtpr;

$(document).ready(function () {
    // $(".js-example-basic-single").select2({
    //     dropdownParent: $("#modal-data"),
    //     placeholder: "Pilih Kategori",
    // });

    getListData();
});

function getinvoice(params) {
    location.href = baseURL + "/invoice_procurement?noinvoice=" + params.no_transaction;
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

function getListData() {
    dtpr = $("#table-list").DataTable({
        ajax: {
            url: baseURL + "/loadGlobal",
            type: "POST",
            contentType: "application/json", // Set content type to JSON
            data: function (d) {
                return JSON.stringify({
                    tableName: "procurements",
                    where: "status IN (20,30)"
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
            { data: "supplier_name" },
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
                        $rowData += ` <span class="badge rounded-pill text-bg-success">diverifikasi</span>`;
                    }
                    if (row.status == 30) {
                        $rowData += ` <span class="badge rounded-pill text-bg-info">Diterima</span>`;
                    }
                    return $rowData;
                },
                visible: true,
                targets: 1,
                className: "text-center",
            },
            // {
            //     mRender: function (data, type, row) {

            //         return formatRupiah(
            //             row.price_total);
            //     },
            //     visible: true,
            //     targets: 2,
            //     className: "text-center",
            // },
            // {
            //     mRender: function (data, type, row) {

            //         return formatRupiah(
            //             row.denda);
            //     },
            //     visible: true,
            //     targets: 2,
            //     className: "text-center",
            // },
            // {
            //     mRender: function (data, type, row) {

            //         $rowData = `<a href="/storage/${row.file_path}">Bukti DP </a>`;
            //         $rowData += `<a href="/storage/${row.file_path_paid}">Bukti Lunas </a>`;

            //         return $rowData;
            //     },

            //     visible: true,
            //     targets: 4,
            //     className: "text-center",
            // },
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

                    // var allowedRoles = [6,15];
                    // if (allowedRoles.includes(parseInt(roleid))) {
                    //     if (row.status == 10) {
                    //         $rowData += `<button type="button" class="btn btn-primary btn-sm me-2 verif-btn">Verifikasi</i></button>`;
                    //         $rowData += `<button type="button" class="btn btn-danger btn-sm me-2 tolak-btn">Tolak</i></button>`;
                    //     }
                    // }

                    if (row.status == 10) {
                        $rowData = `Menunggu Persetujuan`
                    }

                    if (row.status == 20) {
                        $rowData = `<button type="button" class="btn btn-info btn-sm me-2 detail-btn">Detail</button>`;
                    }
                    if (row.status == 30) {
                        $rowData = `<button type="button" class="btn btn-info btn-sm me-2 edit-btn">Invoice</button>`;
                    }
                    
                    return $rowData;
                },
                visible: true,
                targets: 3,
                className: "text-center",
            },
        ],

        drawCallback: function (settings) {

        },
    });

    // var api = this.api();
    // var rows = api.rows({ page: "current" }).nodes();
    // var last = null;

    $('body').on('click', '.edit-btn', function () {
        var tr = $(this).closest('tr');
        if (tr.hasClass('child')) tr = tr.prev();
        var rowData = dtpr.row(tr).data();
        // console.log(rowData);
        getinvoice(rowData);
    });

    $('body').on('click', '.verif-btn', function () {
        var tr = $(this).closest('tr');
        if (tr.hasClass('child')) tr = tr.prev();
        var rowData = dtpr.row(tr).data();
        verifTransaction(rowData);
    });

    $('body').on('click', '.tolak-btn', function () {
        var tr = $(this).closest('tr');
        if (tr.hasClass('child')) tr = tr.prev();
        var rowData = dtpr.row(tr).data();
        denyTransaction(rowData);
    });

    $('body').on('click', '.print-barcode-btn', function () {
        var tr = $(this).closest('tr');
        if (tr.hasClass('child')) tr = tr.prev();
        var rowData = dtpr.row(tr).data();

        $("#form-barcode-br").val(rowData.prod_code);
        $("#modal-data-barcode").modal("show");
    });

    $('body').on('click', '.detail-btn', function () {
        var tr = $(this).closest('tr');
        if (tr.hasClass('child')) tr = tr.prev();
        var rowData = dtpr.row(tr).data();
        $("#form-id-procurement").val(rowData.no_transaction)
        getListDataDetail(rowData.no_transaction)
    });
}

function getListDataDetail(id_transaction) {
    $("#modal-data").modal("show")
    if ($.fn.DataTable.isDataTable("#table-list2")) {
        $("#table-list2").DataTable().clear().destroy();
    }

    dtprs = $("#table-list2").DataTable({
        ajax: {
            url: baseURL + "/invoice_procurement?noinvoice=" + id_transaction,
            type: "POST",
            contentType: "application/json", // Set content type to JSON
            // data: function (d) {
            //     return JSON.stringify({
            //         tableName: "",
            //         where: "pd.id_procurement = " + id_transaction
            //     });
            // },
            dataSrc: function (response) {
                if (response.code == 0) {
                    es = response.data;
                    // console.log(es);
                    $("#form-name").val(es[0].submitted_by)
                    console.log(es[0].name);

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
            { data: "product_name" },
            { data: "item" },
            {
                data: "accept_item",
                render: function (data, type, row, meta) {
                    return `<input type="number" class="form-control form-control-xl accept-input" 
                   name="accept_item_${row.id}" 
                   data-id="${row.id}" 
                   data-price="${row.price}" 
                   data-id-product="${row.id_product}" 
                   value="${data ?? 0}" 
                   min="0" style="width: 100%;">`;
                }
            },
            { data: "unit_name" },
            {
                data: "price",
                render: function (data, type, row, meta) {
                    return `<input type="number" class="form-control form-control-sm price-input" 
                   name="price_${row.id}" 
                   data-id="${row.id}" 
                   value="${0}" 
                   min="0" style="width: 100%;">`;
                }
            },
            {
                data: null,
                render: function (data, type, row) {
                    const subtotal = (row.accept_item ?? 0) * (row.price ?? 0);
                    return `<input type="text" class="form-control subtotal-input" 
                   name="sub_total_${row.id}" 
                   data-id="${row.id}" 
                   value="${subtotal.toFixed(2)}" 
                   readonly />`;
                }
            }

        ],
        columnDefs: [
            // {
            //     mRender: function (data, type, row) {
            //         $rowData = row.item +" "+row.unit_name;

            //     },
            //     visible: true,
            //     targets: 2,
            //     className: "text-center",
            // },
            // {
            //     mRender: function (data, type, row) {

            //         return formatRupiah(
            //             row.price_total);
            //     },
            //     visible: true,
            //     targets: 2,
            //     className: "text-center",
            // },
            // {
            //     mRender: function (data, type, row) {

            //         return formatRupiah(
            //             row.denda);
            //     },
            //     visible: true,
            //     targets: 2,
            //     className: "text-center",
            // },
            // {
            //     mRender: function (data, type, row) {

            //         $rowData = `<a href="/storage/${row.file_path}">Bukti DP </a>`;
            //         $rowData += `<a href="/storage/${row.file_path_paid}">Bukti Lunas </a>`;

            //         return $rowData;
            //     },

            //     visible: true,
            //     targets: 4,
            //     className: "text-center",
            // },
            // {
            //     mRender: function (data, type, row) {

            //         return row.weight + "gr";
            //     },
            //     visible: true,
            //     targets: 5,
            //     className: "text-center",
            // },
            // {
            //     mRender: function (data, type, row) {
            //         $rowData = `<button type="button" class="btn btn-info btn-sm me-2 detail-btn">Detail</button>`;
            //         var allowedRoles = [6,15];
            //         if (allowedRoles.includes(parseInt(roleid))) {
            //             if (row.status == 10) {
            //                 $rowData += `<button type="button" class="btn btn-primary btn-sm me-2 verif-btn">Verifikasi</i></button>`;
            //                 $rowData += `<button type="button" class="btn btn-danger btn-sm me-2 tolak-btn">Tolak</i></button>`;
            //             }
            //         }
            //         if(row.status == 30){
            //             $rowData += `<button type="button" class="btn btn-info btn-sm me-2 edit-btn">Invoice</button>`;
            //         }

            //         return $rowData;
            //     },
            //     visible: true,
            //     targets: 4,
            //     className: "text-center",
            // },
        ],

        drawCallback: function (settings) {

        },
    });

    // var api = this.api();
    // var rows = api.rows({ page: "current" }).nodes();
    // var last = null;

    // $('body').on('click', '.edit-btn', function () {
    //     var tr = $(this).closest('tr');
    //     if (tr.hasClass('child')) tr = tr.prev();
    //     var rowData = dtpr.row(tr).data();
    //     // console.log(rowData);
    //     getinvoice(rowData);
    // });

    // $('body').on('click', '.verif-btn', function () {
    //     var tr = $(this).closest('tr');
    //     if (tr.hasClass('child')) tr = tr.prev();
    //     var rowData = dtpr.row(tr).data();
    //     verifTransaction(rowData);
    // });

    // $('body').on('click', '.tolak-btn', function () {
    //     var tr = $(this).closest('tr');
    //     if (tr.hasClass('child')) tr = tr.prev();
    //     var rowData = dtpr.row(tr).data();
    //     denyTransaction(rowData);
    // });

    // $('body').on('click', '.print-barcode-btn', function () {
    //     var tr = $(this).closest('tr');
    //     if (tr.hasClass('child')) tr = tr.prev();
    //     var rowData = dtpr.row(tr).data();

    //     $("#form-barcode-br").val(rowData.prod_code);
    //     $("#modal-data-barcode").modal("show");
    // });

    // Saat jumlah diterima berubah
    $('body').on('input change', '.accept-input', function () {
        id = $(this).data('id');
        qty = parseFloat($(this).val()) || 0;
        price = parseFloat($(`input[name="price_${id}"]`).val()) || 0;
        subtotal = qty * price;
        console.log(id);


        $(`input[name="sub_total_${id}"]`).val(subtotal.toFixed(2));
        updateGrandTotal()
    });

    // Saat harga berubah
    $('body').on('input change', '.price-input', function () {
        id = $(this).data('id');
        price = parseFloat($(this).val()) || 0;
        qty = parseFloat($(`input[name="accept_item_${id}"]`).val()) || 0;
        subtotal = qty * price;

        $(`input[name="sub_total_${id}"]`).val(subtotal.toFixed(2));

        // sinkronkan harga ke input qty (jika kamu mau)
        $(`input[name="accept_item_${id}"]`).attr('data-price', price);
        updateGrandTotal()
    });

    function updateGrandTotal() {
        let total = 0;
        $('.subtotal-input').each(function () {
            const val = parseFloat($(this).val()) || 0;
            total += val;
        });

        $('#grand-total').text(total.toFixed(2));
    }



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
    $("#form-code").val(rowData.prod_code);
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
    function getItemsData() {
        items = [];

        $('#table-list2 tbody tr').each(function () {
            row = $(this);
            id = row.find('.accept-input').data('id');
            id_product = row.find('.accept-input').data('id-product');
            accept_item = parseFloat(row.find(`input[name="accept_item_${id}"]`).val()) || 0;
            price = parseFloat(row.find(`input[name="price_${id}"]`).val()) || 0;
            subtotal = parseFloat(row.find(`input[name="sub_total_${id}"]`).val()) || 0;
            

            items.push({
                id: id,
                id_product:id_product,
                accept_item: accept_item,
                price: price,
                subtotal: subtotal
            });
        });

        return items;
    }


    isObject['items'] = getItemsData()
    isObject['id_procurement'] = $("#form-id-procurement").val()
    saveData();
}


function saveData() {
    // formdata
    console.log(isObject);
    var formData = new FormData();
    // var file = $("#form-img")[0].files[0];
    // formData.append("image", file);
    formData.append("data", JSON.stringify(isObject));

    $.ajax({
        url: baseURL + "/saveAcceptProcurement",
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



function denyTransaction(paramObj) {
    // formdata

    isReq = {}
    isReq.id = paramObj.id
    isReq.status = 30


    var formData = new FormData();
    formData.append("data", JSON.stringify(isReq));

    $.ajax({
        url: baseURL + "/verifTransaction",
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

function verifTransaction(paramObj) {
    // formdata

    isReq = {}
    isReq.id = paramObj.id
    isReq.status = 20

    var formData = new FormData();
    formData.append("data", JSON.stringify(isReq));

    $.ajax({
        url: baseURL + "/verifProcurement",
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