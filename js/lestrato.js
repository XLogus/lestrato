var serviceURL = "http://www.lestrato.com/lestratoApp/";
var conciertos;
var pelas;
var bandas;

$(document).bind( "pagebeforechange", function( e, data ) {        
    
    if ( typeof data.toPage === "string" ) {
        detener_musica();
        
        var u = $.mobile.path.parseUrl( data.toPage );
        var params = hashParams(u.hash);
        
        var re1 = /^#conciertos/;
        var re2 = /^#cuece/;
        var re3 = /^#noticia/;
        var re4 = /^#dconcierto/;
        var re5 = /^#bandas/;
        var re6 = /^#banda/;
        
        if ( u.hash.search(re1) !== -1 ) {            
            getConciertos();
        } else if ( u.hash.search(re2) !== -1 ) {            
            getCuece();
        } else if( u.hash.search(re3) !== -1 ){            
            getNoticia(u, params, data.options);            
            e.preventDefault()
        } else if( u.hash.search(re4) !== -1 ){            
            getConcierto(u, params, data.options);            
            e.preventDefault()
        } else if ( u.hash.search(re5) !== -1 ) {            
            getBandas();
        } else if( u.hash.search(re6) !== -1 ){            
            getBanda(u, params, data.options);            
            e.preventDefault()
        } else {
            //e.preventDefault();
        }
    }
});


function getConciertos() {    
    $.mobile.loading('show');        
    $.getJSON(serviceURL + 'horizontes.php?jsoncallback=?').done(function(data) {           
            $('#conciertosList li').remove();    
            conciertos = data.items;             
            $.each(conciertos, function(index, pela) {
                rpta = '<li>';                                
                rpta += '<a href="#dconcierto?id='+pela.id+'">';                
                rpta += '<h2>'+pela.title+'</h2>';
                rpta += '<p><strong>'+striptags(pela.date)+'</strong> | '+pela.time+'</p>';                
                rpta += '</a>';
                rpta += '</li>';
                $("#conciertosList").append(rpta);
                $('#conciertosList').listview('refresh');    
            })
        });        
}



function getConcierto(url, params, options) {
    var id = params['id'];
    var $page = $('#dconcierto');
    var contenido = 'No se encontr�';    
    
    $.each(conciertos, function(index, pela) {
        if(pela.id == id) {
            contenido = '<h2 class="title">'+pela.title+'</h2>';  
            contenido += '<div class="datosConcierto">';
            contenido += '<div class="fechaConcierto">'+pela.date+'</div>';                      
            contenido += '<p><img src="img/time-icon.png" /> '+pela.time+'</p>';
            contenido += '<p><img src="img/venue-icon.png" /> '+pela.venue+'</p>';
            contenido += '<p><img src="img/venue-icon.png" /> '+pela.location+'</p>';
            contenido += '</div>';
            contenido += '<div class="contenidoConcierto">'+pela.content+'</div>';
        }
    });
    
    // Get the content element for the page to set it
    $content = $page.children( ":jqmData(role=content)" );
    $content.html(contenido);
    $content.find('div[data-role=collapsible-set]').collapsible({theme:'e',refresh:true});
    
    // Actualizar URL
    options.dataUrl = url.href;
    $.mobile.changePage( $page, options );
        
}



function getBandas() {    
    var n = 0;
    var clase = 'a';
    var rpta = '';
    $.getJSON(serviceURL + 'bandas.php?jsoncallback=?').done(function(data) {
            bandas = data.items;
            rpta += '<h2 class="title">Nuestras Bandas</h2>';            
            $.each(bandas, function(index, banda) {                
                if(n==0) {
                    rpta += '<div class="ui-grid-a">';
                    rpta += '<div class="ui-block-a">';
                    rpta += '<a href="#banda?id='+banda.id+'"><img src="'+banda.thumb+'" /></a>';
                    rpta += '</div>';
                    n=1;
                } else {                    
                    rpta += '<div class="ui-block-b">';
                    rpta += '<a href="#banda?id='+banda.id+'"><img src="'+banda.thumb+'" /></a>';
                    rpta += '</div>';
                    rpta += '</div>';
                    n=0;
                }
            })
            $('#bandasContent').html(rpta);
        });        
}




function getBanda(url, params, options) {
    var id = params['id'];
    var $page = $('#banda');
    var contenido = 'No se encontr�';    
    
    $.each(bandas, function(index, banda) {
        if(banda.id == id) {
            contenido = '<h2 class="title">'+banda.title+'</h2>';  
            contenido += '<p align="center"><img src="'+banda.thumb+'" /></p>';
            contenido += '<div>'+banda.content+'</div>';            
        }
    });
    
    // Get the content element for the page to set it
    $content = $page.children( ":jqmData(role=content)" );
    $content.html(contenido);
    $content.find('div[data-role=collapsible-set]').collapsible({theme:'e',refresh:true});
    
    // Actualizar URL
    options.dataUrl = url.href;
    $.mobile.changePage( $page, options );
        
}



function getCuece() {
    $.mobile.loading();
    $.getJSON(serviceURL + 'cuece.php?jsoncallback=?').done(function(data) {            
            $('#cueceList li').remove();    
            pelas = data.items;            
            $.each(pelas, function(index, pela) {
                rpta = '<li>';
                rpta += '<a href="#noticia?id='+pela.id+'">';
                rpta += '<img src="'+pela.thumb+'">';
                rpta += '<h3>'+pela.title+'</h3>';                                
                rpta += '</a>';
                rpta += '</li>';
                $("#cueceList").append(rpta);
                $('#cueceList').listview('refresh');    
            });
            ///$.mobile.loading( "hide" );
        });        
}


function getNoticia(url, params, options) {
    var id = params['id'];
    var $page = $('#noticia');
    var contenido = 'No se encontr�';
    
    // Establecer header
    //$header = $page.children( ":jqmData(role=header)" );    
    //$header.find( "h1" ).html( 'Mi Pelicula' );
    
    
    $.each(pelas, function(index, pela) {
        if(pela.id == id) {
            contenido = '<h2 class="title">'+pela.title+'</h2>';
            contenido += '<p><img src="'+pela.thumb+'" /></p>';
            contenido += '<p>'+pela.content+'</p>';
        }
    });
    
    // Get the content element for the page to set it
    $content = $page.children( ":jqmData(role=content)" );
    $content.html(contenido);
    $content.find('div[data-role=collapsible-set]').collapsible({theme:'e',refresh:true});
    
    // Actualizar URL
    options.dataUrl = url.href;
    $.mobile.changePage( $page, options );
        
}


// parse params in hash
function hashParams(hash) {
		var ret = {};
	    var match;
	    var plus   = /\+/g;
	    var search = /([^\?&=]+)=([^&]*)/g;
	    var decode = function(s) { 
	    	return decodeURIComponent(s.replace(plus, " ")); 
	    };
	    while( match = search.exec(hash) ) ret[decode(match[1])] = decode(match[2]);
	    
	    return ret
	};

function striptags(mystring) {
    var StrippedString = mystring.replace(/(<([^>]+)>)/ig,"");
    return StrippedString;
}    

function detener_musica() {
    $("audio").each(function(index, element) {
            $(this).get(0).pause();
            //$(this).get(0).currentTime = 0;
        });        
}