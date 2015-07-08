if (Meteor.isClient) {
  Meteor.subscribe('holidays');
  Meteor.subscribe('breaks');
  Meteor.subscribe('startEnd');
  Template.dateSelector.helpers({
    'getStart': function(){
      var start = StartEnd.findOne({type:'Start'}).date;
      var dd = start.getDate();
      var mm = start.getMonth()+1; //January is 0!
      var yyyy = start.getFullYear();
      if(dd<10){
          dd='0'+dd
      } 
      if(mm<10){
          mm='0'+mm
      } 
      var start = yyyy + "-" + mm + "-" + dd;
      return start
    },
    'getEnd': function(){
      var end = StartEnd.findOne({type:'End'}).date;
      var dd = end.getDate();
      var mm = end.getMonth()+1; //January is 0!
      var yyyy = end.getFullYear();
      if(dd<10){
          dd='0'+dd
      } 
      if(mm<10){
          mm='0'+mm
      } 
      var end = yyyy + "-" + mm + "-" + dd;
      return end
    },
    'getDiff': function(){
      var start = StartEnd.findOne({type:'Start'}).date;
      var end = StartEnd.findOne({type:'End'}).date;
      var days = [1,2,3,4,5];
      var ndays = 1 + Math.round((end-start)/(24*3600*1000));
      var sum = function(a,b) {
        return a + Math.floor( ( ndays + (start.getDay()+6-b) % 7 ) / 7 ); };
      var diffDays = days.reduce(sum,0);
      diffDays -= Holidays.find().count();
      return diffDays
    }
  });
  Template.dateSelector.events({
    'blur .startDate': function(){
      var newStart = new Date(document.getElementById('startDate').value);
      Meteor.call('startDate',newStart);
      Meteor.call('validate');
    },
    'blur .endDate': function(){
      var newEnd = new Date(document.getElementById('endDate').value);
      Meteor.call('endDate',newEnd);
      Meteor.call('validate');
    }
  });
  Template.breakForm.events({
    'submit form': function(){
      event.preventDefault();
      var schoolstart = StartEnd.findOne({type:'Start'}).date;
      var schoolend = StartEnd.findOne({type:'End'}).date;
      var name = event.target.breakName.value;
      var start = event.target.startBreak.value;
      var end = event.target.endBreak.value;
      if (schoolend == null || schoolstart == null)
      {
        alert("Please tell us when your school starts and ends first.");
      }
      else
      {
        if (start <= schoolstart)
        {
          alert("Breaks must start after the first day of school");
        }
        else if(end >= schoolend)
        {
          alert("Breaks must end before school ends");
        }
        else
        {
          if(start <= end)
          {
            Meteor.call('addBreak',name,start,end);
            console.log("done");
            document.getElementById('breakName').value = "";  
          }
          else
          {
            alert("The end of a break cannot be before the start.");  
          }
        }
      }
    }
  });
  Template.holidayForm.events({
    'submit form': function(){
      event.preventDefault();
      var schoolstart = Session.get('start');
      var schoolend = Session.get('end');
      var name = event.target.holidayName.value;
      var holiday = event.target.startHoliday.value;
      if (schoolend == null || schoolstart == null)
      {
        alert("Please tell us when your school starts and ends first.");
      }
      else
      {
        if (holiday <= schoolstart)
        {
          alert("Holidays must occur after the first day of school");
        }
        else if(holiday >= schoolend)
        {
          alert("Breaks must occur before school ends");
        }
        else
        {
          Meteor.call('addHoliday',holiday,name);
          document.getElementById('holidayName').value = "";  
        }
      }
    }
  });
  Template.breakDisplay.helpers({
    'break': function(){
      return Breaks.find({},{sort: {start: 1, name: 1}})
    },
    'numBreaks': function(){
      return (Breaks.find().count() != 0)
    }
  });
  Template.breakDisplay.events({
    'click .removeBreak': function(){
      Meteor.call('removeBreak');
    },
    'click .removeSingleBreak': function(){
      var name = this.name;
      console.log("hmm");
      Meteor.call('removeSingleBreak',name);
    }
  });
  Template.holidayDisplay.helpers({
    'holiday': function(){
      return Holidays.find({type: 'holiday'},{sort: {date: 1, name: 1}})
    },
    'numHolidays': function(){
      return (Holidays.find({type: 'holiday'}).count() != 0)
    }
  });
  Template.holidayDisplay.events({
    'click .removeHoliday': function(){
      Meteor.call('removeHoliday');
    },
    'click .removeSingleBreak': function(){
      var name = this.name;
      Meteor.call('removeSingleHoliday',name);
    }
  })
}
