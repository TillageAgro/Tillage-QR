const params = new URLSearchParams(window.location.search);
const batchNo = params.get('batch');

if (!batchNo) {
  document.body.innerHTML = "<h2 style='text-align:center;'>Error: Batch number is required</h2>";
} else {
  fetch('/data/batches.json')
    .then(response => response.json())
    .then(data => {
      const info = data[batchNo.toUpperCase()];
      if (info) {
        document.getElementById('product-name').textContent = info.product_name;
        document.getElementById('batch').textContent = info.batch_no;
        document.getElementById('mfg').textContent = info.mfg_date;
        document.getElementById('exp').textContent = info.exp_date;
        document.getElementById('gtin').textContent = info.gtin;
        document.getElementById('dosage').innerHTML = info.dosage;
        document.getElementById('safety').innerHTML = info.safety;
        document.getElementById('pdf-link').href = info.leaflet_pdf;
      } else {
        document.body.innerHTML = `<h2>Batch ${batchNo} not found</h2>`;
      }
    })
    .catch(() => {
      document.body.innerHTML = "<h2>Error loading data</h2>";
    });
}