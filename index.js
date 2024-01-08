/** -- GENERAL VARIABLES -- **/

//Url from information
const baseUrl = "https://platzi-avo.vercel.app";

//Main - containerAvocados
const containerAvocados = document.querySelector('.containerAvocados');

//Main - products
const products = document.querySelector('.containerAvocados_products');

//Main - containerAvocados_window
const containerAvocadosWindow = document.querySelector('.containerAvocados_window');


//*Events delegation:
// 2.Segunda prueba: Mismo. Se aplica listener al padre pero usando event y un condicional:*/
containerAvocados.addEventListener("click", (event) => {
      if(event.target.nodeName === 'H2' || event.target.nodeName === 'P'){
            const src = (event.target.parentNode.childNodes[0].dataset.src);
            console.log(src);

            const title = (event.target.parentNode.childNodes[1].dataset.title);
            console.log(title);

            const price =(event.target.parentNode.childNodes[2].dataset.price);
            console.log(price);

            showAvocado(src,title,price);
      }
});


//Show avocados window
function showAvocado(src,title,price){

    //containerAvocados_window_container
    const containerAvocadosWindowContainer = document.createElement('section');
    containerAvocadosWindowContainer.className='containerAvocados_window_container';

    //containerAvocados_window_Background
    const containerAvocadosWindowBackground = document.createElement('div');
    containerAvocadosWindowBackground.className='containerAvocados_window_Background';

    //containerAvocados_window_Avocado
    const containerAvocadosWindowAvocado = document.createElement('div');
    containerAvocadosWindowAvocado.className='containerAvocados_window_Avocado';

    //avocados-window-close
    const avocadosWindowClose = document.createElement('img');
    avocadosWindowClose.className='avocados-window-close';

    avocadosWindowClose.addEventListener('click', CloseAvocadoWindow);

    //cardAvocado
    const cardAvocado = document.createElement('div');
    cardAvocado.className='cardAvocado';

    //CardAvocado Img
    const img = document.createElement('img');
    img.setAttribute('src', `${src}`);
    img.setAttribute('alt', 'close');

    //CardAvocado h2
    const name = document.createElement('h2');
    name.textContent= `${title}`;

    //CardAvocado p
    const cost = document.createElement('p');
    cost.textContent = formatPrice(price);

    //Integration
    cardAvocado.append(img, name, cost);
    containerAvocadosWindowAvocado.append(avocadosWindowClose,cardAvocado);
    containerAvocadosWindowContainer.append(containerAvocadosWindowBackground,
        containerAvocadosWindowAvocado);
    containerAvocadosWindow.append(containerAvocadosWindowContainer);

    //Remove window-inactive
    containerAvocadosWindow.classList.remove('window-inactive');    
} 

//Remove window-inactive
function CloseAvocadoWindow(){
    containerAvocadosWindow.classList.add('window-inactive');
}


//Format Price
const formatPrice = (price) => {
	const newPrice = new window.Intl.NumberFormat('en-EN',{
         style: "currency",
         currency: "USD",
     }).format(price);

     return newPrice;
};


 /*Web API Fetch: Fetching resources from information source (URL).
 1. Server conection*/
window
    .fetch(`${baseUrl}/api/avo`)

    /*2. Promise to JSON.*/
    .then((respuesta) => respuesta.json())

    /*3. Data Received*/
    .then(dataReceived=> {

        //Rendering
        dataReceived.data.forEach((item) =>{

            //Create card
            const cardAvocado = document.createElement('div');
            cardAvocado.classList.add('cardAvocado');

            //Create image
            const img = document.createElement('img');
            img.setAttribute('src', `${baseUrl}${item.image}`);
            img.dataset.src=`${baseUrl}${item.image}`;

            //Create title
            const title = document.createElement('h2');
            title.textContent= `${item.name}`;
            title.dataset.title=`${item.name}`;

            //Crear price
            const price = document.createElement('p');
            price.textContent = formatPrice(item.price);
            price.dataset.price=`${item.price}`;

            //Integration
            cardAvocado.append(img, title, price);
            products.append(cardAvocado);
		});
        containerAvocados.append(products);
});
