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
            url: baseURL + "/loadGlobal",
            type: "POST",
            contentType: "application/json", // Set content type to JSON
            data: function (d) {
                return JSON.stringify({
                    tableName: "master_constants",
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
            { data: "constant_name" },
            { data: "type" },
            { data: "value" },
            // { data: "weight" },
            { data: "id" },
        ],
        columnDefs: [
            {
                mRender: function (data, type, row) {
                    $rowData = row.constant_name;
                    if (row.is_active == 0) {
                        $rowData += ` <span class="badge rounded-pill text-bg-primary">Tidak Digunakan</span>`;
                    }
                     if (row.is_active == 1) {
                        $rowData += ` <span class="badge rounded-pill text-bg-danger">Digunakan</span>`;
                    }
                    return $rowData;
                },
                visible: true,
                targets: 1,
                className: "text-center",
            },
            {
                mRender: function (data, type, row) {
                    $rowData = ''
                    if (row.type == 1) {
                        $rowData += ` <span class="badge rounded-pill text-bg-primary">Nominal</span>`;
                    }
                    if (row.type == 2) {
                        $rowData += ` <span class="badge rounded-pill text-bg-danger">Persen</span>`;
                    }
                    return $rowData;
                },
                visible: true,
                targets: 2,
                className: "text-center",
            },
            {
                mRender: function (data, type, row) {
                    $rowData = ''
                    if (row.type == 1) {
                        $rowData += formatRupiah(row.value);
                    }
                    if (row.type == 2) {
                        $rowData += row.value +" %";
                    }
                    return $rowData;
                },
                visible: true,
                targets: 3,
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
                    $rowData = ''
                    if (row.is_active == 0) {
                        $rowData += `<button type="button" class="btn btn-info btn-sm me-2 edit-btn">Gunakan</button>`;
                    }
                    else{
                        $rowData += `<button type="button" disabled class="btn btn-info btn-sm me-2 edit-btn">Gunakan</button>`;
                    }
                 
                    // $rowData += `<button type="button" class="btn btn-dark btn-sm print-barcode-btn"><i class="fa fa-print" aria-hidden="true"></i></button>`;
                    return $rowData;
                },
                visible: true,
                targets: 4,
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

                    setActiveConstant(rowData.id)
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



// async function loadRole() {
//     try {
//         const response = await $.ajax({
//             url: baseURL + "/getRole",
//             type: "POST",
//             dataType: "json",
//             beforeSend: function () {
//                 // Swal.fire({
//                 //     title: "Loading",
//                 //     text: "Please wait...",
//                 // });
//             },
//         });

//         const res = response.data.map(function (item) {
//             return {
//                 id: item.id,
//                 text: item.role_name,
//             };
//         });

//         $("#form-role").select2({
//             // theme: "bootstrap-5",
//             // width: $( this ).data( 'width' ) ? $( this ).data( 'width' ) : $( this ).hasClass( 'w-100' ) ? '100%' : 'style',
   
//             data: res,
//             placeholder: "Please choose an option",
//             dropdownParent: $("#modal-data"),
//         });
//     } catch (error) {
//         sweetAlert("Oops...", error.responseText, "error");
//     }
// }


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
    $("#form-name").val("");
    $("#form-type-const").val("");
    $("#form-value-const").val("");

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
            (isObject["const_name"] = $("#form-name").val()),
            "Nama tidak boleh kosong."
        )
    )
        return false;

    if (
        validationSwalFailed(
            (isObject["type"] = $("#form-type-const").val()),
            "Tipe tidak boleh kosong."
        )
    )
        return false;

    if (
        validationSwalFailed(
            (isObject["value"] = $("#form-value-const").val()),
            "Value tidak boleh kosong."
        )
    )
        return false;
    
    saveData();
}


function saveData() {
    // formdata
    var formData = new FormData();
    formData.append("data", JSON.stringify(isObject));

    $.ajax({
        url: baseURL + "/saveConstant",
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

function setActiveConstant(idco) {
    // formdata
    isObject = {}
    isObject.id = idco
    isObject.is_active = 1
    var formData = new FormData();
    formData.append("data", JSON.stringify(isObject));

    $.ajax({
        url: baseURL + "/saveConstant",
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
