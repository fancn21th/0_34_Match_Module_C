// HTML TEMPLATES
var CLIENT_TEMPLATE =
    '<div class="client client_{0}">' +
    '   <span class="preference">Client for {1}</span>' +
    '</div>';

var clientQueue = (function () {
    // dom fields
    var $clientQueue = null;
    var _client_list = [];
    var _brandlist = ["Porsche","Volkswagen","Audi","BMW"];

    // private methods
    function _cacheDOM() {
        $clientQueue = $('#clients_queue');
    }
    function _render() {
        var content = '';
        $clientQueue.empty();
        _client_list.forEach(function (client) {
            content += CLIENT_TEMPLATE.format(client.client, client.brand);
        })
        $clientQueue.append(content);
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
        })
        _render();
    }
    // expose public methods
    return {
        init: init,
        addClient: addClient,
    }
})();

$(document).ready(function() {
    if (!String.prototype.format) {
        String.prototype.format = function() {
            var args = arguments
            return this.replace(/{(\d+)}/g, function(match, number) {
                return typeof args[number] != 'undefined'
                    ? args[number]
                    : match

            })
        }
    }
    clientQueue.init();
    clientQueue.addClient();
});