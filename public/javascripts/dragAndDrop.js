// HTML TEMPLATES
var CLIENT_TEMPLATE =
    '<div class="client client_{0}">' +
    '   <span class="preference">Client for {1}</span>' +
    '</div>';

var carsPlace = (function () {
    function init() {

    }

    // expose public methods
    return {
        init: init,
    };
})();

var clientsQueue = (function () {
    // dom fields
    var $clientsQueue = null;
    var _client_list = [];
    var _brandlist = ["Porsche","Volkswagen","Audi","BMW"];

    // private methods
    function _cacheDOM() {
        $clientsQueue = $('#clients_queue');
    }
    function _render() {
        var content = '';
        $clientsQueue.empty();
        _client_list.forEach(function (client) {
            content += CLIENT_TEMPLATE.format(client.client, client.brand);
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
            brand: _brandlist[preference],
            client: client,
        });
        _render();
    }
    // expose public methods
    return {
        init: init,
        addClient: addClient,
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
});