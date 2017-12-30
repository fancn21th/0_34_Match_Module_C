var clientQueue = (function () {
    // dom fields
    var $clientQueue = null

    // private methods
    function _cacheDOM() {
        $clientQueue = $('#client_queue')
    }

    // public methods
    function init() {
        _cacheDOM()
    }
    // expose public methods
    return {
        init: init,
    }
})()

$(document).ready(function() {
    clientQueue.init()
})