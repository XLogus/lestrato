var serviceURL = "http://www.lestrato.com/lestratoApp/";

$(document).bind( "pagebeforechange", function( e, data ) {
    if ( typeof data.toPage === "string" ) {
        var u = $.mobile.path.parseUrl( data.toPage );
        var params = hashParams(u.hash);
        
        var re1 = /^#conciertos/;
        var re2 = /^#cuece/;
        var re3 = /^#noticia/;
        
        if ( u.hash.search(re1) !== -1 ) {            
            getConciertos();
        } else if ( u.hash.search(re2) !== -1 ) {            
            getCuece();
        } else if( u.hash.search(re3) !== -1 ){            
            getNoticia(u, params, data.options);            
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
            pelas = data.items;             
            $.each(pelas, function(index, pela) {
                rpta = '<li>';                                
                rpta += '<h3>'+pela.title+'</h3>';
                rpta += '<p>'+pela.excerpt+'</p>';
                rpta += '<p class="ui-li-aside"><strong>'+striptags(pela.date)+'</strong><br/>'+pela.time+'</p>';
                rpta += '</li>';
                $("#conciertosList").append(rpta);
                $('#conciertosList').listview('refresh');    
            })
        });        
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
    var contenido = 'No se encontró';
    
    // Establecer header
    //$header = $page.children( ":jqmData(role=header)" );    
    //$header.find( "h1" ).html( 'Mi Pelicula' );
    
    
    $.each(pelas, function(index, pela) {
        if(pela.id == id) {
            contenido = '<h2>'+pela.title+'</h2>';
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