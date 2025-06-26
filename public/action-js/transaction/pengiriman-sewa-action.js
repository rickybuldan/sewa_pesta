let dtpr;

$(document).ready(function () {
    // $(".js-example-basic-single").select2({
    //     dropdownParent: $("#modal-data"),
    //     placeholder: "Pilih Kategori",
    // });

    getListData();
    $("#tenant-name").val(fullname_user);
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

async function getListData() {
    let available_status = 10;
    let wherestate = "status = " + available_status;

    if ($("#search_data").val()) {
        wherestate +=
            " and no_transaction LIKE '%" + $("#search_data").val() + "%'";
    }

    try {
        response = await $.ajax({
            url: baseURL + "/loadGlobal",
            type: "POST",
            data: JSON.stringify({
                where: wherestate,
                tableName: "transactions",
            }),
            dataType: "json",
            contentType: "application/json",
        });

        if (response.code == 0) {
            if (response.data.length == 0) {
                sweetAlert("Oops...", "Tidak ada data!", "error");
                return;
            }

            prods = response.data;
            let galleryprods = "";

            for (index = 0; index < prods.length; index++) {
                item = prods[index];
                nm = item.no_transaction;
                pc = item.price_total;
                cn = item.customer_name;
                sd = item.start_date;
                ed = item.end_date;
                phone = item.customer_phone;
                addr = item.address;
                idp = item.id;
                ca  = item.created_at

                dtproducts = "";
                try {
                    dtproducts = await getListProducts(idp);
                } catch (err) {
                    dtproducts =
                        '<div class="text-danger">Tidak ada barang</div>';
                    sweetAlert("Oops...", err, "error");
                }

                galleryprods += `
                    <div class="col-xl-4">
                        <div class="card">
                            <div class="card-header">
                                <h6 class="card-title mb-0">${ca}</h6>
                                <h6 class="card-title mb-0">${nm}</h6>
                            </div>
                            <div class="card-body h-75">
                                <div class='mb-0'>${cn}</div>
                                <div class='mb-0'>${sd} - ${ed}</div>
                                
                                <div class='mb-0'>${phone}</div>
                                <div class='mb-0'>${addr}</div>
                                <hr>
                                ${dtproducts}
                                <div class="d-grid gap-2 mt-3">
                                    <span class="badge text-bg-secondary mb-3">${formatRupiah(
                                        pc
                                    )}</span>
                                    <button type="button" onclick='sendTransaction(this,${idp})' class="btn btn-outline-info rounded-pill">Sudah dikirim</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }

            $(".content-gallery-products").html(galleryprods);
        } else {
            sweetAlert("Oops...", response.message, "error");
        }
    } catch (err) {
        sweetAlert("Oops...", err.responseText || "Gagal memuat data", "error");
    }
}

function getListProducts(paramsid) {
    return new Promise(function (resolve, reject) {
        let wherestate = "id_transaction = " + paramsid;

        $.ajax({
            url: baseURL + "/loadGlobal",
            type: "POST",
            data: JSON.stringify({
                where: wherestate,
                tableName:
                    " transaction_details td LEFT JOIN products p ON td.id_product = p.id ",
            }),
            dataType: "json",
            contentType: "application/json",
            success: function (response) {
                if (response.code == 0) {
                    let galleryprods = "";
                    response.data.forEach((item) => {
                        galleryprods += `<div class='mb-0'>- ${item.product_name}</div>`;
                    });
                    resolve(galleryprods);
                } else {
                    reject(response.message);
                }
            },
            error: function (xhr) {
                reject(xhr.responseText);
            },
        });
    });
}

function sendTransaction(el, para) {
    var formData = new FormData();
    formData.append("data", JSON.stringify({ id: para }));
    swal({
        title: "Apakah anda yakin ?",
        text: "Melakukan pengiriman ?",
        type: "warning",
        showCancelButton: !0,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Oke !!",
        cancelButtonText: "Tidak !!",
        closeOnConfirm: !1,
        closeOnCancel: !1,
    }).then(function (e) {
        // console.log(e);
        if (e.value) {
            $.ajax({
                url: baseURL + "/setSendTransaction",
                type: "POST",
                data: formData,
                processData: false, // ⬅️ wajib untuk FormData
                contentType: false, // ⬅️ wajib untuk FormData
                dataType: "json",
                beforeSend: function () {
                    Swal.fire({
                        title: "Loading",
                        text: "Please wait...",
                        showConfirmButton: false,
                    });
                },
                success: function (response) {
                    if (response.code == 0) {
                        swal("Success!", response.message, "success").then(
                            function () {
                                location.reload();
                            }
                        );
                    } else {
                        sweetAlert("Oops...", response.message, "error");
                    }
                },
                error: function (xhr) {
                    sweetAlert("Oops...", xhr.responseText, "error");
                },
            });
        } else {
            swal("Dibatalkan !!", "", "error");
        }
    });
}
