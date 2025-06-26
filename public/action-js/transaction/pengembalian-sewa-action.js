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
    let available_status = 20;
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
                bsitem = btoa(JSON.stringify(item))
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
                                    <button type="button" onclick='returnCheck(this,"${bsitem}")' class="btn btn-outline-info rounded-pill">Cek Pengembalian</button>
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

async function returnCheck(el,params) {
    dto = JSON.parse(atob(bsitem));
    console.log(dto);
    
    $("#form-no-transaction").val(dto.no_transaction)
    htco = await getReturProducts(dto.id)
    // console.log(htco);
    
    $(".content-retur-prods").html(htco)
    $("#modal-data").modal("show");
}


function getReturProducts(paramsid) {
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
                        galleryprods += `
                            <div class="col-xl-3">
                                <div class="form-check">
                                    <input class="form-check-input dt-items-retur-prod" type="checkbox" data-its="${paramsid}" data-idp="${item.id_product}" value="" checked="true">
                                    <label class="form-check-label" for="flexCheckChecked" title="Ceklis jika kondisi Baik">
                                        Kondisi Baik
                                    </label>
                                </div>
                            </div>
                            <div class="col-xl-9">
                                <div class='mb-0'>${item.product_name}</div>
                            </div>
                            `;
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

function sendBackTransaction() {
    var formData = new FormData();
    issend = []
    let its 
    $('.dt-items-retur-prod').each(function () {
        
        let idp = $(this).data('idp');
        its = $(this).data('its');
        let ck  = $(this).is(':checked')
        obj = {
            id_product: idp,
            good_condition:ck
        }
        issend.push(obj)
    });

    formData.append("data", JSON.stringify({ id_transaction: its, items: issend }));
    
    swal({
        title: "Apakah anda yakin ?",
        text: "Melakukan pengembalian ?",
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
                url: baseURL + "/setSendBackTransaction",
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
