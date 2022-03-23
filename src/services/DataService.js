import http from "../http-common";

class DataService {
  createProduk(data) {
    return http.post("/product", data);
  }

  getProduk() {
    return http.get("/product");
  }

  getProdukId(id) {
    return http.get(`/product/${id}`);
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
    return http.patch(`keranjang/${kode}`, data);
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
}

export default new DataService();
