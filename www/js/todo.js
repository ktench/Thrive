function initialize() {

    $('.sortable').sortable();
    $('.sortable').disableSelection();

    // bind the insertTask button
    $('#insertTask').on('click', function () {        
        var task = $('#newTask').val();        
        addTask(task);
        $('#newTask').val('');
    });

    // bind all delete buttons inside our list    
    $('#todolist').on('click', 'button.delete', function () {        
        $(this).closest('li').remove();
    });

    // bind change event for all 'Done' checkboxes
    $('#todolist').on('change', 'input.taskdone', function () {        
        $(this).closest('li').toggleClass('completed_task');
    });

    // bind save button event
    $('#saveList').on('click', saveList);
    
    // load our taskList from localStorage
    var taskList = JSON.parse(localStorage.getItem('taskList'));
    //console.log(taskList);

    // for every task in our JSON taskList
    for (var i = 0; i < taskList.length;i++) {
        //console.log(taskList[i]);
        addTask(taskList[i]);
    }
    
    $(window).on('beforeunload', saveList);
}

/**
*  This function will add a task to the task list
**/
function addTask(task) {
    console.log(task);
    /* Too messy, let's try something else
    $('#todolist').append(
        $('<li/>', {
            class: 'list-group-item',
            html: $('<div/>', {
                class: 'row',
                html: $('<div/>', {
                    class: 'col-md-10',
                    html: newTask
                })                    
            })
        })
    );
    */

    // less nesting, much easier to understand
    var li = document.createElement('li');
    $(li).attr('class', 'list-group-item');
    $('#todolist').append(li);

    var row = document.createElement('div');
    $(row).attr('class', 'row');
    $(row).appendTo(li);

    var col = document.createElement('div');
    $(col).attr('class', 'col-md-10 task');
    $(col).html(task);
    $(col).appendTo(row);

    var btngroup = document.createElement('div');
    $(btngroup).attr('class', 'btn-group col-md-2');
    $(btngroup).appendTo(row);

    var pullright = document.createElement('div');
    $(pullright).attr('class', 'pull-right');
    $(pullright).appendTo(btngroup);

    var button = document.createElement('button');
    $(button).attr('class', 'btn btn-danger delete');
    $(button).html('Delete');
    $(button).appendTo(pullright);

    row = document.createElement('div');
    $(row).attr('class', 'row');
    $(row).appendTo(li);

    col = document.createElement('div');
    $(col).attr('class', 'col-md-12');
    $(col).appendTo(row);

    var label = document.createElement('label');
    $(label).attr('class', 'pull-right');
    $(label).html('Done ');
    $(label).appendTo(col);

    var checkbox = document.createElement('input');
    $(checkbox).attr('type', 'checkbox');
    $(checkbox).attr('class', 'taskdone');
    $(checkbox).appendTo(label);  
}

/**
*   This function will save the list in localstorage as a JSON object
**/
function saveList() {

    // declare a task array
    var taskArray = new Array();
    // counter for our each <li> loop
    var i = 0;

    // for every <li>, we get just the tasks text and add it to our array
    $('li').each(function () {        
        var task = $(this).find('div.task').html();
        //console.log(task);
        taskArray[i] = task;
        i++;
    });
    //console.log(taskArray);

    // store our task array in localstorage as a JSON object
    localStorage.setItem('taskList', JSON.stringify(taskArray));
}