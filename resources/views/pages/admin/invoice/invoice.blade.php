<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Kwitansi Sewa Dwi Karya</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
            padding: 20px;
            max-width: 900px;
            margin: auto;
            position: relative;
            z-index: 1;
        }

        .header {
            text-align: center;
            border-bottom: 2px solid #000;
            padding-bottom: 10px;
            margin-bottom: 10px;
            position: relative;
            z-index: 2;
        }

        .header h1 {
            margin: 0;
            color: #005baa;
        }

        .subheader {
            text-align: center;
            font-size: 10px;
            margin-top: 4px;
        }

        .info {
            display: flex;
            justify-content: space-between;
            margin: 10px 0;
            position: relative;
            z-index: 2;
        }

        .info div {
            width: 38%;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 10px;
            position: relative;
            z-index: 2;
        }

        table, th, td {
            border: 1px solid #000;
        }

        th, td {
            padding: 5px;
            text-align: center;
        }

        .total-box {
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            position: relative;
            z-index: 2;
        }

        .total-box div {
            width: 48%;
        }

        .footer {
            margin-top: 30px;
            display: flex;
            justify-content: space-between;
            position: relative;
            z-index: 2;
        }

        .footer .left {
            font-size: 10px;
        }

        .footer .right {
            text-align: center;
        }

        /* Watermark Styles */
        .watermark {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-30deg);
            font-size: 100px;
            color: rgba(0, 0, 0, 0.06);
            z-index: 0;
            pointer-events: none;
            user-select: none;
            white-space: nowrap;
        }

        @media screen {
            .watermark {
                display: block;
            }
        }

        @media print {
            .watermark {
                display: block;
            }
        }
    </style>
</head>

<body>
    <div class="watermark" id="watermark">-</div>

    <div class="header">
        <h1>DWI KARYA</h1>
        <div class="subheader">Penyewaan Perlengkapan Pesta</div>
        <div class="subheader">Jl. Raya Timur No. 89 Cikuray Singaparna Telp. (0265) 545526</div>
    </div>

    <div class="info">
        <div>
            <strong>No Transaksi:</strong><b id="f-no-transaksi">-</b><br>
            <strong>No HP Customer:</strong><b id="f-phone-customer">-</b><br>
            <strong>Yth:</strong> Bapak/Ibu <b id="f-name-customer">-</b><br>
        </div>
        <div>
            <strong>Singaparna,</strong> 30 Juni 2025<br>
            <strong>Untuk Sewa Tgl:</strong><b id="f-rent-date">-</b><br>
        </div>
    </div>

        <table>
        <tr>
            <th colspan="5">STATUS SEWA</th>
        </tr>
        <tr>
            <th>TGL</th>
            <th>STATUS</th>
            <th>OLEH</th>
           
        <tbody id="data-history">
            <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
            </tr>
        </tbody>
        
        <!-- Tambahkan baris lainnya di sini -->
       
    </table>

    <table>
        <tr>
            <th colspan="5">BARANG YANG DISEWA</th>
        </tr>
        <tr>
            <th>BANYAKNYA</th>
            <th>BARANG</th>
            <th>HARGA</th>
            <th>DENDA</th>
            <th>SUBTOTAL</th>
        </tr>

        <tbody id="data-products">
            <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
            </tr>
        </tbody>
       
        
        <!-- Tambahkan baris lainnya di sini -->
        {{-- <tr>
            <td colspan="4" align="right"><strong>JUMLAH</strong></td>
            <td>50.000</td>
        </tr> --}}
    </table>

    <div class="total-box">
        <div>
            <p><strong>CATATAN:</strong><br>
                Barang yang hilang/rusak harus diganti oleh penyewa dengan harga yang sesuai</p>
        </div>
        <div>
            <table style="width:100%">
                <tr>
                    <td><strong>GRAND TOTAL</strong></td>
                    <td><strong id="grand-total">-</strong></td>
                </tr>
            </table>
        </div>
    </div>

    <div class="footer">
        <div class="left">
            <em>Terima Kasih</em>
        </div>
        <div class="right">
            Hormat Kami,<br><br><br>
            ( Tanda Tangan )
        </div>
    </div>

    <a href="#" onclick="window.history.back();">Kembali</a>
    <a style="margin-left:10px" href="#" onclick="window.print()">Cetak</a>

    <script>
        @foreach ($varJs as $varjsi)
            {!! $varjsi !!}
        @endforeach
    </script>
    <script src="{{ asset('template/admin2/assets/js/jquery.min.js') }}"></script>
    @foreach ($javascriptFiles as $file)
        <script src="{{ $file }}"></script>
    @endforeach
</body>

</html>

