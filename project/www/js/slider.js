// $( function() {
//       var handle = $( ".custom-handle" );
//   $( ".slider" ).slider({
//     range: "max",
//     min: 3,
//     max: 25,
//     value: 15,

//       create: function() {
//         // handle.text( $( this ).slider( "value" ) );
//       },
//       slide: function( event, ui ) {
//         handle.text( ui.value );
//       }

//   });



// } );


$(".visibility").html(Number($(".radius-range").val()));


$('.radius-range').change(function() {
  $(".visibility").html(Number($(".radius-range").val()));
});


// $( function () {
//   $( document ).on ( "vmousemove", ".radius-range", function(event) {
//     $(".visibility").html($(".radius-range").val());
//   });
// });