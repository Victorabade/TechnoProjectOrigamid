const vm = new Vue({
  el: "#app",
  data:{
    produtos: [],
    produto: false,
    carrinho: []
  },
  computed:{
    carrinhoTotal() {
      let total = 0;
      if(this.carrinho.length){
        this.carrinho.forEach(item => {
          total += item.preco;
        });
      }
      return total;
    }
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
    }, 
    adicionarItem(){
      
      this.produto.estoque--;
      const {id, nome, preco} = this.produto;
      console.log({id, nome, preco});
      this.carrinho.push({id, nome, preco});
    },
    removerItem(index){
      this.produto.estoque++;
      this.carrinho.splice(index,1);
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