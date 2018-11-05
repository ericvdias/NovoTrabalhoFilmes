
var linkImagem = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2'
var idImagem;
var idMovie;
var imagemFundo;
var tituloFilme;
var idFilm;
var vposicao;
var dataLancamento;



/*Ao carregar a pagina*/
chamaApi('https://api.themoviedb.org/3/trending/movie/week?api_key=6521859e8b7c918bfaba021cfddac551&language=pt-BR');


/*Ao clicar em Home*/
function paginaInicial(){
	parent.window.document.location.href = '';
}

/*Ao clicar em Pesquisar*/
function buscaFilme(){
	var input = document.querySelector('#filmeBusca')
	var buscar = document.querySelector('#filmeBusca').value;
	var corpo1 = document.querySelector('#posicao1')
	corpo1.innerHTML = ''
	var corpo2 = document.querySelector('#posicao2')
	corpo2.innerHTML = ''
	chamaApi('https://api.themoviedb.org/3/search/movie?api_key=6521859e8b7c918bfaba021cfddac551&language=pt-BR&query='+buscar);
}

/*Funçao Principal que carrega a pagina com os filmes*/
function chamaApi (url){
	let httpClientRequest = new XMLHttpRequest;
	var retorno;
	httpClientRequest.open('GET',url);
	httpClientRequest.send();
	
	httpClientRequest.onreadystatechange = function(request){
		if(httpClientRequest.readyState == 4 && httpClientRequest.status == 200) {
			
			var retorno = JSON.parse(httpClientRequest.responseText)

			for(let i = 0; i < retorno.results.length; i++){
				
				idImagem = linkImagem+retorno.results[i].poster_path;
				idMovie = retorno.results[i].id;
				dataLancamento = retorno.results[i].release_date;

				imagemFundo = linkImagem+retorno.results[i].backdrop_path;
				if(i == 0 || i % 2 == 0){
					tituloFilme = retorno.results[i].title;
					vposicao = posicao1;
					dadosFilmes1(retorno.results[i].title, retorno.results[i].overview, vposicao, idMovie);

				} else{
					vposicao = posicao2;
					dadosFilmes1(retorno.results[i].title, retorno.results[i].overview, vposicao, idMovie);
					
				}
			}
		}
	}
}
/*Chamada pela Função Principal*/
function dadosFilmes1 (title, overview, vposicao, idMovie){
	var filmeNovo = "<div class=row id=vposicao><div class=col-md-7 show-image><div id=imagem> <img src="+idImagem+"></div></div>" + 
	"<div class=col-md-5>" + "<h3 id= filme>" + title + "</h3><p class=block-with-text id=sinopse>" + overview + "</p>" +
	"<a hef = # class='btn btn-success' onclick='addFilmeMinhaLista("+idMovie+")' data-toggle='tooltip' data-placement='bottom' title='Adicionar na Minha Lista' btn-custom'" +
	"><span class='glyphicon glyphicon-thumbs-up'></span></a>" +
	"<a hef = # id = delete class='btn btn-danger' onclick='deleteFilmeMinhaLista("+idMovie+")' data-toggle='tooltip' data-placement='bottom' title='Remover da Minha Lista' btn-custom'" +
	"><span class='glyphicon glyphicon-remove'></span></div></div>";

	if(vposicao == posicao1){
		var linha = document.querySelector("#posicao1")
	}else{
		var linha = document.querySelector("#posicao2")
	}
	
	var conteudoExistente = linha.innerHTML
	conteudoExistente = conteudoExistente + filmeNovo
	linha.innerHTML = conteudoExistente

}


/*Adiciona os filmes na Minha Lista (LocalStorage)*/
function addFilmeMinhaLista(idMovie){
	if (localStorage.getItem(idMovie) === null) {

		var conteudos = []

		conteudos.push(idMovie)
		localStorage.setItem(idMovie, JSON.stringify(conteudos))
	} else {
		var conteudos = JSON.parse(localStorage.getItem(idMovie));
		conteudos.push(idMovie)
		localStorage.setItem(idMovie, JSON.stringify(conteudos))
	}
}

/*Remove os filmes na Minha Lista (LocalStorage)*/
function deleteFilmeMinhaLista(idMovie) {
	
	for (let i = 0; i<window.localStorage.length;i++){

		if(idMovie != window.localStorage.key(i)){
			console.log("não está na lista")
		} else {

			localStorage.removeItem(idMovie)
			minhaLista();
		}
	}
}

/*Ao clicar em Minha Lista, limpa a tela e recarrega com os favoritos*/
function minhaLista(){
	var corpo1 = document.querySelector('#posicao1')
	corpo1.innerHTML = ''
	var corpo2 = document.querySelector('#posicao2')
	corpo2.innerHTML = '';



	if(window.localStorage.length == 0){
	}else{
		for (let i = 0; i<window.localStorage.length;i++){
			idFilmeMinhaLista = window.localStorage.key(i);

			exibeMinhaLista('https://api.themoviedb.org/3/movie/'+idFilmeMinhaLista+'?api_key=6521859e8b7c918bfaba021cfddac551&language=pt-BR', i)
		}
	}
}

/*Chamada pela funçao minhaLista*/
function exibeMinhaLista (url,i){
	let httpClientRequest = new XMLHttpRequest;
	var retorno;
	httpClientRequest.open('GET',url);
	httpClientRequest.send();

	httpClientRequest.onreadystatechange = function(request){
		if(httpClientRequest.readyState == 4 && httpClientRequest.status == 200) {

			var retorno = JSON.parse(httpClientRequest.responseText)


			idImagem = linkImagem+retorno.poster_path;
			idMovie = retorno.id;

			imagemFundo = linkImagem+retorno.backdrop_path;


			if(i == 0 || i % 2 == 0){

				vposicao = posicao1;
				dadosFilmes1(retorno.title, retorno.overview, vposicao, idMovie);
			} else{
				vposicao = posicao2;
				dadosFilmes1(retorno.title, retorno.overview, vposicao, idMovie);

			}
		}
	}
}



