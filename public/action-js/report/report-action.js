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
let month = null

function getListData() {
    dtpr = $("#table-list").DataTable({
        dom: 'Bfrtip', // Tambahkan ini agar tombol muncul
        buttons: [
            {
                extend: 'excelHtml5',
                title: 'Data Harian',
                text: 'Export Excel',
                footer: true // supaya footer ikut ke export
            },
            {
                extend: 'pdfHtml5',
                title: 'Data Harian',
                orientation: 'landscape',
                pageSize: 'A4',
                text: 'Export PDF',
                footer: false,
                customize: function (doc) {
                    doc.defaultStyle.fontSize = 10;

                    var tableNode = doc.content[1].table;
                    var colCount = tableNode.body[0].length;
                    tableNode.widths = Array(colCount).fill('*');

                    // Tambah border
                    doc.content[1].layout = {
                        hLineWidth: function () { return 0.5; },
                        vLineWidth: function () { return 0.5; },
                        hLineColor: function () { return '#000'; },
                        vLineColor: function () { return '#000'; },
                        paddingLeft: function () { return 4; },
                        paddingRight: function () { return 4; },
                        paddingTop: function () { return 2; },
                        paddingBottom: function () { return 2; }
                    };

                    // Rata tengah semua cell
                    doc.styles.tableBodyEven = { alignment: 'center' };
                    doc.styles.tableBodyOdd = { alignment: 'center' };
                    doc.styles.tableHeader = { alignment: 'center', bold: true };

                    // Hitung total unit dari kolom damage
                    var totalUnit = $('#table-list').DataTable()
                        .column(2)
                        .data()
                        .reduce(function (a, b) {
                            return parseInt(a) + parseInt(b);
                        }, 0);

                    // Tambah baris total ke tabel dengan colspan
                    var totalRow = [
                        {
                            text: 'Total Transaksi: ' + totalUnit,
                            colSpan: colCount,
                            alignment: 'right',
                            bold: true,
                            fillColor: '#f0f0f0'
                        }
                    ];
                    // Isi sel kosong untuk sisa colSpan
                    for (var i = 1; i < colCount; i++) {
                        totalRow.push({});
                    }

                    tableNode.body.push(totalRow);
                }
            }
        ],
        ajax: {
            url: baseURL + "/loadGlobal",
            type: "POST",
            contentType: "application/json", // Set content type to JSON
            data: function (d) {
                return JSON.stringify({
                    tableName: "transactions",
                    where: `DATE_FORMAT(created_at, '%Y-%m') = '${month}'`
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
            // { data: "price_total" },
            // { data: "denda" },
            { data: "price_total" },
            // { data: "file_path" },
            // { data: "weight" },
            // { data: "id" },
        ],
        columnDefs: [
            {
                mRender: function (data, type, row) {
                    $rowData = row.no_transaction;
                    if (row.status == 10) {
                        $rowData += ` <span class="badge rounded-pill text-bg-primary">Proses</span>`;
                    }
                    if (row.status == 11) {

                        $rowData += ` <span class="badge rounded-pill text-bg-info">Verifikasi DP Berhasil</span>`;
                    }
                    if (row.status == 12) {

                        $rowData += ` <span class="badge rounded-pill text-bg-info">Lunas</span>`;
                    }
                    if (row.status == 13) {

                        $rowData += ` <span class="badge rounded-pill text-bg-info">Pembayaran Berhasil</span>`;
                    }

                    if (row.status == 20) {
                        $rowData += ` <span class="badge rounded-pill text-bg-warning">Kirim</span>`;
                    }
                    if (row.status == 30) {
                        $rowData += ` <span class="badge rounded-pill text-bg-dark">Selesai</span>`;
                    }
                    if (row.status == 50) {
                        $rowData += ` <span class="badge rounded-pill text-bg-danger">Ditolak</span>`;
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
            //         var $rowData = `<button type="button" class="btn btn-info btn-sm me-2 edit-btn">Invoice</button>`;
            //         if (row.status == 13) {
            //             $rowData += `<button type="button" class="btn btn-primary btn-sm me-2 verif-btn">Verifikasi</i></button>`;
            //         }
            //         if (row.status == 10 || row.status == 11 || row.status == 12 || row.status == 13) {
            //             $rowData += `<button type="button" class="btn btn-danger btn-sm me-2 tolak-btn">Tolak</i></button>`;
            //         }

            //         // $rowData += `<button type="button" class="btn btn-danger btn-sm me-2 delete-btn">Hapus</i></button>`;
            //         // $rowData += `<button type="button" class="btn btn-dark btn-sm print-barcode-btn"><i class="fa fa-print" aria-hidden="true"></i></button>`;
            //         return $rowData;
            //     },
            //     visible: true,
            //     targets: 5,
            //     className: "text-center",
            // },
        ],

        footerCallback: function (row, data, start, end, display) {
            var api = this.api();

            // Fungsi helper untuk parsing integer
            var intVal = function (i) {
                return typeof i === 'string' ?
                    i.replace(/[^0-9]/g, '') * 1 :
                    typeof i === 'number' ?
                        i : 0;
            };

            // Hitung total semua halaman
            var total = api
                .column(2) // kolom damage
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            // Tampilkan di footer
            $(api.column(2).footer()).html(formatRupiah(total));

            // Tetap set ke input jika mau
            $("#total-pendapatan").val(formatRupiah(total));
        },
        initComplete: function (settings, json) {
            // Create an input element of type 'text' to attach Flatpickr
            var dateInput = document.createElement('input');
            dateInput.type = 'month';
            dateInput.className = 'form-control';
            dateInput.id = 'datetime-local';
            dateInput.placeholder = 'Select a month';

            $('.dt-buttons').append(dateInput);

            var textInput = document.createElement('input');
            textInput.type = 'text';
            textInput.className = 'form-control my-1';
            textInput.id = 'total-pendapatan';
            textInput.placeholder = 'Total Pendapatan';
            textInput.readOnly = true;

            $('.dt-buttons').append(textInput);


            $("#datetime-local").on("change", function () {
                month = $(this).val()
                dtpr.clear().draw(); // Clear the current data
                dtpr.ajax.reload();

            })


            // Initialize Flatpickr on the input element
            // flatpickr('#datetime-local', {
            //     dateFormat: 'Y-m', // Set the format for the visible input (only month and year)
            //     altInput: true,
            //     altFormat: 'F Y', //// Set the format for the alternate input (placeholder)
            //     onClose: function (selectedDates, dateStr, instance) {
            //         // Directly update the DataTable
            //         dtpr.clear().draw(); // Clear the current data
            //         dtpr.ajax.reload(); // Reload the DataTable using Ajax

            //         // You can also add your logic with the selected date here
            //         console.log('Selected date:', dateStr);
            //     }
            // });

            // Hide the default button created by DataTables
            // $('.dt-buttons button').hide();
        },
    });

    // var api = this.api();
    // var rows = api.rows({ page: "current" }).nodes();
    // var last = null;

}


function getListDataDetail(id_transaction) {
    $("#modal-data").modal("show")
    if ($.fn.DataTable.isDataTable("#table-list2")) {
        $("#table-list2").DataTable().clear().destroy();
    }

    dtprs = $("#table-list2").DataTable({
        ajax: {
            url: baseURL + "/loadGlobal",
            type: "POST",
            contentType: "application/json", // Set content type to JSON
            data: function (d) {
                return JSON.stringify({
                    tableName: "procurement_details pd left join products p ON p.id=pd.id_product LEFT JOIN units u ON u.id = p.id_unit left join procurements ps on pd.id_procurement = ps.id left join users us ON us.id = ps.created_by",
                    where: "pd.id_procurement = " + id_transaction
                });
            },
            dataSrc: function (response) {
                if (response.code == 0) {
                    es = response.data;
                    // console.log(es);
                    $("#form-name").val(es[0].name)
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
        buttons: [

            {
                extend: 'excel',
                text: 'Export ke Excel',
                init: function (api, node, config) {
                    // Capture the DataTables API instance
                    dtpr = api;

                    // Your DataTable initialization logic here
                },
                customize: function (xlsx) {
                    // Calculate total revenue using dtpr
                    var totalRevenue = dtpr.column(4, { search: 'applied' }).data().reduce(function (a, b) {
                        return parseInt(a) + parseInt(b);
                    }, 0);


                    // Add a new row for total revenue
                    var sheet = xlsx.xl.worksheets['sheet1.xml'];
                    var lastCol = sheet.getElementsByTagName('col').length;
                    var totalRow = sheet.getElementsByTagName('sheetData')[0].appendChild(document.createElement('row'));

                    totalRow.innerHTML = `<c r="A${lastCol + 1}" t="s">
                                            <v>${lastCol + 1}</v>
                                         </c>
                                         <c r="B${lastCol + 1}" t="n">
                                            <v>${totalRevenue}</v>
                                         </c>`;

                    // Update the sharedStrings.xml file
                    // Update the sharedStrings.xml file if available
                    var sharedStrings = xlsx.xl.sharedStrings && xlsx.xl.sharedStrings[0];
                    if (sharedStrings) {
                        sharedStrings.innerHTML += `<si><t>${totalRevenue}</t></si>`;
                    }
                }
            },
            'pdf'

        ],
        dom: 'Bfrtip',
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
            { data: "unit_name" },
        ],
        columnDefs: [
            // {
            //     mRender: function (data, type, row) {
            //         $rowData = row.no_transaction;
            //         if (row.status == 10) {
            //             $rowData += ` <span class="badge rounded-pill text-bg-primary">Proses</span>`;
            //         }

            //         if (row.status == 20) {
            //             $rowData += ` <span class="badge rounded-pill text-bg-success">diverifikasi</span>`;
            //         }
            //         if (row.status == 30) {
            //             $rowData += ` <span class="badge rounded-pill text-bg-danger">ditolak</span>`;
            //         }
            //         return $rowData;
            //     },
            //     visible: true,
            //     targets: 1,
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