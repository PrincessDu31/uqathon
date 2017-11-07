

$(document).ready(function(){
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


    // Wait for device API libraries to load
    //

    // device APIs are available
    //

    // onSuccess Geolocation
    //


    $('.artist-pseudo').html(window.localStorage.getItem(name_cookie_nameUser));
    $('.artist-pseudo').click(function() {
        window.localStorage.clear();window.location = "connexion.html";
    });
    



    window.addEventListener('native.hidekeyboard', keyboardHideHandler);
    window.addEventListener('native.showkeyboard', keyboardShowHandler);
    function keyboardHideHandler(e){
        $('#home-header').slideDown("fast", "swing");
        $('#creation-interface-content').css("padding-top", "25vh");
    }
    function keyboardShowHandler(e){
        $('#home-header').slideUp("fast", "swing");
        $('#creation-interface-content').css("padding-top", "5vh");
    }




    function getItemsByPlace() {

        jQuery.ajax({

                url: "http://perso-etudiant.u-pem.fr/~eritoux/aura/api/get-list-items-by-place.php",
                type: "POST",
                data: {place: currentLocation},
                dataType: "json",
                beforeSend: function(x) {
                    if (x && x.overrideMimeType) {
                        x.overrideMimeType("application/j-son;charset=UTF-8");
                    }
                },
                success: function(result) {
                    $(".home-localisation p.nb-in-place").html(Object.keys(result).length);
                },
                error: function(result) {
                    alert("error getItemsByPlace");
                }
        }); 

    }



function ajaxReverseGeo() {
    // alert("here");
        jQuery.ajax({
                url: "https://maps.googleapis.com/maps/api/geocode/json?latlng="+latitude+","+ longitude+"&key=AIzaSyAVQCnt4NIOdc0kF5oyrxirq31iBpN1isk",
                type: "GET",
                // data: {latlng: latitude+","+ longitude, key : "AIzaSyAVQCnt4NIOdc0kF5oyrxirq31iBpN1isk"},
                dataType: "json",
                // beforeSend: function(x) {
                //      if (x && x.overrideMimeType) {
                //          x.overrideMimeType("application/j-son;charset=UTF-8");
             //        }
             //    },
                success: function(result) {
                    // alert(result.results[0].formatted_address);
                    // $(".home-localisation p").html(result[0]["adress_components"][2]["short_name"]);
                    $(".home-localisation p.name-place").html(result.results[0].address_components[1].short_name);
                    currentLocation = result.results[0].formatted_address;
                    getItemsByPlace();
                },
                error: function(result) {
                    alert("error ajaxReverseGeo");
                }
        });

    }


var hash = -1;


function difference(a, b) {
    if (a > b) return a - b;
    return b - a;
}

function distance (lat1, lat2, lon1, lon2) {
    return Math.sqrt(Math.pow(difference(lat1,lat2), 2) + Math.pow(difference(lon1,lon2), 2) ) * 111.126925169;
}

// function createHash() {
//     var sum = 0;
//     for (var i = creationsItem.length - 1; i >= 0; i--) {
//         sum += creationsItem[i].id;
//     }
//     return sum;
// }




function actualizeHome () {
    jQuery.ajax({
                url: "http://perso-etudiant.u-pem.fr/~eritoux/aura/api/get-list-items.php",
                type: "POST",
                data: {latitude: latitude, longitude: longitude, hash: hash},
                crossDomain:"true",
                dataType: "json",
                ifModified:"true",
                beforeSend: function(x) {
                    if (x && x.overrideMimeType) {
                        x.overrideMimeType("application/j-son;charset=UTF-8");
                    }
                },
                success: function(result) {
                    // alert(Object.keys(result).length - 1);
                    // alert("status : " + result[Object.keys(result).length-1].status);
                    if (result[Object.keys(result).length-1].status == "changes") {

                        $(".nb-creative-posts h1").html(Object.keys(result).length -1);

                        if (Object.keys(creationsItem).length -1 == 0 && Object.keys(result).length - 1 > 0) 
                            navigator.notification.vibrate(1000);


                        creationsItem = result;
                        hash = result[Object.keys(result).length-1].hash;

                        // alert("longitude" + result[0]["latitude"] + ", longitude" + result[0]["longitude"] + ", content" + result[0]["content"]+ ", title" + result[0]["title"]);

                        if (Object.keys(result).length -1 > 1) {
                            $(".nb-creative-posts p").html("dans votre aura");
                            $(".nb-creative-posts p").html(latitude+"<br>"+longitude);
                        } else
                            $(".nb-creative-posts p").html("dans votre aura");



                        $('#creations-list').html("");


                        for (var i = Object.keys(creationsItem).length - 2; i >= 0; i--) {
                            // alert(creationsItem[i].content);
                            $('#creations-list').append("<div class='a-creation-list'><p class='title-creation'>"+creationsItem[i].title+"</p><p class='content-creation'>"+creationsItem[i].content+"</p></div>");
                        }
                    }
                },
                error: function(result) {
                    navigator.notification.alert("Une erreur est arrivée...", actualizeHome, "Erreur", "Réessayer");

                }
            }); 
}

    function onSuccess(position) {

        // if (distance(latitude, position.coords.latitude, longitude, position.coords.longitude) > 0.0001) {
            // alert(distance(latitude, position.coords.latitude, longitude, position.coords.longitude));
            

            latitude = position.coords.latitude ;
            longitude = position.coords.longitude;
            
            // alert(latitude + " <br/>" + longitude);

            actualizeHome();
            ajaxReverseGeo();

        // }

    }

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        //alert('code: '    + error.code    + '\n' +
        //      'message: ' + error.message + '\n');
        if (error.code == 2)   
            navigator.notification.alert("Veuillez autoriser l'application a accéder à votre position.", initialize, "Erreur", "Réessayer");
        else if (error.code == 3)   
            navigator.notification.alert("Une erreur est survenue.", initialize, "Erreur", "Réessayer");
        else
            alert('code: '    + error.code    + '\n' +  'message: ' + error.message + '\n');

    }


var app = {
    // Application Constructor
    initialize: function(val) {

        // navigator.geolocation.getCurrentPosition(onSuccess, onError);
        var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 5000 });
        // document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {

        // this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        // var parentElement = document.getElementById(id);
        // var listeningElement = parentElement.querySelector('.listening');
        // var receivedElement = parentElement.querySelector('.received');

        // listeningElement.setAttribute('style', 'display:none;');
        // receivedElement.setAttribute('style', 'display:block;');

        // console.log('Received Event: ' + id);
    }
};

app.initialize();



    $("#home-header").click(function() {

            // $("#creations-list").animate("left", "0vw");
            // $(".a-creation-list").die();
        
    });


});
