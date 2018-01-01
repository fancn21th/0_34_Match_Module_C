// HTML TEMPLATES
var CLIENT_TEMPLATE =
    '<div class="client client_{0}" data-client-id="{2}" data-target-brand="{1}">' +
    '   <span class="preference">Client for {1}</span>' +
    '</div>';

var CLIENT_IN_CAR_BOOTH_TEMPLATE =
    '<div class="client_in_car_booth" data-client-id="{0}" data-car-id="{1}">' +
    '   <img src="{2}" alt=""/>' +
    '</div>';

var CAR_BOOTH_TEMPLATE =
    '<div class="car_booth">' +
    '   <div class="car_status">' +
    '       <img src="images/{0}" alt=""/>' +
    '   </div>' +
    '   <div class="car_img">' +
    '       <img src="images/{1}" alt=""/>' +
    '   </div>' +
    '   <div class="car_reception_desk" data-target-brand="{2}" data-car-reception-desk-id="{3}">' +
    '       drag and drop client to here' +
    '   </div>' +
    '</div>';

var carsPlace = (function () {
    var $porscheReceptionDeskList = null;
    var $volkswagenReceptionDeskList = null;
    var $audiReceptionDeskList = null;
    var $bmwReceptionDeskList = null;
    var $porscheBoothList = null;
    var $volkswagenBoothList = null;
    var $audiBoothList = null;
    var $bmwBoothList = null;
    var _car_reception_desk_list = {};
    var _brandImgList = {
        "Porsche": "Porsche-logo.jpg",
        "Volkswagen": "volkswagen-logo.jpg",
        "Audi": "audi-logo.jpg",
        "BMW": "bmw-logo.jpg",
    };
    var _car_in_store_status = {
        empty: 'EMPTY',
        occupied: 'OCCUPIED',
        sold: 'SOLD'
    };
    var _car_in_store = {
        porsche: [
            {
                id: 'p01',
                status: _car_in_store_status.empty,
                img: 'Porsche_1.jpg',
                brand: 'Porsche',
            },
            {
                id: 'p02',
                status: _car_in_store_status.empty,
                img: 'Porsche_1.jpg',
                brand: 'Porsche',
            },
            {
                id: 'p03',
                status: _car_in_store_status.empty,
                img: 'Porsche_1.jpg',
                brand: 'Porsche',
            },
            {
                id: 'p04',
                status: _car_in_store_status.empty,
                img: 'Porsche_1.jpg',
                brand: 'Porsche',
            }
        ],
        volkswagen: [
            {
                id: 'v01',
                status: _car_in_store_status.empty,
                img: 'volkswagen_2.png',
                brand: 'Volkswagen',
            },
            {
                id: 'v02',
                status: _car_in_store_status.empty,
                img: 'volkswagen_2.png',
                brand: 'Volkswagen',
            },
            {
                id: 'v03',
                status: _car_in_store_status.empty,
                img: 'volkswagen_2.png',
                brand: 'Volkswagen',
            },
            {
                id: 'v04',
                status: _car_in_store_status.empty,
                img: 'volkswagen_2.png',
                brand: 'Volkswagen',
            }
        ],
        audi: [
            {
                id: 'a01',
                status: _car_in_store_status.empty,
                img: 'Audi_1.jpg',
                brand: 'Audi',
            },
            {
                id: 'a02',
                status: _car_in_store_status.empty,
                img: 'Audi_1.jpg',
                brand: 'Audi',
            },
            {
                id: 'a03',
                status: _car_in_store_status.empty,
                img: 'Audi_1.jpg',
                brand: 'Audi',
            },
            {
                id: 'a04',
                status: _car_in_store_status.empty,
                img: 'Audi_1.jpg',
                brand: 'Audi',
            }
        ],
        bmw: [
            {
                id: 'b01',
                status: _car_in_store_status.empty,
                img: 'BMW_1.jpg',
                brand: 'BMW',
            },
            {
                id: 'b02',
                status: _car_in_store_status.empty,
                img: 'BMW_1.jpg',
                brand: 'BMW',
            },
            {
                id: 'b03',
                status: _car_in_store_status.empty,
                img: 'BMW_1.jpg',
                brand: 'BMW',
            },
            {
                id: 'b04',
                status: _car_in_store_status.empty,
                img: 'BMW_1.jpg',
                brand: 'BMW',
            }
        ]
    }; // data source

    // private methods
    function _cacheDOM() {
        $porscheBoothList = $('#porsche .car_booth_list');
        $volkswagenBoothList = $('#volkswagen .car_booth_list');
        $audiBoothList = $('#audi .car_booth_list');
        $bmwBoothList = $('#bmw .car_booth_list');
        _car_reception_desk_list.porsche = $porscheBoothList;
        _car_reception_desk_list.volkswagen = $volkswagenBoothList;
        _car_reception_desk_list.audi = $audiBoothList;
        _car_reception_desk_list.bmw = $bmwBoothList;
    }
    function _cacheCarReceptionDesk(callback) {
        $porscheReceptionDeskList = $('.car_reception_desk[data-target-brand=Porsche]');
        $volkswagenReceptionDeskList = $('.car_reception_desk[data-target-brand=Volkswagen]');
        $audiReceptionDeskList = $('.car_reception_desk[data-target-brand=Audi]');
        $bmwReceptionDeskList = $('.car_reception_desk[data-target-brand=BMW]');
        if(callback) callback();
    }
    function _render() {
        Object.keys(_car_in_store).forEach(function (carKey) {
            var content = '';
            _car_in_store[carKey].forEach(function (car) {
                content += CAR_BOOTH_TEMPLATE.format(
                    _brandImgList[car.brand],
                    car.img,
                    car.brand,
                    car.id
                );
            });
            _car_reception_desk_list[carKey].append(content);
        });
    }
    function _renderClientInReceptionDesk(clientId, carReceptionDeskId) {
        var $carReceptionDesk = $('.car_reception_desk[data-car-reception-desk-id=' + carReceptionDeskId + ']');
        var client = clientsQueue.getClientById(clientId);
        $carReceptionDesk.empty();
        $carReceptionDesk.append(CLIENT_IN_CAR_BOOTH_TEMPLATE.format(
            clientId,
            carReceptionDeskId,
            client.img
        ));
        var $clientInReceptionDesk = $carReceptionDesk.find('div.client_in_car_booth');
        $clientInReceptionDesk.draggable({
            revert: "invalid",
            cursor: "move"
        });
    }
    function _dropClientHandler(event, ui){
        clientsQueue.removeClient(
            ui.draggable,
            $(event.target).attr('data-car-reception-desk-id')
        );
    }
    function _updateCarInStoreStatus(clientId, carReceptionDeskId, status) {
        var client = clientsQueue.getClientById(clientId);
        var match = _car_in_store[client.brand.toLowerCase()].filter(function (car) {
            return carReceptionDeskId === car.id;
        });
        if(match && match.length > 0) {
            match[0].status = status;
        }
    }
    // public methods
    function init() {
        _cacheDOM();
        _render();
        _cacheCarReceptionDesk(function () {
            $porscheReceptionDeskList.droppable({
                accept: ".client[data-target-brand=Porsche]",
                drop: _dropClientHandler
            });
            $volkswagenReceptionDeskList.droppable({
                accept: ".client[data-target-brand=Volkswagen]",
                drop: _dropClientHandler
            });
            $audiReceptionDeskList.droppable({
                accept: ".client[data-target-brand=Audi]",
                drop: _dropClientHandler
            });
            $bmwReceptionDeskList.droppable({
                accept: ".client[data-target-brand=BMW]",
                drop: _dropClientHandler
            });
        });
    }

    function updateCarInStore(clientId, carReceptionDeskId) {
        // update data source
        _updateCarInStoreStatus(clientId, carReceptionDeskId, _car_in_store_status.occupied);
        _renderClientInReceptionDesk(clientId, carReceptionDeskId);
    }

    // expose public methods
    return {
        init: init,
        updateCarInStore: updateCarInStore,
    };
})();

