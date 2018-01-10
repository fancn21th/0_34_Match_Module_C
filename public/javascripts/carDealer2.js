
// 客户列表客户模板
var CLIENT_TEMPLATE =
    '<div class="client client_{0}" data-client-id="{1}" data-target-brand="{2}">' +
    '   <span class="preference">Client for {2}</span>' +
    '</div>';

// 展位区域模板
var CARS_PLACE_TEMPLATE =
    '<div id="{0}" class="place">' +
    '    <div class="car_brand">' +
    '        Place for {1} cars' +
    '    </div>' +
    '    <div class="car_booth_list">' +
    '    </div>' +
    '</div>';

// 展位车位模板 (插入到展位模板)
var CAR_BOOTH_TEMPLATE =
    '<div class="car_booth">' +
    '   <div class="car_status">' +
    '       <img src="images/{0}" alt=""/>' +
    '   </div>' +
    '   <div class="car_img">' +
    '       <img src="images/{1}" alt=""/>' +
    '   </div>' +
    '   <div class="car_reception_desk" data-car-reception-desk-id="{3}">' +
    '       drag and drop client to here' +
    '   </div>' +
    '</div>';

// 汽车在展位上的状态
window.cars_in_place_status = {
    empty: 'EMPTY',
    occupied: 'OCCUPIED',
    sold: 'SOLD'
};
// 汽车品牌枚举
window.cars_brand = {
    porsche: 'Porsche',
    volkswagen: 'Volkswagen',
    audi: 'Audi',
    bmw: 'BMW',
};
// 汽车品牌价格枚举
window.cars_price = {
    porsche: 72500,
    volkswagen: 23930,
    audi: 31260,
    bmw: 43990,
};
// 汽车品牌图片
window.cars_brand_imgs = {
    porsche: "Porsche-logo.jpg",
    volkswagen: "volkswagen-logo.jpg",
    audi: "audi-logo.jpg",
    bmw: "bmw-logo.jpg",
};
// 汽车销售程序 内存数据库
window.car_dealer = {
    // 展位汽车信息列表
    cars_in_place: [
        {
            id: 'p01',
            status: window.cars_in_place_status.empty,
            img: 'Porsche_1.jpg',
            brand: window.cars_brand.porsche,
            price: window.cars_price.porsche,
            client: null,
        },
        {
            id: 'p02',
            status: window.cars_in_place_status.empty,
            img: 'Porsche_1.jpg',
            brand: window.cars_brand.porsche,
            price: window.cars_price.porsche,
            client: null,
        },
        {
            id: 'p03',
            status: window.cars_in_place_status.empty,
            img: 'Porsche_1.jpg',
            brand: window.cars_brand.porsche,
            price: window.cars_price.porsche,
            client: null,
        },
        {
            id: 'p04',
            status: window.cars_in_place_status.empty,
            img: 'Porsche_1.jpg',
            brand: window.cars_brand.porsche,
            price: window.cars_price.porsche,
            client: null,
        },
        {
            id: 'v01',
            status: window.cars_in_place_status.empty,
            img: 'volkswagen_2.png',
            brand: window.cars_brand.volkswagen,
            price: window.cars_price.volkswagen,
            client: null,
        },
        {
            id: 'v02',
            status: window.cars_in_place_status.empty,
            img: 'volkswagen_2.png',
            brand: window.cars_brand.volkswagen,
            price: window.cars_price.volkswagen,
            client: null,
        },
        {
            id: 'v03',
            status: window.cars_in_place_status.empty,
            img: 'volkswagen_2.png',
            brand: window.cars_brand.volkswagen,
            price: window.cars_price.volkswagen,
            client: null,
        },
        {
            id: 'v04',
            status: window.cars_in_place_status.empty,
            img: 'volkswagen_2.png',
            brand: window.cars_brand.volkswagen,
            price: window.cars_price.volkswagen,
            client: null,
        },
        {
            id: 'a01',
            status: window.cars_in_place_status.empty,
            img: 'Audi_1.jpg',
            brand: window.cars_brand.audi,
            price: window.cars_price.audi,
            client: null,
        },
        {
            id: 'a02',
            status: window.cars_in_place_status.empty,
            img: 'Audi_1.jpg',
            brand: window.cars_brand.audi,
            price: window.cars_price.audi,
            client: null,
        },
        {
            id: 'a03',
            status: window.cars_in_place_status.empty,
            img: 'Audi_1.jpg',
            brand: window.cars_brand.audi,
            price: window.cars_price.audi,
            client: null,
        },
        {
            id: 'a04',
            status: window.cars_in_place_status.empty,
            img: 'Audi_1.jpg',
            brand: window.cars_brand.audi,
            price: window.cars_price.audi,
            client: null,
        },
        {
            id: 'b01',
            status: window.cars_in_place_status.empty,
            img: 'BMW_1.jpg',
            brand: window.cars_brand.bmw,
            price: window.cars_price.bmw,
            client: null,
        },
        {
            id: 'b02',
            status: window.cars_in_place_status.empty,
            img: 'BMW_1.jpg',
            brand: window.cars_brand.bmw,
            price: window.cars_price.bmw,
            client: null,
        },
        {
            id: 'b03',
            status: window.cars_in_place_status.empty,
            img: 'BMW_1.jpg',
            brand: window.cars_brand.bmw,
            price: window.cars_price.bmw,
            client: null,
        },
        {
            id: 'b04',
            status: window.cars_in_place_status.empty,
            img: 'BMW_1.jpg',
            brand: window.cars_brand.bmw,
            price: window.cars_price.bmw,
            client: null,
        },
    ]
};

