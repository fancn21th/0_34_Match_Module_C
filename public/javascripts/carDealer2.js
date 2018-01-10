// 展位区域模板
var CARS_PLACE_TEMPLATE =
    '<div id="{0}" class="place">' +
    '    <div class="car_brand">' +
    '        Place for {1} cars' +
    '    </div>' +
    '    <div class="car_booth_list">' +
    '    </div>' +
    '</div>';

// 汽车品牌枚举
window.cars_brand = {
    porsche: 'Porsche',
    volkswagen: 'Volkswagen',
    audi: 'Audi',
    bmw: 'BMW',
};

var carsPlace = (function () {
    var $cars_place;

    // private methods
    function _cacheDOM() {
        $cars_place = $('#cars_place');
    }

    // 显示不同品牌汽车的展位区域
    function _renderCarsPlace() {
        Object.keys(window.cars_brand).forEach(function (carKey) {
            var content = CARS_PLACE_TEMPLATE.format(carKey, window.cars_brand[carKey]);
            $cars_place.append(content);
        });
    }

    // public methods
    function init() {
        _cacheDOM();
        _renderCarsPlace();
    }

    // expose public methods
    return {
        init: init,
    };
})();

var clientsQueue = (function () {

    // private methods
    function _cacheDOM() {

    }

    // public methods
    function init() {
        _cacheDOM();
    }

    // expose public methods
    return {
        init: init,
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
});


