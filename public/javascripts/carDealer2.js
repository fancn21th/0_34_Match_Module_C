
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

// 展位客户模板
var CLIENT_IN_CAR_BOOTH_TEMPLATE =
    '<div class="client_in_car_booth" data-car-reception-desk-id="{0}" data-target-brand="{1}">' +
    '   <img src="{2}" alt=""/>' +
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

    // 根据 receptionDeskId 获取 CarInPlace in CarsInPlace
    function _getCarInPlace(receptionDeskId) {
        var match = window.car_dealer.cars_in_place.filter(function (carInPlace) {
            return carInPlace.id === receptionDeskId;
        });
        return match && match.length > 0 ? match[0] : null;
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

    function _isSpecificBrandCarsPlaceAllOccupied(brand) {
        return window.car_dealer.cars_in_place.filter(function (carInPlace) {
            return carInPlace.brand === brand;
        }).filter(function (carInPlace) {
            return carInPlace.status === window.cars_in_place_status.empty;
        }).length === 0;
    }

    function _isClientDroppable(actualBrand, receptionDeskId) {
        var carInPlace = _getCarInPlace(receptionDeskId);
        if(carInPlace.brand !== actualBrand &&
            _isSpecificBrandCarsPlaceAllOccupied(actualBrand))
            return true;
        if(carInPlace.status === window.cars_in_place_status.empty &&
            carInPlace.brand === actualBrand)
            return true;
        return false;
    }

    function _updateCarInPlace(receptionDeskId, client, status) {
        var carInPlace = _getCarInPlace(receptionDeskId);
        carInPlace.client = client;
        carInPlace.status = status;
    }

    // 在一个展位上显示客户信息
    function _renderClientInReceptionDesk(receptionDeskId) {
        var $carReceptionDesk = $('.car_reception_desk[data-car-reception-desk-id=' + receptionDeskId + ']');
        var client = _getCarInPlace(receptionDeskId).client;
        $carReceptionDesk.empty();
        $carReceptionDesk.append(CLIENT_IN_CAR_BOOTH_TEMPLATE.format(
            receptionDeskId,
            client.brand,
            client.img
        ));
        var $clientInReceptionDesk = $carReceptionDesk.find('div.client_in_car_booth');
        $clientInReceptionDesk.draggable({
            revert: "invalid",
            cursor: "move"
        });
    }
    function _renderReceptionDeskAfterRemoved(receptionDeskId) {
        var $carReceptionDesk = $('.car_reception_desk[data-car-reception-desk-id=' + receptionDeskId + ']');
        $carReceptionDesk.empty();
        $carReceptionDesk.append('drag and drop client to here');
    }

    function _renderClientInReceptionDeskOnAdded(clientUI, receptionDeskId) {
        clientUI.fadeOut('slow', function () {
            _renderClientInReceptionDesk(receptionDeskId);
        });
    }
    function _renderClientInReceptionDeskOnAddedAndRemoved(clientUI, originalReceptionDeskId, newReceptionDeskId) {
        clientUI.fadeOut('slow', function () {
            _renderClientInReceptionDesk(newReceptionDeskId);
            _renderReceptionDeskAfterRemoved(originalReceptionDeskId);
        });
    }

    function _dropClientHandler(event, ui) {
        // clients queue 里面的 模板 包含 data-client-id 属性
        // car_reception_desk 里面的 模板 不包含 data-client-id 属性
        var clientId = ui.draggable.attr('data-client-id');
        if (clientId) {
            // 客户来自Clients Queue
            _updateCarInPlace(
                $(event.target).attr('data-car-reception-desk-id'),
                clientsQueue.getClientById(clientId),
                window.cars_in_place_status.occupied
            );
            _renderClientInReceptionDeskOnAdded(
                ui.draggable,
                $(event.target).attr('data-car-reception-desk-id')
            );
            // 从clientsQueue移除客户数据
            clientsQueue.removeClient(clientId);
        } else {
            // 客户来自同品牌其他展位
            var originalReceptionDeskId = ui.draggable.attr('data-car-reception-desk-id');
            var originalCarInPlace = _getCarInPlace(originalReceptionDeskId);
            var newReceptionDeskId = $(event.target).attr('data-car-reception-desk-id');
            _updateCarInPlace(
                newReceptionDeskId,
                originalCarInPlace.client,
                window.cars_in_place_status.occupied
            );
            _updateCarInPlace(
                originalReceptionDeskId,
                null,
                window.cars_in_place_status.empty
            );
            _renderClientInReceptionDeskOnAddedAndRemoved(
                ui.draggable,
                originalReceptionDeskId,
                newReceptionDeskId
            );
        }
    }

    // public methods
    function init() {
        _cacheDOM();
        _renderCarsPlace();
        _renderCarsBooth();

        Object.keys(window.cars_brand).forEach(function (carKey) {
            var $carReceptionDeskList = $('.car_reception_desk'.format(window.cars_brand[carKey]));
            $carReceptionDeskList.droppable({
                accept: function(ui) {
                    var droppedEle = $(this);
                    return _isClientDroppable(
                        ui.attr('data-target-brand'),
                        droppedEle.attr('data-car-reception-desk-id')
                    );
                },
                drop: _dropClientHandler
            });
        });
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
        $(".client").draggable({
            revert: "invalid",
            cursor: "move"
        });
        // $(".client[data-client-id=" + _client_list[0].id + "]").draggable({
        //     revert: "invalid",
        //     cursor: "move"
        // });
    }

    // public methods
    function init() {
        _cacheDOM();
    }

    function getClientById(clientId) {
        var match = _client_list.filter(function (client) {
            return client.id.toString() === clientId;
        });
        return match && match.length > 0 ? match[0] : null;
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

    function removeClient(clientId) {
        _client_list = _client_list.filter(function (client) {
            return client.id.toString().toLowerCase() !== clientId;
        });
    }

    function getAllClient() {
        return _client_list;
    }

    // expose public methods
    return {
        init: init,
        addClient: addClient,
        getClientById: getClientById,
        removeClient: removeClient,
        getAllClient: getAllClient,
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
    clientsQueue.addClient();
    clientsQueue.addClient();
    clientsQueue.addClient();
    clientsQueue.addClient();
});

