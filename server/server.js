if (Meteor.isServer) {
  Meteor.methods({
    'startDate': function(start){
      StartEnd.upsert(
      {
        type: 'Start'
      },
      {
        $set: {
          date: start
        }
      })
    },
    'endDate': function(end){
      StartEnd.upsert(
      {
        type: 'End'
      },
      {
        $set: {
          date: end
        }
      })
    },
    'addHoliday': function(holiday,name){
      var newday = new Date(holiday);
      if(newday.getDay() != 0 && newday.getDay() != 6)
        {
          Holidays.upsert(
          {
            date: newday
          },
          {
            $set: {
              name: name,
              type: 'holiday'
            }
          });
        }
    },
    'addBreak': function(name,start,end){
      startDate = new Date(start);
      endDate = new Date(end);
      Breaks.upsert(
      {
        name: name
      },
      { 
        $set: {
          start: startDate,
          end: endDate
        }
      });
      var newday = startDate;
      while(newday <= endDate)
      {
        console.log(newday.getDay());
        if(newday.getDay() != 0 && newday.getDay() != 6)
        {
          Holidays.upsert(
          {
            date: newday
          },
          {
            $set: {
              name: name,
              type: 'break'
            }
          });
        }
        newday.setDate(newday.getDate()+1);
      }
    },
    'removeBreak': function(){
      Breaks.remove({});
      Holidays.remove(
      {
        type: 'break'
      });
    },
    'removeSingleBreak': function(name){
      Breaks.remove({name: name});
      Holidays.remove({name: name});
    },
    'removeHoliday': function(){
      Holidays.remove({
        type: 'holiday'
      });
    },
    'removeSingleHoliday': function(name){
      Holidays.remove({name: name});
    },
    'validate': function(){
      var query = Breaks.find({});
      query.forEach(function (post) {
        var start = StartEnd.findOne({type:'Start'}).date;
        var end = StartEnd.findOne({type:'End'}).date;
        if(post.start <= start || post.end >= end)
        {
          Breaks.remove(
          {
            name: post.name
          });
        }
      });
      var query = Holidays.find({});
      query.forEach(function (post){
        var start = StartEnd.findOne({type:'Start'}).date;
        var end = StartEnd.findOne({type:'End'}).date;
        if (post.date <= start || post.date >= end)
        {
          Holidays.remove(
          {
            name: post.name
          });
        }
      });
    }
  });
}
