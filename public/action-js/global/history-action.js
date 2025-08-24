// $(document).ready(function () {
//     $(".sel-courier").select2({
//         placeholder: "Pilih Kurir",
//     })
//     $(".sel-provinces").select2({
//         placeholder: "Pilih Provinsi",
//     })
//     $(".sel-cities").select2({
//         placeholder: "Pilih Kota",
//     })
//     $(".sel-courier-package").select2({
//         placeholder: "Pilih Layanan",
//     })

// });

// globSumDay = 1;
// globStartDate = null;
// globEndDate = null;
// globGrandTotal = 0;
// globArrCart = []
// flatpickr("#dateRange", {
//     mode: "range",
//     enableTime: true,
//     enableSeconds: true,
//     dateFormat: "Y-m-d H:i:S",
//     minDate: new Date(),
//     defaultDate: [
//         new Date(), // hari ini
//         new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000), // +1 hari
//     ],
//     onChange: function (selectedDates, dateStr, instance) {
//         if (selectedDates.length === 2) {
//             let start = selectedDates[0];
//             let end = selectedDates[1];

//             globStartDate = start;
//             globEndDate = end;

//             let diffTime = end.getTime() - start.getTime();

//             if (diffTime < 24 * 60 * 60 * 1000) {
//                 validationSwalFailed(null, "Minimal penyewaan satu hari.");

//                 let newEnd = new Date(start.getTime() + 24 * 60 * 60 * 1000);
//                 instance.setDate([start, newEnd], true);
//                 return;
//             }

//             globSumDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//             loadOrderCart();
//         }
//     },
//     onClose: function (selectedDates, dateStr, instance) {
//         if (selectedDates.length < 2) {
//             validationSwalFailed(null, "Silakan pilih tanggal mulai dan tanggal akhir.");
//             instance.clear(); // Reset input
//         }
//     },
//     allowInput: true,
// });



loadOrderCart()