var carsPlace = (function () {
    var $cars_place;

    // private methods
    function _cacheDOM() {
        $cars_place = $('#cars_place');
    }

    // 生成汽车展位区域内每个汽车展位的DOM
    function _getCarBoothListContent(carKey){
        var content = '';
        window.car_dealer.cars_in_place
            .filter(function (carInPlace) {
                return carInPlace.brand.toLowerCase() === carKey;
            })
            .forEach(function (carInPlace) {
                content += CAR_BOOTH_TEMPLATE.format(
                    window.cars_brand_imgs[carKey],
                    carInPlace.img,
                    carInPlace.brand,
                    carInPlace.id
                );
            });
        return content;
    }

    // 显示不同品牌汽车的展位区域
    function _renderCarsPlace() {
        Object.keys(window.cars_brand).forEach(function (carKey) {
            var content = CARS_PLACE_TEMPLATE.format(carKey, window.cars_brand[carKey]);
            $cars_place.append(content);
        });
    }

    // 显示每一辆汽车的展位区域
    function _renderCarsBooth(){
        Object.keys(window.cars_brand).forEach(function (carKey) {
            var $car_booth_list = $('#{0} .car_booth_list'.format(carKey));
            var content = _getCarBoothListContent(carKey);
            $car_booth_list.append(content);
        });
    }

    // public methods
    function init() {
        _cacheDOM();
        _renderCarsPlace();
        _renderCarsBooth();
    }

    // expose public methods
    return {
        init: init,
    };
})();

var clientsQueue = (function () {
    var $clientsQueue;
    var _client_list = [];

    // private methods
    function _cacheDOM() {
        $clientsQueue = $('#clients_queue');
    }
    function _renderClietList() {
        var content = '';
        $clientsQueue.empty();
        _client_list.forEach(function (client) {
            content += CLIENT_TEMPLATE.format(
                client.client,
                client.id,
                client.brand
            );
        });
        $clientsQueue.append(content);
    }

    // public methods
    function init() {
        _cacheDOM();
    }

    function addClient() {
        var preference = Math.floor((Math.random()*4));
        var clientIdx = Math.floor((Math.random()*10)+1);
        _client_list.push({
            id: Date.now(),
            brand: window.cars_brand[Object.keys(window.cars_brand)[preference]],
            client: clientIdx,
            img: 'images/client_{0}.jpg'.format(clientIdx)
        });
        _renderClietList();
    }

    // expose public methods
    return {
        init: init,
        addClient: addClient,
    };
})();

$(document).ready(function() {
    // 供前端模板替换使用
    if (!String.prototype.format) {
        String.prototype.format = function() {
            var args = arguments;
            return this.replace(/{(\d+)}/g, function(match, number) {
                return typeof args[number] != 'undefined'
                    ? args[number]
                    : match;

            });
        };
    }

    clientsQueue.init();
    carsPlace.init();

    clientsQueue.addClient();
    clientsQueue.addClient();
    clientsQueue.addClient();
    clientsQueue.addClient();
});


