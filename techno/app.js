const vm = new Vue({
  el: "#app",
  data:{
    produtos: [],
    produto: false
  },
  methods: {
    fetchProdutos(){
      const produtosApi = "./api/produtos.json";
      fetch(produtosApi)
      .then(r => r.json())
      .then( produto => this.produtos = produto)
    },
    fetchProduto(id){
      const produtosApi = `./api/produtos/${id}/dados.json`;
      fetch(produtosApi)
      .then(r => r.json())
      .then( produto => {this.produto = produto})
    },
    fecharModal({target, currentTarget}){
      if(target === currentTarget) this.produto = false;
    },
    abrirModal(id){
      this.fetchProduto(id);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  },
  filters:{
      numeroPreco(valor){
        return valor.toLocaleString("pt-BR", {style: "currency", currency:"BRL"});
      }
  },  
  created(){
    this.fetchProdutos()
  }
})