function loadOrderCart() {
    let xid = uid || 0;

    $.ajax({
        url: baseURL + "/home/checkBillTransaction",
        type: "POST",
        data: JSON.stringify({
            id: xid,
        }),
        dataType: "json",
        contentType: "application/json",
        beforeSend: function () {
            loadBlockUI();
        },
        complete: function () {
            unblockUI();
        },
        success: function (response) {
            if (response.code == 0) {
                const data = response.data;
                $('.pro-count').text(data.length);

                let rows = "";
                let grandTotal = 0;
                i = 1

                data.forEach(item => {
                    $rowData = item.no_transaction;
                    $btnact = `-`;
                    $state = ''
                    $ctlunas = `<span class="badge rounded-pill badge-warning">DP</span>`;
                    $invdp = `<span class="badge rounded-pill badge-warning">DP</span>`;
                    $btnuploadpaid = ``
                    if (item.type_pay) {
                        $ctlunas = `<span class="badge rounded-pill badge-info">Cash</span>`;
                    }

                    if (item.status == 10) {
                        $btnact = `<button onclick="getpayment('${item.no_transaction}')" type="button" class="btn btn-danger btn-sm me-2 ">Bayar Sekarang!</button>`;
                        $state = ` <span class="badge rounded-pill badge-primary">Proses</span>`;
                    }
                    if (item.status == 11) {
                        $btnact = `<button onclick="getinvoice('${item.no_transaction}')" type="button" class="btn btn-info btn-sm me-2 ">Invoice</button>`;
                        $state = ` <span class="badge rounded-pill badge-info">Pembayaran DP Berhasil</span>`;
                        if (!item.type_pay && item.is_bill) {
                            $btnuploadpaid = `<button onclick="showModalFilePaid('${item.id}',${(item.price_total-item.nominal_payment)})" type="button" class="btn btn-warning btn-sm me-2">Upload Pelunasan</button>`;
                        }
                    }
                    if (item.status == 12) {
                        $btnact = `<button onclick="getinvoice('${item.no_transaction}')" type="button" class="btn btn-info btn-sm me-2 ">Invoice</button>`;
                        $state = ` <span class="badge rounded-pill badge-info">Lunas</span>`;
                    }
                    if (item.status == 13) {
                        $btnact = `<button onclick="getinvoice('${item.no_transaction}')" type="button" class="btn btn-info btn-sm me-2 ">Invoice</button>`;
                        $state = ` <span class="badge rounded-pill badge-info">Verifikasi DP Berhasil</span>`;
                    }
                    if (item.status == 14) {
                        $btnact = `<button onclick="getinvoice('${item.no_transaction}')" type="button" class="btn btn-info btn-sm me-2 ">Invoice</button>`;
                        $state = ` <span class="badge rounded-pill badge-info">Verifikasi Lunas</span>`;
                    }
                    if (item.status == 50) {
                        if (!item.type_pay) {
                            $btnuploadpaid = `<button onclick="showModalFilePaid('${item.id}',${(item.nominal_payment)},'1')" type="button" class="btn btn-warning btn-sm me-2">Upload Bukti Ulang</button>`;
                        }
                        $state = ` <span class="badge rounded-pill badge-danger">Transaksi ditolak</span>`;
                    }
                    if (item.status == 20) {
                        $btnact = `<button onclick="getinvoice('${item.no_transaction}')" type="button" class="btn btn-info btn-sm me-2 ">Invoice</button>`;
                        $state = ` <span class="badge rounded-pill badge-warning">Kirim</span>`;
                       
                    }
                    if (item.status == 30) {
                        $btnact = `<button onclick="getinvoice('${item.no_transaction}')" type="button" class="btn btn-info btn-sm me-2 ">Invoice</button>`;
                        $state = ` <span class="badge rounded-pill badge-dark">Selesai</span>`;
                    }
                    
                    // price = parseFloat(item.price || 0);
                    // quantity = parseInt(item.qty || 0);

                    // totalItem = price * quantity * globSumDay;
                    // grandTotal += totalItem;

                    // imgSrc = item.file_path
                    //     ? `/storage/${item.file_path}`
                    //     : "public/template/frontend/imgs/shop/product-1-1.jpg";

                    rows += `
                        <tr>
                         
                            <td class="text-center">
                                ${$rowData} 
                            </td>
                            <td class="text-center">
                                ${$ctlunas}
                            </td>
                            <td class="text-center">
                                ${$state} 
                            </td>
                            <td class="text-center">
                                <a href="/storage/${item.file_path}"> Lihat </a>
                            </td>
                            <td class="text-center">
                                <a href="/storage/${item.file_path_paid}"> Lihat </a>
                            </td>
                            <td class="text-center">
                                <div class="d-flex justify-content-center">
                                    ${$btnuploadpaid}&nbsp;${$btnact}
                                </div>
                            </td>
                        </tr>
                    `;
                    i++
                });

                $('.order_table tbody').html(rows);

            } else {
                Swal.fire({
                    title: "Oops...",
                    text: response.info + "- History anda kosong !",
                    icon: "error",
                }).then(() => {
                    window.location.href = "/home";
                });
            }
        },
        error: function (xhr) {
            sweetAlert("Oops...", xhr.responseText, "error");
        },
    });
}

function getinvoice(params) {
    location.href = baseURL + "/invoice?noinvoice=" + params;
}

function getpayment(params) {
    location.href = baseURL + "/home/payment?noinvoice=" + params;
}


let no_transaction_assign_paid
function showModalFilePaid(trx, total, reply) {
    if(reply){
        $(".f-title").html("Upload Bukti Ulang")
    }
    no_transaction_assign_paid = trx
    $(".total-transfer").html(formatRupiah(total))
    $("#upload-file-paid").modal("show")
}


