Ext.define('smiley360.view.Survey', {
	extend: 'Ext.Panel',
	alias: 'widget.surveyview',
	config: {
		title: 'Take This Survey',
		layout: 'fit',
		items: [{
			xtype: 'panel',
			scrollable: 'vertical',
			cls: 'popup-survey-innerpanel',
			style: '-webkit-overflow-scrolling: touch ; height: 100% ; overflow: auto;',
			items: [{
				xtype: 'panel',
				margin: '0px -16px 0px 0px',
				style: '-webkit-overflow-scrolling: touch ; height: 100%; overflow: auto;',
				html:  //'<input type="button" value="Click!" onclick="window.postMessage(\'dfg\',\'*\')" />' +
				//	'<div style="width: 760px; height: 500px; overflow: scroll !important;-webkit-overflow-scrolling:touch !important;">' +
				//'<object type="text/html" data="http://uat.smiley360.com/mobile_survey/pms000.php?deviceID=4a874a06-7f62-2317-e842-0a0afe6bb5be&offerID=89" style="width:1000px; height:10000px;">' +
				//'</object>' +
				//'</div>'
				'<iframe id="xSurveyFrame" frameborder="0" scrolling="yes" class="popup-survey-iframe"></iframe>',
			}],
			listeners: {
				painted: function () {
					window.addEventListener("message", function (evt) {
						if (evt.data)
							try {
								this.up('#xMainView').showExternalView(evt.data);
							}
						catch (err) {
								Ext.widget(evt.data).show();
							};
					}, true);
				}
			}
		}]
	}
});