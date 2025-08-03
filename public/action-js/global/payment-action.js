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

globSumDay = 1;
globStartDate = null;
globEndDate = null;
globGrandTotal = 0;
globArrCart = [];
fp = flatpickr("#dateRange", {
    mode: "range",
    dateFormat: "Y-m-d", // hanya tanggal
    minDate: new Date(),
    defaultDate: [
        new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000), // start: besok
        new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000),
    ],
    onChange: function (selectedDates, dateStr, instance) {
        if (selectedDates.length === 2) {
            let start = selectedDates[0];
            let end = selectedDates[1];

            // Pastikan jam di-set ke 00:00:00 untuk akurasi
            start.setHours(0, 0, 0, 0);
            end.setHours(0, 0, 0, 0);

            globStartDate = start;
            globEndDate = end;

            let diffTime = end.getTime() - start.getTime();

            if (diffTime < 24 * 60 * 60 * 1000) {
                validationSwalFailed(null, "Minimal penyewaan satu hari.");

                let newEnd = new Date(start.getTime() + 24 * 60 * 60 * 1000);
                instance.setDate([start, newEnd], true);
                return;
            }

            globSumDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            loadOrderCart();
        }
    },
    onClose: function (selectedDates, dateStr, instance) {
        if (selectedDates.length < 2) {
            validationSwalFailed(
                null,
                "Silakan pilih tanggal mulai dan tanggal akhir."
            );
            instance.clear(); // Reset input
        }
    },
    allowInput: true,
});

