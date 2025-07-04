$.ajaxSetup({
    headers: {
        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
    },
});

$(".right-arrow").remove();
(function ($) {
    if (localStorage.getItem("color"))
        $("#color").attr(
            "href",
            "../assets/css/" + localStorage.getItem("color") + ".css"
        );
    if (localStorage.getItem("dark")) $("body").attr("class", "dark-only");
    // $(
    //     '<div class="customizer-links"><div class="nav flex-column nac-pills" id="c-pills-tab" role="tablist" aria-orientation="vertical"><a class="nav-link" id="c-pills-layouts-tab" data-bs-toggle="pill" href="#c-pills-layouts" role="tab" aria-controls="c-pills-layouts" aria-selected="false" data-original-title=""><div class="settings"><i class="icon-paint-bucket"></i></div><span>Check layouts</span></a> <a class="nav-link" id="c-pills-home-tab" data-bs-toggle="pill" href="#c-pills-home" role="tab" aria-controls="c-pills-home" aria-selected="false" data-original-title=""><div class="settings"><i class="icon-settings"></i></div><span>Quick option</span></a> <a class="nav-link" target="_blank" href="https://pixelstrap.freshdesk.com/" data-original-title=""><div><i class="icon-support"></i></div><span>Support</span></a> <a class="nav-link" target="_blank" href="https://docs.pixelstrap.com/cuba/html/document/" target="_blank" data-original-title=""><div><i class="icon-settings"></i></div><span>Document</span></a> <a class="nav-link" target="_blank" href="http://admin.pixelstrap.com/cuba/theme/landing-page.html#frameworks" data-original-title=""><div><i class="icon-panel"></i></div><span>Check features</span></a> <a class="nav-link" target="_blank" href="https://1.envato.market/3GVzd" data-original-title=""><div><i class="icon-shopping-cart-full"></i></div><span>Buy now</span></a></div></div><div class="customizer-contain"><div class="tab-content" id="c-pills-tabContent"><div class="customizer-header"><i class="icofont-close icon-close"></i><h5>Preview Settings</h5><p class="mb-0">Try It Real Time <i class="fa fa-thumbs-o-up txt-primary"></i></p></div><div class="customizer-body custom-scrollbar"><div class="tab-pane fade" id="c-pills-home" role="tabpanel" aria-labelledby="c-pills-home-tab"><h6>Layout Type</h6><ul class="main-layout layout-grid"><li data-attr="ltr" class="active"><div class="header bg-light"><ul><li></li><li></li><li></li></ul></div><div class="body"><ul><li class="bg-light sidebar"></li><li class="bg-light body"><span class="badge badge-primary">LTR</span></li></ul></div></li><li data-attr="rtl"><div class="header bg-light"><ul><li></li><li></li><li></li></ul></div><div class="body"><ul><li class="bg-light body"><span class="badge badge-primary">RTL</span></li><li class="bg-light sidebar"></li></ul></div></li><li data-attr="ltr" class="box-layout px-3"><div class="header bg-light"><ul><li></li><li></li><li></li></ul></div><div class="body"><ul><li class="bg-light sidebar"></li><li class="bg-light body"><span class="badge badge-primary">Box</span></li></ul></div></li></ul><h6>Sidebar Type</h6><ul class="sidebar-type layout-grid"><li data-attr="normal-sidebar"><div class="header bg-light"><ul><li></li><li></li><li></li></ul></div><div class="body"><ul><li class="bg-dark sidebar"></li><li class="bg-light body"></li></ul></div></li><li data-attr="compact-sidebar"><div class="header bg-light"><ul><li></li><li></li><li></li></ul></div><div class="body"><ul><li class="bg-dark sidebar compact"></li><li class="bg-light body"></li></ul></div></li></ul><h6>Sidebar Icon</h6><ul class="sidebar-setting layout-grid"><li class="active" data-attr="stroke-svg"><div class="header bg-light"><ul><li></li><li></li><li></li></ul></div><div class="body bg-light"><span class="badge badge-primary">Stroke</span></div></li><li data-attr="fill-svg"><div class="header bg-light"><ul><li></li><li></li><li></li></ul></div><div class="body bg-light"><span class="badge badge-primary">Fill</span></div></li></ul><h6>Unlimited Color</h6><ul class="layout-grid unlimited-color-layout"><input id="ColorPicker1" type="color" value="#7366ff" name="Background"><input id="ColorPicker2" type="color" value="#f73164" name="Background"><button type="button" class="color-apply-btn btn btn-primary color-apply-btn">Apply</button></ul><h6>Light layout</h6><ul class="layout-grid customizer-color"><li class="color-layout" data-attr="color-1" data-primary="#7366ff" data-secondary="#f73164"><div></div></li><li class="color-layout" data-attr="color-2" data-primary="#4831D4" data-secondary="#ea2087"><div></div></li><li class="color-layout" data-attr="color-3" data-primary="#d64dcf" data-secondary="#8e24aa"><div></div></li><li class="color-layout" data-attr="color-4" data-primary="#4c2fbf" data-secondary="#2e9de4"><div></div></li><li class="color-layout" data-attr="color-5" data-primary="#7c4dff" data-secondary="#7b1fa2"><div></div></li><li class="color-layout" data-attr="color-6" data-primary="#3949ab" data-secondary="#4fc3f7"><div></div></li></ul><h6>Dark Layout</h6><ul class="layout-grid customizer-color dark"><li class="color-layout" data-attr="color-1" data-primary="#4466f2" data-secondary="#1ea6ec"><div></div></li><li class="color-layout" data-attr="color-2" data-primary="#4831D4" data-secondary="#ea2087"><div></div></li><li class="color-layout" data-attr="color-3" data-primary="#d64dcf" data-secondary="#8e24aa"><div></div></li><li class="color-layout" data-attr="color-4" data-primary="#4c2fbf" data-secondary="#2e9de4"><div></div></li><li class="color-layout" data-attr="color-5" data-primary="#7c4dff" data-secondary="#7b1fa2"><div></div></li><li class="color-layout" data-attr="color-6" data-primary="#3949ab" data-secondary="#4fc3f7"><div></div></li></ul><h6>Mix Layout</h6><ul class="layout-grid customizer-mix"><li class="color-layout active" data-attr="light-only"><div class="header bg-light"><ul><li></li><li></li><li></li></ul></div><div class="body"><ul><li class="bg-light sidebar"></li><li class="bg-light body"></li></ul></div></li><li class="color-layout" data-attr="dark-sidebar"><div class="header bg-light"><ul><li></li><li></li><li></li></ul></div><div class="body"><ul><li class="bg-dark sidebar"></li><li class="bg-light body"></li></ul></div></li><li class="color-layout" data-attr="dark-only"><div class="header bg-dark"><ul><li></li><li></li><li></li></ul></div><div class="body"><ul><li class="bg-dark sidebar"></li><li class="bg-dark body"></li></ul></div></li></ul></div><div class="tab-pane fade" id="c-pills-layouts" role="tabpanel" aria-labelledby="c-pills-layouts-tab"><ul class="sidebar-type layout-grid layout-types"><li data-attr="compact-sidebar"><div class="layout-img"><a href="javascript:void(0)"><img src="../assets/images/landing/layout-images/dubai.jpg" class="img-fluid" alt=""></a><h6>Dubai</h6></div></li><li data-attr="material-layout"><div class="layout-img"><a href="javascript:void(0)"><img src="../assets/images/landing/layout-images/los-angle.png" class="img-fluid" alt=""></a><h6>Los Angeles</h6></div></li><li data-attr="dark-sidebar"><div class="layout-img"><a href="javascript:void(0)"><img src="../assets/images/landing/layout-images/paris.jpg" class="img-fluid" alt=""></a><h6>Paris</h6></div></li><li data-attr="compact-wrap"><div class="layout-img"><a href="javascript:void(0)"><img src="../assets/images/landing/layout-images/tokyo.jpg" class="img-fluid" alt=""></a><h6>Tokyo</h6></div></li><li data-attr="compact-small"><div class="layout-img"><a href="javascript:void(0)"><img src="../assets/images/landing/layout-images/moscow.jpg" class="img-fluid" alt=""></a><h6>Moscow</h6></div></li><li data-attr="enterprice-type"><div class="layout-img"><a href="javascript:void(0)"><img src="../assets/images/landing/layout-images/singapore.jpg" class="img-fluid" alt=""></a><h6>Singapore</h6></div></li><li data-attr="box-layout" class="box-layout"><div class="layout-img"><a href="javascript:void(0)"><img src="../assets/images/landing/layout-images/newyork.png" class="img-fluid" alt=""></a><h6>New York</h6></div></li><li data-attr="advance-type"><div class="layout-img"><a href="javascript:void(0)"><img src="../assets/images/landing/layout-images/singapore.jpg" class="img-fluid" alt=""></a><h6>Barcelona</h6></div></li><li data-attr="color-sidebar"><div class="layout-img"><a href="javascript:void(0)"><img src="../assets/images/landing/layout-images/paris.jpg" class="img-fluid" alt=""></a><h6>Madrid</h6></div></li><li data-attr="material-icon"><div class="layout-img"><a href="javascript:void(0)"><img src="../assets/images/landing/layout-images/rome.jpg" class="img-fluid" alt=""></a><h6>Rome</h6></div></li><li data-attr="modern-layout"><div class="layout-img"><a href="javascript:void(0)"><img src="../assets/images/landing/layout-images/dubai.jpg" class="img-fluid" alt=""></a><h6>Seoul</h6></div></li><li class="only-body" data-attr="default-body"><div class="layout-img"><a href="javascript:void(0)"><img src="../assets/images/landing/layout-images/landon.png" class="img-fluid" alt=""></a><h6>London</h6></div></li></ul></div></div></div></div>'
    // ).appendTo($("body"));
    // (function () { })();
    //live customizer js
    $(document).ready(function () {
        setLayout();
        $(".customizer-color li").on("click", function () {
            $(".customizer-color li").removeClass("active");
            $(this).addClass("active");
            var color = $(this).attr("data-attr");
            var primary = $(this).attr("data-primary");
            var secondary = $(this).attr("data-secondary");
            localStorage.setItem("color", color);
            localStorage.setItem("primary", primary);
            localStorage.setItem("secondary", secondary);
            localStorage.removeItem("dark");
            $("#color").attr("href", "../assets/css/" + color + ".css");
            $(".dark-only").removeClass("dark-only");
            location.reload(true);
        });

        $(".customizer-color.dark li").on("click", function () {
            $(".customizer-color.dark li").removeClass("active");
            $(this).addClass("active");
            $("body").attr("class", "dark-only");
            localStorage.setItem("dark", "dark-only");
        });

        if (localStorage.getItem("primary") != null) {
            document.documentElement.style.setProperty(
                "--theme-deafult",
                localStorage.getItem("primary")
            );
        }
        if (localStorage.getItem("secondary") != null) {
            document.documentElement.style.setProperty(
                "--theme-secondary",
                localStorage.getItem("secondary")
            );
        }
        $(
            ".customizer-links #c-pills-home-tab, .customizer-links #c-pills-layouts-tab"
        ).click(function () {
            $(".customizer-contain").addClass("open");
            $(".customizer-links").addClass("open");
        });

        $(".close-customizer-btn").on("click", function () {
            $(".floated-customizer-panel").removeClass("active");
        });

        $(".customizer-contain .icon-close").on("click", function () {
            $(".customizer-contain").removeClass("open");
            $(".customizer-links").removeClass("open");
        });

        $(".color-apply-btn").click(function () {
            location.reload(true);
        });

        var primary = document.getElementById("ColorPicker1").value;
        document.getElementById("ColorPicker1").onchange = function () {
            primary = this.value;
            localStorage.setItem("primary", primary);
            document.documentElement.style.setProperty("--theme-primary", primary);
        };

        var secondary = document.getElementById("ColorPicker2").value;
        document.getElementById("ColorPicker2").onchange = function () {
            secondary = this.value;
            localStorage.setItem("secondary", secondary);
            document.documentElement.style.setProperty(
                "--theme-secondary",
                secondary
            );
        };

        $(".customizer-color.dark li").on("click", function () {
            $(".customizer-color.dark li").removeClass("active");
            $(this).addClass("active");
            $("body").attr("class", "dark-only");
            localStorage.setItem("dark", "dark-only");
        });

        $(".customizer-mix li").on("click", function () {
            $(".customizer-mix li").removeClass("active");
            $(this).addClass("active");
            var mixLayout = $(this).attr("data-attr");
            $("body").attr("class", mixLayout);
        });

        $(".sidebar-setting li").on("click", function () {
            $(".sidebar-setting li").removeClass("active");
            $(this).addClass("active");
            var sidebar = $(this).attr("data-attr");
            $(".sidebar-wrapper").attr("sidebar-layout", sidebar);
        });

        $(".sidebar-main-bg-setting li").on("click", function () {
            $(".sidebar-main-bg-setting li").removeClass("active");
            $(this).addClass("active");
            var bg = $(this).attr("data-attr");
            $(".sidebar-wrapper").attr("class", "sidebar-wrapper " + bg);
        });

        function setLayout(params) {
            $("body").append("");
            console.log("test");
            var type = "normal-sidebar";

            var boxed = "";
            if ($(".page-wrapper").hasClass("box-layout")) {
                boxed = "box-layout";
            }
            switch (type) {
                case "compact-sidebar": {
                    $(".page-wrapper").attr(
                        "class",
                        "page-wrapper compact-wrapper " + boxed
                    );
                    $(this).addClass("active");
                    localStorage.setItem("page-wrapper-cuba", "compact-wrapper");
                    break;
                }
                case "normal-sidebar": {
                    $(".page-wrapper").attr(
                        "class",
                        "page-wrapper horizontal-wrapper " + boxed
                    );
                    // $(".logo-wrapper")
                    //     .find("img")
                    //     .attr("src", "../assets/images/logo/logo.png");
                    localStorage.setItem("page-wrapper-cuba", "horizontal-wrapper");
                    break;
                }
                case "default-body": {
                    $(".page-wrapper").attr("class", "page-wrapper  only-body" + boxed);
                    localStorage.setItem("page-wrapper-cuba", "only-body");
                    break;
                }
                case "dark-sidebar": {
                    $(".page-wrapper").attr(
                        "class",
                        "page-wrapper compact-wrapper dark-sidebar" + boxed
                    );
                    localStorage.setItem(
                        "page-wrapper-cuba",
                        "compact-wrapper dark-sidebar"
                    );
                    break;
                }
                case "compact-wrap": {
                    $(".page-wrapper").attr(
                        "class",
                        "page-wrapper compact-sidebar" + boxed
                    );
                    localStorage.setItem("page-wrapper-cuba", "compact-sidebar");
                    break;
                }
                case "color-sidebar": {
                    $(".page-wrapper").attr(
                        "class",
                        "page-wrapper compact-wrapper color-sidebar" + boxed
                    );
                    localStorage.setItem(
                        "page-wrapper-cuba",
                        "compact-wrapper color-sidebar"
                    );
                    break;
                }
                case "compact-small": {
                    $(".page-wrapper").attr(
                        "class",
                        "page-wrapper compact-sidebar compact-small" + boxed
                    );
                    localStorage.setItem(
                        "page-wrapper-cuba",
                        "compact-sidebar compact-small"
                    );
                    break;
                }
                case "box-layout": {
                    $(".page-wrapper").attr(
                        "class",
                        "page-wrapper compact-wrapper box-layout " + boxed
                    );
                    localStorage.setItem(
                        "page-wrapper-cuba",
                        "compact-wrapper box-layout"
                    );
                    break;
                }
                case "enterprice-type": {
                    $(".page-wrapper").attr(
                        "class",
                        "page-wrapper horizontal-wrapper enterprice-type" + boxed
                    );
                    localStorage.setItem(
                        "page-wrapper-cuba",
                        "horizontal-wrapper enterprice-type"
                    );
                    break;
                }
                case "modern-layout": {
                    $(".page-wrapper").attr(
                        "class",
                        "page-wrapper compact-wrapper modern-type" + boxed
                    );
                    localStorage.setItem(
                        "page-wrapper-cuba",
                        "compact-wrapper modern-type"
                    );
                    break;
                }
                case "material-layout": {
                    $(".page-wrapper").attr(
                        "class",
                        "page-wrapper horizontal-wrapper material-type" + boxed
                    );
                    localStorage.setItem(
                        "page-wrapper-cuba",
                        "horizontal-wrapper material-type"
                    );

                    break;
                }
                case "material-icon": {
                    $(".page-wrapper").attr(
                        "class",
                        "page-wrapper compact-sidebar compact-small material-icon" + boxed
                    );
                    localStorage.setItem(
                        "page-wrapper-cuba",
                        "compact-sidebar compact-small material-icon"
                    );

                    break;
                }
                case "advance-type": {
                    $(".page-wrapper").attr(
                        "class",
                        "page-wrapper horizontal-wrapper enterprice-type advance-layout" +
                        boxed
                    );
                    localStorage.setItem(
                        "page-wrapper-cuba",
                        "horizontal-wrapper enterprice-type advance-layout"
                    );

                    break;
                }
                default: {
                    $(".page-wrapper").attr(
                        "class",
                        "page-wrapper compact-wrapper " + boxed
                    );
                    localStorage.setItem("page-wrapper-cuba", "compact-wrapper");
                    break;
                }
            }
        }

        $(".main-layout li").on("click", function () {
            $(".main-layout li").removeClass("active");
            $(this).addClass("active");
            var layout = $(this).attr("data-attr");
            $("body").attr("class", layout);
            $("html").attr("dir", layout);
        });

        $(".main-layout .box-layout").on("click", function () {
            $(".main-layout .box-layout").removeClass("active");
            $(this).addClass("active");
            var layout = $(this).attr("data-attr");
            $("body").attr("class", "box-layout");
            $("html").attr("dir", layout);
        });
    });
})(jQuery);


