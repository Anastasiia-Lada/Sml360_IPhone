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



function fb_login()
{
    FB.getLoginStatus(updateStatusCallback, true);
}

function updateStatusCallback(response)
{
    //alert(response.status);
    login();
}

function login()
{

    try
    {
        FB.login(function (response)
        {
             
            alert('auth.login()'+JSON.stringify(response));
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
        appId: "213563938819286",
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
    //var me = Ext.app.getController('ParentController');
    saved_controller_obj.tryLoginUser();
}

document.addEventListener('deviceready', function ()
{
    FB.init({
        appId: "213563938819286",
        nativeInterface: CDV.FB,
        useCachedDialogs: false,
        status: true,           // Check Facebook Login status
        cookie: true,           // enable cookies to allow the server to access the session
        oauth: true,            // enable OAuth 2.0
        xfbml: false,
    });

}, false);