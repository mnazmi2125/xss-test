<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Instan Deposit</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    .hidden { display: none; }
    .fade-in {
      animation: fadeIn 0.8s;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px);}
      to   { opacity: 1; transform: translateY(0);}
    }
  </style>
</head>
<body class="bg-gradient-to-b from-blue-50 to-indigo-100 min-h-screen flex items-center justify-center">
  <div class="bg-white shadow-2xl rounded-2xl w-full max-w-xl p-8 space-y-8">
    <h1 class="text-3xl font-bold text-center text-indigo-700 mb-4">Instan Deposit</h1>
    
    <!-- QRIS Deposit -->
<!-- Bagian QRIS (ganti QR dinamis menjadi statis gambar) -->
<div class="p-4 bg-indigo-50 rounded-xl shadow">
  <h2 class="text-xl font-semibold mb-2 text-indigo-600">Deposit via QRIS</h2>
  <label class="block mb-2 text-sm font-medium">Masukkan Username:</label>
  <input id="qrisInput" type="text" placeholder="Ketik username kamu..." class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400">
  <div id="qrisSection" class="mt-4 flex flex-col items-center">
    <img id="qrisImage" src="https://github.com/mnazmi2125/xss-test/raw/0258a931219d83430e979872c2f049719d188cda/qris-manual%20oei.jpg" alt="QRIS" class="mb-2 shadow-lg rounded-xl" style="width: 200px; height: 200px; object-fit: contain;">
    <span class="text-xs text-gray-500">Scan QRIS ini untuk deposit instan ke akun kamu!</span>
  </div>
</div>


    <!-- Deposit via DANA/Banking -->
    <div class="p-4 bg-indigo-50 rounded-xl shadow">
      <h2 class="text-xl font-semibold mb-2 text-indigo-600">Deposit via DANA / Banking</h2>
      <label class="block mb-2 text-sm font-medium">Nominal Deposit (Rp):</label>
      <input id="nominalInput" type="text" class="w-full p-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-400">
      <div class="text-sm text-gray-600 mb-4">Minimal Deposit Rp50.000</div>

      <div class="mb-2">
        <div class="font-semibold">No. DANA:</div>
        <span class="text-blue-700 font-mono text-lg">0812-3456-7890</span>
      </div>
      <div class="mb-2">
        <div class="font-semibold">No. Rekening Bank:</div>
        <span class="text-green-700 font-mono text-lg">1234 5678 9000 (BCA)</span>
      </div>
      <div class="text-xs text-gray-500 mb-4">*Transfer sesuai nominal di atas, lalu konfirmasi via WhatsApp admin jika perlu.</div>
      
      <div class="flex gap-4">
        <button id="btnOke" class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow transition">OKE</button>
        <a href="https://wa.me/6281234567890" target="_blank"
           class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow transition flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M21.05 12.29A9 9 0 112.94 7.34l-1.09 3.18a.75.75 0 00.98.97l3.23-1.08a8.97 8.97 0 0114.99 1.88z"/>
          </svg>
          KONFIRMASI LIVECHAT
        </a>
      </div>
      <div id="notifProses" class="hidden fade-in mt-4 bg-yellow-100 text-yellow-800 px-4 py-2 rounded shadow text-center font-semibold">
        Deposit diproses...
      </div>
    </div>
  </div>

  <script>
  

    // OKE Button
    const btnOke = document.getElementById('btnOke');
    const notifProses = document.getElementById('notifProses');
    btnOke.addEventListener('click', function() {
      notifProses.classList.remove('hidden');
      notifProses.classList.add('fade-in');
      setTimeout(() => notifProses.classList.remove('fade-in'), 900);
      // Auto hide notification after 2.5 seconds (opsional)
      // setTimeout(() => notifProses.classList.add('hidden'), 2500);
    });
    // Fungsi format ke rupiah
function formatRupiah(angka, prefix){
  let number_string = angka.replace(/[^,\d]/g, '').toString(),
      split    = number_string.split(','),
      sisa     = split[0].length % 3,
      rupiah   = split[0].substr(0, sisa),
      ribuan   = split[0].substr(sisa).match(/\d{3}/gi);

  // tambahkan titik jika yang di input sudah menjadi ribuan
  if(ribuan){
    let separator = sisa ? '.' : '';
    rupiah += separator + ribuan.join('.');
  }

  rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
  return prefix === undefined ? rupiah : (rupiah ? 'Rp ' + rupiah : '');
}

const nominalInput = document.getElementById('nominalInput');
nominalInput.addEventListener('input', function(e){
  let value = nominalInput.value;
  nominalInput.value = formatRupiah(value, 'Rp ');
});

  </script>
</body>
</html>