$(document).ready(function () {
    getMenuAccess();

});

function loadBlockUI() {
    $("#preloader-active").show()
}

function unblockUI() {
    $("#preloader-active").hide()
}


function getMenuAccess() {

    menuel = `
    <li class="sidebar-main-title">
        <div>
            <h6 class="lan-1">Appointment</h6>
        </div>
    </li><li class="sidebar-list"><i class="fa fa-thumb-tack"></i><a class="sidebar-link sidebar-title link-nav" href="#set-appointment">
        <i class="fa fa-dot-circle-o"></i>
        <span>Pesan Sekarang!</span>
        <div class="according-menu"><i class="fa fa-angle-right"></i></div>
        <div class="according-menu"><i class="fa fa-angle-right"></i></div></a>
    </li></ul>
    
    <li class="sidebar-main-title">
        <div>
            <h6 class="lan-1">Tentang Kami</h6>
        </div>
    </li><li class="sidebar-list"><i class="fa fa-thumb-tack"></i><a class="sidebar-link sidebar-title link-nav" href="#contact-kimi">
        <i class="fa fa-dot-circle-o"></i>
        <span>Tentang Kami</span>
        <div class="according-menu"><i class="fa fa-angle-right"></i></div>
        <div class="according-menu"><i class="fa fa-angle-right"></i></div></a>
    </li></ul>
    `
    $('.simplebar-content .pin-title').after(menuel);

    const currentUrl = window.location.pathname;

    $(".simplebar-content").find('.sidebar-list a').each(function () {
        var menuItemUrl = $(this).attr('href');

        if (currentUrl === menuItemUrl) {

            $(this).addClass('active');
        }
    });


}

