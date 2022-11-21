let cart = [];
let modalQt = 0;
let key = 0;
const c = (el)=>document.querySelector(el);
const cs = (el)=>document.querySelectorAll(el);

jogosJson.map((item, index1)=>{
    let jogosItem = c('.jogos .jogos-item').cloneNode(true);
    jogosItem.setAttribute('data-key', index1);
    jogosItem.querySelector('.jogos-item--img img').src = item.img;
    jogosItem.querySelector('.jogos-item--price').innerHTML = `R$ ${item.price[2].toFixed(2)}`;
    jogosItem.querySelector('.jogos-item--name').innerHTML = item.name;
    jogosItem.querySelector('.jogos-item--desc').innerHTML = item.description;

    jogosItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();
        key = e.target.closest('.jogos-item').getAttribute('data-key');
        modalQt = 1;
        c('.jogosBig img').src = jogosJson[key].img;
        c('.jogosInfo h1').innerHTML = jogosJson[key].name;
        c('.jogosInfo--desc').innerHTML = jogosJson[key].description;
        //c('.jogosInfo--actualPrice').innerHTML = `R$ ${jogosJson[key].price[2].toFixed(2)}`;      
        c('.jogosInfo--size.selected').classList.remove('selected');
        cs('.jogosInfo--size').forEach((size, sizeIndex1)=>{
            if(sizeIndex1 == 2) {
                size.classList.add('selected');
                c('.jogosInfo--actualPrice').innerHTML = `R$ ${jogosJson[key].price[sizeIndex1].toFixed(2)}`;
            }
            //size.innerHTML = jogosJson[key].sizes[sizeIndex1];
            size.querySelector('span').innerHTML = jogosJson[key].sizes[sizeIndex1];
        })
        c('.jogosWindowArea').style.opacity = 0;
        c('.jogosWindowArea').style.display = 'flex' ;
        setTimeout(()=>{
            c('.jogosWindowArea').style.opacity = 1;
        }, 200);

    })
    c('.jogos-area').append(jogosItem);
});

//Ações do modal - janela
function closeModal(){
    c('.jogosWindowArea').style.opacity = 0;
    setTimeout(()=>{
        c('.jogosWindowArea').style.display = 'none';
    }, 500);
}

cs('.jogosInfo--cancelButton, .jogosInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
})

c('.jogosInfo--qtmenos').addEventListener('click', ()=>{
    if(modalQt > 1){
        modalQt--;
        c('.jogosInfo--qt').innerHTML = modalQt;
    }
});

c('.jogosInfo--qtmais').addEventListener('click', ()=>{
    modalQt++;
    c('.jogosInfo--qt').innerHTML = modalQt;
});


cs('.jogosInfo--size').forEach((size, sizeIndex1)=>{
    size.addEventListener('click', (e)=>{
        c('.jogosInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
        c('.jogosInfo--actualPrice').innerHTML = `R$ ${jogosJson[key].price[sizeIndex1].toFixed(2)}`;

    })
})

c('.jogosInfo--addButton').addEventListener('click', ()=>{
    //Qual o jogo?
    //console.log("Modelo: " + key);
    //Qual a versão do Jogo?
    let size = parseInt(c('.jogosInfo--size.selected').getAttribute('data-key'));
    let identifier = jogosJson[key].id+'@'+size;
    let locaId = cart.findIndex((item)=>item.identifier == identifier);
    if(locaId > -1){
        cart[locaId].qt += modalQt;
    } else {
    //console.log("Tamanho: " + size);
    //Quantidade?
    //console.log("Quantidade: " + modalQt);
        cart.push({
            identifier,
            id:jogosJson[key].id,
            size,
            qt:modalQt
        });
    }
    updateCart();
    closeModal();
});

c('.menu-openner').addEventListener('click', ()=>{
    if(cart.length > 0){
        c('aside').style.left = '0';
    }
});

c('.menu-closer').addEventListener('click', ()=>{
    c('aside').style.left = '100vw';
});

c('.cart--finalizar').addEventListener('click', ()=>{
    cart = [];
    updateCart();
});

function updateCart(){
    c('.menu-openner span').innerHTML = cart.length;
    if(cart.length > 0){
        c('aside').classList.add('show');
        c('.cart').innerHTML = '';
        let subtotal = 0;
        let desconto = 0;
        let total = 0;
        cart.map((itemCart, index1)=>{
            let jogosItem = jogosJson.find((itemBD)=>itemBD.id == itemCart.id);
            subtotal += jogosItem.price[itemCart.size] * itemCart.qt;
            let cartItem = c('.jogos .cart--item').cloneNode(true);
            let jogoSizename;
            switch(itemCart.size) {
                case 0:
                    jogoSizename = 'História';
                    break;
                case 1:
                    jogoSizename = 'Multiplayer';
                    break;
                case 2:
                    jogoSizename = 'Completo';
                    break;
            }
            cartItem.querySelector('img').src = jogosItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = `${jogosItem.name} (${jogoSizename})`;
            //cartItem.querySelector('.cart--item-nome').innerHTML = `${jogosItem.name} - ${jogosItem.sizes[itemCart.size]}`;
            cartItem.querySelector('.cart--item-qt').innerHTML = itemCart.qt;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{
                if(itemCart.qt > 1){
                    itemCart.qt--;
                } else {
                    cart.splice(index1, 1);
                }
                updateCart();
            });
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
                itemCart.qt++;
                updateCart();
            });
            c('.cart').append(cartItem);
        });
        desconto = subtotal * 0.1;
        total = subtotal - desconto;
        c('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;
    } else {
        c('aside').classList.remove('show');
        c('aside').style.left = '100vw';
    }
};