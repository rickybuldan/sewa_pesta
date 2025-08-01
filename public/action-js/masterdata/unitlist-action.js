let dtpr;

$(document).ready(function () {
    // $(".js-example-basic-single").select2({
    //     dropdownParent: $("#modal-data"),
    //     placeholder: "Pilih Kategori",
    // });

    getListData();
});

function getListData() {
    dtpr = $("#table-list").DataTable({
        ajax: {
            url: baseURL + "/loadGlobal",
            type: "POST",
            contentType: "application/json", // Set content type to JSON
            data: function (d) {
                return JSON.stringify({
                    tableName: "units",
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
            { data: "unit_name" },
            { data: "id" },
        ],
        columnDefs: [
            
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
                    var $rowData = `<button type="button" class="btn btn-info btn-sm me-2 edit-btn">Edit</button>`;
                    $rowData += `<button type="button" class="btn btn-danger btn-sm me-2 delete-btn">Hapus</i></button>`;
                    // $rowData += `<button type="button" class="btn btn-dark btn-sm print-barcode-btn"><i class="fa fa-print" aria-hidden="true"></i></button>`;
                    return $rowData;
                },
                visible: true,
                targets: 2,
                className: "text-center",
            },
        ],
        drawCallback: function (settings) {
            var api = this.api();
            var rows = api.rows({ page: "current" }).nodes();
            var last = null;

            $('body').on('click', '.edit-btn', function () {
                var tr = $(this).closest('tr');
                if (tr.hasClass('child')) tr = tr.prev(); // kalau tombol ada di child row
                var rowData = dtpr.row(tr).data();
                editdata(rowData);
            });

            $('body').on('click', '.delete-btn', function () {
                var tr = $(this).closest('tr');
                if (tr.hasClass('child')) tr = tr.prev();
                var rowData = dtpr.row(tr).data();
                deleteData(rowData);
            });

            $('body').on('click', '.print-barcode-btn', function () {
                var tr = $(this).closest('tr');
                if (tr.hasClass('child')) tr = tr.prev();
                var rowData = dtpr.row(tr).data();

                $("#form-barcode-br").val(rowData.prod_code);
                $("#modal-data-barcode").modal("show");
            });



        },
    });
}

let isObject = {};

function editdata(rowData) {
    isObject = rowData;
  
    $("#form-name").val(rowData.unit_name);
    $("#modal-data").modal("show");
}

$("#add-btn").on("click", function (e) {
    e.preventDefault();
    isObject = {};
    isObject["id"] = null;
    
    $("#form-name").val("");
    
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
            (isObject["unit_name"] = $("#form-name").val()),
            "Nama satuan tidak boleh kosong."
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
                data: JSON.stringify({ id: data.id, tableName: "units" }),
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
                        swal("Deleted !", response.info, "success").then(
                            function () {
                                location.reload();
                            }
                        );
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
        } else {
            swal(
                "Cancelled !!",
                "Hey, your imaginary file is safe !!",
                "error"
            );
        }
    });
}

function saveData() {
    // formdata
    console.log(isObject);
    var formData = new FormData();
    formData.append("data", JSON.stringify(isObject));

    $.ajax({
        url: baseURL + "/saveUnit",
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
                swal("Saved !", response.info, "success").then(function () {
                    location.reload();
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
