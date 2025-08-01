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
flatpickr("#dateRange", {
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

loadOrderCart();

function loadOrderCart() {
    let xid = uid || 0;

    $.ajax({
        url: baseURL + "/home/loadGlobal",
        type: "POST",
        data: JSON.stringify({
            tableName: "carts c LEFT JOIN products p ON p.id = c.id_product LEFT JOIN units u ON u.id = p.id_unit",
            where: "c.id_user = " + xid,
            is_carts:true
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
                $(".pro-count").text(data.length);

                let rows = "";
                let grandTotal = 0;

                data.forEach((item) => {
                    price = parseFloat(item.price || 0);
                    quantity = parseInt(item.qty || 0);

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
                        } ${item.unit_name} @${formatRupiah(price)}</a></h5>
                       
                            </td>
                            <td class="text-center">
                                <h6 class="mb-0"><span class="product-qty">${globSumDay} Hari x ${quantity}</span> Qty</h6>
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
            } else {
                Swal.fire({
                    title: "Oops...",
                    text: response.info + "- Carts anda kosong !",
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
                        swal("Saved !", response.info, "success").then(
                            function () {
                                location.reload();
                                
                            }
                        );

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
        $("#f-nominal-dp").val(formatRupiah(globGrandTotal*30/100))
        $(".ct-nominal-dp").show();
    } else {
        $("#f-nominal-dp").val(formatRupiah(globGrandTotal))
        $(".ct-nominal-dp").hide();
    }
    console.log("Nilai yang dipilih: " + selectedValue);
});
