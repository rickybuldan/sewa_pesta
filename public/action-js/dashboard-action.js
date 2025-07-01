// let dtpr;

$(document).ready(function () {
    getTransaction();
});
function addOneDay(dateStr) {
    // Ambil hanya tanggal tanpa jam
    const dateOnly = dateStr.split(" ")[0]; // hasilnya: "2025-06-26"

    const date = new Date(dateOnly); // parsing "2025-06-26" jadi Date object
    date.setDate(date.getDate() + 1); // tambah 1 hari

    // Kembalikan dalam format YYYY-MM-DD
    return date.toISOString().split("T")[0];
}

function getTransaction() {
    let calendar = new FullCalendar.Calendar(
        document.getElementById("calendar"),
        {
            initialView: "dayGridMonth",
            events: function (fetchInfo, successCallback, failureCallback) {
                $.ajax({
                    url: baseURL + "/getOverviewTransaction",
                    type: "POST",
                    data: JSON.stringify({ tableName: "transactions" }),
                    dataType: "json",
                    contentType: "application/json",
                    beforeSend: function () {},
                    complete: function () {},
                    success: function (response) {
                        // Handle response sukses
                        if (response.code == 0) {
                            // console.log(response.data);
                            
                            $(".total-rent").text(response.total_rent)
                            $(".total-revenue-rent").text(formatRupiah(response.total_revenue_rent))
                            $(".total-customers").text(response.total_customers)
                            let events  = response.data.map(function (item) {
                                txcolor     = "white";
                                backColor   = "#007bff";
                                borColor    = "#0056b3";

                                if (item.status == 10) {
                                    txcolor     = "white";
                                    backColor   = "#007bff";
                                    borColor    = "#0056b3";
                                }
                                if (item.status == 20) {
                                    txcolor     = "white";
                                    backColor   = "#E77636";
                                    borColor    = "#c26316";
                                }

                                if (item.status == 30) {
                                    txcolor     = "white";
                                    backColor   = "#287F71";
                                    borColor    = "#166457";
                                }

                                if (item.status == 40) {
                                    txcolor     = "white";
                                    backColor   = "#343a40";
                                    borColor    = "#6c757d";
                                }

                                return {
                                    title: item.no_transaction,
                                    start: item.start_date,
                                    end: addOneDay(item.end_date),
                                    allDay: true,
                                    textColor: txcolor,
                                    backgroundColor: backColor,
                                    borderColor: borColor,
                                };
                            });

                            successCallback(events);
                        } else {
                            sweetAlert("Oops...", response.message, "error");
                        }
                    },
                    error: function (xhr, status, error) {
                        // Handle error response
                        // console.log(xhr.responseText);
                        sweetAlert("Oops...", xhr.responseText, "error");
                        failureCallback(error);
                    },
                });
            },
            eventClick: function(info) {
                info.jsEvent.preventDefault(); // don't let the browser navigate
                console.log(info.event.title);
                
                if (info.event.title) {
                    getinvoice(info.event.title) 
                }
            }
        }
    );

    calendar.render();

    // Fungsi untuk tambah 1 hari di end_date
}


function getinvoice(params) {
    location.href = baseURL + "/invoice?noinvoice=" + params;
}