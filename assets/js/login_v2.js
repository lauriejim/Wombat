/* Webarch Admin Dashboard
-----------------------------------------------------------------*/
$(document).ready(function() {
  var user = {};
  var tabs = [];

  $('#login_toggle').click(function() {
    $('#frm_login').show();
    $('#frm_pitch').hide();
    $('#frm_besoins').hide();
    $('#frm_register').hide();
    $('#frm_register_coach').hide();
  });

  $('#register_coach_toggle').click(function() {
    $('#frm_register_coach').show();
    $('#frm_login').hide();
    $('#frm_pitch').hide();
    $('#frm_besoins').hide();
    $('#frm_register').hide();
    $('#frm_register').hide();
  });

  $('#register_toggle').click(function() {
    $('#frm_login').hide();
    $('#frm_pitch').show();
    $('#frm_besoins').hide();
    $('#frm_register').hide();
    $('#frm_register_coach').hide();
  });

  $('#back_register_toggle').click(function() {
    $('#frm_login').hide();
    $('#frm_pitch').show();
    $('#frm_besoins').hide();
    $('#frm_register').hide();
    $('#frm_register_coach').hide();
  });

  $(".lazy").lazyload({
    effect: "fadeIn"
  });

  $('#start').click(function() {
    if ($('#pitch').val() !== '') {
      user.pitch = $('#pitch').val();
      $('#frm_pitch').hide();
      $('#frm_besoins').show();
    }
  });

  $('#account').click(function() {
    user.needs = [];
    tabs.forEach(function(need) {
      need_content = $('#tab_' + need + '_form').val()
      user.needs.push({
        need: need,
        content: need_content
      });
    });
    $('#frm_besoins').hide();
    $('#frm_register').show();
  });

  $('#back_account').click(function() {
    $('#frm_besoins').show();
    $('#frm_register').hide();
  });

  $('#finish').click(function() {
    user.firstname = $('#firstname').val();
    user.lastname = $('#lastname').val();
    user.email = $('#reg_email').val();
    user.password = $('#reg_password').val();

    if (user.firstname === '') return false;
    if (user.lastname === '') return false;
    if (user.email === '') return false;
    if (user.password === '') return false;

    $.post("/register", {
      pitch: user.pitch,
      needs: user.needs,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password
    })
      .done(function(data) {
        if (!data.err) window.location.replace("/dashboard");
        else window.location.reload();
      });
  });

  $('#finish_coach').click(function() {
    user.firstname = $('#firstname_coach').val();
    user.lastname = $('#lastname_coach').val();
    user.email = $('#reg_email_coach').val();
    user.password = $('#reg_password_coach').val();
    user.entreprise = $('#entreprise').val();

    if (user.firstname === '') return false;
    if (user.lastname === '') return false;
    if (user.email === '') return false;
    if (user.entreprise === '') return false;
    if (user.password === '') return false;

    $.post("/registerCoach", {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      entreprise: user.entreprise
    })
      .done(function(data) {
        if (!data.err) window.location.replace("/dashboard");
        else window.location.reload();
      });
  });

  $('#multi').change(function() {
    var all = JSON.parse(JSON.stringify(tabs));
    $("select option:selected").each(function() {
      var need = $(this).text();
      if (tabs.indexOf(need) === -1) {
        tabs.push(need);
        if (tabs.length === 1) {
          $('#tab-01').append('<li class="active" id="tab_' + need + '_link"><a href="#tab_' + need + '">' + need + '</a></li>');
          $('#tab-01-content').append('<div class="tab-pane active" id="tab_' + need + '"><div class="row column-seperation"><div class="col-md-12"><textarea name="tab_' + need + '_form" id="tab_' + need + '_form" rows="10" type="text" class="form-control" placeholder="Write your ' + need + ' needs"></textarea></div></div></div>');
        } else {
          $('#tab-01').append('<li id="tab_' + need + '_link"><a href="#tab_' + need + '">' + need + '</a></li>');
          $('#tab-01-content').append('<div class="tab-pane" id="tab_' + need + '"><div class="row column-seperation"><div class="col-md-12"><textarea name="tab_' + need + '_form" id="tab_' + need + '_form" rows="10" type="text" class="form-control" placeholder="Write your ' + need + ' needs"></textarea></div></div></div>');
        }
        $('#tab-01 a').click(function(e) {
          e.preventDefault();
          $(this).tab('show');
        });
      }
      all.splice(all.indexOf(need), 1);
    });

    if (all.length !== 0) {
      var need = all[0];
      tabs.splice(tabs.indexOf(need), 1);
      $('#tab_' + need).remove();
      $('#tab_' + need + '_link').remove();
    }
  });



  $("#multi").select2();
});