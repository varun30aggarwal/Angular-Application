app.controller('TabController', ['$scope','$rootScope',function($scope,$rootScope){
	$rootScope.portfolio=true;
	$rootScope.about=true;
	$rootScope.contact=true;
	$rootScope.errandify=true;
	$rootScope.view=true;
  	$rootScope.header=true;
  	 $(".bubble").hide();
console.log("inside functionlityu");
    this.setTab = function(newValue){
      this.tab = newValue;
      tabArray1 = ["mmm... whom do you have in mind",
    	   	"It's fun bossing people around", 
    	  "who's that lucky guy ;)",
    	  "who's going down now boss",
    	  "Wish even I cud add tasks for you !!!"];
      
      tabArray2 = ["There's always a second chance",
"I know ...Sometimes the 1st choice is not the best",
"Did u mess it again :D",
"I love u ... I know u tht u love me too but just cant say it !!",
"How are you today?"];
      
      tabArray3 = ["What does the report look like.. I really cant see from here !!",
    	  "Are you in trouble :-D",
    	  "Is someone in trouble :-D",
    	  "Psst... Do you want me to rig the report",
    	  "I know what you're thinking... I can't do it :-p" ]
      
     
      if(newValue==2)
      {
            $scope.$emit('CallParentMethod',{});
            this.msg=tabArray1[Math.floor(Math.random() * tabArray1.length)];
      }



      if(newValue==3)
      {    
            $scope.$emit('CallAnotherParentMethod',{});
            this.msg=tabArray2[Math.floor(Math.random() * tabArray2.length)];
      }
      
      if(newValue==4)
      {    
            $scope.$emit('CallAnotherParentMethod',{});
            this.msg=tabArray3[Math.floor(Math.random() * tabArray3.length)];
      }
      
      $(".bubble").html(this.msg);
      //$(".bubble").show();
     $(".bubble").show().delay(5000).fadeOut();



};
    this.isSet = function(tabName){
      return this.tab === tabName;
    };
 

  }]);
  
  app.controller("retriveCtrl",['$rootScope','$scope','$http','$window','$filter',function($rootScope,$scope,$http,$filter,$window){
	
 //$scope.names = ["InComplete", "Complete"];
 //lastVal = $cookieStore.get('lastValue');
	  var Val="";
	  
 // getting  call from tab controller..............
 $rootScope.$on("CallParentMethod", function(){
	 //var Val= $window.sessionStorage.getItem("uid");
           $scope.refreshData();
        });

$scope.names= {
    "type": "select", 
    "name": "Service",
    "value": "Incomplete", 
    "values": ["Complete","Incomplete"] 
  };
  
var startDate="";
var endDate="";


$scope.check=function(user)
{
  var d = new Date();
   var curr_date = d.getDate();
   if(curr_date<10)
	   curr_date="0"+curr_date;
   var curr_month = d.getMonth() + 1; //Months are zero based
   if(curr_month<10)
	   curr_month="0"+curr_month;
    var curr_year = d.getFullYear();
    var comdate=curr_year+"-"+curr_month+"-"+curr_date;
 if (user=== comdate)
 return true;
 else return false;
}

 $scope.refreshData=function(){
	 Val=  $rootScope.uid;
  var parameters = {
		  
		 // id:1
               id: Val,
              startDate:"1968-12-01",
                endDate:"1968-12-01"
            };
  var config = {
                params: parameters
            };
   $http.get('http://35.161.33.203:8080/editemp/', config)
  // $http.get('http://localhost:8080/editemp/', config)
            .success(function (data, status, headers, config) {
                $scope.Details = data;
            })
            .error(function (data, status, header, config) {
                $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
            });
     

}
//alert(lastVal);



$scope.retriveTask=function(){

/*var date1 = $scope.myDate1;
var date2=$scope.myDate2;*/

console.log(date1);

var day = $scope.myDate1.getDate();
var monthIndex = $scope.myDate1.getMonth();
var year = $scope.myDate1.getFullYear();

var day1 = $scope.myDate2.getDate();
var monthIndex1 = $scope.myDate2.getMonth();
var year1 = $scope.myDate2.getFullYear();

var  date1= year + '-' + (monthIndex + 1) + '-' + day;

var  date2= year1 + '-' + (monthIndex1 + 1) + '-' + day1;

Val=  $rootScope.uid;
var parameters = {
		  
		
             id: Val,
             startDate:date1,
              endDate:date2
          };
var config = {
              params: parameters
          };
 $http.get('http://35.161.33.203:8080/editemp/', config)
// $http.get('http://localhost:8080/editemp/', config)
          .success(function (data, status, headers, config) {
              $scope.Details = data;
          })
          .error(function (data, status, header, config) {
              $scope.ResponseDetails = "Data: " + data +
                  "<hr />status: " + status +
                  "<hr />headers: " + header +
                  "<hr />config: " + config;
          });



};
 var config = {
                headers : {
                    'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
                    
                }
            }
$scope.updatetask=function(user){
 // $scope.user={};
 var p =JSON.stringify(user);
 p=JSON.parse(p);
app.config(function ($httpProvider) {
  $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};
});
//alert(user.status);
var doo = new Date(user.due_date);
//user.due_date=new Date(doo.getTime()+doo.getTimezoneOffset()*60000);

 $http.post('http://35.161.33.203:8080/editstatus/', p)
 // $http.post('http://localhost:8080/editstatus/', p)
            .success(function (data, status, headers, config) {
             //  $scope.succcessMessage = data;
            	  swal({
              		  title: "Sweet! Task Completed",
              		  //text: "Here's a custom image.",
              		  imageUrl: "images/task/thumbs-up.jpg"
              		});
                  //alert( "success message: " + JSON.stringify({data: data}));
            })
            .error(function (data, status, header, config) {
                $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
            });
}



  }]);
  
  
  
  
  
  app.directive('jqdatepicker', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
         link: function (scope, element, attrs, ngModelCtrl) {
            element.datepicker({
                dateFormat: 'dd/mm/yy',
                onSelect: function (date) {
                    scope.date = date;
                    scope.$apply();
              ngModelCtrl.$setViewValue(date);
                }
            });
        }
    };
});
  
  







  app.controller("assign", ['$rootScope','$scope','$http','$window',function($rootScope,$scope,$http,$window,$mdDateLocale) {
    var lastVal="";
    var p;
	 lastVal= $window.sessionStorage.getItem("uid");
	 $rootScope.uid= $window.sessionStorage.getItem("uid");
    //  lastVal = $cookieStore.get('lastValue');
//alert("uid"+ lastVal);

$scope.minDate = new Date();
	//  var a =$scope.uid;
$scope.counter = 0;
 $scope.names = ["Daily", "Weekly", "Monthly"];
  $scope.multiple = [1,2,3,4];
  $scope.user = [{ }];
   

 //$scope.getNames=function(){
  var parameters = {
                id: lastVal
              //  startDate=,
               // endDate=
            };
  var config = {
                params: parameters
            };
   $http.get('http://35.161.33.203:8080/getNames/', config)
 //  $http.get('http://localhost:8080/getNames/', config)
            .success(function (data, status, headers, config) {
                $scope.user = data;
            })
            .error(function (data, status, header, config) {
                $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
            });
     

//}

        $scope.remove = function(){
            var newDataList=[];
            $scope.selectedAll = false;
            angular.forEach($scope.personalDetails1, function(selected){
                if(!selected.selected){
                    newDataList.push(selected);
                }
            }); 
            $scope.personalDetails1 = newDataList;
        };
  
        
        


 $rootScope.$on("CallAnotherParentMethod", function(){
   $scope.counter=0;
 //  $scope.getNames();
  $scope.personalDetail1=[{     'assignename' : '',
		
		'module' :'',
    
		'startdate':'',
     'enddate':'',
		 'frequency':'',
		  

		 'users':$scope.user,
		 
"multiple":""
	}];
       
  
        });


    	$scope.addstatus = function(){		
	//	$scope.personalDetails.push({ 'fname':$scope.fname, 'module': $scope.module, 'moduleid':$scope.moduleid,'description':$scope.description });
		// Writing it to the server
		//	
var dataObj = [{
				assignename:'',
			
            taskName:'',
           
			 start_date:'',
			 end_date:'',
			 frequency:'',


			 participants:[{}],
			 
		multiple:'',
		login_id:''
		}];
      var s=$scope.counter;
      
      
	  
	  
	  
	 
	  {            if($scope.personalDetail1[0].module!='')
		    
		//  Date start =$scope.personalDetail1[0].startdate;
	//    var end =$scope.personalDetail1[0].enddate;
	    var day = $scope.personalDetail1[0].startdate.getDate();
	    var monthIndex = $scope.personalDetail1[0].startdate.getMonth();
	    var year = $scope.personalDetail1[0].startdate.getFullYear();

	    var day1 = $scope.personalDetail1[0].enddate.getDate();
	    var monthIndex1 = $scope.personalDetail1[0].enddate.getMonth();
	    var year1 = $scope.personalDetail1[0].enddate.getFullYear();
	    
	    var  start= day + '/' + (monthIndex + 1) + '/' + year;
		  
	  var  end= day1 + '/' + (monthIndex1 + 1) + '/' + year1;
		  
		   dataObj.push( {
				'assignename' : $scope.personalDetail1[0].assignename,
				
			
                
				'startDate':start,
                 'endDate':end,
				 'frequency':$scope.personalDetail1[0].frequency,
				 'name':$scope.personalDetail1[0].users.uid,
				 'multipleParticipants':1,
				 'login_id':$rootScope.uid,
          'taskName' :$scope.personalDetail1[0].module
	  })};	
	  
	  
	  
	  
	  
	  
	  
	  
       dataObj=JSON.stringify(dataObj);
      dataObj=JSON.parse(dataObj);
		var res = $http.post('http://35.161.33.203:8080/insert', dataObj);
		//var res = $http.post('http://localhost:8080/insert', dataObj);
		res.success(function(data, status, headers, config) {
			$scope.message = data;
			swal("You have added the task");
$scope.personalDetail1 = angular.copy($scope.initial);
		});
		res.error(function(data, status, headers, config) {
			swal( "Error in adding your task");
		});		
		// Making the fields empty
		//
	
	};
    $scope.checkAll = function () {
        if (!$scope.selectedAll) {
            $scope.selectedAll = true;
        } else {
            $scope.selectedAll = false;
        }
        angular.forEach($scope.personalDetails, function(personalDetail) {
            personalDetail.selected = $scope.selectedAll;
        });
    };    
    
    
}]);



  app.controller('showChart', function ($scope,$rootScope,$http) {

	
	  $scope.demo=true;

	  $scope.dataSource ={};

	     $scope.retriveReport = function () {
	        
	    	 
	    	 var day = $scope.ReportDate1.getDate();
	    	if(day<10)
	    		 day="0"+day;
	 	    var monthIndex = $scope.ReportDate1.getMonth();
	 	    monthIndex=monthIndex+1;
	 	   if(monthIndex<10)
	 		  monthIndex="0"+monthIndex;
	 	    var year = $scope.ReportDate1.getFullYear();

	 	    var day1 = $scope.ReportDate2.getDate();
	   if(day1<10)
	    		 day1="0"+day1;
	 	    var monthIndex1 = $scope.ReportDate2.getMonth();
	 	   monthIndex1=monthIndex1+1;
	 	   if(monthIndex1<10)
	 		  monthIndex1="0"+monthIndex1;
	 	    var year1 = $scope.ReportDate2.getFullYear();
	 	    
	 	  var start1=year + ""+(monthIndex)+""  + day;
	 	  var end1=year1  +""+ (monthIndex1)+""  + day1;
	 	  
	 	  
	 	  
	 	  
	 	 var  start= year + '-' + (monthIndex) + '-' + day;

	 	var  end= year1 + '-' + (monthIndex1) + '-' + day1;

	 	Val=  $rootScope.uid;
	 	
	 	 $scope.reportDetails=[{}];

	    	 if(parseInt(end1)>=parseInt(start1))
	    	 { 
	    		 var parameters = {
	   	 			  
	    		 			
		 	             id: Val,
		 	             startDate:start,
		 	              endDate:end
		 	          };
		 	var config = {
		 	              params: parameters
		 	          };
	    		 $http.get('http://35.161.33.203:8080/Report/', config)
	    	//	  $http.get('http://localhost:8080/Report/', config)
	 	          .success(function (data, status, headers, config) {
	 	              $scope.reportDetails = data;
	 	             $scope.temp=JSON.stringify($scope.reportDetails);
	 	            $scope.temp=JSON.parse($scope.temp);
	 	             $scope.demo=false;
	 	             
	 	            $scope.dataSource = {
	 	            		"width": "100%",
	 	                   "height": "100%",
	 	            		"chart": {
	 		                  "caption": "Missed Work",
	 		                  "captionFontSize": "26",
	 		                  "captionPadding": "25",
	 		                  "baseFontSize": "14",
	 		                  "canvasBorderAlpha": "0",
	 		                  "showPlotBorder": "0",
	 		                  "placevaluesInside": "1",
	 		                  "valueFontColor": "rgba(50,50,50,0.87)",
	 		                  "captionFontBold": "0",
	 		                  "bgColor": "rgb(250, 250, 250)",
	 		                  "divLineAlpha": "50",
	 		                  "plotSpacePercent": "10",
	 		                  "bgAlpha": "95",
	 		                  "canvasBgAlpha": "0",
	 		                  "outCnvBaseFontColor": "rgba(50,50,50,0.87)",
	 		                  "showValues": "0",
	 		                  "baseFont": "Lato",
	 		                  "paletteColors": "#6495ED, #FF6347, #90EE90, #FFD700, #FF1493",
	 		                  "theme": "zune",
	 		                  
	 		                  // tool-tip customization
	 		                  "toolTipBorderColor": "#FFFFFF",
	 		                  "toolTipBorderThickness": "1",
	 		                  "toolTipBorderRadius": "2",
	 		                  "toolTipBgColor": "white",
	 		                  "toolTipBgAlpha": "70",
	 		                  "toolTipPadding": "12",
	 		                  "toolTipSepChar": " - ",
	 		                  // axis customization
	 		                  "xAxisNameFontSize": "12",
	 		                  "yAxisNameFontSize": "12",
	 		                  "xAxisNameFontColor":"#337ab7",
	 		                  "yAxisNameFontColor":"#337ab7",
	 		                  "xAxisNamePadding": "10",
	 		                  "yAxisNamePadding": "10",
	 		                  "xAxisName": "Names",
	 		                  "yAxisName": "Incomplete Work",
	 		                  "xAxisNameFontBold": "0",
	 		                  "yAxisNameFontBold": "0",
	 		                  "showXAxisLine": "1",
	 		                  "xAxisLineColor": "#999999",
	 		                  "labelDisplay": "wrap",
	 		                },
	 		         
	 		        
	 	              "data":  $scope.temp
	 		                
	 		              };
	 	             
	 	             
	 	             
	 	             
	 	          })
	 	          .error(function (data, status, header, config) {
	 	              $scope.ResponseDetails = "Data: " + data +
	 	                  "<hr />status: " + status +
	 	                  "<hr />headers: " + header +
	 	                  "<hr />config: " + config;
	 	          });
	    	       	 
	    		
	    		 
	    	 }
	    	 
	    	 else
	    		 {
	    		 swal("Start Date cannot be greater than end date");
	    		 }
	      }; 



	    


	               $scope.selectedValue = "Please click on any column above.";
	        $scope.events = {
	          dataplotclick: function(ev, props) {
	            $scope.$apply(function() {
	              //create a table if possible to show all data for that person
	              $scope.colorValue = "background-color:" + props.categoryLabel + ";";
	              $scope.selectedValue = "You clicked on " + props.categoryLabel + "  column!";

	                  

	            



	            });
	          }
	        };
	    
	      });

