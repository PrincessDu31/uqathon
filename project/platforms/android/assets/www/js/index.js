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
                    alert("error");
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
                    alert("error");
                }
        });

    }



function difference(a, b) {
    if (a > b) return a - b;
    return b - a;
}

function distance (lat1, lat2, lon1, lon2) {
    return Math.sqrt(Math.pow(difference(lat1,lat2), 2) + Math.pow(difference(lon1,lon2), 2) ) * 111.126925169;
}

function actualizeHome () {
    jQuery.ajax({
                url: "http://perso-etudiant.u-pem.fr/~eritoux/aura/api/get-list-items.php",
                type: "POST",
                data: {latitude: latitude, longitude: longitude},
                dataType: "json",
                beforeSend: function(x) {
                    if (x && x.overrideMimeType) {
                        x.overrideMimeType("application/j-son;charset=UTF-8");
                    }
                },
                success: function(result) {
                    $(".nb-creative-posts h1").html(Object.keys(result).length);
                    creationsItem = result;

                    // alert("longitude" + result[0]["latitude"] + ", longitude" + result[0]["longitude"] + ", content" + result[0]["content"]+ ", title" + result[0]["title"]);

                    if (Object.keys(result).length > 1) {
                        $(".nb-creative-posts p").html("dans votre aura");
                    } else
                        $(".nb-creative-posts p").html("dans votre aura");


                    $('#creations-list').html("");


                    for (var i = Object.keys(creationsItem).length - 1; i >= 0; i--) {
                        // alert(creationsItem[i].content);
                        $('#creations-list').append("<div class='a-creation-list'><p class='title-creation'>"+creationsItem[i].title+"</p><p class='content-creation'>"+creationsItem[i].content+"</p></div>");
                    }

                },
                error: function(result) {
                    alert("error");
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
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }


var app = {
    // Application Constructor
    initialize: function() {
        // navigator.geolocation.getCurrentPosition(onSuccess, onError);
        var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 30000 });
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
