/*! Notificare 2015-12-01 */
!function(a,b,c,d){function e(b,c){this.element=b,this.options=a.extend({},g,c),this._defaults=g,this._name=f,this.init()}var f="uniqleads",g={sdkVersion:"1.6.1",apiUrl:"https://cloud.notifica.re/api",websitePushUrl:"https://push.notifica.re/website-push/safari",awsStorage:"https://s3-eu-west-1.amazonaws.com/uniqleads-storage",fullHost:b.location.protocol+"//"+b.location.host,wssUrl:"wss://websocket.notifica.re",protocols:["uniqleads-push"],daysToExpire:"30",clientInfo:new UAParser,userId:null,username:null};e.prototype={init:function(){this.placeholder=a(c.createElement("div")),this.placeholder.addClass("uniqleads"),this.uniqueId=this._getUniqueID(),this.sessionDate=new Date,this.reconnectTimeout=0,this.minReconnectTimeout=1e3,this.maxReconnectTimeout=6e4,this.allowedNotifications=!1,this.safariPush=!1,"undefined"!=typeof Storage&&(localStorage.getItem("regions")||localStorage.setItem("regions",JSON.stringify([])),localStorage.getItem("position")||localStorage.setItem("position",JSON.stringify({latitude:0,longitude:0}))),this._getApplicationInfo()},_handleSession:function(){a(b).bind("focus",function(a){this.sessionDate=new Date,this.logEvent({sessionID:this.uniqueId,type:"re.notifica.event.application.Open",userID:this.options.userId||null,deviceID:this._getCookie("uuid")||null},function(a){},function(a){})}.bind(this)).bind("blur",function(a){var b=new Date,c=this.sessionDate,d=c.getTime()-b.getTime(),e=d/1e3,f=Math.abs(e);this.logEvent({sessionID:this.uniqueId,type:"re.notifica.event.application.Close",userID:this.options.userId||null,deviceID:this._getCookie("uuid")||null,data:{length:f}},function(a){console.log("Notificare: Session:"+f+" seconds")},function(a){})}.bind(this))},registerForNotifications:function(){if(this.applicationInfo.websitePushConfig&&this.applicationInfo.websitePushConfig.icon&&this.applicationInfo.websitePushConfig.allowedDomains.length>0&&a.inArray(this.options.fullHost,this.applicationInfo.websitePushConfig.allowedDomains)>-1)if("safari"in b&&"pushNotification"in b.safari&&this.applicationInfo.websitePushConfig&&this.applicationInfo.websitePushConfig.info&&this.applicationInfo.websitePushConfig.info.subject&&this.applicationInfo.websitePushConfig.info.subject.UID){var c=b.safari.pushNotification.permission(this.applicationInfo.websitePushConfig.info.subject.UID);"default"==c.permission?b.safari.pushNotification.requestPermission(this.options.websitePushUrl,this.applicationInfo.websitePushConfig.info.subject.UID,{applicationKey:this.options.appKey},function(b){b.deviceToken&&(this.allowedNotifications=!0,this.safariPush=!0,a(this.element).trigger("uniqleads:didReceiveDeviceToken",b.deviceToken),this.logEvent({sessionID:this.uniqueId,type:"re.notifica.event.application.Install"},function(a){},function(a){}))}.bind(this)):"denied"==c.permission?this.options.allowSilent&&this._setSocket():"granted"==c.permission&&(this.allowedNotifications=!0,this.safariPush=!0,a(this.element).trigger("uniqleads:didReceiveDeviceToken",c.deviceToken))}else b.Notification?"default"===Notification.permission?Notification.requestPermission(function(){this.allowedNotifications=!0,this._setSocket()}.bind(this)):"granted"===Notification.permission?(this.allowedNotifications=!0,this._setSocket()):"denied"===Notification.permission?this.options.allowSilent&&this._setSocket():this.options.allowSilent&&this._setSocket():b.webkitNotifications?0==b.webkitNotifications.checkPermission()?(this.allowedNotifications=!0,this._setSocket()):b.webkitNotifications.requestPermission(function(a){1==b.webkitNotifications.checkPermission()?this.options.allowSilent&&this._setSocket():2==b.webkitNotifications.checkPermission()?this.options.allowSilent&&this._setSocket():(this.allowedNotifications=!0,this._setSocket())}.bind(this)):navigator.mozNotification?0==navigator.mozNotification.checkPermission()?(this.allowedNotifications=!0,this._setSocket()):navigator.mozNotification.requestPermission(function(a){1==navigator.mozNotification.checkPermission()?this.options.allowSilent&&this._setSocket():2==navigator.mozNotification.checkPermission()?this.options.allowSilent&&this._setSocket():(this.allowedNotifications=!0,this._setSocket())}.bind(this)):this.options.allowSilent&&this._setSocket();else this.log("Notificare: Please check your Website Push configurations in our dashboard before proceed")},userId:function(a){return a?void(this.options.userId=a):this.options.userId},username:function(a){return a?void(this.options.username=a):this.options.username},log:function(a){console.log(a)},_getUniqueID:function(){var a=(new Date).getTime();return a},_setCookie:function(a){var b=new Date;b.setDate(b.getDate()+this.options.daysToExpire);var d=escape(a)+(null==this.options.daysToExpire?"":"; expires="+b.toUTCString());c.cookie="uuid="+d},_getCookie:function(a){var b=c.cookie,d=b.indexOf(" "+a+"=");if(-1==d&&(d=b.indexOf(a+"=")),-1==d)b=null;else{d=b.indexOf("=",d)+1;var e=b.indexOf(";",d);-1==e&&(e=b.length),b=unescape(b.substring(d,e))}return b},_reconnect:function(){this.reconnectTimeout=2*this.reconnectTimeout,this.reconnectTimeout<this.minReconnectTimeout?this.reconnectTimeout=this.minReconnectTimeout:this.reconnectTimeout>this.maxReconnectTimeout&&(this.reconnectTimeout=this.maxReconnectTimeout),this.log("Reconnection in "+this.reconnectTimeout+" milliseconds"),setTimeout(function(){this._setSocket()}.bind(this),this.reconnectTimeout)},_setSocket:function(){if("WebSocket"in b){var c=new WebSocket(this.options.wssUrl,this.options.protocols);c.onopen=function(){this._getCookie("uuid")?c.send(JSON.stringify({command:"register",uuid:this._getCookie("uuid")})):(this.logEvent({sessionID:this.uniqueId,type:"re.notifica.event.application.Install"},function(a){},function(a){}),c.send(JSON.stringify({command:"register"})))}.bind(this),c.onmessage=function(b){if(b.data){var c=JSON.parse(b.data);c.registration?a(this.element).trigger("uniqleads:didReceiveDeviceToken",c.registration.uuid):c.notification&&this._getNotification(c.notification)}}.bind(this),c.onerror=function(a){this._reconnect()}.bind(this),c.onclose=function(a){this._reconnect()}.bind(this)}else this.log("Notificare: Browser doesn't support websockets")},_getApplicationInfo:function(){a.ajax({type:"GET",url:this.options.apiUrl+"/application/info",beforeSend:function(a){a.setRequestHeader("Authorization","Basic "+btoa(this.options.appKey+":"+this.options.appSecret))}.bind(this)}).done(function(b){this.applicationInfo=b.application,a(this.element).trigger("uniqleads:onReady",b.application),this._handleSession(),this._onURLLocationChanged()}.bind(this)).fail(function(a){setTimeout(function(){this._getApplicationInfo()}.bind(this),2e3)}.bind(this))},registerDevice:function(c){var d=new Date;this._setCookie(c),a.ajax({type:"POST",url:this.options.apiUrl+"/device",beforeSend:function(a){a.setRequestHeader("Authorization","Basic "+btoa(this.options.appKey+":"+this.options.appSecret))}.bind(this),data:JSON.stringify({auth_token:this.options.token,deviceID:c,userID:this.options.userId?this.options.userId:null,userName:this.options.username?this.options.username:null,platform:this.safariPush?"Safari":this.options.clientInfo.getOS().name,osVersion:this.options.clientInfo.getOS().version,sdkVersion:this.options.sdkVersion,appVersion:this.options.appVersion,deviceString:b.navigator.platform,transport:this.safariPush?"WebsitePush":"Websocket",timeZoneOffset:d.getTimezoneOffset()/60*-1}),contentType:"application/json; charset=utf-8",dataType:"json"}).done(function(b){a(this.element).trigger("uniqleads:didRegisterDevice",c)}.bind(this)).fail(function(b){a(this.element).trigger("uniqleads:didFailToRegisterDevice",c)}.bind(this))},_getNotification:function(b){this.logEvent({sessionID:this.uniqueId,type:"re.notifica.event.notification.Receive",notification:b.id,userID:this.options.userId||null,deviceID:this._getCookie("uuid")},function(a){},function(a){}),a(this.element).trigger("uniqleads:didReceiveNotification",b),a.ajax({type:"GET",url:this.options.apiUrl+"/notification/"+b.id,beforeSend:function(a){a.setRequestHeader("Authorization","Basic "+btoa(this.options.appKey+":"+this.options.appSecret))}.bind(this)}).done(function(a){if(this.allowedNotifications){if(this.options.soundsDir&&b.sound){var c=new Audio(this.options.soundsDir+b.sound);c.load(),c.play()}this.showNotification(a)}}.bind(this)).fail(function(a){setTimeout(function(){this._getNotification(b)}.bind(this),2e3)}.bind(this))},openNotification:function(b){a.ajax({type:"GET",url:this.options.apiUrl+"/notification/"+b.id,beforeSend:function(a){a.setRequestHeader("Authorization","Basic "+btoa(this.options.appKey+":"+this.options.appSecret))}.bind(this)}).done(function(b){a(this.element).trigger("uniqleads:didOpenNotification",b.notification),this._logNotificationEvents(b)}.bind(this)).fail(function(a){setTimeout(function(){this.openNotification(b)}.bind(this),2e3)}.bind(this))},showNotification:function(a){if("Notification"in b){var c=new Notification(this.applicationInfo.name,{body:a.notification.message,tag:a.notification._id,icon:this.options.awsStorage+this.applicationInfo.websitePushConfig.icon});c.onclick=function(){c.close();var d=this.applicationInfo.websitePushConfig.urlFormatString.replace("%@",a.notification._id);b.location.replace(d),this._onURLLocationChanged()}.bind(this)}else if("webkitNotifications"in b){var c=b.webkitNotifications.createNotification(this.options.awsStorage+this.applicationInfo.websitePushConfig.icon,this.applicationInfo.name,a.notification.message);c.show(),c.onclick=function(){var c=this.applicationInfo.websitePushConfig.urlFormatString.replace("%@",a.notification._id);b.location.replace(c),this._onURLLocationChanged()}.bind(this)}else if("mozNotification"in navigator){var c=navigator.mozNotification.createNotification(this.applicationInfo.name,a.notification.message,this.options.awsStorage+this.applicationInfo.websitePushConfig.icon);c.show(),c.onclick=function(){var c=this.applicationInfo.websitePushConfig.urlFormatString.replace("%@",a.notification._id);b.location.replace(c),this._onURLLocationChanged()}.bind(this)}},_onURLLocationChanged:function(){if(this.applicationInfo&&this.applicationInfo.websitePushConfig&&this.applicationInfo.websitePushConfig.urlFormatString){var a=new RegExp(this.applicationInfo.websitePushConfig.urlFormatString.replace(/([.*+?^${}()|\[\]\/\\])/g,"\\$1").replace("%@","(\\w+)")),c=a.exec(b.location);c&&c.length>1&&this.openNotification({id:c[1]})}},_logNotificationEvents:function(a){this.logEvent({sessionID:this.uniqueId,type:"re.notifica.event.notification.Influenced",notification:a.notification._id,userID:this.options.userId||null,deviceID:this._getCookie("uuid")},function(a){},function(a){}),this.logEvent({sessionID:this.uniqueId,type:"re.notifica.event.notification.Open",notification:a.notification._id,userID:this.options.userId||null,deviceID:this._getCookie("uuid")},function(a){},function(a){})},logEvent:function(b,c,d){a.ajax({type:"POST",url:this.options.apiUrl+"/event",beforeSend:function(a){a.setRequestHeader("Authorization","Basic "+btoa(this.options.appKey+":"+this.options.appSecret))}.bind(this),data:JSON.stringify(b),contentType:"application/json; charset=utf-8",dataType:"json"}).done(function(a){c(a)}.bind(this)).fail(function(a){d("Notificare: Failed to register log")}.bind(this))},logCustomEvent:function(b,c,d){a.ajax({type:"POST",url:this.options.apiUrl+"/event",beforeSend:function(a){a.setRequestHeader("Authorization","Basic "+btoa(this.options.appKey+":"+this.options.appSecret))}.bind(this),data:JSON.stringify({sessionID:this.uniqueId,type:"re.notifica.event.custom."+b,userID:this.options.userId||null,deviceID:this._getCookie("uuid")}),contentType:"application/json; charset=utf-8",dataType:"json"}).done(function(a){c(a)}.bind(this)).fail(function(a){d("Notificare: Failed to register custom event")}.bind(this))},getTags:function(b,c){this._getCookie("uuid")?a.ajax({type:"GET",url:this.options.apiUrl+"/device/"+this._getCookie("uuid")+"/tags",beforeSend:function(a){a.setRequestHeader("Authorization","Basic "+btoa(this.options.appKey+":"+this.options.appSecret))}.bind(this)}).done(function(a){b(a.tags)}.bind(this)).fail(function(a){c("Notificare: Failed to get tags for device")}.bind(this)):c("Notificare: Calling get tags before having a deviceId")},addTags:function(b,c,d){this._getCookie("uuid")?a.ajax({type:"PUT",url:this.options.apiUrl+"/device/"+this._getCookie("uuid")+"/addtags",beforeSend:function(a){a.setRequestHeader("Authorization","Basic "+btoa(this.options.appKey+":"+this.options.appSecret))}.bind(this),data:JSON.stringify({tags:b}),contentType:"application/json; charset=utf-8",dataType:"json"}).done(function(a){c(a)}.bind(this)).fail(function(a){d("Notificare: Failed to add tags to device")}.bind(this)):d("Notificare: Calling addTags before registering a deviceId")},removeTag:function(b,c,d){this._getCookie("uuid")?a.ajax({type:"PUT",url:this.options.apiUrl+"/device/"+this._getCookie("uuid")+"/removetag",beforeSend:function(a){a.setRequestHeader("Authorization","Basic "+btoa(this.options.appKey+":"+this.options.appSecret))}.bind(this),data:JSON.stringify({tag:b}),contentType:"application/json; charset=utf-8",dataType:"json"}).done(function(a){c(a)}.bind(this)).fail(function(a){d(null)}.bind(this)):d("Notificare: Calling removeTag before registering a deviceId")},clearTags:function(b,c){this._getCookie("uuid")?a.ajax({type:"PUT",url:this.options.apiUrl+"/device/"+this._getCookie("uuid")+"/cleartags",beforeSend:function(a){a.setRequestHeader("Authorization","Basic "+btoa(this.options.appKey+":"+this.options.appSecret))}.bind(this),data:null,contentType:"application/json; charset=utf-8",dataType:"json"}).done(function(a){b(a)}.bind(this)).fail(function(a){c("Failed to clear device tags.")}.bind(this)):c("Notificare: Calling clearTags before registering a deviceId")},startLocationUpdates:function(a,b){this._getCookie("uuid")?this.applicationInfo.services&&this.applicationInfo.services.locationServices?navigator.geolocation?navigator.geolocation.watchPosition(function(c){var d=JSON.parse(localStorage.getItem("position"));d.latitude!=c.coords.latitude||d.longitude!=c.coords.longitude?this._getDeviceCountry(c,function(d){this.updateLocation(c,d.country,function(d){this._getNearestRegions(c,function(b){this._handleRegions(c,b),a(d)}.bind(this),function(a){b("Notificare: Failed to get nearest regions")})}.bind(this),function(){b("Notificare: Failed to update device location")})}.bind(this)):this._getNearestRegions(c,function(b){this._handleRegions(c,b),this.log("Notificare: Skipped location update, nothing changed"),a(JSON.parse(localStorage.getItem("position")))}.bind(this),function(a){b("Notificare: Failed to get nearest regions")})}.bind(this),function(a){switch(a.code){case a.PERMISSION_DENIED:b("Notificare: User denied the request for Geolocation");break;case a.POSITION_UNAVAILABLE:b("Notificare: Location information is unavailable");break;case a.TIMEOUT:b("Notificare: The request to get user location timed out");break;case a.UNKNOWN_ERROR:b("Notificare: An unknown location error occurred")}},this.options.geolocationOptions):b("Notificare: Browser does not support Geolocation API"):b("Notificare: Your account does not support Location Services"):b("Notificare: Calling startLocationUpdates before registering a deviceId")},stopLocationUpdates:function(){this.applicationInfo.services&&this.applicationInfo.services.locationServices?navigator.geolocation&&navigator.geolocation.clearWatch():this.log("Notificare: Your account does not support Location Services")},updateLocation:function(b,c,d,e){a.ajax({type:"PUT",url:this.options.apiUrl+"/device/"+this._getCookie("uuid"),beforeSend:function(a){a.setRequestHeader("Authorization","Basic "+btoa(this.options.appKey+":"+this.options.appSecret))}.bind(this),data:JSON.stringify({latitude:b.coords.latitude,longitude:b.coords.longitude,country:c}),contentType:"application/json; charset=utf-8",dataType:"json"}).done(function(a){localStorage.setItem("position",JSON.stringify({accuracy:isNaN(b.coords.accuracy)?null:b.coords.accuracy,altitude:isNaN(b.coords.altitude)?null:b.coords.altitude,altitudeAccuracy:isNaN(b.coords.altitudeAccuracy)?null:b.coords.altitudeAccuracy,heading:isNaN(b.coords.heading)?null:b.coords.heading,speed:isNaN(b.coords.speed)?null:b.coords.speed,latitude:b.coords.latitude,longitude:b.coords.longitude,country:c,timestamp:b.timestamp})),d(JSON.parse(localStorage.getItem("position")))}.bind(this)).fail(function(a){e(null)}.bind(this))},_handleRegions:function(b,c){a.each(c,function(c,d){var e=JSON.parse(localStorage.getItem("regions"));if(this._calculateDistanceBetweenPoints(b,d)<=d.distance)-1==a.inArray(d._id,e)&&this._trigger("re.notifica.trigger.region.Enter",d,function(a){e.push(d._id),localStorage.setItem("regions",JSON.stringify(e))},function(a){});else{var f=a.inArray(d._id,e);f>-1&&this._trigger("re.notifica.trigger.region.Exit",d,function(a){e.splice(f,1),localStorage.setItem("regions",JSON.stringify(e))},function(a){})}}.bind(this))},_getNearestRegions:function(b,c,d){a.ajax({type:"GET",url:this.options.apiUrl+"/region/bylocation/"+b.coords.latitude+"/"+b.coords.longitude,beforeSend:function(a){a.setRequestHeader("Authorization","Basic "+btoa(this.options.appKey+":"+this.options.appSecret))}.bind(this),data:null}).done(function(a){c(a.regions)}.bind(this)).fail(function(a){d("Notificare: Failed to retrieve nearest regions")}.bind(this))},_calculateDistanceBetweenPoints:function(a,b){var c=a.coords.latitude,d=b.geometry.coordinates[1],e=a.coords.longitude,f=b.geometry.coordinates[0],g=6371e3,h=c*Math.PI/180,i=d*Math.PI/180,j=(d-c)*Math.PI/180,k=(f-e)*Math.PI/180,l=Math.sin(j/2)*Math.sin(j/2)+Math.cos(h)*Math.cos(i)*Math.sin(k/2)*Math.sin(k/2),m=2*Math.atan2(Math.sqrt(l),Math.sqrt(1-l)),n=g*m;return n},_getDeviceCountry:function(b,c){a.ajax({type:"GET",url:"https://maps.googleapis.com/maps/api/geocode/json",data:{latlng:b.coords.latitude+","+b.coords.longitude,sensor:!1}}).done(function(a){c("OK"===a.status&&a.results&&a.results.length>0?{country:a.results[a.results.length-1].address_components[0].short_name}:{country:null})}.bind(this)).fail(function(a){c({country:null})}.bind(this))},reply:function(b,c,d,e){this._getCookie("uuid")?a.ajax({type:"POST",url:this.options.apiUrl+"/reply",beforeSend:function(a){a.setRequestHeader("Authorization","Basic "+btoa(this.options.appKey+":"+this.options.appSecret))}.bind(this),data:JSON.stringify({userID:this.options.userId,deviceID:this._getCookie("uuid"),notification:b,data:c}),contentType:"application/json; charset=utf-8",dataType:"json"}).done(function(a){d(a)}.bind(this)).fail(function(a){e("Notificare: Failed to register reply")}.bind(this)):e("Notificare: Calling reply before registering a deviceId")},_trigger:function(b,c,d,e){a.ajax({type:"POST",url:this.options.apiUrl+"/trigger/"+b,beforeSend:function(a){a.setRequestHeader("Authorization","Basic "+btoa(this.options.appKey+":"+this.options.appSecret))}.bind(this),data:JSON.stringify({region:c._id,deviceID:this._getCookie("uuid")}),contentType:"application/json; charset=utf-8",dataType:"json"}).done(function(a){d(a)}.bind(this)).fail(function(a){e("Notificare: Failed to trigger region")}.bind(this))}},a.fn[f]=function(b){if("string"==typeof arguments[0]){var c,g=arguments[0],h=Array.prototype.slice.call(arguments,1);return this.each(function(){if(!a.data(this,f)||"function"!=typeof a.data(this,f)[g])throw new Error("Method "+g+" does not exist on "+f+".jquery.js");var b=a.data(this,f);c=b[g].apply(b,h)}),c!==d?c:this}return"object"!=typeof b&&b?void 0:this.each(function(){a.data(this,f)||a.data(this,f,new e(this,b))})}}(jQuery,window,document);