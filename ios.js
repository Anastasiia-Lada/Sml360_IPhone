var tmp_params = {
    facebookID: '',
    guid: '',
    fbtoken: '',
};
var detectedFail = false;
var saved_controller_obj = {};

FB.Event.subscribe('auth.login', function (response)
{
    //alert('auth.login'+JSON.stringify(response));
    detectedFail = false;

});

FB.Event.subscribe('auth.logout', function (response)
{
});

FB.init({
        appId: "104171846376854",
        nativeInterface: CDV.FB,
        useCachedDialogs: false,
        status: true,           // Check Facebook Login status
        cookie: true,           // enable cookies to allow the server to access the session
        oauth: true,            // enable OAuth 2.0
        xfbml: false,
    }, function() { alert('init')});


function fb_login()
{
    FB.getLoginStatus(updateStatusCallback, true);
}

function updateStatusCallback(response)
{
    //alert(response.status);
    FB.init({
        appId: "104171846376854",
        nativeInterface: CDV.FB,
        useCachedDialogs: false,
        status: true,           // Check Facebook Login status
        cookie: true,           // enable cookies to allow the server to access the session
        oauth: true,            // enable OAuth 2.0
        xfbml: false,
    });
    alert(FB.getAccessToken());
    login();
}

function login()
{
    alert('native'+FB.UA.nativeApp());
    alert('mobile'+FB.UA.mobile());
    alert('ipad'+FB.UA.iPad());
    alert('natint'+FB._nativeInterface);
    alert('FB._authResponse'+FB._authResponse);
    alert('FB._userID'+FB._userID);
    alert('FB._userStatus'+FB._userStatus);
    //FB.UA.mobile() = null;
    //FB.UA.iPad() = null;
    alert('loc'+location.hostname);

     FB.ui(
        client_id:'104171846376854',
        method: 'oauth',
        display: 'popup',
        domain: location.hostname,
       scope: { 'email' }
      },
      function(response) { alert('is response');});
    try
    {
        FB.login(function (response)
        {
             
            //alert('auth.login()'+JSON.stringify(response));
            if (response && response.authResponse)
            {
                //alert('access_token is back!'+ response.authResponse.accessToken);
            }
            else
            {
                revoke();
            }
        }, { scope: 'email, read_stream' });
    }
    catch (err)
    {
        FB.login(function (response)
        {
        }, { scope: 'email, publish_stream' });
    }
}
function revoke()
{
    FB.init({
        appId: "104171846376854",
        nativeInterface: CDV.FB,
        useCachedDialogs: false,
        status: true,           // Check Facebook Login status
        cookie: true,           // enable cookies to allow the server to access the session
        oauth: true,            // enable OAuth 2.0
        xfbml: false,
    });

    detectedFail = true;
}

function find_member()
{
    var membersStore = smiley360.services.getMemberStore();                                    
    if( (tmp_params.guid == 'isSet')&& (membersStore.getCount() > 0) )                              
                                        {
                                            tmp_params.guid = smiley360.services.getDeviceId();
                                            //alert('set from deviceid'+tmp_params.guid);
                                        };
    //var me = Ext.app.getController('ParentController');
    if (tmp_params.facebookID != '') {
                                            //alert('find fbId'+tmp_params.facebookID);
                                            smiley360.services.loginToServer(tmp_params, function (fb_session) {
                                                //alert('doneLoginToserver');       
                                                //alert(JSON.stringify(fb_session));                                        
                                                saved_controller_obj.tryLoginUser();
                                            });
                                        }

}

document.addEventListener('deviceready', function ()
{
    FB.init({
        appId: "104171846376854",
        nativeInterface: CDV.FB,
        useCachedDialogs: false,
        status: true,           // Check Facebook Login status
        cookie: true,           // enable cookies to allow the server to access the session
        oauth: true,            // enable OAuth 2.0
        xfbml: false,
    });

}, false);