function startCountdown(targetDate, id_transaction) {
    let timer = setInterval(function () {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;

        if (distance <= 0) {
            clearInterval(timer);
            $('#countdown-timer').text('Waktu pembayaran sudah berakhir');
            // didie
            denyTransaction(id_transaction)
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        $('#countdown-timer').text(
            `Sisa waktu pembayaran: ${days}h ${hours}j ${minutes}m ${seconds}d`
        );
    }, 1000);
}



loadOrderCart();

function loadOrderCart() {
    let xid = uid || 0;

    $.ajax({
        url: baseURL + "/home/loadGlobal",
        type: "POST",
        data: JSON.stringify({
            tableName: "transactions t LEFT JOIN transaction_details c ON c.id_transaction = t.id LEFT JOIN products p ON p.id = c.id_product LEFT JOIN units u ON u.id = p.id_unit",
            where: "t.no_transaction = '" + no_invoice + "'",
            isHistory: true
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
                data = response.data;
                $(".pro-count").text(data.length);

                let rows = "";
                let grandTotal = 0;
                fp.setDate([data[0].start_date, data[0].end_date], true);

                startDateRaw = data[0].start_date;
                startDate = new Date(startDateRaw);
                startDate.setHours(0, 0, 0, 0); // Hanya tanggal

                today = new Date();
                today.setHours(0, 0, 0, 0); // Hanya tanggal

                // Jika hari ini >= start_date → countdown selesai
                if (today.getTime() >= startDate.getTime()) {
                    $('#countdown-timer').text('Waktu pembayaran sudah berakhir');
                    // denyTransaction(data[0].id_transaction)
                    Swal.fire({
                        title: "Oops...",
                        text: "Waktu pembayaran sudah berakhir",
                        icon: "error",
                    }).then(() => {
                        window.location.href = '/home/history';
                    });

                    return;
                }

                // Hitung waktu hingga H-1 23:59:59
                countdownDate = new Date(startDate);
                countdownDate.setDate(countdownDate.getDate() - 1);
                countdownDate.setHours(23, 59, 59, 999);

                startCountdown(countdownDate, data[0].id_transaction);

                // if(data[0].status != 10){
                //     location.href = "/home/history"
                // }

                data.forEach((item) => {
                    price = parseFloat(item.price || 0);
                    quantity = parseInt(item.item || 0);

                    totalItem = price * quantity * globSumDay;
                    grandTotal += totalItem;

                    imgSrc = item.file_path
                        ? `/storage/${item.file_path}`
                        : "public/template/frontend/imgs/shop/product-1-1.jpg";

                    rows += `
                        <tr>
                            <td class="image product-thumbnail text-center">
                                <img src="${imgSrc}" alt="Product Image" style="max-width: 80px;">
                                <h5 class="single-product-name"><a href="#" onclick="selectedProduct(${item.id_product
                        })" tabindex="0">${item.product_name
                        } @${formatRupiah(price)}</a></h5>
                       
                            </td>
                            <td class="text-center">
                                <h6 class="mb-0"><span class="product-qty">${globSumDay} Hari x ${quantity} ${item.unit_name}</span> Qty</h6>
                            </td>
                            <td class="text-right">${formatRupiah(
                            totalItem
                        )}</td>
                        </tr>
                    `;
                });
                globGrandTotal = grandTotal;

                rows += `
                    <tr>
                        <th colspan="2" class="text-right">Grand Total</th>
                        <td class="text-right fw-bold text-brand">${formatRupiah(
                    grandTotal
                )}</td>
                    </tr>
                `;



                $(".order_table tbody").html(rows);
                $(".total-transfer").html(formatRupiah(grandTotal));
                $("#f-nominal-dp").val(formatRupiah(globGrandTotal))
                $("#s-type-pay").val(data[0].type_pay.toString()).trigger("change")
            } else {
                // Swal.fire({
                //     title: "Oops...",
                //     text: response.info + "- Carts anda kosong !",
                //     icon: "error",
                // }).then(() => {
                //     window.location.href = "/home";
                // });
            }
        },
        error: function (xhr) {
            sweetAlert("Oops...", xhr.responseText, "error");
        },
    });
}

function denyTransaction(paramObj) {
    // formdata

    isReq = {}
    isReq.id = paramObj
    isReq.status = 50


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
                // swal("Saved !", response.message, "success").then(function () {
                //     location.reload();
                // });
                window.location.href = '/home/history';
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

loadUserOrder();
function loadUserOrder() {
    xid = uid;
    if (uid == "") {
        xid = 0;
        // sweetAlert("Oops...", 'Silakan login terlebih dahulu.', "warning");
        // return false
    }
    $.ajax({
        url: baseURL + "/home/loadGlobal",
        type: "POST",
        data: JSON.stringify({
            tableName: "users u",
            where: "u.id = " + xid + "",
        }),
        dataType: "json",
        contentType: "application/json",
        beforeSend: function () {
            // Swal.fire({
            //     title: "Loading",
            //     text: "Please wait...",
            // });
            loadBlockUI();
        },
        complete: function () {
            unblockUI();
        },
        success: function (response) {
            // console.log(response);
            // Handle response sukses
            if (response.code == 0) {
                // swal("Saved !", response.info, "success").then(function () {
                //     // location.reload();
                //     location.href = baseURL+"/invoice?noinvoice="+response.data.no_transaction
                // });
                // Reset form
                data = response.data;
                $("#f-name").val(data[0].name);
                $("#f-phone").val(data[0].phone);
                $("#f-email").val(data[0].email);
                $("#f-address").val(data[0].address);
                $("#f-note-order").html();
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

isObject = {};
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
    isObject["type_pay"] = $("#s-type-pay").val();
    isObject["day"] = globSumDay;
    isObject["grand_total"] = globGrandTotal;

    let rangeValue = $("#dateRange").val();

    if (rangeValue.includes(" to ")) {
        let [startDate, endDate] = rangeValue.split(" to ");
        globStartDate = startDate;
        globEndDate = endDate;
    }
    isObject["no_transaction"] = no_invoice;

    isObject["start_date"] = globStartDate;
    isObject["end_date"] = globEndDate;
    isObject["nominal_payment"] = unformatRupiah($("#f-nominal-dp").val())

    return true;
}

$("#payButton").click(function () {
    if (checkValidation() != false) {
        saveData();
        function saveData() {
            // formdata
            var formData = new FormData();
            var file = $("#form-img")[0].files[0];

            if (
                validationSwalFailed(
                    file,
                    "Bukti pembayaran tidak boleh kosong"
                )
            )
                return false;

            formData.append("image", file);
            formData.append("data", JSON.stringify(isObject));

            $.ajax({
                url: baseURL + "/home/savePayment",
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
                        // location.reload();
                        swal("Saved !", response.info, "success").then(function () {
                            // location.reload();
                            location.href = "/home/history"
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

$(".ct-nominal-dp").hide();
$("#s-type-pay").change(function () {
    var selectedValue = $(this).val();
    if (selectedValue == 0) {
        $("#f-nominal-dp").val(formatRupiah(globGrandTotal * 50 / 100))
        $(".total-transfer").html(formatRupiah(globGrandTotal * 50 / 100));
        $(".ct-nominal-dp").show();
    } else {
        $("#f-nominal-dp").val(formatRupiah(globGrandTotal))
        $(".total-transfer").html(formatRupiah(globGrandTotal));
        $(".ct-nominal-dp").hide();
    }
    console.log("Nilai yang dipilih: " + selectedValue);
});
