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

function loadOrderCart() {
    let xid = uid || 0;

    $.ajax({
        url: baseURL + "/home/loadGlobal",
        type: "POST",
        data: JSON.stringify({
            tableName: "products",
            where: "id = " + id_product_glob ,
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
                $('.details-name').html(data.product_name);
                $('.details-price').html(formatRupiah(data.price));
                $('.details-desc').html(data.desc);
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



