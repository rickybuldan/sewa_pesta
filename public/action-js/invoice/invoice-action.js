
$.ajaxSetup({
    headers: {
        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
    },
});

loadInvoice();

function loadInvoice() {
    data = { noinvoice: no_invoice };

    $.ajax({
        url: baseURL + "/invoice",
        type: "POST",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        beforeSend: function () {
            // Swal.fire({
            //     title: "Loading",
            //     text: "Please wait...",
            //     showConfirmButton: false, // Menyembunyikan tombol OK
            // });
        },
        complete: function () {
            // swal.close();
            getHistoryTransaction()
        },
        success: function (response) {
            console.log(response);

            if (response.code == 0) {
                console.log(response);
                data = response.data;
                console.log(data);
                $("#f-no-transaksi").text(data[0].no_transaction);
                $("#f-name-customer").text(data[0].customer_name);
                $("#f-phone-customer").text(data[0].customer_phone);
                $("#f-address-customer").text(data[0].address);
                $("#f-rent-date").text(data[0].start_date +'-'+data[0].end_date );
                $(".no_invoice").text("#" + data[0].no_transaction);
                $(".date_invoice").text(data[0].created_date_formatted);
                $(".kasir-name").text("Kasir: "+data[0].kasir);
                $statusmaintran='-'
                if (response.data[0].status == 10) {
                    $statusmaintran = ` Proses`;
                }
                    if (response.data[0].status == 20) {
                    $statusmaintran = ` Kirim`;
                }
                if (response.data[0].status == 30) {
                    $statusmaintran = `Selesai`;
                }
                $("#watermark").html($statusmaintran)
                $(".v-total-payment").text(formatRupiah(parseFloat(data[0].payment_amount)));
                $(".v-total-exchange").text(formatRupiah(parseFloat(data[0].exchange)));
                
                $(".v-total-amount").html(formatRupiah(data[0].price_total));
                $("#detail_invoice").empty();
                el =""
                data.forEach(function (item) {
                    el += `<tr>
                            <td
                                style="font-size: 10px; font-family: 'Open Sans', sans-serif; color: #646a6e; line-height: 16px; vertical-align: top; text-align:left; padding-left:10px ">
                                ${item.product_name}
                            </td>
                            <td
                                style="font-size: 10px; font-family: 'Open Sans', sans-serif; color: #646a6e; line-height: 16px; vertical-align: top; text-align:left; padding-left:10px ">
                                ${item.quantity}
                            </td>
                            <td
                                style="font-size: 10px; font-family: 'Open Sans', sans-serif; color: #646a6e; line-height: 16px; vertical-align: top; text-align:left; padding-left:10px ">
                                ${formatRupiah(item.unit_price)}
                            </td>
                            <td
                                style="font-size: 10px; font-family: 'Open Sans', sans-serif; color: #646a6e; line-height: 16px; vertical-align: top; text-align:left;">
                                ${formatRupiah(item.sub_total)}
                            </td>
                        </tr>
                        `
                });
                el+=`<tr>
                        <td height="2" colspan="100" style=" border-bottom:1px solid #e4e4e4 "></td>
                    </tr>`;
                $("#detail_invoice").html(el);
            } else {
                // sweetAlert("Oops...", response.info, "error");
                console.log(response.info);
            }
        },
        error: function (xhr, status, error) {
            // Handle error response
            console.log(xhr.responseText);
            // sweetAlert("Oops...", xhr.responseText, "error");
        },
    });
}

function printElement() {
    window.print();
}

