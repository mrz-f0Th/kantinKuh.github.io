import http from "../http-common";

class DataService {
  createProduk(data) {
    return http.post('/produk', data);
  }

  getProduk() {
    return http.get('/produk');
  }
}


export default new DataService();
