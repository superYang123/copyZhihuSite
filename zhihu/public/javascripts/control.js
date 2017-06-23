function onMousedown(){
    var accountSettings = document.getElementById('accountSetting');
    account
    var account = document.getElementById('account');
   // accountSettings.className='accountSettingDisplay';
    accountSettings.style.display='block';
    accountSettings.style.top="0px";
    accountSettings.style.left="0px";
    account.style.width="auto";
    account.style.height="auto";
}
function logout(){
    var xmlhttp ;
   // alert("logout");
    if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    }
    else{
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET","/logout",false);
    xmlhttp.send();
}
function questionPage(){
    var form = document.getElementById('askQuestionForm');
    var nocontent = document.getElementById('nocontent');
    nocontent.style.width = window.innerwidth+'px';
    nocontent.style.height = window.innerHeight+'px';
    nocontent.style.position="absolute";
    nocontent.style.display="block";

    form.style.display="block";



}
function autosize(){
    var questionForm = document.getElementById('askQuestionForm');
  //  questionForm.style.height=window.innerHeight-100+'px';



}

function windowOnload() {



    document.getElementById('reg').onclick = function () {

        document.getElementsByClassName('account')[0].style.display = "block";
    }
    document.getElementById('login').onclick = function () {

        document.getElementsByClassName('account')[0].style.display = "none";
    }
}
function expandQuestionFooter(){

    $(this).css('border:2px solid red');
}
function compresseQuestionFooter() {
    $(this).hide();
}
function foldDescription($descriptiondetail,num) {
     var  desc;
    var $description = $descriptiondetail.children('.questiondesc');
 //   alert($descriptiondetail.html());

    if($description.html()){
    //    alert('has <a>');
          desc = $description.text();
    }else{
    //    alert('has no <a>');
          desc = $descriptiondetail.text();
    }

   var newDesc;
    //   var that = this;
  //    alert(desc);

  //  var that= $(this);
 //   alert('des1c:'+desc);

if(num==2){

}
    if(desc.length>9) {
        newDesc = desc.substring(0, 9, 10);

      //   alert('desc:'+desc);
        var $a = $('<a href="/">查看全部</a>');
        var $appendnode = '<span class="ellipsis">......</span> <span class="showAll" >查看全部</span>';
        if($description.html()){
        //show part of the description
            $description.text(newDesc);
            //add node '查看全部' to the end of description
            $descriptiondetail.append($appendnode);
        }else{
            $descriptiondetail.html('<a>'+newDesc+'</a>'+$appendnode);
        }

        enableShowAll(desc,null);
    }
}
function enableShowAll(fulldesc,questiondesc){

    (function (fulldesc,questiondesc) {
        $('.showAll').click(function () {
            //  $(this).parent().parent().parent().children('.questionfooter').children('.rollup').show();

            $(this).parent().parent().parent().children('div').children('.rollup').show();
            $(this).parent().html(fulldesc);//div questionDetail show the full description text
            alert('sdfsf');
            $('.rollup').click(function () {
                // alert('click: '+questiondetail.text());
                //  alert('sss: '+$(this).parent().parent().children('div').children('.questionDetail').html());
                var detail = $(this).parent().parent().children('div').children('.questionDetail');
                foldDescription(detail,2);
            });

            // $(this).remove();// remove'查看全部' node  no need to do this
            //  $(this).parent().children('.ellipsis').remove();

        });
    })(desc,null);
}
$(document).ready(function () {


     var accountName = $('#account-name').text();


    $('.rollup').hide();
    $('.questionItem').mouseover(function () {
        $(this).children('div').children('.expandablefooter').show();

    });
    $('.questionItem').mouseout(function () {
        $(this).children('div').children('.expandablefooter').hide();
    });

    var desc;
    var newDesc;
    /*
     $('.questiondesc').each(function () {
     var questiondesc = $(this);

     var desc = $(this).text();
     foldDescription( $(this),0);

     /*
     desc = $(this).text();
     //   var that = this;
     //  alert(desc);

     var that= $(this);
     if(desc.length>9){
     newDesc = desc.substring(0,9,10);

     // alert(desc);
     var $a = $('<a href="/">查看全部</a>');
     //show part of the description
     $(this).text(newDesc);

     //add node '查看全部' to the end of description
     $(this).parent().append('<span class="ellipsis">......</span> <span class="showAll" >查看全部</span>');

     (function (fulldesc,questiondesc) {
     $('.showAll').click(function () {
     //  $(this).parent().parent().parent().children('.questionfooter').children('.rollup').show();

     $(this).parent().parent().parent().children('div').children('.rollup').show();
     $(this).parent().text(fulldesc);//div questionDetail show the full description text

     $('.rollup').click(function () {
     alert('click: '+questiondesc.text());
     foldDescription(questiondesc,2);
     });

     // $(this).remove();// remove'查看全部' node  no need to do this
     //  $(this).parent().children('.ellipsis').remove();

     });
     })(desc,questiondesc);


     // }
     });
     */

    //  $('.questionDetail').each(function () {
    $('.ddd').each(function () {
        var questiondetail = $(this);
        var questiondesc = $(this).children('.questiondesc');

        var desc = questiondesc.text();
        var rollupNode = $('.rollup');
        foldDescription(questiondetail, 0);

        /*
         desc = $(this).text();
         //   var that = this;
         //  alert(desc);

         var that= $(this);
         if(desc.length>9){
         newDesc = desc.substring(0,9,10);

         // alert(desc);
         var $a = $('<a href="/">查看全部</a>');
         //show part of the description
         $(this).text(newDesc);

         //add node '查看全部' to the end of description
         $(this).parent().append('<span class="ellipsis">......</span> <span class="showAll" >查看全部</span>');
         */
        enableShowAll(fulldesc, questiondesc);
        /*
         (function (fulldesc,questiondesc) {
         $('.showAll').click(function () {
         //  $(this).parent().parent().parent().children('.questionfooter').children('.rollup').show();

         $(this).parent().parent().parent().children('div').children('.rollup').show();
         $(this).parent().html(fulldesc);//div questionDetail show the full description text
         alert('sdfsf');
         $('.rollup').click(function () {
         // alert('click: '+questiondetail.text());
         //  alert('sss: '+$(this).parent().parent().children('div').children('.questionDetail').html());
         var detail = $(this).parent().parent().children('div').children('.questionDetail');
         foldDescription(detail,2);
         });

         // $(this).remove();// remove'查看全部' node  no need to do this
         //  $(this).parent().children('.ellipsis').remove();

         });
         })(desc,questiondesc);
         */


        // }
    });

    $('.questionDetail').each(function () {
        var questiondetail = $(this);
        var slideHeight = 76; // px
        var defHeight = $(this).height();
        //    alert(defHeight);

        if (defHeight >= slideHeight) {
            $(this).css('height', slideHeight + 'px');
            $(this).parent().children('.readmore').append('<a href="#">显示全部</a>');
            var readmore = $(this).parent().children('.readmore').children('a');

            readmore.click(function (e) {
                var curHeight = questiondetail.height();
             //   alert(curHeight);
                if (curHeight == slideHeight) {
                    questiondetail.animate({
                        height: defHeight
                    }, "normal");
                     readmore.html('收起');


                } else {
                    questiondetail.animate({
                        height: slideHeight
                    }, "normal");
                     readmore.html('显示全部');

                }
                e.preventDefault();

            });
        }
    });

    $('.answerDetail').each(function () {
        var answerdetail = $(this);
        var slideHeight = 80; // px
        var defHeight = $(this).height();
        //    alert(defHeight);

        if(defHeight >= slideHeight){
            $(this).css('height' , slideHeight + 'px');
            $(this).parent().children('.readmore').append('<a href="#">阅读全文</a>');
            var readmore = $(this).parent().children('.readmore').children('a');

            readmore.click(function(e){
                var curHeight = answerdetail.height();
             //   alert(curHeight);
                if(curHeight == slideHeight){

                    answerdetail.animate({
                        height: defHeight
                    }, "normal");

                     readmore.html('收起');

                }else{

                    answerdetail.animate({
                        height: slideHeight
                    }, "normal");

                     readmore.html('阅读全文');

                }
                e.preventDefault();

            });
        }
    });

    //click comment section to show or hide comments
  //  $('.comment').each(function () {
        $('.comment').click(function (e) {
            $(this).parent().parent().children('.commentsSection').slideToggle();
            e.preventDefault();
        });

 //   });

    //send comment to server through get method
    $('.clickComment').click(function(){
        var that = $(this);
        var commentContent = $(this).parent().children('.commentContent').val();
        var whichAnswer = $(this).parent().children('.whichAnswer').val();
      //  alert('whichAnswer: '+whichAnswer);
        $.getJSON('/comment',{
            commentContent:commentContent,
            whichAnswer:whichAnswer
        },function(data1,textStatus){

     //       var data = eval('('+data1+')');  //parse data to json object
            if(data1.success) {
               // alert('add comment to server success,update in page');
                that.parent().children('.commentContent').val(''); //empty the comment textarea
                var node = $('<li><div><span>评论者：' + accountName +
                    '</span></div><div><span>评论内容：' + commentContent + '</span></div></li>');
                //update this new comment in the page
                that.parent().parent().children('.comments').children('ul').append(node);

                var commentNumNode = that.parent().parent().parent().children('.answerfooter').children('.comment');
                var num = parseInt(commentNumNode.text());
                var newText = ++num+'条评论';
                commentNumNode.text(newText);




            }
           // alert(textStatus);

        });
    });


});


window.onload=windowOnload;
window.onresize=autosize;