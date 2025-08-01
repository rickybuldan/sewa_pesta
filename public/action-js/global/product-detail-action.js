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




loadOrderCart()

maxStock = 0
function loadOrderCart() {

    $.ajax({
        url: baseURL + "/home/loadGlobal",
        type: "POST",
        data: JSON.stringify({
            tableName: "products p LEFT JOIN units u ON u.id = p.id_unit",
            where: "p.id = " + id_product_glob ,
            is_product:true
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
                const data = response.data[0];
                console.log(data);
                 $rowData = `/template/admin2/assets/images/lightgallry/01.jpg`;
                if (data.file_path) {
                    $rowData = `/storage/${data.file_path}`;
                }
                $(".zoom-gallery").attr("href",baseURL + $rowData);
                $('.details-img').attr("src",$rowData);
                $('.details-name').html(data.product_name +" - "+ data.unit_name);
                $('.details-price').html(formatRupiah(data.price)+"/Hari");
                $('.details-desc').html(data.desc);
                $('.details-stock').html(data.items + " In Stock");
                maxStock = data.items
                // $('.total-transfer').html(formatRupiah(grandTotal));
                
            } else {
                Swal.fire({
                    title: "Oops...", 
                    text: response.info + "",
                    icon: "error",
                })
            }
        },
        error: function (xhr) {
            sweetAlert("Oops...", xhr.responseText, "error");
        },
    });
}

$('.add-cart-btn').click(function () {
    saveCart(id_product_glob)
});


function saveCart(id_product) {
    isObject = {};
    qty = $("#f-cart-item").val()

    if (qty > maxStock || qty <= 0) {
        sweetAlert("Oops...", "Input stok cart salah atau stok tidak cukup.", "warning");
        return false;
    }

    isObject.id_product = id_product;
    isObject.id_user = uid;
    isObject.qty = qty;

    $.ajax({
        url: baseURL + "/home/saveCart",
        type: "POST",
        data: JSON.stringify(isObject),
        dataType: "json",
        contentType: "application/json",
        beforeSend: function () {
            // Swal.fire({
            //     title: "Loading",
            //     text: "Please wait...",
            // });
        },
        complete: function () { },
        success: function (response) {
            // Handle response sukses
            if (response.code == 0) {
                swal("Saved !", response.info, "success").then(function () {
                    // location.reload();
                    loadCart()
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

