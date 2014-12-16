$(function() {
    if (window.location.pathname !== '/clips/new') {
        return;
    }

    var $video = $("#video").hide(),
        $message = $("#message").hide(),
        $flash = $(".flash").hide(),
        $clip = $(".clip-row"),
        localMediaStream;

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

    function successCallback(stream) {
        var video = $video.get(0);

        localMediaStream = stream;

        $video.show();
        $message.hide();

        if (video.mozSrcObject !== undefined) {
            video.mozSrcObject = stream;
        } else {
            video.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
        }

        video.play();
    }

    function errorCallback(error) {
        console.error('An error occurred: [' + error.name + '] ' + error.message);

        if (error.name === 'PermissionDeniedError') {
            $message.text('Camera access has been denied :(');
        }

        $video.hide();
        $message.show();
    }

    function startVideo() {
        if (navigator.getUserMedia) {
            navigator.getUserMedia({ video: true }, successCallback, errorCallback);
        } else {
            $message.text("Sorry, your browser does not support the HTML5 Stream API").show();
            // Display a friendly "sorry" message to the user.
        }
    }

    function stopVideo (argument) {
        var video = $video.get(0);

        video.pause();
        video.src = '';

        localMediaStream.stop();
    }

    function takeSnapshot () {
        var dimensions = { width: 224, height: 140 },
            $canvas = $("<canvas>")
                .addClass("snapshot")
                .attr(dimensions)
                .appendTo($clip);

        context = $canvas.get(0).getContext("2d");
        context.drawImage(video, 0, 0, dimensions.width, dimensions.height);
    }

    function postClip () {
        var canvas = $(".snapshot").get(0),
            data = new FormData();

        canvas.toBlob(function(blob) {
            data.append("clip[frame]", blob, "snapshot.png");

            $.ajax({
                url: '/clips',
                data: data,
                dataType: 'json',
                processData: false,
                contentType: false,
                // mimeType: 'multipart/form-data',
                type: 'POST',
                success: function () {
                    $flash.find(".flash-message").text("Your clip has been saved :)");
                    $flash.show();
                    stopVideo();
                },
                error: function() {
                    $flash.find(".flash-message").text("Ups and error ocurred and we couldn't save your clip. Want to try again?");
                    $flash.show();
                }
            });
        }, "image/png");
    }

    $("#snap").on("click", function(event) {
        var remainingSnapshots = 4,
            snapInterval = 1000;

        function takeNext () {
            takeSnapshot();
            remainingSnapshots--;

            if (remainingSnapshots === 0) {
                postClip();
                return;
            }

            setTimeout(takeNext, snapInterval);
        }

        setTimeout(takeNext, snapInterval);

        event.preventDefault();
    });

    startVideo();
});