// loadUserOrder()
// function loadUserOrder() {
//     xid = uid;
//     if (uid == "") {
//         xid = 0;
//         // sweetAlert("Oops...", 'Silakan login terlebih dahulu.', "warning");
//         // return false
//     }
//     $.ajax({
//         url: baseURL + "/home/loadGlobal",
//         type: "POST",
//         data: JSON.stringify({
//             tableName: "users u",
//             where: "u.id = " + xid + "",
//         }),
//         dataType: "json",
//         contentType: "application/json",
//         beforeSend: function () {
//             // Swal.fire({
//             //     title: "Loading",
//             //     text: "Please wait...",
//             // });
//             loadBlockUI()
//         },
//         complete: function () {
//             unblockUI()
//         },
//         success: function (response) {
//             // console.log(response);
//             // Handle response sukses
//             if (response.code == 0) {
//                 // swal("Saved !", response.info, "success").then(function () {
//                 //     // location.reload();
//                 //     location.href = baseURL+"/invoice?noinvoice="+response.data.no_transaction
//                 // });
//                 // Reset form
//                 data = response.data;
//                 $('#f-name').val(data[0].name)
//                 $('#f-phone').val(data[0].phone)
//                 $('#f-email').val(data[0].email)
//                 $('#f-address').val(data[0].address)
//                 $('#f-note-order').html()
//             } else {
//                 sweetAlert("Oops...", response.info, "error");
//             }
//         },
//         error: function (xhr, status, error) {
//             // Handle error response
//             // console.log(xhr.responseText);
//             sweetAlert("Oops...", xhr.responseText, "error");
//         },
//     });
// }

isObject = {}
function checkValidation() {
    // console.log($el);
    if (
        validationSwalFailed(
            (isObject["name"] = $("#f-name").val()),
            "Nama tidak boleh kosong."
        )
    )
        return false;

    if (
        validationSwalFailed(
            (isObject["phone"] = $("#f-phone").val()),
            "Phone tidak boleh kosong."
        )
    )
        return false;

    if (
        validationSwalFailed(
            (isObject["address"] = $("#f-address").val()),
            "Alamat tidak boleh kosong."
        )
    )
        return false;

    isObject["day"] = globSumDay;
    isObject["grand_total"] = globGrandTotal;

    let rangeValue = $("#dateRange").val();

    if (rangeValue.includes(" to ")) {
        let [startDate, endDate] = rangeValue.split(" to ");
        globStartDate = startDate;
        globEndDate = endDate;
    }

    isObject["start_date"] = globStartDate;
    isObject["end_date"] = globEndDate;


    return true
}

$('.upload-lunas-btn').click(function () {

    saveDataBuktiPaid()
    function saveDataBuktiPaid() {
        // formdata
        var formData = new FormData();
        var file = $("#form-img")[0].files[0]
        isObject["id"] = no_transaction_assign_paid;
        isObject["nominal_payment"] = unformatRupiah($(".total-transfer").text())
        if (
            validationSwalFailed(
                (file),
                "Bukti pelunasan tidak boleh kosong"
            )
        )
            return false;
        formData.append("image", file);
        formData.append("data", JSON.stringify(isObject));

        $.ajax({
            url: baseURL + "/home/saveBuktiPaid",
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
            complete: function () { },
            success: function (response) {
                // Handle response sukses
                if (response.code == 0) {
                    swal("Saved !", response.info, "success").then(function () {
                        location.reload();
                        // getinvoice(response.data);

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


});


$('#payButton').click(function () {

    if (checkValidation() != false) {


        saveData()
        function saveData() {
            // formdata
            var formData = new FormData();
            var file = $("#form-img")[0].files[0];

            if (
                validationSwalFailed(
                    (file),
                    "Bukti pembayaran tidak boleh kosong"
                )
            )
                return false;
            formData.append("image", file);
            formData.append("data", JSON.stringify(isObject));

            $.ajax({
                url: baseURL + "/home/saveTransaction",
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
                complete: function () { },
                success: function (response) {
                    // Handle response sukses
                    if (response.code == 0) {
                        swal("Saved !", response.info, "success").then(function () {
                            location.reload();
                            // getinvoice(response.data);

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

    }
});


