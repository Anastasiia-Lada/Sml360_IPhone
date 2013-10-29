var tmp_params = {
    facebookID: '',
    guid: '',
    fbtoken: '',
};
var detectedFail = false;
var saved_controller_obj = {};

FB.Event.subscribe('auth.login',  logFB);

function logFB(response)
{
    if (response)
        alert('there is response');

        //alert((FB.getAuthResponse || function(){})().accessToken);
        //alert("JSON" + JSON);
        //alert(response.session);
        //alert("FBSession" + (FBSession || FB.FBSession));
        alert(arguments.length);
        //FB.api('/me', function(response) {
         //   alert('smth');
        //});
        //if (response!=null)
       // {
         //   var s="";
         //   for(var p in response)
         //       {
         //         s+=(p+":"+response[p]);
         //       }
         //   alert(s);
       // }
}

FB.Event.subscribe('auth.logout', function (response)
{
});



function fb_login()
{
    FB.getLoginStatus(updateStatusCallback);
}

function updateStatusCallback(response)
{
    alert(response.status);
    alert(JSON.stringify(response));
    login();
}

function login()
{

    try
    {
        FB.login(logFB, { scope: 'email' });
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
        useCachedDialogs: false
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
        useCachedDialogs: false
    }
)

}, false);