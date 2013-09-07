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
				html: '<iframe id="xSurveyFrame" frameborder="0" scrolling="yes" class="popup-survey-iframe"></iframe>',
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