var clientsQueue = (function () {
    // dom fields
    var $clientsQueue = null;
    var _client_list = []; // data source
    var _brandlist = ["Porsche", "Volkswagen", "Audi", "BMW"];

    // private methods
    function _cacheDOM() {
        $clientsQueue = $('#clients_queue');
    }
    function _render() {
        var content = '';
        $clientsQueue.empty();
        _client_list.forEach(function (client) {
            content += CLIENT_TEMPLATE.format(
                client.client,
                client.brand,
                client.id
            );
        });
        $clientsQueue.append(content);
        $(".client").draggable({
            revert: "invalid",
            cursor: "move"
        });
    }
    // public methods
    function init() {
        _cacheDOM();
    }
    function addClient() {
        var preference = Math.floor((Math.random()*4));
        var client = Math.floor((Math.random()*10)+1);
        _client_list.push({
            id: Date.now(),
            brand: _brandlist[preference],
            client: client,
            img: 'images/client_{0}.jpg'.format(client)
        });
        _render();
    }
    function removeClient(client, carReceptionDeskId) {
        // remove client from clients queue
        client.fadeOut('slow', function () {
            carsPlace.updateCarInStore(client.attr('data-client-id'), carReceptionDeskId);
        });
    }
    function getClientById(id) {
        var match = _client_list.filter(function (client) {
            return client.id.toString() === id;
        });
        return match && match.length > 0 ? match[0] : null;
    }
    // expose public methods
    return {
        init: init,
        addClient: addClient,
        removeClient: removeClient,
        getClientById: getClientById,
    };
})();

$(document).ready(function() {
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
    carsPlace.init();
    clientsQueue.init();
    clientsQueue.addClient();
    clientsQueue.addClient();
    clientsQueue.addClient();
    clientsQueue.addClient();
    clientsQueue.addClient();
    clientsQueue.addClient();
});