function getHistoryTransaction() {
    let wherestate = "th.no_transaction = '" + no_invoice+"'";
    $.ajax({
        url: baseURL + "/loadGlobal",
        type: "POST",
        data: JSON.stringify({
            where: wherestate,
            tableName: "transaction_history th LEFT JOIN users us ON us.id = th.updated_by",
        }),
        dataType: "json",
        contentType: "application/json",
        beforeSend: function () {
            // Swal.fire({
            //     title: "Loading",
            //     text: "Please wait...",
            // });
        },
        complete: function () {
            // Swal.close();
            getDetailProducts()
        },
        success: function (response) {
            // Handle response sukses
            $("#data-history").html();
            if (response.code == 0) {
                
                if (response.data.length == 0) {
                    sweetAlert("Oops...", "Tidak ada data!", "error");
                    return;
                }

                let prods = response.data;
                globProduct = prods;
                galleryprods = ``;
                $("#data-history").html();
                for (let index = 0; index < prods.length; index++) {
                    nt = prods[index].updated_at;
                    nm = prods[index].name;
                    dsc = prods[index].desc;
                    img = prods[index].file_path;
                    idp = prods[index].id;
                    sstatus = prods[index].status;
                    $rowData  = ''
                    if (sstatus == 10) {
                        $rowData = ` Proses`;
                    }
                    if (sstatus == 11) {
                        $rowData = ` Pembayaran DP Berhasil`;
                    }
                    if (sstatus == 12) {
                        $rowData = ` Lunas`;
                    }
                    if (sstatus == 13) {
                        $rowData = ` Verifikasi DP`;
                    }
                    if (sstatus == 14) {
                        $rowData = ` Verifikasi Lunas`;
                    }
                     if (sstatus == 20) {
                        $rowData = ` Kirim`;
                    }
                    if (sstatus == 21) {
                        $rowData = `Tagihan Denda Berhasil dibayar`;
                    }
                    if (sstatus == 30) {
                        $rowData = `Selesai`;
                    }
                     if (sstatus == 50) {
                        $rowData = `Ditolak`;
                    }


                    galleryprods += `
                            <tr>
                                <td>${nt}</td>
                                <td>${$rowData}</td>
                                <td>${nm}</td>
                            </tr>
                        `;

                    // if ((index + 1) % 4 == 0 || index == prods.length - 1) {
                    //     galleryprods += `</div>`; // end row
                    // }
                }
                $("#data-history").html(galleryprods);
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


function getDetailProducts() {
    let wherestate = "t.no_transaction = '" + no_invoice+"'";
    $.ajax({
        url: baseURL + "/loadGlobal",
        type: "POST",
        data: JSON.stringify({
            where: wherestate,
            is_detail:true,
            tableName: "transactions t LEFT JOIN users us ON us.id = t.updated_by LEFT JOIN transaction_details td ON td.id_transaction = t.id LEFT JOIN products p ON p.id = td.id_product LEFT JOIN master_constants mc ON mc.is_active = 1 LEFT JOIN units u ON u.id = p.id_unit",
        }),
        dataType: "json",
        contentType: "application/json",
        beforeSend: function () {
            // Swal.fire({
            //     title: "Loading",
            //     text: "Please wait...",
            // });
        },
        complete: function () {
            // Swal.close();
        },
        success: function (response) {
            // Handle response sukses
            $("#data-products").html();
            if (response.code == 0) {
                
                if (response.data.length == 0) {
                    sweetAlert("Oops...", "Tidak ada data!", "error");
                    return;
                }

                let prods = response.data;
                globProduct = prods;
                galleryprods = ``;
                gt = 0
                $("#data-products").html();
                for (let index = 0; index < prods.length; index++) {
                   
                    
                    nt = prods[index].updated_at;
                    nm = prods[index].product_name;
                    hrs = prods[index].price;
                    dsc = prods[index].sub_total;
                    img = prods[index].penalty;
                    dtel = prods[index].denda_telat;
                    idp = prods[index].id;
                    sstatus = prods[index].status;
                    valuedenda = prods[index].value
                    gt += dsc+img+dtel
                    $rowData  = ''
                    if (sstatus == 10) {
                        $rowData = ` Proses`;
                    }
                    if (sstatus == 11) {
                        $rowData = ` Verifikasi DP`;
                    }
                    if (sstatus == 12) {
                        $rowData = ` Lunas`;
                    }
                    if (sstatus == 13) {
                        $rowData = ` Pembayaran DP Berhasil`;
                    }
                     if (sstatus == 14) {
                        $rowData = ` Verifikasi Lunas`;
                    }
                     if (sstatus == 20) {
                        $rowData = ` Kirim`;
                    }
                    if (sstatus == 30) {
                        $rowData = `Selesai`;
                    }

                    galleryprods += `
                            <tr>
                                <td>${prods[index].item} ${prods[index].unit_name}</td>
                                <td>${nm} @${formatRupiah(hrs)}</td>
                                <td>${formatRupiah(dsc)}</td>
                              
                                <td>${formatRupiah(dsc)}</td>
                            </tr>
                        `;

                    // if ((index + 1) % 4 == 0 || index == prods.length - 1) {
                    //     galleryprods += `</div>`; // end row
                    // }
                }
                console.log(gt);
                

                // $("#grand-total").html(formatRupiah(gt))
                $("#data-products").html(galleryprods);
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

getDetailPenalty()
function getDetailPenalty() {
    let wherestate = "t.no_transaction = '" + no_invoice+"'";
    $.ajax({
        url: baseURL + "/loadGlobal",
        type: "POST",
        data: JSON.stringify({
            where: wherestate,
            is_detail:true,
            tableName: "transactions t LEFT JOIN users us ON us.id = t.updated_by LEFT JOIN transaction_details td ON td.id_transaction = t.id LEFT JOIN products p ON p.id = td.id_product LEFT JOIN master_constants mc ON mc.is_active = 1 LEFT JOIN units u ON u.id = p.id_unit",
        }),
        dataType: "json",
        contentType: "application/json",
        beforeSend: function () {
            // Swal.fire({
            //     title: "Loading",
            //     text: "Please wait...",
            // });
        },
        complete: function () {
            // Swal.close();
        },
        success: function (response) {
            // Handle response sukses
            $("#data-products").html();
            if (response.code == 0) {
                
                if (response.data.length == 0) {
                    sweetAlert("Oops...", "Tidak ada data!", "error");
                    return;
                }

                let prods = response.data;
                globProduct = prods;
                galleryprods = ``;
                gt = 0
                $("#data-products").html();
                for (let index = 0; index < prods.length; index++) {
                   
                    
                    nt = prods[index].updated_at;
                    nm = prods[index].product_name;
                    hrs = prods[index].price;
                    dsc = prods[index].sub_total;
                    img = prods[index].penalty;
                    dtel = prods[index].denda_telat;
                    idp = prods[index].id;
                    sstatus = prods[index].status;
                    valuedenda = prods[index].value
                    // img= 100000
                    gt += dsc+img+dtel
                    $rowData  = ''
                    if (sstatus == 10) {
                        $rowData = ` Proses`;
                    }
                    if (sstatus == 11) {
                        $rowData = ` Verifikasi DP`;
                    }
                    if (sstatus == 12) {
                        $rowData = ` Lunas`;
                    }
                    if (sstatus == 13) {
                        $rowData = ` Pembayaran DP Berhasil`;
                    }
                     if (sstatus == 14) {
                        $rowData = ` Verifikasi Lunas`;
                    }
                     if (sstatus == 20) {
                        $rowData = ` Kirim`;
                    }
                    if (sstatus == 30) {
                        $rowData = `Selesai`;
                    }

                    galleryprods += `
                            <tr>
                                <td>${prods[index].damage} ${prods[index].unit_name}</td>
                                <td>${nm} @${formatRupiah(hrs)}</td>
                             
                                <td>${formatRupiah(img)}</td>
                                <td>${formatRupiah(dtel)}</td>
                                <td>${formatRupiah(img+dtel)}</td>
                            </tr>
                        `;

                    // if ((index + 1) % 4 == 0 || index == prods.length - 1) {
                    //     galleryprods += `</div>`; // end row
                    // }
                }
                console.log(gt);
                

                $("#grand-total").html(formatRupiah(gt))
                $("#data-products-penalty").html(galleryprods);
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

