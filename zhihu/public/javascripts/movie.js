/**
 * Created by Administrator on 2017/5/26.
 */

$(function()
{

    var mdata = {};

    var url = '/javascripts/movie.json';

    $.getJSON(url, function (data,error) {
        mdata = data;

        render_editor_form(mdata);
        render_event_form(mdata);

    });
    var render_editor_form = function (data) {
        $('#c_editor').val($.toJSON(data));
    };
    var render_event_form = function (mdata) {

        $('#c_save').on('click', function (event) {
            var data = {};

            data['content'] = JSON.stringify(mdata);
            alert("save to server: "+JSON.stringify(mdata));
            $.ajax({
                type: "POST",
                url: '/movie/add',
                data: data,
                success: function (data, textStatus) {
                    if (data.success) {
                        alert("save success");
                        $('#msg').html('保存成功');
                        $('#msg').addClass('alert alert-success');
                        $(location).attr('href', '/movie/' + mdata.name);
                    } else {
                        alert("save error");
                        $('#msg').html(data.err);
                        $('#msg').addClass('alert alert-error');
                    }
                }
            });
        });
    };
});