function formatRupiah(value) {
    // Convert the input to a number
    const number = parseFloat(value);

    // Check if the number is valid
    if (isNaN(number)) {
        return 'Invalid number';
    }

    // Format the number as Indonesian Rupiah
    return number.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
}


loadCart()
function loadCart() {
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
            tableName: "carts c LEFT JOIN products p ON p.id = c.id_product",
            where: "c.id_user = " + xid + "",
        }),
        dataType: "json",
        contentType: "application/json",
        beforeSend: function () {
            // Swal.fire({
            //     title: "Loading",
            //     text: "Please wait...",
            // });
        },
        complete: function () {},
        success: function (response) {
            // console.log(response);
            // Handle response sukses
            if (response.code == 0) {
                // swal("Saved !", response.message, "success").then(function () {
                //     // location.reload();
                //     location.href = baseURL+"/invoice?noinvoice="+response.data.no_transaction
                // });
                // Reset form
                data = response.data;
                $('.pro-count').text(data.length)

                imgslider = "";
                el = "";

                let totalPrice = 0;
                // let totalQuantity = 0;

                for (let index = 0; index < data.length; index++) {
                    // modal
                    price = parseFloat(data[index]["price"]);
                    quantity = parseInt(data[index]["qty"]);

                    totalPrice += price * quantity;
                    // totalQuantity += quantity;

                    imgslider = `<img alt="Evara" src="public/template/frontend/imgs/shop/thumbnail-3.jpg"></img>`;

                    if (data[index]["file_path"]) {
                        imgslider = `<img alt="Evara" src="/storage/${data[index]["file_path"]}"></img>`;
                    }

                    el += ` <ul>
                                <li>
                                    <div class="shopping-cart-img">
                                        <a href="shop-product-right.html">${imgslider}</a>
                                    </div>
                                    <div class="shopping-cart-title">
                                        <h4>
                                            <a href="shop-product-right.html">${
                                                data[index]["product_name"]
                                            }</a>
                                        </h4>
                                        <h4><span>${
                                            data[index]["qty"]
                                        } × </span>${formatRupiah(
                        data[index]["price"]
                    )}</h4>
                                    </div>
                                    <div class="shopping-cart-delete">
                                        <a onclick="deleteCart(${
                                            data[index]["id"]
                                        })"><i class="fi-rs-cross-small"></i></a>
                                    </div>
                                </li>
                            </ul>`;
                }

                elfooter = ` <div class="shopping-cart-footer">
                                <div class="shopping-cart-total">
                                    <h4>Total <span>${formatRupiah(
                                        totalPrice
                                    )}</span></h4>
                                </div>
                                <div class="shopping-cart-button">
                                    <a href="${baseURL+"/home/checkout"}">Checkout</a>
                                </div>
                            </div>`;
                el += elfooter;

                $(".list-products-cart").html(el);
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

function validationSwalFailed(param, isText) {
    // console.log(param);
    if (param == "" || param == null) {
        sweetAlert("Oops...", isText, "warning");

        return 1;
    }
}

