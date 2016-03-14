$(function(){
  $('.loader-gif').hide();

  $('button').on('click', function(event){
    event.preventDefault();

    var hashtag = $('input[name="hashtag"]').val();
    var $photoGrid = $('.list');
    var list = '';

    $('.site-header').css('height', 'auto');
    $('.loader-gif').show();
    $.ajax({
      dataType: 'jsonp',
      method: 'GET',
      url: 'https://api.instagram.com/v1/tags/'+ hashtag +'/media/recent?count=12&client_id=71e21c4bf4294a8498860283067eb682'
    })
    .done(function(instaData){

      $.each(instaData.data, function(index, value){
        list += '<li class="photo-wrapper">';
        list += '<a href=' + value.link + ' target="_blank"><img src=' +value.images.standard_resolution.url +'></a>';
        list +=     '<div class="meta-data">';
        list +=         '<div class="user-wrapper"><img src=' +value.user.profile_picture+ '>';
        list +=         '</div>';
        list +=         '<div class="social-info"><p class="user-name">'+value.user.username+'</p>';
        list +=             '<span><i class="fa fa-comment"></i> '+value.comments.count;
        list +=             ' <i class="fa fa-heart"></i> '+value.likes.count+' </span>';
        list +=         '</div>';
        list +=     '</div>';
        list += '</li>';
      });

      $photoGrid.empty().append(list);
      $('.loader-gif').hide();
      list = '';
    });
  });

  //end document

});
