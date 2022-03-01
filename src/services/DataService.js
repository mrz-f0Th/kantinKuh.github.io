import http from "../http-common";

class DataService {
  createProduk(data) {
    return http.post('/product', data);
  }

  getProduk() {
    return http.get('/product');
  }

  getProdukId(id) {
    return http.get(`/product/${id}`)
  }

  setKeranjang(data) {
    return http.post('/keranjang', data)
  }

  getKeranjang() {
    return http.get('/keranjang')
  }

  deleteKeranjang(id) {
    return http.delete(`/keranjang/${id}`)
  }

  setTransaksi(data) {
    return http.post('/transaksi', data)
  }

  getTransaksi() {
    return http.get('/transaksi')
  }

  getTransaksiId(id) {
    return http.get(`/transaksi/${id}`)
  }

  
}


export default new DataService();
