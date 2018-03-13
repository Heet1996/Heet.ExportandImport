angular.module('app', ['ui.grid'])

.controller('MainCtrl', ['$scope', function ($scope) {
  var vm = this;
  
  vm.gridOptions = {};
  
  vm.reset = reset;
  
  function reset() {
    vm.gridOptions.data = [];
    vm.gridOptions.wrongDetails=false;
    vm.gridOptions.columnDefs = [];
  }
}])

.directive("fileread", [function () {
  return {
    scope: {
      opts: '='
    },
    link: function ($scope, $elm, $attrs) {
      $elm.on('change', function (changeEvent) {
        var reader = new FileReader();
        
        reader.onload = function (evt) {
          $scope.$apply(function () {
            var data = evt.target.result;
            
            var workbook = XLSX.read(data, {type: 'binary'});
            
            var headerNames = XLSX.utils.sheet_to_json( workbook.Sheets[workbook.SheetNames[0]], { header: 1 })[0];
            
            var data = XLSX.utils.sheet_to_json( workbook.Sheets[workbook.SheetNames[0]]);
            var wrongDetails=false;
            if(Object.keys(data[0]).length!=10)
      {
      alert("All the Columns are Mandatory");
      }
          else{
            
            
            $scope.opts.columnDefs = [
          
          
             {field: 'Email', cellClass:function(grid, row, col, rowRenderIndex, colRenderIndex) {
          if (!ValidateEmail(grid.getCellValue(row,col))) {      $scope.opts.wrongDetails=true;     

                                                                return 'red';
                                                          }

                                                  } 
              },
              {field: 'Date', cellClass:function(grid, row, col, rowRenderIndex, colRenderIndex) {
          if (!ValidateDate(grid.getCellValue(row,col))) {      $scope.opts.wrongDetails=true;
                                                                return 'red';
                                                          }
                                                  } 
              }



            ];
            headerNames.forEach(function (h) {
              if(!(h=='Email' || h=='Date'))
              $scope.opts.columnDefs.push({ field: h });
             });

            $scope.opts.data = data;
           
            console.log($scope.opts);
            $elm.val(null);
          }
          });
        };
        
        reader.readAsBinaryString(changeEvent.target.files[0]);
      });
    }
  }
}]);