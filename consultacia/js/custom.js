/**
 * Created with JetBrains PhpStorm.
 * User: tzaytseva
 * Date: 27.04.15
 * Time: 17:35
 * To change this template use File | Settings | File Templates.
 */
$(window).load(function(){

    /*=======fix blink input with autofill=======*/
    $("input[type='text'], input[type='password']", ".placeholder_js").css({'opacity':'1'});
    /*=======fix autofill (yellow background) in the Chrome=======*/
    if (navigator.userAgent.toLowerCase().indexOf("chrome") >= 0) {
        $('input:-webkit-autofill').each(function(){
            var clone = $(this).clone(true, true);
            $(this).before(clone).hide();
        });
    }
    /*=========placeholder===========*/
    setPlaceholders();
    /*=========link input===========*/
    $('#linkToFile').on('blur', function() {
        if ($(this).val() != "") {
            $('#dropzoneWrapper, #make_archive').fadeOut();
            $('.login').fadeIn();
        } else {
            $('#dropzoneWrapper, #make_archive').fadeIn();
            $('.login').fadeOut();
        }
    });
}); /* $(window).load */

$(function(){
    var dlg_help = $( "#dlg_help" )
        ,lk_help = $('#lk_help')
        ,lk_arch = $('#lk_arch')
        ,dlg_arch = $('#dlg_arch')
        ,u_info = $('#user_info')
        ,dz = $('#dropzone')
        ,dTable= $('#dTable')
        ,cnt_show = $('.lst_cnt_show');

	/*========= change lang ===========*/
	$('.lang').change(function(){
		window.location.href='/'+$('select.lang option:selected').val();
		return false;
	});

    /*=========placeholder===========*/
    setInterval (function(){ setPlaceholders() }, 50);

    /*======= plugin formstyler ======*/
    setFormStyler();

    /*======= hide/show content in the fields login ======*/
    (function() {
        // trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
        if (!String.prototype.trim) {
            (function() {
                // Make sure we trim BOM and NBSP
                var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
                String.prototype.trim = function() {
                    return this.replace(rtrim, '');
                };
            })();
        }

        [].slice.call( document.querySelectorAll( '.input__field' ) ).forEach( function( inputEl ) {
            // in case the input is already filled..
            if( inputEl.value.trim() !== '' ) {
                classie.add( inputEl.parentNode, 'input--filled' );
            }

            // events:
            inputEl.addEventListener( 'focus', onInputFocus );
            inputEl.addEventListener( 'blur', onInputBlur );
        } );

        function onInputFocus( ev ) {
            classie.add( ev.target.parentNode, 'input--filled' );
        }

        function onInputBlur( ev ) {
            if( ev.target.value.trim() === '' ) {
                classie.remove( ev.target.parentNode, 'input--filled' );
            }
        }
    })();

    /*==============plugin dialogs jq ui ================*/
    //initialization popup window
    if(dlg_help.length>0){
        dlg_help.dialog({
            autoOpen: false,
            modal: true,
            width: 600,
            maxHeight: 500
        });
    }
    if(dlg_arch.length>0){
        dlg_arch.dialog({
            autoOpen: false,
            modal: true,
            width: 600,
            maxHeight: 500
        });
    }
    /*==============show dialog ================*/
    lk_help.on('click', function(){
        var $dlg = $("#dlg_help");

        $dlg.dialog('open');
        $dlg.css("height", $dlg.outerHeight() );
        $dlg.customScrollbar({ preventDefaultScroll: true });
        return false;
    });
    lk_arch.on('click', function(){
        var $dlg = $("#dlg_arch");

        $dlg.dialog('open');
        $dlg.css("height", $dlg.outerHeight() );
        $dlg.customScrollbar({ preventDefaultScroll: true });
        return false;
    });

    /*============== validation form ================*/
    if(u_info.length>0){
        var user_info = new tFormer( 'user_info',{
            fields: {
                u_name: {
                    onerror: function(){
                        $('.fld_name__v_note').show();
                    },
                    onvalid: function(){
                        $('.fld_name__v_note').hide();
                    }
                },
                u_tel: {
                    onerror: function(){
                        $('.fld_tel__v_note').show();
                    },
                    onvalid: function(){
                        $('.fld_tel__v_note').hide();
                    }
                },
                captcha: {
                    onerror: function(){
                        $('.captcha_fld__v_note').show();
                    },
                    onvalid: function(){
                        $('.captcha_fld__v_note').hide();
                    }
                }

            }
        }).submit(function( ){
			user_info.lock();
			$.ajax({
				url:      user_info.form.action,
				dataType: "json",
				type:     "POST",
				data:     $(user_info.form).serializeArray(),
				success:  function(result) {
					if (result.err) {
						alert(result.err);
						user_info.unlock().buttons["submit"].processing(false).enable();
					} else {
						var _html = '<div class="dialog dialog-ntf-info">';
							_html += '	<p class="dialog-content">' + result.msg + '</p>';
							_html += '	<a href="' + window.location.href + '" class="link_btn btn_close">На главную страницу</a>';
							_html += '</div>';
							_html += '<div class="dialog-overlay">';
							_html += '</div>';

						$('body').append(_html);
						//alert(result.msg);
						//window.location.href="/";
					}
				},
				error: function (xhr, ajaxOptions, thrownError) {
					console.log(xhr.status+' '+thrownError);
					user_info.unlock().buttons["submit"].processing(false).enable();
				}
			});
		});
    }

    /*======= plugin drag-and-drop file uploader ======*/

    if (dz.length > 0) {
        jQuery.extend( dzOpts, {
            maxFilesize:1024,
            addRemoveLinks:true,
            acceptedFiles:".jpg,.png,.psd,.pdf,.iso,.rar,.zip",
            dictResponseError:"Server responded with {{statusCode}} code.",
            dictMaxFilesExceeded:"You can not upload any more files.",
            clickable:".dropzone_btn", /*buttons for add files*/
            init:function () {
                $('.dropzone_btn_out').appendTo('#dropzone').removeClass('displayN');
                this.on("addedfile", function (file) {
                    var f = file
                        , fName = f.name.split('.')
                        , fType = fName[fName.length - 1]
                        , dzImage = $(f.previewElement.firstElementChild)[0];

                    /*add icons accordingly type of the file */
                    switch (fType) {
                        case 'jpg':
                            $(dzImage).addClass('dz-image_jpg');
                            break;
                        case 'png':
                            $(dzImage).addClass('dz-image_png');
                            break;
                        case 'pdf':
                            $(dzImage).addClass('dz-image_pdf');
                            break;
                        case 'zip':
                            $(dzImage).addClass('dz-image_zip');
                            break;
                        case 'rar':
                            $(dzImage).addClass('dz-image_rar');
                            break;
                        case 'iso':
                            $(dzImage).addClass('dz-image_iso');
                            break;
                    }


                    /*add inner button after uploading files*/
                    $('.dropzone_btn_out').fadeOut();
                    $('.dropzone_btn_inn').appendTo('#dropzone');
                    $('.login').fadeIn();
					$(".lang").children().hide();
                    $('.wr_dropzone').addClass('filesAdd');
                    $('#linkInputWrapper, #make_archive').fadeOut();
                    /*custom scroll*/
                    $('.wr_dropzone').customScrollbar();

                });
                this.on("removedfile", function (file) {
                    var f = file
                        , dzEl = $("#dropzone").find(".dz-preview");
                    if ($(dzEl).length == 0) {
                        $('.dz-message').css({'display':'none'});
                        $('.dropzone_btn_inn').removeClass('displayN');
                    }
                });

            },
            fallback:function () {
                var that = this;
                setFallback(setFormStyler);
                /*for old browsers*/
                function setFallback(callback) {
                    $('.dropzone_btn_out').css({'display':'none'});
                    $('.login').css({'display':'block'});

                    var child, messageElement, span, _i, _len, _ref;
                    that.element.className = "" + that.element.className + " dz-browser-not-supported";
                    _ref = that.element.getElementsByTagName("div");
                    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                        child = _ref[_i];
                        if (/(^| )dz-message($| )/.test(child.className)) {
                            messageElement = child;
                            child.className = "dz-message";
                            continue;
                        }
                    }
                    if (!messageElement) {
                        messageElement = Dropzone.createElement("<div class=\"dz-message\"><span></span></div>");
                        that.element.appendChild(messageElement);
                    }
                    span = messageElement.getElementsByTagName("span")[0];
                    if (span) {
                        span.textContent = that.options.dictFallbackMessage;
                    }
                    that.element.appendChild(that.getFallbackForm());

                    if (callback && typeof(callback) === "function")
                        callback();
                }
            }
        });

		Dropzone.options.dropzone = dzOpts;

    }


    /* show/hide comments+files*/
    if(cnt_show.length>0){
        var lnk_show = $('.lnk_cnt_show');

        lnk_show.on('click', function(){
            var state = $(this).data('toggleState')
                ,_cnt_show =  $(this).closest('.lst_cnt').find(cnt_show);

            if(state){
                _cnt_show.css({height : '4rem', 'border-bottom' : '2rem solid #fff'});
                $(this).data('toggleState', false);
            } else {
                _cnt_show.css({height : 'auto', 'border-bottom' : 'none'});
                $(this).data('toggleState', true);
            }

			var $article=$(this).closest('article');
			var $chk=$article.find('.globe');
			if ($chk.length > 0) {
				$.ajax({
					url:      './read.php',
					dataType: "json",
					type:     "POST",
					data:     {"p_sid": $article.data('sid')},
					success:  function(result) {
						$chk.remove();
					},
					error: function (xhr, ajaxOptions, thrownError) {
						console.log(xhr.status+' '+thrownError);
					}
				});
			}
			return false;
        });
    }

	 /*=========declension word 'file/s'===========*/
    var num_files = $('.num_files');
    num_files.each(function(){
        var num = $(this).html();

        $(this).after('<s class="num_files_txt">'+ declOfNum(num, decl) + '</s>')
    })

	$(".captcha_refresh_img, .captcha_refresh_lnk").click(function(){
		$('img.captcha_img').attr('src', '/empty').attr('src', '/kcaptcha.png?rnd=' + Math.random());
		return false;
	});

	$(".lgn_exit").click(function(){
		window.location.href = './?logout=1';
		return false;
	});

	$(".lst_filter li").click(function(){
		window.location.href = './?filter='+$(this).data('status');
		return false;
	});

	$('.lst_cols.lst_hdr .sort_enable').click(function(){
		var $el = $(this);
		window.location.href = './?filter=' + $(".lst_filter li.active").data('status') +
			'&sort=' + $el.data('sort') +
			($el.hasClass('sort_asc')?'&dir=desc':'');
		return false;
	});

}); /* end $(function()*/

/*======= plugin formstyler ======*/
function setFormStyler(){
    var sel = $('select')
        ,int_file = $('input[type=file]');
    if(sel.length>0 || int_file.length>0){
        sel.styler();
        int_file.styler();
    }
}

/*=========placeholder===========*/
function setPlaceholders(){
    var input = $(".placeholder_js input");
    //check for login memory
    input.each(function(){
        if($(this).val()!=''){
            $(this).prev('label').text('');
        }
    });

    //del text label
    input.on('focus change', function() {
        $(this).prev('label').text('');
    });

    //revert text label
    input.on('blur', function() {
        var labelText = $(this).prev('label').data('text');
        if ($(this).val() == "")
            $(this).prev('label').text(labelText);
    });
}
/*=========declension word 'file/s'===========*/
function declOfNum(number, titles) {
    cases = [2, 0, 1, 1, 1, 2];
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
}
