sap.ui.require.preload({"ate/activity/book/ATE/Component.js":'sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","./model/models","./controller/ListSelector","./controller/ErrorHandler"],function(t,e,s,i,o){"use strict";return t.extend("ate.activity.book.ATE.Component",{metadata:{manifest:"json"},init:function(){this.oListSelector=new i,this._oErrorHandler=new o(this),this.setModel(s.createDeviceModel(),"device"),t.prototype.init.apply(this,arguments),this.getRouter().initialize()},destroy:function(){this.oListSelector.destroy(),this._oErrorHandler.destroy(),t.prototype.destroy.apply(this,arguments)},getContentDensityClass:function(){return void 0===this._sContentDensityClass&&(document.body.classList.contains("sapUiSizeCozy")||document.body.classList.contains("sapUiSizeCompact")?this._sContentDensityClass="":e.support.touch?this._sContentDensityClass="sapUiSizeCozy":this._sContentDensityClass="sapUiSizeCompact"),this._sContentDensityClass}})});',"ate/activity/book/ATE/controller/AddDetail.controller.js":'sap.ui.define(["./BaseController","sap/ui/model/json/JSONModel","sap/m/MessageBox","sap/m/library"],function(e,t,i,o,a){"use strict";return e.extend("ate.activity.book.ATE.controller.AddDetail",{_oBinding:{},onInit:function(){var e=this;this.getRouter().getTargets().getTarget("create").attachDisplay(null,this._onDisplay,this),this._oODataModel=this.getOwnerComponent().getModel(),this._oResourceBundle=this.getResourceBundle(),this._oViewModel=new t({enableCreate:!1,delay:0,busy:!1,mode:"create",viewTitle:""}),this.setModel(this._oViewModel,"viewModel");var i=new sap.ui.model.json.JSONModel({Nodeid:"",Name:"",City:"",Age:"",Country:""});this.getView().setModel(i,"new"),sap.ui.getCore().getMessageManager().registerObject(this.getView(),!0);var o=sap.ui.getCore().getMessageManager().getMessageModel();this._oBinding=new sap.ui.model.Binding(o,"/",o.getContext("/")),this._oBinding.attachChange(function(t){for(var i=t.getSource().getModel().getData(),o=0;o<i.length;o++)"Error"!==i[o].type||i[o].technical||e._oViewModel.setProperty("/enableCreate",!1)})},onSave:function(){var e=this.getView().getModel("new").getData(),t=e;(e={}).Nodeid=t.Nodeid,e.Name=t.Name,e.Age=t.Age,e.City=t.City,e.Country=t.Country,this.getModel().create("/parentSet",e)},onAddChild:function(){var e=this.getView().getModel("new"),t=e.getData().parentToChild,i=10*(t.length+1);t.push({Nodeid:e.getData().Nodeid,Cname:"",Cid:i,Cage:"",Ccity:"",Ccountry:""})},_checkIfBatchRequestSucceeded:function(e){var t=e.getParameters(),i=e.getParameters().requests;if(t.success){if(i)for(var o=0;o<i.length;o++)if(!e.getParameters().requests[o].success)return!1;return!0}return!1},onCancel:function(){this.getModel().hasPendingChanges()?this._showConfirmQuitChanges():(this.getModel("appView").setProperty("/addEnabled",!0),this._navBack())},_navBack:function(){var e=sap.ui.core.routing.History.getInstance().getPreviousHash();this.getView().unbindObject(),void 0!==e?history.go(-1):this.getRouter().getTargets().display("object")},_showConfirmQuitChanges:function(){var e=this.getOwnerComponent(),t=this.getModel(),o=this;i.confirm(this._oResourceBundle.getText("confirmCancelMessage"),{styleClass:e.getContentDensityClass(),onClose:function(e){e===sap.m.MessageBox.Action.OK&&(o.getModel("appView").setProperty("/addEnabled",!0),t.resetChanges(),o._navBack())}})},_onEdit:function(e){var t=e.getParameter("data"),i=this.getView();this._oViewModel.setProperty("/mode","edit"),this._oViewModel.setProperty("/enableCreate",!0),this._oViewModel.setProperty("/viewTitle",this._oResourceBundle.getText("editViewTitle")),i.bindElement({path:t.objectPath})},_onCreate:function(e){if(e.getParameter("name")&&"create"!==e.getParameter("name"))return this._oViewModel.setProperty("/enableCreate",!1),this.getRouter().getTargets().detachDisplay(null,this._onDisplay,this),void this.getView().unbindObject();this._oViewModel.setProperty("/viewTitle",this._oResourceBundle.getText("createViewTitle")),this._oViewModel.setProperty("/mode","create");var t=new sap.ui.model.json.JSONModel({Nodeid:"",Name:"",City:"",Age:"",Country:"",parentToChild:[{Nodeid:"",Cname:"",Cage:"",Cid:"00000010",Ccity:"",Ccountry:""}]});this.getView().setModel(t,"new")},_validateSaveEnablement:function(){for(var e,t=this._getFormFields(this.byId("newEntitySimpleForm")),i=0;i<t.length;i++){if(e=t[i].control,t[i].required)if(!e.getValue())return void this._oViewModel.setProperty("/enableCreate",!1)}this._checkForErrorMessages()},_checkForErrorMessages:function(){var e=this._oBinding.oModel.oData;if(e.length>0){for(var t=!0,i=0;i<e.length;i++)if("Error"===e[i].type&&!e[i].technical){t=!1;break}this._oViewModel.setProperty("/enableCreate",t)}else this._oViewModel.setProperty("/enableCreate",!0)},_fnUpdateSuccess:function(){this.getModel("appView").setProperty("/busy",!1),this.getView().unbindObject(),this.getRouter().getTargets().display("object")},_fnEntityCreated:function(e){var t=this.getModel().createKey("parentSet",e);this.getModel("appView").setProperty("/itemToSelect","/"+t),this.getModel("appView").setProperty("/busy",!1),this.getRouter().getTargets().display("object")},_fnEntityCreationFailed:function(){this.getModel("appView").setProperty("/busy",!1)},_onDisplay:function(e){var t=e.getParameter("data");t&&"update"===t.mode?this._onEdit(e):this._onCreate(e)},_getFormFields:function(e){for(var t,i=[],o=e.getContent(),a=0;a<o.length;a++)"sap.m.Input"!==(t=o[a].getMetadata().getName())&&"sap.m.DateTimeInput"!==t&&"sap.m.CheckBox"!==t||i.push({control:o[a],required:o[a-1].getRequired&&o[a-1].getRequired()});return i}})});',"ate/activity/book/ATE/controller/App.controller.js":'sap.ui.define(["./BaseController","sap/ui/model/json/JSONModel"],function(e,t){"use strict";return e.extend("ate.activity.book.ATE.controller.App",{onInit:function(){var e,n,o=this.getView().getBusyIndicatorDelay();e=new t({busy:!0,delay:0,layout:"OneColumn",previousLayout:"",actionButtonsInfo:{midColumn:{fullScreen:!1}}}),this.setModel(e,"appView"),n=function(){e.setProperty("/busy",!1),e.setProperty("/delay",o)},this.getOwnerComponent().getModel().metadataLoaded().then(n),this.getOwnerComponent().getModel().attachMetadataFailed(n),this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass())}})});',"ate/activity/book/ATE/controller/BaseController.js":'sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/routing/History"],function(e,t){"use strict";return e.extend("ate.activity.book.ATE.controller.BaseController",{getRouter:function(){return this.getOwnerComponent().getRouter()},getModel:function(e){return this.getView().getModel(e)},setModel:function(e,t){return this.getView().setModel(e,t)},getResourceBundle:function(){return this.getOwnerComponent().getModel("i18n").getResourceBundle()},onNavBack:function(){void 0!==t.getInstance().getPreviousHash()?history.go(-1):this.getRouter().navTo("master",{},!0)}})});',"ate/activity/book/ATE/controller/Detail.controller.js":'sap.ui.define(["./BaseController","sap/ui/model/json/JSONModel","../model/formatter","sap/m/library"],function(e,t,i,n){"use strict";var o=n.URLHelper;return e.extend("ate.activity.book.ATE.controller.Detail",{formatter:i,onInit:function(){var e=new t({busy:!1,delay:0,lineItemListTitle:this.getResourceBundle().getText("detailLineItemTableHeading")});this.getRouter().getRoute("object").attachPatternMatched(this._onObjectMatched,this),this.setModel(e,"detailView"),this.getOwnerComponent().getModel().metadataLoaded().then(this._onMetadataLoaded.bind(this))},onSendEmailPress:function(){var e=this.getModel("detailView");o.triggerEmail(null,e.getProperty("/shareSendEmailSubject"),e.getProperty("/shareSendEmailMessage"))},onListUpdateFinished:function(e){var t,i=e.getParameter("total"),n=this.getModel("detailView");this.byId("lineItemsList").getBinding("items").isLengthFinal()&&(t=i?this.getResourceBundle().getText("detailLineItemTableHeadingCount",[i]):this.getResourceBundle().getText("detailLineItemTableHeading"),n.setProperty("/lineItemListTitle",t))},_onObjectMatched:function(e){var t=e.getParameter("arguments").objectId;this.getModel("appView").setProperty("/layout","TwoColumnsMidExpanded"),this.getModel().metadataLoaded().then(function(){var e=this.getModel().createKey("parentSet",{Nodeid:t});this._bindView("/"+e)}.bind(this))},_bindView:function(e){var t=this.getModel("detailView");t.setProperty("/busy",!1),this.getView().bindElement({path:e,events:{change:this._onBindingChange.bind(this),dataRequested:function(){t.setProperty("/busy",!0)},dataReceived:function(){t.setProperty("/busy",!1)}}})},onDelete:function(){var e=this.getView().getElementBinding().getPath();this.getModel().remove(e)},onEdit:function(){this.getRouter().getTargets().display("create")},_onBindingChange:function(){var e=this.getView(),t=e.getElementBinding();if(!t.getBoundContext())return this.getRouter().getTargets().display("detailObjectNotFound"),void this.getOwnerComponent().oListSelector.clearMasterListSelection();var i=t.getPath(),n=this.getResourceBundle(),o=e.getModel().getObject(i),a=o.Nodeid,s=o.Name,r=this.getModel("detailView");this.getOwnerComponent().oListSelector.selectAListItem(i),r.setProperty("/shareSendEmailSubject",n.getText("shareSendEmailObjectSubject",[a])),r.setProperty("/shareSendEmailMessage",n.getText("shareSendEmailObjectMessage",[s,a,location.href]))},_onMetadataLoaded:function(){var e=this.getView().getBusyIndicatorDelay(),t=this.getModel("detailView"),i=this.byId("lineItemsList"),n=i.getBusyIndicatorDelay();t.setProperty("/delay",0),t.setProperty("/lineItemTableDelay",0),i.attachEventOnce("updateFinished",function(){t.setProperty("/lineItemTableDelay",n)}),t.setProperty("/busy",!0),t.setProperty("/delay",e)},onCloseDetailPress:function(){this.getModel("appView").setProperty("/actionButtonsInfo/midColumn/fullScreen",!1),this.getOwnerComponent().oListSelector.clearMasterListSelection(),this.getRouter().navTo("master")},toggleFullScreen:function(){var e=this.getModel("appView").getProperty("/actionButtonsInfo/midColumn/fullScreen");this.getModel("appView").setProperty("/actionButtonsInfo/midColumn/fullScreen",!e),e?this.getModel("appView").setProperty("/layout",this.getModel("appView").getProperty("/previousLayout")):(this.getModel("appView").setProperty("/previousLayout",this.getModel("appView").getProperty("/layout")),this.getModel("appView").setProperty("/layout","MidColumnFullScreen"))}})});',"ate/activity/book/ATE/controller/DetailObjectNotFound.controller.js":'sap.ui.define(["./BaseController"],function(t){"use strict";return t.extend("ate.activity.book.ATE.controller.DetailObjectNotFound",{})});',"ate/activity/book/ATE/controller/ErrorHandler.js":'sap.ui.define(["sap/ui/base/Object","sap/m/MessageBox"],function(e,s){"use strict";return e.extend("ate.activity.book.ATE.controller.ErrorHandler",{constructor:function(e){this._oResourceBundle=e.getModel("i18n").getResourceBundle(),this._oComponent=e,this._oModel=e.getModel(),this._bMessageOpen=!1,this._sErrorText=this._oResourceBundle.getText("errorText"),this._oModel.attachMetadataFailed(function(e){var s=e.getParameters();this._showServiceError(s.response)},this),this._oModel.attachRequestFailed(function(e){var s=e.getParameters();("404"!==s.response.statusCode||404===s.response.statusCode&&0===s.response.responseText.indexOf("Cannot POST"))&&this._showServiceError(s.response)},this)},_showServiceError:function(e){this._bMessageOpen||(this._bMessageOpen=!0,s.error(this._sErrorText,{id:"serviceErrorMessageBox",details:e,styleClass:this._oComponent.getContentDensityClass(),actions:[s.Action.CLOSE],onClose:function(){this._bMessageOpen=!1}.bind(this)}))}})});',"ate/activity/book/ATE/controller/ListSelector.js":'sap.ui.define(["sap/ui/base/Object","sap/base/Log"],function(t,e){"use strict";return t.extend("ate.activity.book.ATE.controller.ListSelector",{constructor:function(){this._oWhenListHasBeenSet=new Promise(function(t){this._fnResolveListHasBeenSet=t}.bind(this)),this.oWhenListLoadingIsDone=new Promise(function(t,e){this._oWhenListHasBeenSet.then(function(n){n.getBinding("items").attachEventOnce("dataReceived",function(){this._oList.getItems().length?t({list:n}):e({list:n})}.bind(this))}.bind(this))}.bind(this))},setBoundMasterList:function(t){this._oList=t,this._fnResolveListHasBeenSet(t)},selectAListItem:function(t){this.oWhenListLoadingIsDone.then(function(){var e,n=this._oList;"None"!==n.getMode()&&((e=n.getSelectedItem())&&e.getBindingContext().getPath()===t||n.getItems().some(function(e){if(e.getBindingContext()&&e.getBindingContext().getPath()===t)return n.setSelectedItem(e),!0}))}.bind(this),function(){e.warning("Could not select the list item with the path"+t+" because the list encountered an error or had no items")})},clearMasterListSelection:function(){this._oWhenListHasBeenSet.then(function(){this._oList.removeSelections(!0)}.bind(this))}})});',"ate/activity/book/ATE/controller/Master.controller.js":'sap.ui.define(["./BaseController","sap/ui/model/json/JSONModel","sap/ui/model/Filter","sap/ui/model/Sorter","sap/ui/model/FilterOperator","sap/m/GroupHeaderListItem","sap/ui/Device","sap/ui/core/Fragment","../model/formatter"],function(t,e,i,s,o,r,a,n,l){"use strict";return t.extend("ate.activity.book.ATE.controller.Master",{formatter:l,onInit:function(){var t=this.byId("list"),e=this._createViewModel(),i=t.getBusyIndicatorDelay();this._oList=t,this._oListFilterState={aFilter:[],aSearch:[]},this.setModel(e,"masterView"),t.attachEventOnce("updateFinished",function(){e.setProperty("/delay",i)}),this.getView().addEventDelegate({onBeforeFirstShow:function(){this.getOwnerComponent().oListSelector.setBoundMasterList(t)}.bind(this)}),this.getRouter().getRoute("master").attachPatternMatched(this._onMasterMatched,this),this.getRouter().attachBypassed(this.onBypassed,this)},onUpdateFinished:function(t){this._updateListItemCount(t.getParameter("total"))},onSearch:function(t){if(t.getParameters().refreshButtonPressed)this.onRefresh();else{var e=t.getParameter("query");this._oListFilterState.aSearch=e?[new i("Name",o.Contains,e)]:[],this._applyFilterSearch()}},onAddItem:function(){this.getView("master").byId("addItem").setEnabled(!1),this.getRouter().getTargets().display("create")},onRefresh:function(){this._oList.getBinding("items").refresh()},onOpenViewSettings:function(t){var e="filter";if(t.getSource()instanceof sap.m.Button){var i=t.getSource().getId();i.match("sort")?e="sort":i.match("group")&&(e="group")}this.byId("viewSettingsDialog")?this.byId("viewSettingsDialog").open(e):n.load({id:this.getView().getId(),name:"ate.activity.book.ATE.view.ViewSettingsDialog",controller:this}).then(function(t){this.getView().addDependent(t),t.addStyleClass(this.getOwnerComponent().getContentDensityClass()),t.open(e)}.bind(this))},onConfirmViewSettingsDialog:function(t){this._applySortGroup(t)},_applySortGroup:function(t){var e,i,o=t.getParameters(),r=[];e=o.sortItem.getKey(),i=o.sortDescending,r.push(new s(e,i)),this._oList.getBinding("items").sort(r)},onSelectionChange:function(t){var e=t.getSource(),i=t.getParameter("selected");this.getView("master").byId("addItem").setEnabled(!0),("MultiSelect"!==e.getMode()||i)&&this._showDetail(t.getParameter("listItem")||t.getSource())},onRefreshButton:function(){void 0!==sap.hybrid&&sap.hybrid.refreshStore()},onFlushButton:function(){void 0!==sap.hybrid&&sap.hybrid.flushStore()},onClearButton:function(){void 0!==sap.hybrid&&sap.hybrid.clearStore()},onBypassed:function(){this._oList.removeSelections(!0)},createGroupHeader:function(t){return new r({title:t.text,upperCase:!1})},onNavBack:function(){history.go(-1)},_createViewModel:function(){return new e({isFilterBarVisible:!1,filterBarLabel:"",delay:0,title:this.getResourceBundle().getText("masterTitleCount",[0]),noDataText:this.getResourceBundle().getText("masterListNoDataText"),sortBy:"Name",groupBy:"None"})},_onMasterMatched:function(){this.getModel("appView").setProperty("/layout","OneColumn")},_showDetail:function(t){var e=!a.system.phone;this.getModel("appView").setProperty("/layout","TwoColumnsMidExpanded"),this.getRouter().navTo("object",{objectId:t.getBindingContext().getProperty("Nodeid")},e)},_updateListItemCount:function(t){var e;this._oList.getBinding("items").isLengthFinal()&&(e=this.getResourceBundle().getText("masterTitleCount",[t]),this.getModel("masterView").setProperty("/title",e))},_applyFilterSearch:function(){var t=this._oListFilterState.aSearch.concat(this._oListFilterState.aFilter),e=this.getModel("masterView");this._oList.getBinding("items").filter(t,"Application"),0!==t.length?e.setProperty("/noDataText",this.getResourceBundle().getText("masterListNoDataWithFilterOrSearchText")):this._oListFilterState.aSearch.length>0&&e.setProperty("/noDataText",this.getResourceBundle().getText("masterListNoDataText"))},_updateFilterBar:function(t){var e=this.getModel("masterView");e.setProperty("/isFilterBarVisible",this._oListFilterState.aFilter.length>0),e.setProperty("/filterBarLabel",this.getResourceBundle().getText("masterFilterBarText",[t]))}})});',"ate/activity/book/ATE/controller/NotFound.controller.js":'sap.ui.define(["./BaseController"],function(t){"use strict";return t.extend("ate.activity.book.ATE.controller.NotFound",{onInit:function(){this.getRouter().getTarget("notFound").attachDisplay(this._onNotFoundDisplayed,this)},_onNotFoundDisplayed:function(){this.getModel("appView").setProperty("/layout","OneColumn")}})});',"ate/activity/book/ATE/model/formatter.js":'sap.ui.define([],function(){"use strict";return{currencyValue:function(e){return e?parseFloat(e).toFixed(2):""}}});',"ate/activity/book/ATE/model/models.js":'sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,n){"use strict";return{createDeviceModel:function(){var i=new e(n);return i.setDefaultBindingMode("OneWay"),i}}});',"ate/activity/book/ATE/view/ViewSettingsDialog.fragment.xml":'<core:FragmentDefinition\r\n\txmlns="sap.m"\r\n\txmlns:core="sap.ui.core"><ViewSettingsDialog\r\n\t\tid="viewSettingsDialog"\r\n\t\tconfirm=".onConfirmViewSettingsDialog"><sortItems><ViewSettingsItem\r\n\t\t\t\ttext="{i18n>masterSort1}"\r\n\t\t\t\tkey="Name"\r\n\t\t\t\tselected="true"/></sortItems></ViewSettingsDialog></core:FragmentDefinition>',"ate/activity/book/ATE/view/AddDetail.view.xml":'<mvc:View controllerName="ate.activity.book.ATE.controller.AddDetail" xmlns="sap.m" xmlns:l="sap.ui.layout" xmlns:f="sap.ui.layout.form"\n\txmlns:core="sap.ui.core" xmlns:semantic="sap.f.semantic" xmlns:mvc="sap.ui.core.mvc"><semantic:SemanticPage id="detailPage" showFooter="true"><semantic:titleHeading><Title text="{Name}" level="H2"/></semantic:titleHeading><semantic:content><VBox><f:Form id="newEntitySimpleForm" class="sapFSemanticPageAlignContent" editable="true"><f:title><core:Title text="Address"/></f:title><f:layout><f:ResponsiveGridLayout labelSpanXL="3" labelSpanL="3" labelSpanM="3" labelSpanS="12" adjustLabelSpan="false" emptySpanXL="4" emptySpanL="4"\n\t\t\t\t\t\t\temptySpanM="4" emptySpanS="0" columnsXL="1" columnsL="1" columnsM="1" singleContainerFullSize="false"/></f:layout><f:formContainers><f:FormContainer><f:formElements><f:FormElement label="Numeric 8-figures"><f:fields><Input visible="true" value="{ path: \'new>/Nodeid\', type: \'sap.ui.model.odata.type.String\' , constraints:{ maxLength:8, nullable:false } }"\n\t\t\t\t\t\t\t\t\t\t\tid="entID"/></f:fields></f:FormElement><f:FormElement label="Char20"><f:fields><Input visible="true" value="{ path: \'new>/Name\', type: \'sap.ui.model.odata.type.String\' , constraints:{ maxLength:20, nullable:false } }"\n\t\t\t\t\t\t\t\t\t\t\tid="entName"/></f:fields></f:FormElement><f:FormElement label="Two-digit no."><f:fields><Input visible="true" value="{ path: \'new>/Age\', type: \'sap.ui.model.odata.type.String\' , constraints:{ maxLength:2, nullable:false } }"\n\t\t\t\t\t\t\t\t\t\t\tid="entAge"/></f:fields></f:FormElement><f:FormElement label="Char20"><f:fields><Input visible="true" value="{ path: \'new>/City\', type: \'sap.ui.model.odata.type.String\' , constraints:{ maxLength:20} }" id="entCity"/></f:fields></f:FormElement><f:FormElement label="Char20"><f:fields><Input visible="true" value="{ path: \'new>/Country\', type: \'sap.ui.model.odata.type.String\' , constraints:{ maxLength:20} }" id="entCountry"/></f:fields></f:FormElement></f:formElements></f:FormContainer></f:formContainers></f:Form><Table id="lineItemsList" width="auto" items="{new>/parentToChild}" updateFinished="onListUpdateFinished"\n\t\t\t\t\tnoDataText="{i18n>detailLineItemTableNoDataText}" class="sapUiResponsiveMargin"><headerToolbar><Toolbar id="lineItemsToolbar"><Title id="lineItemsHeader" text="{Name}"/><ToolbarSpacer/><Button icon="sap-icon://add" press="onAddChild"/></Toolbar></headerToolbar><columns><Column><Text text="Name"/></Column><Column minScreenWidth="Tablet" demandPopin="true" hAlign="Right"><Text text="Age"/></Column><Column minScreenWidth="Tablet" demandPopin="true" hAlign="Right"><Text text="City"/></Column></columns><items><ColumnListItem><cells><Input value="{Cname}"/><Input value="{Cage}"/><Input value="{Ccity}"/></cells></ColumnListItem></items></Table></VBox></semantic:content><semantic:footerCustomActions><Button id="entitySave" text="Save" press="onSave"/><Button id="entityCancel" text="Cancel" press="onCancel"/></semantic:footerCustomActions><semantic:fullScreenAction><semantic:FullScreenAction id="enterFullScreen"\n\t\t\t\tvisible="{= !${device>/system/phone} &amp;&amp; !${appView>/actionButtonsInfo/midColumn/fullScreen}}" press=".toggleFullScreen"/></semantic:fullScreenAction><semantic:exitFullScreenAction><semantic:ExitFullScreenAction id="exitFullScreen"\n\t\t\t\tvisible="{= !${device>/system/phone} &amp;&amp; ${appView>/actionButtonsInfo/midColumn/fullScreen}}" press=".toggleFullScreen"/></semantic:exitFullScreenAction></semantic:SemanticPage></mvc:View>',"ate/activity/book/ATE/view/App.view.xml":'<mvc:View\r\n\tcontrollerName="ate.activity.book.ATE.controller.App"\r\n\tdisplayBlock="true"\r\n\theight="100%"\r\n\txmlns="sap.m"\r\n\txmlns:f="sap.f"\r\n\txmlns:mvc="sap.ui.core.mvc"><App\r\n\t\tid="app"\r\n\t\tbusy="{appView>/busy}"\r\n\t\tbusyIndicatorDelay="{appView>/delay}"><f:FlexibleColumnLayout\r\n\t\t\tid="layout"\r\n\t\t\tlayout="{appView>/layout}"\r\n\t\t\tbackgroundDesign="Translucent"></f:FlexibleColumnLayout></App></mvc:View>',"ate/activity/book/ATE/view/Detail.view.xml":'<mvc:View controllerName="ate.activity.book.ATE.controller.Detail" xmlns="sap.m" xmlns:semantic="sap.f.semantic" xmlns:mvc="sap.ui.core.mvc"><semantic:SemanticPage id="detailPage" busy="{detailView>/busy}" showFooter="true" busyIndicatorDelay="{detailView>/delay}"><semantic:titleHeading><Title text="{Name}" level="H2"/></semantic:titleHeading><semantic:headerContent><ObjectAttribute title="{i18n>priceTitle}"/></semantic:headerContent><semantic:content><Table id="lineItemsList" width="auto" items="{parentToChild}" updateFinished=".onListUpdateFinished"\n\t\t\t\tnoDataText="{i18n>detailLineItemTableNoDataText}" busyIndicatorDelay="{detailView>/lineItemTableDelay}"><headerToolbar><Toolbar><Title id="lineItemsTitle" text="{detailView>/lineItemListTitle}" titleStyle="H3" level="H3"/></Toolbar></headerToolbar><columns><Column><Text text="{i18n>detailLineItemTableIDColumn}"/></Column><Column minScreenWidth="Tablet" demandPopin="true" hAlign="End"><Text text="{i18n>detailLineItemTableUnitNumberColumn}"/></Column></columns><items><ColumnListItem><cells><ObjectIdentifier title="{Cname}" text="{Cid}"/><ObjectNumber unit="{Ccity}"/></cells></ColumnListItem></items></Table></semantic:content><semantic:sendEmailAction><semantic:SendEmailAction id="shareEmail" press=".onSendEmailPress"/></semantic:sendEmailAction><semantic:closeAction><semantic:CloseAction id="closeColumn" press=".onCloseDetailPress"/></semantic:closeAction><semantic:footerCustomActions><Button id="entityEdit" text="Edit" press="onEdit"/><Button id="entityDelete" text="Delete" press="onDelete"/></semantic:footerCustomActions><semantic:fullScreenAction><semantic:FullScreenAction id="enterFullScreen"\n\t\t\t\tvisible="{= !${device>/system/phone} &amp;&amp; !${appView>/actionButtonsInfo/midColumn/fullScreen}}" press=".toggleFullScreen"/></semantic:fullScreenAction><semantic:exitFullScreenAction><semantic:ExitFullScreenAction id="exitFullScreen"\n\t\t\t\tvisible="{= !${device>/system/phone} &amp;&amp; ${appView>/actionButtonsInfo/midColumn/fullScreen}}" press=".toggleFullScreen"/></semantic:exitFullScreenAction></semantic:SemanticPage></mvc:View>',"ate/activity/book/ATE/view/DetailObjectNotFound.view.xml":'<mvc:View\r\n\tcontrollerName="ate.activity.book.ATE.controller.DetailObjectNotFound"\r\n\txmlns="sap.m"\r\n\txmlns:mvc="sap.ui.core.mvc"><MessagePage\r\n\t\tid="page"\r\n\t\ttitle="{i18n>detailTitle}"\r\n\t\ttext="{i18n>noObjectFoundText}"\r\n\t\ticon="sap-icon://product"\r\n\t\tdescription=""\r\n\t\tshowNavButton="{=\r\n\t\t\t${device>/system/phone} ||\r\n\t\t\t${device>/system/tablet} &amp;&amp;\r\n\t\t\t${device>/orientation/portrait}\r\n\t\t}"\r\n\t\tnavButtonPress=".onNavBack"></MessagePage></mvc:View>',"ate/activity/book/ATE/view/Master.view.xml":'<mvc:View xmlns="sap.m" xmlns:semantic="sap.f.semantic" xmlns:mvc="sap.ui.core.mvc" controllerName="ate.activity.book.ATE.controller.Master"><semantic:SemanticPage id="masterPage" preserveHeaderStateOnScroll="true" toggleHeaderOnTitleClick="false" showFooter="true"><semantic:titleHeading><Title id="masterPageTitle" text="{masterView>/title}" level="H2"/></semantic:titleHeading><semantic:content><List id="list" width="auto" class="sapFDynamicPageAlignContent"\n\t\t\t\titems="{ path: \'/parentSet\', sorter: { path: \'Name\', descending: false }, groupHeaderFactory: \'.createGroupHeader\' }"\n\t\t\t\tbusyIndicatorDelay="{masterView>/delay}" noDataText="{masterView>/noDataText}"\n\t\t\t\tmode="{= ${device>/system/phone} ? \'None\' : \'SingleSelectMaster\'}" growing="true" growingScrollToLoad="true"\n\t\t\t\tupdateFinished=".onUpdateFinished" selectionChange=".onSelectionChange"><headerToolbar><OverflowToolbar><SearchField id="searchField" showRefreshButton="true" tooltip="{i18n>masterSearchTooltip}" search=".onSearch" width="auto"><layoutData><OverflowToolbarLayoutData minWidth="150px" maxWidth="240px" shrinkable="true" priority="NeverOverflow"/></layoutData></SearchField><ToolbarSpacer/><Button id="sortButton" press=".onOpenViewSettings" icon="sap-icon://sort" type="Transparent"/></OverflowToolbar></headerToolbar><items><ObjectListItem type="Navigation" press=".onSelectionChange" title="{Name}" numberUnit="{City}"/></items></List></semantic:content><semantic:footerCustomActions><Button text="Clear" width="70px" id="__button2" press="onClearButton"/><Button text="Refresh" width="80px" id="__button1" press="onRefreshButton"/><Button text="Flush" width="70px" id="__button0" press="onFlushButton"/><Button id="addItem" activeIcon="sap-icon://add" icon="sap-icon://add" press="onAddItem"/></semantic:footerCustomActions></semantic:SemanticPage></mvc:View>',"ate/activity/book/ATE/view/NotFound.view.xml":'<mvc:View\r\n\tcontrollerName="ate.activity.book.ATE.controller.NotFound"\r\n\txmlns="sap.m"\r\n\txmlns:mvc="sap.ui.core.mvc"><MessagePage\r\n\t\tid="page"\r\n\t\ttitle="{i18n>notFoundTitle}"\r\n\t\ttext="{i18n>notFoundText}"\r\n\t\ticon="sap-icon://document"\r\n\t\tshowNavButton="true"\r\n\t\tnavButtonPress=".onNavBack"></MessagePage></mvc:View>',"ate/activity/book/ATE/i18n/i18n.properties":"# This is the resource bundle for activity book\r\n\r\n#XTIT: Application name\r\nappTitle=activity book\r\n\r\n#YDES: Application description\r\nappDescription=\r\n\r\n#~~~ Master View ~~~~~~~~~~~~~~~~~~~~~~~~~~\r\n\r\n#XTIT: Master view title with placeholder for the number of items\r\nmasterTitleCount=<parentSet> ({0})\r\n\r\n#XTOL: Tooltip for the search field\r\nmasterSearchTooltip=Enter an <parentSet> name or a part of it.\r\n\r\n#XBLI: text for a list with no data\r\nmasterListNoDataText=No <parentSetPlural> are currently available\r\n\r\n#XBLI: text for a list with no data with filter or search\r\nmasterListNoDataWithFilterOrSearchText=No matching <parentSetPlural> found\r\n\r\n#XSEL: Option to sort the master list by Name\r\nmasterSort1=Sort By <Name>\r\n\r\n\r\n#~~~ Detail View ~~~~~~~~~~~~~~~~~~~~~~~~~~\r\n\r\n#XTOL: Icon Tab Bar Info\r\ndetailIconTabBarInfo=Info\r\n\r\n#XTOL: Icon Tab Bar Attachments\r\ndetailIconTabBarAttachments=Attachments\r\n\r\n#XTOL: Tooltip text for close column button\r\ncloseColumn=Close\r\n\r\n#XBLI: Text for the parentToChild table with no data\r\ndetailLineItemTableNoDataText=No <parentToChildPlural>\r\n\r\n#XTIT: Title of the parentToChild table\r\ndetailLineItemTableHeading=<parentToChildPlural>\r\n\r\n#XTIT: Title of the parentToChild table\r\ndetailLineItemTableHeadingCount=<parentToChildPlural> ({0})\r\n\r\n#XGRP: Title for the Cname column in the parentToChild table\r\ndetailLineItemTableIDColumn=<FirstColumnName>\r\n\r\n#XGRP: Title for the  column in the parentToChild table\r\ndetailLineItemTableUnitNumberColumn=<LastColumnName>\r\n\r\n#XTIT: Send E-Mail subject\r\nshareSendEmailObjectSubject=<Email subject including object identifier PLEASE REPLACE ACCORDING TO YOUR USE CASE> {0}\r\n\r\n#YMSG: Send E-Mail message\r\nshareSendEmailObjectMessage=<Email body PLEASE REPLACE ACCORDING TO YOUR USE CASE> {0} (id: {1})\\r\\n{2}\r\n\r\n#XBUT: Text for the send e-mail button\r\nsendEmail=Send E-Mail\r\n\r\n#XTIT: Title text for the price\r\npriceTitle=Price\r\n\r\n#~~~ Not Found View ~~~~~~~~~~~~~~~~~~~~~~~\r\n\r\n#XTIT: Not found view title\r\nnotFoundTitle=Not Found\r\n\r\n#YMSG: The parentSet not found text is displayed when there is no parentSet with this id\r\nnoObjectFoundText=This <parentSet> is not available\r\n\r\n#YMSG: The not found text is displayed when there was an error loading the resource (404 error)\r\nnotFoundText=The requested resource was not found\r\n\r\n#~~~ Not Available View ~~~~~~~~~~~~~~~~~~~~~~~\r\n\r\n#XTIT: Master view title\r\nnotAvailableViewTitle=<parentSet>\r\n\r\n#~~~ Error Handling ~~~~~~~~~~~~~~~~~~~~~~~\r\n\r\n#YMSG: Error dialog description\r\nerrorText=Sorry, a technical error occurred! Please try again later.",
"ate/activity/book/ATE/manifest.json":'{"_version":"1.12.0","sap.app":{"id":"ate.activity.book.ATE","type":"application","i18n":"i18n/i18n.properties","title":"{{appTitle}}","description":"{{appDescription}}","applicationVersion":{"version":"1.0.0"},"resources":"resources.json","dataSources":{"mainService":{"uri":"/sap/opu/odata/sap/ZOFFLINEUSECASE_SRV_01/","type":"OData","settings":{"odataVersion":"2.0","localUri":"localService/metadata.xml"}}},"sourceTemplate":{"id":"sap.ui.ui5-template-plugin.2masterdetail","version":"1.63.1"}},"sap.ui":{"technology":"UI5","icons":{"icon":"sap-icon://detail-view","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"rootView":{"viewName":"ate.activity.book.ATE.view.App","type":"XML","async":true,"id":"app"},"dependencies":{"minUI5Version":"1.60.0","libs":{"sap.ui.core":{},"sap.m":{},"sap.f":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"ate.activity.book.ATE.i18n.i18n"}},"":{"dataSource":"mainService","preload":true}},"routing":{"config":{"routerClass":"sap.f.routing.Router","viewType":"XML","viewPath":"ate.activity.book.ATE.view","controlId":"layout","controlAggregation":"beginColumnPages","bypassed":{"target":"notFound"},"async":true},"routes":[{"pattern":"","name":"master","target":"master"},{"pattern":"parentSet/{objectId}","name":"object","target":["master","object"]}],"targets":{"master":{"viewName":"Master","viewLevel":1,"viewId":"master"},"object":{"viewName":"Detail","viewId":"detail","viewLevel":1,"controlAggregation":"midColumnPages"},"create":{"viewName":"AddDetail","viewLevel":1,"controlAggregation":"midColumnPages"},"detailObjectNotFound":{"viewName":"DetailObjectNotFound","viewId":"detailObjectNotFound","controlAggregation":"midColumnPages"},"notFound":{"viewName":"NotFound","viewId":"notFound"}}}},"sap.mobile":{"definingRequests":{},"stores":[]},"sap.platform.hcp":{"uri":"","_version":"1.1.0"}}'},"ate/activity/book/ATE/Component-preload");