import http from "../http-common";
import authHeader from "../services/auth.header";

class DataService {
  createProduk(data) {
    return http.post("/auth/product", data, { headers: authHeader() });
  }

  getProduk() {
    return http.get("/product");
  }

  getProdukId(id) {
    return http.get(`/product/${id}`);
  }

  deleteProduk(id) {
    return http.delete(`/auth/product/${id}`, { headers: authHeader() });
  }

  editProduk(id, data) {
    return http.patch(`/auth/product/${id}`, data, { headers: authHeader() });
  }

  setKeranjang(data) {
    return http.post("/keranjang", data);
  }

  getKeranjang() {
    return http.get("/keranjang");
  }

  getKeranjangKode(kode) {
    return http.get(`/keranjang/${kode}`);
  }

  putKeranjang(kode, data) {
    return http.patch(`/keranjang/${kode}`, data);
  }

  deleteKeranjang(id) {
    return http.delete(`/keranjang/${id}`);
  }

  setTransaksi(data) {
    return http.post("/transaction", data);
  }

  getTransaksi() {
    return http.get("/transaction");
  }

  getTransaksiKode(kode) {
    return http.get(`/transaction/${kode}`);
  }

  updateTransaksi(kode, params) {
    return http.post(`/transaction/${kode}`, {
      status: params,
      _method: "patch",
    });
  }

  getViewLogLaporan() {
    return http.get("/auth/log/view/laporan", { headers: authHeader() });
  }

  pengeluaranBulanan() {
    return http.get("/auth/pengeluaran", { headers: authHeader() });
  }

  postPengeluaran(params) {
    return http.post("/auth/pengeluaran", params, {headers: authHeader() })
  }

  getLaporanBulanan(params) {
    return http.get(`/auth/log/laporan/bulanan/${params}/jumlah`, {headers: authHeader() })
  }

  getPengeluaranBulanan(params) {
    return http.get(`/pengeluaran/bulanan/${params}/jumlah`, {headers: authHeader() })
  }
}

export default new DataService();
